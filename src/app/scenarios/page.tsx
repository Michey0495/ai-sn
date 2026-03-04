import Link from "next/link";
import { PLATFORMS, SCENARIOS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "シナリオ一覧 - ビジネスシーン別SNS投稿テンプレート",
  description:
    "新商品告知、キャンペーン、採用募集など15以上のビジネスシナリオに対応。X、Instagram、LinkedIn、Facebook、noteの各プラットフォームに最適化されたSNS投稿をAIが自動生成します。",
};

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">シナリオ一覧</h1>
      <p className="text-white/60 mb-10">
        ビジネスシーンとプラットフォームの組み合わせで、最適なSNS投稿を生成します。
      </p>

      <div className="space-y-8">
        {SCENARIOS.map((scenario) => (
          <div key={scenario.id}>
            <h2 className="text-xl font-semibold text-white mb-3">
              {scenario.name}
            </h2>
            <p className="text-sm text-white/50 mb-4">{scenario.description}</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <Link
                  key={`${platform.id}-${scenario.id}`}
                  href={`/${platform.id}/${scenario.slug}`}
                  className="text-sm bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white/70 hover:text-white hover:border-pink-accent/50 transition-all duration-200 cursor-pointer"
                >
                  {platform.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
