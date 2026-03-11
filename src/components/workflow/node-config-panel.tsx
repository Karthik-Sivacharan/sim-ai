"use client";

import { useWorkflowStore } from "@/stores/workflow-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2, Layers } from "lucide-react";
import { ActionGrid } from "@/components/workflow/action-grid";
import type { TriggerNodeData, ActionNodeData, TriggerType } from "@/lib/workflow/types";

function TriggerConfig({ nodeId, data }: { nodeId: string; data: TriggerNodeData }) {
  const { updateNodeData, deleteNode } = useWorkflowStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Trigger Type
        </label>
        <Select
          value={data.triggerType}
          onValueChange={(value) => {
            if (!value) return;
            const triggerType = value as TriggerType;
            updateNodeData(nodeId, {
              triggerType,
              label: triggerType.charAt(0).toUpperCase() + triggerType.slice(1),
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="webhook">Webhook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Label</label>
        <Input
          value={data.label}
          onChange={(e) => updateNodeData(nodeId, { label: e.target.value })}
          placeholder="Label"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Description
        </label>
        <Input
          value={data.description}
          onChange={(e) =>
            updateNodeData(nodeId, { description: e.target.value })
          }
          placeholder="Optional description"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-fit gap-1.5 text-muted-foreground"
        onClick={() => deleteNode(nodeId)}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
}

function ActionConfig({ nodeId, data }: { nodeId: string; data: ActionNodeData }) {
  const { updateNodeData, deleteNode } = useWorkflowStore();
  const hasAction = Boolean(data.actionType);

  if (!hasAction) {
    return (
      <ActionGrid
        onSelectAction={(action) =>
          updateNodeData(nodeId, {
            actionType: action.id,
            label: action.label,
            description: action.description,
            provider: action.provider,
          })
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Action</label>
        <div className="flex items-center gap-2 rounded-lg border bg-secondary px-3 py-2 text-sm">
          <span className="font-medium">{data.label}</span>
          <span className="text-muted-foreground">({data.provider})</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Label</label>
        <Input
          value={data.label}
          onChange={(e) => updateNodeData(nodeId, { label: e.target.value })}
          placeholder="Label"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Description
        </label>
        <Input
          value={data.description}
          onChange={(e) =>
            updateNodeData(nodeId, { description: e.target.value })
          }
          placeholder="Optional description"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-fit gap-1.5 text-muted-foreground"
        onClick={() => deleteNode(nodeId)}
      >
        <Trash2 className="size-4" />
        Delete
      </Button>
    </div>
  );
}

function WorkflowConfig() {
  const { workflowName, setWorkflowName, nodes, edges } =
    useWorkflowStore();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Workflow Name
        </label>
        <Input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="Workflow Name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Workflow ID
        </label>
        <Input
          value="demo-workflow-001"
          disabled
          placeholder="Workflow ID"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Layers className="size-4" />
          Clear
        </Button>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}

function CodeTab() {
  return (
    <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
      Code preview will appear here
    </div>
  );
}

function RunsTab() {
  return (
    <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
      No runs yet
    </div>
  );
}

export function NodeConfigPanel() {
  const { selectedNodeId, nodes } = useWorkflowStore();

  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  const renderProperties = () => {
    if (!selectedNode) return <WorkflowConfig />;

    const nodeData = selectedNode.data;
    if (nodeData.type === "trigger") {
      return (
        <TriggerConfig
          nodeId={selectedNode.id}
          data={nodeData as TriggerNodeData}
        />
      );
    }

    return (
      <ActionConfig
        nodeId={selectedNode.id}
        data={nodeData as ActionNodeData}
      />
    );
  };

  return (
    <Tabs defaultValue="properties">
      <TabsList variant="line" className="w-full justify-center border-b px-4">
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="runs">Runs</TabsTrigger>
      </TabsList>
      <TabsContent value="properties">{renderProperties()}</TabsContent>
      <TabsContent value="code">
        <CodeTab />
      </TabsContent>
      <TabsContent value="runs">
        <RunsTab />
      </TabsContent>
    </Tabs>
  );
}
