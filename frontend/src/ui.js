import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, addEdge, MarkerType } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { ImageNode } from './nodes/ImageNode';
import { TimerNode } from './nodes/TimerNode';
import { FilterNode } from './nodes/FilterNode';
import { LogicNode } from './nodes/LogicNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  image: ImageNode,
  timer: TimerNode,
  filter: FilterNode,
  logic: LogicNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgeUpdate: state.onEdgeUpdate,
  edgeType: state.edgeType
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect, onEdgeUpdate, edgeType } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event.dataTransfer.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData.nodeType;
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const nodeID = getNodeID(type);
      const newNode = { id: nodeID, type, position, data: getInitNodeData(nodeID, type) };
      addNode(newNode);
    }
  }, [reactFlowInstance, addNode, getNodeID]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onEdgeUpdateStart = useCallback(() => {
    // Optional: Add visual feedback
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    // Optional: Reset visual feedback
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={edgeType}
        defaultEdgeOptions={{
          type: edgeType,
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
          style: { stroke: '#3498db', strokeWidth: 2 }
        }}
        elementsSelectable={true}
        nodesConnectable={true}
        edgesUpdatable={true}
      >
        <Background color="#f5f7fa" gap={0} /> {/* Removed grid, set solid background */}
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};