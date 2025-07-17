import { createWithEqualityFn } from "zustand/traditional";
import { addEdge, applyNodeChanges, applyEdgeChanges, updateEdge, MarkerType } from 'reactflow';

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  edgeType: 'smoothstep', // Default edge type
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({
    edges: addEdge({
      ...connection,
      type: get().edgeType,
      animated: true,
      markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
      style: { stroke: '#3498db', strokeWidth: 2 }
    }, get().edges)
  }),
  onEdgeUpdate: (oldEdge, newConnection) => set({
    edges: updateEdge(oldEdge, newConnection, get().edges)
  }),
  updateNodeField: (nodeId, fieldName, fieldValue) => set({
    nodes: get().nodes.map((node) => {
      if (node.id === nodeId) node.data = { ...node.data, [fieldName]: fieldValue };
      return node;
    })
  }),
  setEdgeType: (type) => set({ edgeType: type })
}));