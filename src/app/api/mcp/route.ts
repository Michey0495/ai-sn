import { NextRequest, NextResponse } from "next/server";
import { PLATFORMS, SCENARIOS, INDUSTRIES, TONES, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
};

function jsonrpc(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function jsonrpcError(id: string | number | null, code: number, message: string) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });
}

const TOOLS = [
  {
    name: "generate_post",
    description: "SNS投稿をAIで生成します。プラットフォーム、シナリオ、業種、トーンを指定すると3パターンの投稿を返します。",
    inputSchema: {
      type: "object",
      properties: {
        platform: {
          type: "string",
          enum: PLATFORMS.map((p) => p.id),
          description: "対象SNSプラットフォーム",
        },
        scenario: {
          type: "string",
          enum: SCENARIOS.map((s) => s.id),
          description: "ビジネスシナリオ",
        },
        industry: {
          type: "string",
          enum: INDUSTRIES.map((i) => i.id),
          description: "業種",
        },
        tone: {
          type: "string",
          enum: TONES.map((t) => t.id),
          description: "文体トーン（デフォルト: semi-casual）",
        },
        productName: {
          type: "string",
          description: "商品・サービス名（任意）",
        },
        details: {
          type: "string",
          description: "追加情報・詳細（任意）",
        },
        targetAudience: {
          type: "string",
          description: "ターゲット層（任意）",
        },
      },
      required: ["platform", "scenario", "industry"],
    },
  },
  {
    name: "list_platforms",
    description: "対応しているSNSプラットフォーム一覧を返します。",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_scenarios",
    description: "対応しているビジネスシナリオ一覧を返します。",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_industries",
    description: "対応している業種一覧を返します。",
    inputSchema: { type: "object", properties: {} },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "generate_post": {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      const data = await res.json();
      if (!res.ok) {
        return { content: [{ type: "text", text: `Error: ${data.error}` }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
    }
    case "list_platforms":
      return {
        content: [{ type: "text", text: JSON.stringify(PLATFORMS, null, 2) }],
      };
    case "list_scenarios":
      return {
        content: [{ type: "text", text: JSON.stringify(SCENARIOS, null, 2) }],
      };
    case "list_industries":
      return {
        content: [{ type: "text", text: JSON.stringify(INDUSTRIES, null, 2) }],
      };
    default:
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: JsonRpcRequest = await request.json();
    const { id, method, params } = body;

    switch (method) {
      case "initialize":
        return jsonrpc(id, {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: {
            name: SITE_NAME,
            version: "0.1.0",
            description: SITE_DESCRIPTION,
          },
        });

      case "tools/list":
        return jsonrpc(id, { tools: TOOLS });

      case "tools/call": {
        const toolName = params?.name as string;
        const toolArgs = (params?.arguments ?? {}) as Record<string, unknown>;
        const result = await handleToolCall(toolName, toolArgs);
        return jsonrpc(id, result);
      }

      default:
        return jsonrpcError(id, -32601, `Method not found: ${method}`);
    }
  } catch (e) {
    console.error("MCP error:", e);
    return jsonrpcError(null, -32700, "Parse error");
  }
}

export async function GET() {
  return NextResponse.json({
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    version: "0.1.0",
    protocol: "MCP",
    protocolVersion: "2024-11-05",
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
  });
}
