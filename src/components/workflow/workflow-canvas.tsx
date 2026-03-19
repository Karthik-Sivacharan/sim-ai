"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import type { NodeTypes, EdgeTypes, NodeMouseHandler, Node } from "@xyflow/react";
import { ReactFlowProvider } from "@xyflow/react";
import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import { Connection } from "@/components/ai-elements/connection";
import { useWorkflowStore } from "@/stores/workflow-store";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { TriggerNode } from "@/components/workflow/nodes/trigger-node";
import { ActionNode } from "@/components/workflow/nodes/action-node";

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

const edgeTypes: EdgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

function WorkflowCanvasInner({ children }: { children?: ReactNode }) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    setSelectedEdgeId,
    setConfigPanelOpen,
  } = useWorkflowStore();

  const isMobile = useIsMobile();

  const handleNodeClick: NodeMouseHandler<Node> = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
      if (isMobile) {
        setConfigPanelOpen(true);
      }
    },
    [setSelectedNodeId, isMobile, setConfigPanelOpen]
  );

  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: { id: string }) => {
      setSelectedEdgeId(edge.id);
    },
    [setSelectedEdgeId]
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, [setSelectedNodeId, setSelectedEdgeId]);

  const defaultEdgeOptions = useMemo(
    () => ({ type: "animated" as const }),
    []
  );

  return (
    <>
      <Canvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange as never}
        onEdgesChange={onEdgesChange as never}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onPaneClick={handlePaneClick}
        connectionLineComponent={Connection}
        defaultEdgeOptions={defaultEdgeOptions}
        panOnDrag
        /* On mobile: disable selection-on-drag so touch pan works naturally */
        selectionOnDrag={!isMobile}
      />
      {children}
    </>
  );
}

export function WorkflowCanvas({ children }: { children?: ReactNode }) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner>{children}</WorkflowCanvasInner>
    </ReactFlowProvider>
  );
}
