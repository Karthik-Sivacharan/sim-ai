"use client";

import { WorkflowToolbar } from "@/components/workflow/workflow-toolbar";
import { UsageIndicator } from "@/components/workflow/usage-indicator";
import { ThemeToggle } from "@/components/theme-toggle";

export function WorkflowHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border-glass bg-surface-translucent backdrop-toolbar px-4">
      <UsageIndicator />
      <div className="flex items-center gap-2">
        <WorkflowToolbar />
        <ThemeToggle />
      </div>
    </header>
  );
}
