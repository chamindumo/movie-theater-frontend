import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VendorStatus() {
  const [tickets, setTickets] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tickets and count every 2 seconds
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
        setTicketCount(response.data.length);
      } catch (err) {
        setError('Error fetching ticket data');
      }
    };

    fetchTickets(); // Initial fetch
    const intervalId = setInterval(fetchTickets, 2000); // Fetch every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Vendor Status</h2>
      <p>Total Available Tickets: {ticketCount}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Tickets in Pool:</h3>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>Ticket {index + 1}: {JSON.stringify(ticket)}</li>
        ))}
      </ul>
    </div>
  );
}

export default VendorStatus;
