import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PLATFORMS, SCENARIOS, INDUSTRIES, TONES } from "@/lib/constants";
import type { GenerateRequest, GenerateResponse, GeneratedPost } from "@/lib/types";

const anthropic = new Anthropic();

function buildSystemPrompt(
  platform: (typeof PLATFORMS)[number],
  scenario: (typeof SCENARIOS)[number],
  industry: (typeof INDUSTRIES)[number],
  tone: (typeof TONES)[number]
) {
  return `あなたは日本のビジネスSNS投稿の専門ライターです。

## ルール
- プラットフォーム: ${platform.name}（最大${platform.maxLength}文字）
- ハッシュタグ: ${platform.hashtagStyle}
- 特性: ${platform.features.join("、")}
- ビジネスシナリオ: ${scenario.name}（${scenario.description}）
- 業種: ${industry.name}
- トーン: ${tone.name}（${tone.description}）

## 出力形式
JSON形式で3パターンの投稿を生成してください。各投稿はプラットフォームの文字数制限内にしてください。

\`\`\`json
{
  "posts": [
    {
      "content": "投稿本文（ハッシュタグ含む）",
      "characterCount": 文字数,
      "hashtags": ["#ハッシュタグ1", "#ハッシュタグ2"]
    }
  ]
}
\`\`\`

## 注意
- 日本のビジネス文化に適したトーンを使用
- 業種に合った専門用語や表現を使用
- 各パターンは異なるアプローチ（例: データ重視/感情訴求/問題提起）
- 絵文字は控えめに使用（ビジネスに適した範囲で）
- JSONのみを出力（説明文は不要）`;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { platform: platformId, scenario: scenarioId, industry: industryId, tone: toneId } = body;

    const platform = PLATFORMS.find((p) => p.id === platformId);
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    const industry = INDUSTRIES.find((i) => i.id === industryId);
    const tone = TONES.find((t) => t.id === toneId) ?? TONES[1];

    if (!platform || !scenario || !industry) {
      return NextResponse.json(
        { error: "無効なパラメータです" },
        { status: 400 }
      );
    }

    const userMessage = [
      `${scenario.name}の投稿を3パターン生成してください。`,
      body.productName && `商品・サービス名: ${body.productName}`,
      body.details && `詳細: ${body.details}`,
      body.targetAudience && `ターゲット: ${body.targetAudience}`,
    ]
      .filter(Boolean)
      .join("\n");

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: buildSystemPrompt(platform, scenario, industry, tone),
      messages: [{ role: "user", content: userMessage }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "生成結果の解析に失敗しました" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]) as { posts: GeneratedPost[] };

    const response: GenerateResponse = {
      posts: parsed.posts,
      platform: platformId,
      scenario: scenarioId,
    };

    return NextResponse.json(response);
  } catch (e) {
    console.error("Generation error:", e);
    return NextResponse.json(
      { error: "投稿の生成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
