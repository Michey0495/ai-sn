"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLATFORMS, SCENARIOS } from "@/lib/constants";
import type { GenerateResponse } from "@/lib/types";

export function PostResults({ result }: { result: GenerateResponse }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const platformName =
    PLATFORMS.find((p) => p.id === result.platform)?.name ?? result.platform;
  const scenarioName =
    SCENARIOS.find((s) => s.id === result.scenario)?.name ?? result.scenario;

  async function copyToClipboard(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-white/10 text-white/80">
          {platformName}
        </Badge>
        <Badge variant="secondary" className="bg-white/10 text-white/80">
          {scenarioName}
        </Badge>
      </div>

      {result.posts.map((post, i) => (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/60">
              パターン {i + 1}
            </span>
            <span className="text-xs text-white/40">
              {post.characterCount}文字
            </span>
          </div>
          <p className="text-white whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
          {post.hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {post.hashtags.map((tag) => (
                <span key={tag} className="text-xs text-pink-accent/70">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(post.content, i)}
            className="mt-4 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
          >
            {copiedIndex === i ? "コピーしました" : "コピー"}
          </Button>
        </div>
      ))}
    </div>
  );
}
