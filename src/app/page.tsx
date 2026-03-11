"use client";

import { WorkflowHeader } from "@/components/workflow/workflow-header";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";
import { ConfigPanelSidebar } from "@/components/workflow/config-panel-sidebar";

export default function WorkflowPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkflowHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <WorkflowCanvas />
        </div>
        <ConfigPanelSidebar />
      </div>
    </div>
  );
}
