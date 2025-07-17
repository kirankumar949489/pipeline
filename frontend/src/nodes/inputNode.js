import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Node } from './Node';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <Node id={id} label="Input Node" handles={[{ type: 'source', position: Position.Right, id: 'value' }]}>
      <div>
        <label>Name: 
          <select value={currName} onChange={handleNameChange} style={{ marginLeft: '5px', width: '100px' }}>
            <option value={id.replace('customInput-', 'input_')}>{id.replace('customInput-', 'input_')}</option>
            <option value="input_1">input_1</option>
            <option value="input_2">input_2</option>
          </select>
        </label>
        <label>Type: 
          <select value={inputType} onChange={handleTypeChange} style={{ marginLeft: '5px', width: '100px' }}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </Node>
  );
};