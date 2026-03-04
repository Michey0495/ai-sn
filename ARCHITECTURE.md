# PostPilot AI - アーキテクチャ設計書

## 概要

日本のビジネストーンに特化したAI SNS投稿ジェネレーター。プラットフォーム（X/Twitter, Instagram, LinkedIn, Facebook, note.com）とビジネスシーンを選択し、各SNSに最適化された投稿を3パターン同時に生成する。

## ページ構成・ルーティング

```
/ ........................... トップページ（サービス紹介、CTA）
/generate ................... 投稿生成ページ（メイン機能）
/scenarios .................. シナリオ一覧ページ
/[platform]/[scenario] ...... SEOランディングページ（75ページ）
/api/generate ............... AI生成APIエンドポイント
/api/mcp .................... MCPサーバー（AIエージェント向け）
/api/og ..................... OGP画像動的生成
```

### SEOランディングページ

5プラットフォーム × 15シナリオ = 75の静的ページを生成。各ページは `generateStaticParams` で事前ビルドされ、ロングテールSEOキーワードを獲得。

例:
- `/twitter/new-product` → 「X 新商品告知 テンプレート」
- `/instagram/campaign` → 「Instagram キャンペーン 投稿 例文」

## コンポーネント設計

```
src/
├── app/
│   ├── layout.tsx .............. ルートレイアウト（ヘッダー、フッター）
│   ├── page.tsx ................ トップページ
│   ├── globals.css ............. グローバルCSS（黒背景テーマ）
│   ├── sitemap.ts .............. サイトマップ自動生成
│   ├── generate/
│   │   └── page.tsx ............ 生成フォーム（Client Component）
│   ├── scenarios/
│   │   └── page.tsx ............ シナリオ一覧
│   ├── [platform]/
│   │   └── [scenario]/
│   │       └── page.tsx ........ SEOランディングページ（静的生成）
│   └── api/
│       ├── generate/route.ts ... AI生成API
│       ├── mcp/route.ts ........ MCPサーバー
│       └── og/route.tsx ........ OGP画像生成
├── components/
│   ├── ui/ ..................... shadcn/ui コンポーネント
│   └── PostResults.tsx ......... 生成結果表示コンポーネント
└── lib/
    ├── constants.ts ............ 定数定義（プラットフォーム、シナリオ等）
    ├── types.ts ................ 型定義
    └── utils.ts ................ ユーティリティ（shadcn）
```

## データフロー

```
[ユーザー入力]
    ↓
[Generate Page (Client)] → POST /api/generate
    ↓
[API Route] → Claude API (Haiku)
    ↓
[3パターンのJSON] → [PostResults コンポーネント]
    ↓
[ワンクリックコピー]
```

### リクエスト/レスポンス

**Request:**
```json
{
  "platform": "twitter",
  "scenario": "new-product",
  "industry": "it",
  "tone": "semi-casual",
  "productName": "PostPilot AI",
  "details": "月額1,980円でSNS投稿をAI生成",
  "targetAudience": "中小企業のSNS担当者"
}
```

**Response:**
```json
{
  "posts": [
    {
      "content": "投稿本文...",
      "characterCount": 180,
      "hashtags": ["#AI", "#SNS運用"]
    }
  ],
  "platform": "twitter",
  "scenario": "new-product"
}
```

## AI生成ロジック

プラットフォーム×シナリオ×業種×トーンの組み合わせから最適なシステムプロンプトを構築。Claude Haiku（Free tier）で3パターン同時生成。

各プラットフォームの特性を考慮:
- X/Twitter: 280文字制限、ハッシュタグ2-3個
- Instagram: キャプション2200文字、ハッシュタグ10-15個
- LinkedIn: ビジネストーン重視、段落構成
- Facebook: 親しみやすいトーン、中長文
- note: 長文記事形式、見出し構成

## MCP Server 設計

### エンドポイント: `POST /api/mcp`

JSON-RPC 2.0 ベースの MCP (Model Context Protocol) サーバー。AIエージェントがプログラマティックに投稿生成機能を利用可能。

#### プロトコル

- **Protocol Version:** 2024-11-05
- **Transport:** HTTP (Streamable HTTP)
- **Format:** JSON-RPC 2.0

#### 対応メソッド

| メソッド | 説明 |
|----------|------|
| `initialize` | サーバー情報・capabilities を返す |
| `tools/list` | 利用可能なツール一覧を返す |
| `tools/call` | ツールを実行する |

#### ツール定義

| Tool名 | パラメータ | 説明 |
|---------|-----------|------|
| `generate_post` | platform, scenario, industry, tone?, productName?, details?, targetAudience? | SNS投稿を3パターン生成 |
| `list_platforms` | - | 対応プラットフォーム一覧 |
| `list_scenarios` | - | ビジネスシナリオ一覧 |
| `list_industries` | - | 対応業種一覧 |

#### 使用例

```json
// リクエスト
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "generate_post",
    "arguments": {
      "platform": "twitter",
      "scenario": "new-product",
      "industry": "it",
      "tone": "semi-casual"
    }
  }
}
```

#### GET `/api/mcp`

ツール一覧をシンプルなJSONで返す（ディスカバリ用）。

### AI公開チャネル

| ファイル | パス | 説明 |
|----------|------|------|
| A2A Agent Card | `/.well-known/agent.json` | AIエージェント間通信の仕様 |
| LLMs.txt | `/llms.txt` | AI向けサイト説明 |
| robots.txt | `/robots.txt` | AIクローラー許可設定 |
| MCP Server | `/api/mcp` | AIエージェント直接接続エンドポイント |

## デザインシステム

- 背景: `#000000`（純黒）
- アクセント: `#f472b6`（pink-400）
- カード: `bg-white/5 border border-white/10`
- テキスト: `text-white` / `text-white/70` / `text-white/40`
- フォント: 16px以上、line-height 1.65

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Claude API (Haiku)
- Vercel (hosting)
