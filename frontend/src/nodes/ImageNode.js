import { Node } from './Node';
import { Handle, Position } from 'reactflow';

export const ImageNode = ({ id }) => {
  return (
    <Node id={id} label="Image Node" handles={[{ type: 'target', position: Position.Left, id: 'input' }, { type: 'source', position: Position.Right, id: 'output' }]}>
      <div>
        <label>Image URL: <input type="text" defaultValue="Enter URL..." style={{ width: '150px' }} /></label>
      </div>
    </Node>
  );
};