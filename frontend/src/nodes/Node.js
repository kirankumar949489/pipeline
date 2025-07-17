import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const Node = ({ id, label, handles = [], children, style = {} }) => {
  const { nodes, onNodesChange } = useStore();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${label}?`)) {
      const change = { id, type: 'remove' };
      onNodesChange([change]); // Pass the change object directly
    }
  };

  return (
    <div className="node" style={style}>
      <div className="node-header">
        {label}
        <button className="delete-button" onClick={handleDelete}>×</button>
      </div>
      <div className="node-content">{children}</div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{ ...handle.style, width: '8px', height: '8px', background: '#3498db' }}
        />
      ))}
    </div>
  );
};