import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <Node
      id={id}
      label="LLM Node"
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%', background: '#e74c3c' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%', background: '#e74c3c' } },
        { type: 'source', position: Position.Right, id: 'response', style: { background: '#2ecc71' } }
      ]}
    >
      <div>
        <label>System: <input type="text" defaultValue="Large Language Model" style={{ width: '150px' }} /></label>
        <label>Prompt: <input type="text" defaultValue="Enter prompt..." style={{ width: '150px' }} /></label>
        <label>Response: <input type="text" defaultValue="" style={{ width: '150px' }} /></label>
      </div>
    </Node>
  );
};