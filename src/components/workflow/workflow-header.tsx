"use client";

import { useWorkflowStore } from "@/stores/workflow-store";
import { Button } from "@/components/ui/button";
import { WorkflowToolbar } from "@/components/workflow/workflow-toolbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown, Workflow } from "lucide-react";

export function WorkflowHeader() {
  const { workflowName } = useWorkflowStore();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <Button variant="outline" size="sm" className="gap-1.5">
        <Workflow className="size-4" />
        <span className="text-sm font-medium">{workflowName}</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </Button>

      <div className="flex items-center gap-2">
        <WorkflowToolbar />
        <ThemeToggle />
      </div>
    </header>
  );
}
