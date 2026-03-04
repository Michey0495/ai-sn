export const SITE_NAME = "PostPilot AI";
export const SITE_DESCRIPTION =
  "AIがSNS投稿を自動生成。プラットフォームとビジネスシーンを選ぶだけで、プロ品質の投稿を3パターン即座に作成。";
export const SITE_URL = "https://ai-sn.ezoai.jp";
export const ACCENT_COLOR = "#f472b6";

export type Platform = {
  id: string;
  name: string;
  maxLength: number;
  hashtagStyle: string;
  features: string[];
};

export const PLATFORMS: Platform[] = [
  {
    id: "twitter",
    name: "X (Twitter)",
    maxLength: 280,
    hashtagStyle: "2-3個、末尾に配置",
    features: ["短文", "ハッシュタグ", "改行少なめ"],
  },
  {
    id: "instagram",
    name: "Instagram",
    maxLength: 2200,
    hashtagStyle: "10-15個、投稿末尾にまとめて配置",
    features: ["キャプション", "ハッシュタグ多め", "改行多め"],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    maxLength: 3000,
    hashtagStyle: "3-5個、末尾に配置",
    features: ["ビジネストーン", "段落構成", "CTA"],
  },
  {
    id: "facebook",
    name: "Facebook",
    maxLength: 63206,
    hashtagStyle: "1-3個、控えめに使用",
    features: ["中長文", "親しみやすいトーン", "リンク共有"],
  },
  {
    id: "note",
    name: "note",
    maxLength: 100000,
    hashtagStyle: "3-5個、タイトル下に配置",
    features: ["長文記事", "見出し構成", "導入文重視"],
  },
];

export type Scenario = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

export const SCENARIOS: Scenario[] = [
  { id: "new-product", name: "新商品・サービス告知", description: "新しい商品やサービスのリリースを告知", slug: "new-product" },
  { id: "campaign", name: "キャンペーン・セール", description: "期間限定キャンペーンやセールの告知", slug: "campaign" },
  { id: "recruitment", name: "採用募集", description: "求人・採用情報の発信", slug: "recruitment" },
  { id: "event", name: "イベント告知", description: "セミナー、展示会、イベントの告知", slug: "event" },
  { id: "testimonial", name: "お客様の声", description: "顧客レビューや導入事例の紹介", slug: "testimonial" },
  { id: "tips", name: "Tips・ノウハウ共有", description: "業界の知見やTipsを共有", slug: "tips" },
  { id: "industry-news", name: "業界ニュース", description: "業界の最新ニュースやトレンドを解説", slug: "industry-news" },
  { id: "company-intro", name: "会社・サービス紹介", description: "自社や事業の紹介", slug: "company-intro" },
  { id: "achievement", name: "実績報告", description: "成果や実績の報告", slug: "achievement" },
  { id: "announcement", name: "お知らせ", description: "営業時間変更、メンテナンスなどの告知", slug: "announcement" },
  { id: "greeting", name: "季節の挨拶", description: "年始、年度始め、お盆など季節の挨拶", slug: "greeting" },
  { id: "collaboration", name: "コラボ・提携告知", description: "他社とのコラボや業務提携の告知", slug: "collaboration" },
  { id: "seminar", name: "セミナー集客", description: "セミナーやウェビナーへの参加を促す", slug: "seminar" },
  { id: "media", name: "メディア掲載報告", description: "メディアへの掲載や取材報告", slug: "media" },
  { id: "daily", name: "日常発信", description: "日々の業務や社内の様子を発信", slug: "daily" },
];

export type Industry = {
  id: string;
  name: string;
};

export const INDUSTRIES: Industry[] = [
  { id: "restaurant", name: "飲食" },
  { id: "retail", name: "小売" },
  { id: "it", name: "IT・Web" },
  { id: "beauty", name: "美容" },
  { id: "construction", name: "建設" },
  { id: "medical", name: "医療" },
  { id: "education", name: "教育" },
  { id: "real-estate", name: "不動産" },
  { id: "professional", name: "士業" },
  { id: "manufacturing", name: "製造" },
  { id: "other", name: "その他" },
];

export type Tone = {
  id: string;
  name: string;
  description: string;
};

export const TONES: Tone[] = [
  { id: "formal", name: "フォーマル", description: "丁寧語・敬語を使用した格式高い文体" },
  { id: "semi-casual", name: "ややカジュアル", description: "です・ます調をベースにした親しみやすい文体" },
  { id: "casual", name: "カジュアル", description: "気軽で砕けた文体" },
  { id: "friendly", name: "親しみやすい", description: "温かみのある、距離の近い文体" },
];

export const FREE_DAILY_LIMIT = 3;
