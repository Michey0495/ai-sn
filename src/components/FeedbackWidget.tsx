"use client";

import { useState } from "react";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "other">("bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message }),
      });
      setSent(true);
      setTimeout(() => {
        setOpen(false);
        setSent(false);
        setMessage("");
      }, 2000);
    } catch {
      alert("送信に失敗しました");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-white/10 text-white/70 px-4 py-2 rounded-full shadow-lg hover:bg-white/20 hover:text-white transition-all duration-200 text-sm z-50 border border-white/10"
      >
        フィードバック
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black border border-white/20 rounded-xl shadow-2xl p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-white">フィードバック</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-white/40 hover:text-white transition-colors text-lg"
        >
          &times;
        </button>
      </div>
      {sent ? (
        <p className="text-pink-400 text-center py-4">
          送信しました。ありがとうございます
        </p>
      ) : (
        <>
          <div className="flex gap-2 mb-3">
            {(["bug", "feature", "other"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                  type === t
                    ? "bg-pink-400/20 text-pink-400 border border-pink-400/40"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                }`}
              >
                {t === "bug" ? "不具合" : t === "feature" ? "要望" : "その他"}
              </button>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご意見をお聞かせください..."
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm h-24 resize-none mb-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          />
          <button
            onClick={submit}
            disabled={!message.trim()}
            className="w-full bg-pink-400/20 text-pink-400 py-2 rounded-lg text-sm hover:bg-pink-400/30 transition-all duration-200 border border-pink-400/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            送信
          </button>
        </>
      )}
    </div>
  );
}
