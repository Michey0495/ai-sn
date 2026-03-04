# PostPilot AI

日本のビジネストーンに特化したAI SNS投稿ジェネレーター。

## 概要

プラットフォーム（X/Twitter, Instagram, LinkedIn, Facebook, note.com）とビジネスシーンを選択するだけで、各SNSの特性に最適化されたプロ品質の投稿を3パターン同時に生成。

## 技術スタック

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS / shadcn/ui
- Claude API (Haiku)
- Vercel

## セットアップ

```bash
npm install
```

### 環境変数

```bash
# .env.local
ANTHROPIC_API_KEY=your-api-key
```

### 開発サーバー

```bash
npm run dev
```

http://localhost:3000 でアクセス。

## ページ構成

| パス | 説明 |
|------|------|
| `/` | トップページ |
| `/generate` | 投稿生成ページ |
| `/scenarios` | シナリオ一覧 |
| `/[platform]/[scenario]` | SEOランディングページ（75ページ） |

## API

### POST /api/generate

SNS投稿をAIで生成。

```json
{
  "platform": "twitter",
  "scenario": "new-product",
  "industry": "it",
  "tone": "semi-casual"
}
```

## 進捗

- [x] プロジェクト初期化
- [x] トップページ
- [x] 投稿生成ページ
- [x] AI生成API
- [x] SEOランディングページ（75ページ）
- [x] シナリオ一覧ページ
- [x] サイトマップ
- [x] OGP画像
- [x] AI公開チャネル (llms.txt, agent.json, robots.txt)
- [ ] レート制限
- [ ] ユーザー認証
- [ ] 生成履歴
- [ ] Stripe決済
- [ ] MCPサーバー

## デプロイ

```bash
# Vercel
vercel --prod
```

ドメイン: ai-sn.ezoai.jp
