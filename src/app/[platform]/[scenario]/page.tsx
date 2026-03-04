import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PLATFORMS, SCENARIOS, SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ platform: string; scenario: string }>;
};

export async function generateStaticParams() {
  const params: { platform: string; scenario: string }[] = [];
  for (const p of PLATFORMS) {
    for (const s of SCENARIOS) {
      params.push({ platform: p.id, scenario: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: platformSlug, scenario: scenarioSlug } = await params;
  const platform = PLATFORMS.find((p) => p.id === platformSlug);
  const scenario = SCENARIOS.find((s) => s.slug === scenarioSlug);

  if (!platform || !scenario) return {};

  const title = `${platform.name}の${scenario.name}投稿をAIで自動生成`;
  const description = `${platform.name}向けの${scenario.name}投稿をAIが3パターン同時に生成。${platform.maxLength.toLocaleString()}文字の制限に最適化し、ハッシュタグも自動提案。日本のビジネストーンに特化したSNS投稿ジェネレーター。`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${platform.id}/${scenario.slug}`,
    },
  };
}

export default async function PlatformScenarioPage({ params }: Props) {
  const { platform: platformSlug, scenario: scenarioSlug } = await params;
  const platform = PLATFORMS.find((p) => p.id === platformSlug);
  const scenario = SCENARIOS.find((s) => s.slug === scenarioSlug);

  if (!platform || !scenario) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-4">
        {platform.name}の{scenario.name}投稿を
        <span className="text-pink-accent">AIで自動生成</span>
      </h1>

      <p className="text-white/60 mb-8 leading-relaxed">
        {platform.name}向けの{scenario.description}投稿をAIが即座に生成します。
        {platform.maxLength.toLocaleString()}
        文字の制限に最適化し、ハッシュタグ（{platform.hashtagStyle}
        ）も自動で提案。日本のビジネストーンに特化した投稿を3パターン同時に作成します。
      </p>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          {platform.name}の投稿ポイント
        </h2>
        <ul className="space-y-2">
          <li className="text-sm text-white/60">
            最大文字数: {platform.maxLength.toLocaleString()}文字
          </li>
          <li className="text-sm text-white/60">
            ハッシュタグ: {platform.hashtagStyle}
          </li>
          {platform.features.map((f) => (
            <li key={f} className="text-sm text-white/60">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">
          こんな時に使えます
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          {scenario.description}の投稿を作成したいけれど、{platform.name}
          に合った文体やハッシュタグの使い方がわからない...そんな時に{SITE_NAME}
          が最適な投稿を生成します。業種やトーンを指定するだけで、
          プロ品質の投稿が完成します。
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="w-full bg-pink-accent text-black hover:bg-pink-accent/90 font-semibold"
      >
        <a href={`/generate?platform=${platform.id}&scenario=${scenario.id}`}>
          {platform.name}の{scenario.name}投稿を作成する
        </a>
      </Button>

      <p className="mt-4 text-center text-sm text-white/40">
        登録不要 / 1日3回まで無料
      </p>
    </div>
  );
}
