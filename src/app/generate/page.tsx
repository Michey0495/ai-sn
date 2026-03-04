"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLATFORMS, SCENARIOS, INDUSTRIES, TONES } from "@/lib/constants";
import type { GenerateResponse } from "@/lib/types";
import { PostResults } from "@/components/PostResults";

export default function GeneratePage() {
  const [platform, setPlatform] = useState("");
  const [scenario, setScenario] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("semi-casual");
  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!platform || !scenario || !industry) {
      setError("プラットフォーム、シナリオ、業種を選択してください。");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          scenario,
          industry,
          tone,
          productName: productName || undefined,
          details: details || undefined,
          targetAudience: targetAudience || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "生成に失敗しました");
      }

      const data: GenerateResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "生成に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">SNS投稿を作成</h1>
      <p className="text-white/60 mb-8">
        プラットフォームとシナリオを選んで、AIに投稿を生成してもらいましょう。
      </p>

      <div className="space-y-6">
        {/* Platform */}
        <div>
          <label id="platform-label" className="block text-sm font-medium text-white/80 mb-2">
            プラットフォーム
          </label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger aria-labelledby="platform-label" className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="プラットフォームを選択" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10">
              {PLATFORMS.map((p) => (
                <SelectItem key={p.id} value={p.id} className="text-white">
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scenario */}
        <div>
          <label id="scenario-label" className="block text-sm font-medium text-white/80 mb-2">
            ビジネスシナリオ
          </label>
          <Select value={scenario} onValueChange={setScenario}>
            <SelectTrigger aria-labelledby="scenario-label" className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="シナリオを選択" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10">
              {SCENARIOS.map((s) => (
                <SelectItem key={s.id} value={s.id} className="text-white">
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div>
          <label id="industry-label" className="block text-sm font-medium text-white/80 mb-2">
            業種
          </label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger aria-labelledby="industry-label" className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="業種を選択" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10">
              {INDUSTRIES.map((i) => (
                <SelectItem key={i.id} value={i.id} className="text-white">
                  {i.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tone */}
        <div>
          <label id="tone-label" className="block text-sm font-medium text-white/80 mb-2">
            トーン
          </label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger aria-labelledby="tone-label" className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10">
              {TONES.map((t) => (
                <SelectItem key={t.id} value={t.id} className="text-white">
                  {t.name} - {t.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Optional fields */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-white/80 mb-2">
            商品・サービス名（任意）
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="例: PostPilot AI"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-pink-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-white/80 mb-2">
            投稿の詳細・伝えたいこと（任意）
          </label>
          <Textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="例: 月額1,980円で無制限にSNS投稿を生成できるAIツールをリリースしました"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px]"
          />
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-white/80 mb-2">
            ターゲット層（任意）
          </label>
          <input
            id="targetAudience"
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="例: 中小企業のSNS担当者"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-pink-accent focus:outline-none"
          />
        </div>

        {error && (
          <p role="alert" className="text-red-400 text-sm">{error}</p>
        )}

        <Button
          onClick={handleGenerate}
          disabled={loading}
          size="lg"
          className="w-full bg-pink-accent text-black hover:bg-pink-accent/90 font-semibold disabled:opacity-50"
        >
          {loading ? "生成中..." : "投稿を生成する"}
        </Button>
      </div>

      {result && <PostResults result={result} />}
    </div>
  );
}
