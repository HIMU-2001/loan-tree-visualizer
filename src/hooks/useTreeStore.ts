import { create } from "zustand";
import { nanoid } from "nanoid";
import type { Node, Edge } from "reactflow";
import { getLayoutedElements } from "../utils/layout";

type NodeType = "account" | "loan" | "collateral";

interface TreeStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;

  addRootNode: (type: NodeType) => void;
  addChildNode: (parent: Node, childType: NodeType) => void;
  deleteNodeAndDescendants: (nodeId: string) => void;
  selectNode: (node: Node | null) => void;
}

export const useTreeStore = create<TreeStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  addRootNode: (type) => {
    const id = nanoid();
    const label = `${type.toUpperCase()} - ${id}`;
    const newNode: Node = {
      id,
      type,
      data: { label },
      position: { x: 0, y: 0 },
    };

    const nodes = [...get().nodes, newNode];
    const layouted = getLayoutedElements(nodes, get().edges);
    set({ nodes: layouted.nodes });
  },

  addChildNode: (parent, childType) => {
    const id = nanoid();
    const label = `${childType.toUpperCase()} - ${id}`;
    const newNode: Node = {
      id,
      type: childType,
      data: { label, parentId: parent.id },
      position: { x: 0, y: 0 },
    };

    const newEdge: Edge = {
      id: `e-${parent.id}-${id}`,
      source: parent.id,
      target: id,
    };

    const nodes = [...get().nodes, newNode];
    const edges = [...get().edges, newEdge];
    const layouted = getLayoutedElements(nodes, edges);

    set({ nodes: layouted.nodes, edges: layouted.edges });
  },

  deleteNodeAndDescendants: (nodeId) => {
    const allEdges = get().edges;
    const allNodes = get().nodes;

    const getDescendants = (id: string): string[] => {
      const children = allEdges.filter((e) => e.source === id).map((e) => e.target);
      return children.flatMap((child) => [child, ...getDescendants(child)]);
    };

    const toDelete = new Set([nodeId, ...getDescendants(nodeId)]);

    const filteredNodes = allNodes.filter((n) => !toDelete.has(n.id));
    const filteredEdges = allEdges.filter(
      (e) => !toDelete.has(e.source) && !toDelete.has(e.target)
    );

    const layouted = getLayoutedElements(filteredNodes, filteredEdges);
    set({ nodes: layouted.nodes, edges: layouted.edges, selectedNode: null });
  },

  selectNode: (node) => set({ selectedNode: node }),
}));
