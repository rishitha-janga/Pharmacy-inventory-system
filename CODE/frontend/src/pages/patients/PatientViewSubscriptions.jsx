import React, { useEffect, useState } from 'react';
import config from '../../api/config'; // Axios instance

const PatientViewSubscriptions = ({ customerId }) => {


  const id = JSON.parse(localStorage.getItem("token")).id
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

  const handleBuyNow = async (plan) => {
    const payload = {
      patientId: id, // from props
      planId: plan._id,
      pricePaid: plan.price,
      paymentStatus: 'pending', // change to 'pending' if waiting for actual payment
      transactionId: `txn_${Date.now()}`
    };

    try {
      const res = await config.post('/purchase/make-payment', payload);
      alert('Subscription purchased successfully!');
    } catch (error) {
      console.error('Purchase Error:', error);
      alert('Failed to purchase subscription');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Available Subscription Plans</h2>
      {loading ? (
        <p>Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div style={cardGridStyle}>
          {subscriptions.map((sub, index) => (
            <div key={sub.id || index} style={cardStyle}>
              <h3>{sub.name}</h3>
              <p><strong>Duration:</strong> {sub.durationDays} Days</p>
              <p><strong>Price:</strong> ₹{sub.price}</p>
              <p><strong>Description:</strong> {sub.description}</p>
              <button style={subscribeBtn} onClick={() => handleBuyNow(sub)}>Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '1100px',
  margin: '40px auto',
  padding: '20px'
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '30px'
};

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#fff',
  transition: 'transform 0.2s',
  cursor: 'default'
};

const subscribeBtn = {
  marginTop: '10px',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#28a745',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default PatientViewSubscriptions;
