import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white/60 mb-8">
        お探しのページが見つかりませんでした
      </p>
      <Button
        asChild
        size="lg"
        className="bg-pink-accent text-black hover:bg-pink-accent/90 font-semibold"
      >
        <Link href="/">トップページに戻る</Link>
      </Button>
    </div>
  );
}
