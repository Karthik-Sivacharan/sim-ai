import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import type { WorkflowNode, WorkflowEdge } from "@/lib/workflow/types";

interface HistoryEntry {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  workflowName: string;
  history: HistoryEntry[];
  future: HistoryEntry[];

  onNodesChange: OnNodesChange<WorkflowNode>;
  onEdgesChange: OnEdgesChange<WorkflowEdge>;
  onConnect: OnConnect;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  setWorkflowName: (name: string) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNode["data"]>) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const pushHistory = (state: WorkflowState): Partial<WorkflowState> => ({
  history: [
    ...state.history,
    { nodes: structuredClone(state.nodes), edges: structuredClone(state.edges) },
  ],
  future: [],
});

const INITIAL_NODES: WorkflowNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    position: { x: 200, y: 200 },
    data: {
      type: "trigger",
      triggerType: "manual",
      label: "Manual",
      description: "Trigger",
    },
  },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: INITIAL_NODES,
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  workflowName: "Untitled 1",
  history: [],
  future: [],

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      ...pushHistory(state),
      edges: addEdge(
        { ...connection, type: "animated" },
        state.edges
      ),
    }));
  },

  setSelectedNodeId: (id) => {
    set({ selectedNodeId: id, selectedEdgeId: null });
  },

  setSelectedEdgeId: (id) => {
    set({ selectedEdgeId: id, selectedNodeId: null });
  },

  setWorkflowName: (name) => {
    set({ workflowName: name });
  },

  addNode: (node) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: [...state.nodes, node],
    }));
  },

  updateNodeData: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } as WorkflowNode["data"] }
          : node
      ) as WorkflowNode[],
    }));
  },

  deleteNode: (id) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId:
        state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  deleteEdge: (id) => {
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.filter((edge) => edge.id !== id),
      selectedEdgeId:
        state.selectedEdgeId === id ? null : state.selectedEdgeId,
    }));
  },

  undo: () => {
    const { history, nodes, edges } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: history.slice(0, -1),
      future: [{ nodes: structuredClone(nodes), edges: structuredClone(edges) }, ...get().future],
    });
  },

  redo: () => {
    const { future, nodes, edges } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(1),
      history: [...get().history, { nodes: structuredClone(nodes), edges: structuredClone(edges) }],
    });
  },

  canUndo: () => get().history.length > 0,
  canRedo: () => get().future.length > 0,
}));
