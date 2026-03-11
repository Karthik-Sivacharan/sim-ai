"use client";

import { NodeConfigPanel } from "@/components/workflow/node-config-panel";

const WIDTH = 360;

export function ConfigPanelSidebar() {
  return (
    <div
      className="absolute top-4 right-4 bottom-4 z-10 flex rounded-2xl border border-border-glass bg-surface-translucent backdrop-panel shadow-glass"
      style={{ width: WIDTH }}
    >
      <div className="flex-1 overflow-y-auto">
        <NodeConfigPanel />
      </div>
    </div>
  );
}
