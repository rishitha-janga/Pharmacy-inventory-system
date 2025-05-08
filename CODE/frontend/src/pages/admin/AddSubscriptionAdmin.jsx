import React, { useState } from 'react';
import axios from 'axios';
import config from "../../api/config";

const AddSubscriptionAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    durationDays: '',
    price: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      durationDays: parseInt(formData.durationDays),
      price: parseFloat(formData.price),
      description: formData.description
    };

    try {
      const response = await config.post('subscribe/create-plan', payload);

      if (response.status === 200 || response.status === 201) {
        setMessage('✅ Subscription added successfully!');
        setFormData({ name: '', durationDays: '', price: '', description: '' });
      } else {
        setMessage('❌ Failed to add subscription.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error occurred while adding subscription.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Subscription Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Duration (Days):</label><br />
          <input
            type="number"
            name="durationDays"
            value={formData.durationDays}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>price (₹):</label><br />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Add Subscription
        </button>

        {message && (
          <p style={{ marginTop: '20px', color: 'green', textAlign: 'center' }}>{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddSubscriptionAdmin;
