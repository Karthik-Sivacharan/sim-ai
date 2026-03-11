"use client";

import { useWorkflowStore } from "@/stores/workflow-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Undo2,
  Redo2,
  Save,
  Download,
  Lock,
  Play,
} from "lucide-react";
import { nanoid } from "@/lib/workflow/utils";

export function WorkflowToolbar() {
  const { addNode, nodes, undo, redo, canUndo, canRedo } =
    useWorkflowStore();

  const handleAddNode = () => {
    const lastNode = nodes[nodes.length - 1];
    const newX = lastNode ? lastNode.position.x + 300 : 400;
    const newY = lastNode ? lastNode.position.y : 200;

    addNode({
      id: nanoid(),
      type: "action",
      position: { x: newX, y: newY },
      data: {
        type: "action",
        actionType: "",
        label: "",
        description: "",
        provider: "",
        enabled: true,
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={
            <Button variant="outline" size="icon" onClick={handleAddNode}>
              <Plus />
            </Button>
          } />
          <TooltipContent>Add Step</TooltipContent>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={
            <Button
              variant="outline"
              size="icon"
              onClick={undo}
              disabled={!canUndo()}
            >
              <Undo2 />
            </Button>
          } />
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={
            <Button
              variant="outline"
              size="icon"
              onClick={redo}
              disabled={!canRedo()}
            >
              <Redo2 />
            </Button>
          } />
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={
            <Button variant="outline" size="icon">
              <Save />
            </Button>
          } />
          <TooltipContent>Save workflow</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={
            <Button variant="outline" size="icon">
              <Download />
            </Button>
          } />
          <TooltipContent>Export workflow as code</TooltipContent>
        </Tooltip>
      </ButtonGroup>

      <Tooltip>
        <TooltipTrigger render={
          <Button variant="outline" size="icon">
            <Lock />
          </Button>
        } />
        <TooltipContent>Private workflow</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger render={
          <Button variant="default" size="icon">
            <Play />
          </Button>
        } />
        <TooltipContent>Run Workflow</TooltipContent>
      </Tooltip>
    </div>
  );
}
