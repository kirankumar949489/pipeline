import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const responseData = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges })
      });
      if (!responseData.ok) throw new Error(`HTTP error! status: ${responseData.status}`);
      const data = await responseData.json();
      setResponse(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting:', error.message);
      setResponse({ error: error.message });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResponse(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all nodes and edges?')) {
      onNodesChange(nodes.map(node => ({ id: node.id, type: 'remove' })));
      onEdgesChange(edges.map(edge => ({ id: edge.id, type: 'remove' })));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '20px' }}>
      <button onClick={(e) => { e.preventDefault(); handleSubmit(); }} style={{ padding: '10px 20px', margin: '0' }}>
        Submit
      </button>
      <button onClick={handleClearAll} style={{ padding: '10px 20px', margin: '0', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
        Clear All
      </button>
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            border: '2px solid #3498db', /* Styled border */
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', /* Enhanced shadow */
            width: '300px',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Result</h3>
            {response?.error ? (
              <p style={{ color: '#e74c3c' }}>Error: {response.error}</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ margin: '5px 0', color: '#2c3e50' }}>Number of Nodes: {response.num_nodes}</li>
                <li style={{ margin: '5px 0', color: '#2c3e50' }}>Number of Edges: {response.num_edges}</li>
                <li style={{ margin: '5px 0', color: '#2c3e50' }}>Is DAG: {response.is_dag ? 'Yes' : 'No'}</li>
                <li style={{ margin: '5px 0', color: response.pipeline_status.includes('Complete') ? '#27ae60' : '#e67e22' }}>
                  Pipeline Status: {response.pipeline_status}
                </li>
              </ul>
            )}
            <button onClick={closeModal} style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              marginTop: '15px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};