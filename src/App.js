import React from 'react';
import ConfigForm from './configfrom.js';
import VendorStatus from './vendorStatus.js'; // Import VendorStatus

function App() {
  return (
    <div>
      <h1>Ticket Management System</h1>
      <ConfigForm />
      <VendorStatus /> {/* Display vendor status */}
    </div>
  );
}

export default App;
