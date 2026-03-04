import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { FeedbackWidget } from "@/components/FeedbackWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - SNS投稿AI自動生成ツール | 無料で使える`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_DESCRIPTION}X、Instagram、LinkedIn、Facebook、noteに対応。15のビジネスシナリオから選ぶだけで、各SNSに最適化された投稿文を即座に生成。登録不要・無料。`,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "SNS投稿 自動生成",
    "SNS運用 AI",
    "ビジネスSNS 投稿文",
    "Twitter投稿 テンプレート",
    "Instagram投稿 ビジネス",
    "LinkedIn投稿 日本語",
    "SNSマーケティング ツール",
    "AI 投稿文 作成",
    "企業SNS 投稿",
    "ソーシャルメディア AI",
  ],
  openGraph: {
    title: `${SITE_NAME} - SNS投稿AI自動生成ツール`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - SNS投稿AI自動生成ツール`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - SNS投稿AI自動生成ツール`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "JPY",
                  name: "Free",
                  description: "1日3回まで無料",
                },
                {
                  "@type": "Offer",
                  price: "1980",
                  priceCurrency: "JPY",
                  name: "Pro",
                  description: "無制限生成・全プラットフォーム対応",
                },
                {
                  "@type": "Offer",
                  price: "4980",
                  priceCurrency: "JPY",
                  name: "Business",
                  description: "チーム利用・API/MCPアクセス",
                },
              ],
              featureList: [
                "X (Twitter) 投稿生成",
                "Instagram 投稿生成",
                "LinkedIn 投稿生成",
                "Facebook 投稿生成",
                "note 投稿生成",
                "日本語ビジネストーン対応",
                "15のビジネスシナリオ",
                "3パターン同時生成",
                "MCP Server対応",
              ],
              inLanguage: "ja",
            }),
          }}
        />
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-white tracking-tight">
              {SITE_NAME}
            </Link>
            <nav aria-label="メインナビゲーション" className="flex gap-6 text-sm text-white/60">
              <Link href="/generate" className="hover:text-white transition-colors">
                投稿を作成
              </Link>
              <Link href="/scenarios" className="hover:text-white transition-colors">
                シナリオ一覧
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 mt-20">
          <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-white/40">
            &copy; 2026 {SITE_NAME}. All rights reserved.
          </div>
        </footer>
        <FeedbackWidget />
      </body>
    </html>
  );
}
