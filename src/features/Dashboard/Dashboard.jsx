// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import api from '../../../axiosConfig.js';


function Dashboard() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`/customers/get_all`) 
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      {customers.length > 0 ? (
        <ul>
          {customers.map(customer => (
            <li key={customer._id}>{customer.name} - {customer.email}</li>
          ))}
        </ul>
      ) : (
        <p>No customers found</p>
      )}
    </div>
  );
}

export default Dashboard;