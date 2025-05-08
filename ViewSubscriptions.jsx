import React, { useEffect, useState } from 'react';
import config from '../../api/config';

const ViewSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await config.get('/subscribe/get/plans');
      setSubscriptions(response.data || []);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    try {
      await config.delete(`/subscribe/delete/plan/${id}`);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
      fetchSubscriptions();

    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Subscriptions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Duration (Days)</th>
              <th style={thStyle}>Price (₹)</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={sub.id || index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{sub.name}</td>
                <td style={tdStyle}>{sub.durationDays}</td>
                <td style={tdStyle}>{sub.price}</td>
                <td style={tdStyle}>{sub.description}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleDelete(sub._id)} style={{ ...actionBtnStyle, backgroundColor: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px'
};

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  textAlign: 'left'
};

const actionBtnStyle = {
  marginRight: '5px',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

export default ViewSubscriptions;
