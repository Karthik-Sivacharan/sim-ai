"use client";

import type { NodeProps } from "@xyflow/react";
import type { ActionNodeData } from "@/lib/workflow/types";
import { Node, NodeContent } from "@/components/ai-elements/node";
import {
  Zap,
  CheckCircle2,
  XCircle,
  EyeOff,
  AlertTriangle,
  Settings,
  Sparkles,
  Github,
  MessageSquare,
  Mail,
  CreditCard,
} from "lucide-react";

const PROVIDER_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  System: Settings,
  "AI Gateway": Sparkles,
  GitHub: Github,
  Slack: MessageSquare,
  Resend: Mail,
  Stripe: CreditCard,
};

const PROVIDER_COLORS: Record<string, string> = {
  System: "text-foreground",
  "AI Gateway": "text-amber-500",
  GitHub: "text-foreground",
  Slack: "text-foreground",
  Resend: "text-blue-500",
  Stripe: "text-purple-500",
};

export function ActionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ActionNodeData;
  const Icon = PROVIDER_ICONS[nodeData.provider] ?? Zap;
  const iconColor = PROVIDER_COLORS[nodeData.provider] ?? "text-muted-foreground";
  const hasAction = Boolean(nodeData.actionType);

  return (
    <Node
      handles={{ target: true, source: true }}
      className={`h-48 w-48 shadow-none ${selected ? "border-primary" : ""}`}
    >
      <NodeContent className="flex h-full flex-col items-center justify-center gap-3 p-6">
        {nodeData.status === "success" && (
          <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-green-500/50 p-0.5">
            <CheckCircle2 className="size-3.5 text-white" />
          </div>
        )}
        {nodeData.status === "error" && (
          <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-red-500/50 p-0.5">
            <XCircle className="size-3.5 text-white" />
          </div>
        )}
        {!nodeData.enabled && (
          <div className="absolute top-2 left-2">
            <EyeOff className="size-3.5 text-muted-foreground" />
          </div>
        )}
        <div className="relative">
          <Icon
            className={`size-12 ${hasAction ? iconColor : "text-muted-foreground"}`}
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-medium text-foreground">
            {hasAction ? nodeData.label : "Action"}
          </span>
          <span className="text-xs text-muted-foreground">
            {hasAction ? nodeData.description : "Select an action"}
          </span>
        </div>
      </NodeContent>
    </Node>
  );
}
