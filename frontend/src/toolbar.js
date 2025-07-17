import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
  const { setEdgeType } = useStore();

  const handleEdgeTypeChange = (e) => {
    setEdgeType(e.target.value);
  };

  return (
    <div className="toolbar">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='image' label='Image' />
        <DraggableNode type='timer' label='Timer' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='logic' label='Logic' />
      </div>
      <div style={{ padding: '10px' }}>
        <label>Edge Style: 
          <select onChange={handleEdgeTypeChange} style={{ marginLeft: '5px', padding: '2px 5px' }}>
            <option value="smoothstep">Smooth</option>
            <option value="straight">Straight</option>
            <option value="bezier">Bezier</option>
          </select>
        </label>
      </div>
    </div>
  );
};