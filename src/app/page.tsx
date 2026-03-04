import { Button } from "@/components/ui/button";
import { PLATFORMS, SCENARIOS, SITE_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          AIがSNS投稿を
          <span className="text-pink-accent">即座に生成</span>
        </h1>
        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
          プラットフォームとビジネスシーンを選ぶだけ。
          各SNSの特性に最適化されたプロ品質の投稿を3パターン作成します。
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-pink-accent text-black hover:bg-pink-accent/90 font-semibold">
            <a href="/generate">無料で投稿を作成</a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/40">
          登録不要 / 1日3回まで無料
        </p>
      </section>

      {/* Platforms */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          対応プラットフォーム
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-pink-accent/50 transition-all duration-200 cursor-pointer"
            >
              <p className="text-white font-medium">{p.name}</p>
              <p className="text-xs text-white/40 mt-1">
                {p.maxLength.toLocaleString()}文字
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          15+のビジネスシナリオ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SCENARIOS.map((s) => (
            <a
              key={s.id}
              href={`/generate?scenario=${s.id}`}
              className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-pink-accent/50 transition-all duration-200 cursor-pointer"
            >
              <p className="text-sm text-white font-medium">{s.name}</p>
              <p className="text-xs text-white/40 mt-1 line-clamp-2">
                {s.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          {SITE_NAME}の特長
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "日本のビジネストーンに特化",
              desc: "敬語、季節挨拶、業種別の専門用語を自動で調整。日本のビジネス文化に最適化された投稿を生成します。",
            },
            {
              title: "3パターン同時生成",
              desc: "1回の入力で3つの異なるパターンを生成。最適な投稿を選んでワンクリックでコピーできます。",
            },
            {
              title: "5プラットフォーム対応",
              desc: "X、Instagram、LinkedIn、Facebook、noteの各プラットフォームの特性に合わせて文体・構成を最適化します。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          料金プラン
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "0",
              features: ["1日3回まで生成", "X (Twitter) のみ", "3パターン生成"],
            },
            {
              name: "Pro",
              price: "1,980",
              features: [
                "無制限生成",
                "全5プラットフォーム対応",
                "トーン詳細設定",
                "生成履歴保存",
                "投稿カレンダー提案",
              ],
              highlight: true,
            },
            {
              name: "Business",
              price: "4,980",
              features: [
                "Pro の全機能",
                "チーム利用",
                "ブランドボイス登録",
                "バッチ生成",
                "API / MCP アクセス",
              ],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-6 ${
                "highlight" in plan && plan.highlight
                  ? "bg-pink-accent/10 border-2 border-pink-accent/50"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-white">
                  ¥{plan.price}
                </span>
                <span className="text-sm text-white/40">/月</span>
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-white/60">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          SNS運用をAIで効率化しませんか？
        </h2>
        <p className="mt-4 text-white/60">
          登録不要。今すぐ無料で投稿を作成できます。
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 bg-pink-accent text-black hover:bg-pink-accent/90 font-semibold"
        >
          <a href="/generate">無料で投稿を作成</a>
        </Button>
      </section>
    </div>
  );
}
