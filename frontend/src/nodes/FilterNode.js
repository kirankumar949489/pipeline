import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const FilterNode = ({ id }) => {
  return (
    <Node id={id} label="Filter" handles={[{ type: 'target', position: Position.Left, id: 'input' }, { type: 'source', position: Position.Right, id: 'filtered' }]}>
      <div><span>Filters data.</span></div>
    </Node>
  );
};