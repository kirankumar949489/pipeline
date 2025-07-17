import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const MathNode = ({ id }) => {
  return (
    <Node id={id} label="Math Node" handles={[{ type: 'target', position: Position.Left, id: 'input' }, { type: 'source', position: Position.Right, id: 'result' }]}>
      <div>
        <label>Operation: <input type="text" defaultValue="Add" style={{ width: '150px' }} /></label>
        <label>Value 1: <input type="text" defaultValue="0" style={{ width: '70px', marginLeft: '10px' }} /></label>
      </div>
    </Node>
  );
};