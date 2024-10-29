import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Base URL for your API

function ConfigForm() {
  const [config, setConfig] = useState({
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setLoading(true); // Set loading state
      try {
        await axios.post(`${API_BASE_URL}/config`, config);
        alert('Configuration saved successfully!');
        setConfig({ totalTickets: '', ticketReleaseRate: '', customerRetrievalRate: '', maxTicketCapacity: '' }); // Clear form
      } catch (err) {
        setError('Error saving configuration');
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const validateInputs = () => {
    const { totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity } = config;
    if (
      isNaN(totalTickets) || totalTickets <= 0 ||
      isNaN(ticketReleaseRate) || ticketReleaseRate <= 0 ||
      isNaN(customerRetrievalRate) || customerRetrievalRate <= 0 ||
      isNaN(maxTicketCapacity) || maxTicketCapacity <= 0
    ) {
      setError('All values must be positive numbers');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="totalTickets"
        type="number"
        value={config.totalTickets}
        onChange={handleChange}
        placeholder="Total Tickets"
      />
      <input
        name="ticketReleaseRate"
        type="number"
        value={config.ticketReleaseRate}
        onChange={handleChange}
        placeholder="Ticket Release Rate"
      />
      <input
        name="customerRetrievalRate"
        type="number"
        value={config.customerRetrievalRate}
        onChange={handleChange}
        placeholder="Customer Retrieval Rate"
      />
      <input
        name="maxTicketCapacity"
        type="number"
        value={config.maxTicketCapacity}
        onChange={handleChange}
        placeholder="Max Ticket Capacity"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Configuration'}
      </button>
    </form>
  );
}

export default ConfigForm;
