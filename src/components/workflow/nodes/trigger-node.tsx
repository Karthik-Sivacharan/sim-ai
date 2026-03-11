"use client";

import type { NodeProps } from "@xyflow/react";
import type { TriggerNodeData } from "@/lib/workflow/types";
import { Node, NodeContent } from "@/components/ai-elements/node";
import { Play, Clock, Webhook, CheckCircle2, XCircle } from "lucide-react";

const TRIGGER_ICONS = {
  manual: Play,
  schedule: Clock,
  webhook: Webhook,
} as const;

export function TriggerNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TriggerNodeData;
  const Icon = TRIGGER_ICONS[nodeData.triggerType];

  return (
    <Node
      handles={{ target: false, source: true }}
      className={`h-48 w-48 shadow-none ${selected ? "border-primary" : ""}`}
    >
      <NodeContent className="flex h-full flex-col items-center justify-center gap-3 p-6">
        <div className="relative">
          <Icon className="size-12 text-blue-500" strokeWidth={1.5} />
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
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-medium text-foreground">
            {nodeData.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {nodeData.description}
          </span>
        </div>
      </NodeContent>
    </Node>
  );
}
