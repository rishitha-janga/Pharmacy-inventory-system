import React, { useEffect, useState } from 'react';
import config from '../../api/config';

const CustomerSubscriptions = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerId = JSON.parse(localStorage.getItem('token'))?.id;

  useEffect(() => {
    if (customerId) {
      fetchCustomerSubscriptions();
    }
  }, [customerId]);

  const fetchCustomerSubscriptions = async () => {
    try {
      const response = await config.get(`/purchase/get/payment/${customerId}`);
      setPurchases(response.data || []);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🧾 Your Subscriptions</h2>

      {loading ? (
        <p style={infoText}>Loading your subscriptions...</p>
      ) : purchases.length === 0 ? (
        <p style={infoText}>You haven’t purchased any subscriptions yet.</p>
      ) : (
        <div style={cardGridStyle}>
          {purchases.map((item, index) => (
            <div key={item.transactionId || index} style={cardStyle}>
              <h3 style={planName}>{item.planId?.name}</h3>
              <p style={tag}><strong>₹{item.pricePaid}</strong> / {item.planId?.durationDays} Days</p>
              <p style={description}>{item.planId?.description || 'No description provided.'}</p>
              <hr />
              <p><strong>Status:</strong> <span style={{ color: item.paymentStatus === 'success' ? 'green' : 'red' }}>{item.paymentStatus}</span></p>
              <p><strong>Txn ID:</strong> {item.transactionId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Compact Styles
const containerStyle = {
    maxWidth: '1000px',
    margin: '20px auto',
    padding: '10px'
  };
  
  const headingStyle = {
    textAlign: 'center',
    fontSize: '22px',
    marginBottom: '10px',
    color: '#333'
  };
  
  const infoText = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666'
  };
  
  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px'
  };
  
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };
  
  const planName = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '2px'
  };
  
  const tag = {
    backgroundColor: '#e7f1ff',
    padding: '2px 6px',
    borderRadius: '4px',
    display: 'inline-block',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '6px'
  };
  
  const description = {
    fontSize: '13px',
    color: '#444',
    marginBottom: '4px'
  };
  

export default CustomerSubscriptions;
