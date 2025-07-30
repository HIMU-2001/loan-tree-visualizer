// src/utils/layout.ts
import dagre from "dagre";
import type { Node, Edge } from "reactflow";
import { Position } from "reactflow";

// Dagre layout configuration
const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;

export function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  // Create dagre graph instance
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" }); // Top to Bottom

  // Set up nodes in dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  // Set up edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run layout algorithm
  dagre.layout(dagreGraph);

  // Apply layouted positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition?.x || 0,
        y: nodeWithPosition?.y || 0,
      },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    };
  });

  return { nodes: layoutedNodes, edges };
}
