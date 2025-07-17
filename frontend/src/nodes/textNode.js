import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Node } from './Node';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [textAreaHeight, setTextAreaHeight] = useState(20);
  const [dynamicHandles, setDynamicHandles] = useState([]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    setTextAreaHeight(e.target.scrollHeight);
  };

  useEffect(() => {
    setTextAreaHeight(20);
    const variables = currText.match(/\{\{([^}]+)\}\}/g)?.map(v => v.slice(2, -2)) || [];
    setDynamicHandles(variables.map(varName => ({
      type: 'target',
      position: Position.Left,
      id: varName,
      style: { top: `${(variables.indexOf(varName) + 1) * 33}%`, background: '#e74c3c' }
    })));
  }, [currText]);

  return (
    <Node id={id} label="Text Node" handles={[{ type: 'source', position: Position.Right, id: 'output' }, ...dynamicHandles]}>
      <div>
        <label>Text: 
          <textarea
            value={currText}
            onChange={handleTextChange}
            style={{ width: '180px', height: `${textAreaHeight}px`, resize: 'none' }}
          />
        </label>
      </div>
    </Node>
  );
};