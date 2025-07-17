import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Node } from './Node';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <Node id={id} label="Output Node" handles={[{ type: 'target', position: Position.Left, id: 'value' }]}>
      <div>
        <label>Name: 
          <select value={currName} onChange={handleNameChange} style={{ marginLeft: '5px', width: '100px' }}>
            <option value={id.replace('customOutput-', 'output_')}>{id.replace('customOutput-', 'output_')}</option>
            <option value="output_4">output_4</option>
          </select>
        </label>
        <label>Type: 
          <select value={outputType} onChange={handleTypeChange} style={{ marginLeft: '5px', width: '100px' }}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </Node>
  );
};