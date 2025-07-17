import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const TimerNode = ({ id }) => {
  return (
    <Node id={id} label="Timer" handles={[{ type: 'source', position: Position.Right, id: 'time' }]}>
      <div><span>Tracks time.</span></div>
    </Node>
  );
};