import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const LogicNode = ({ id }) => {
  return (
    <Node id={id} label="Logic" handles={[{ type: 'target', position: Position.Left, id: 'condition' }, { type: 'source', position: Position.Right, id: 'result' }]}>
      <div><span>Applies logic rules.</span></div>
    </Node>
  );
};