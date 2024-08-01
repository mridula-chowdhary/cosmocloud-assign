import React, { useState } from 'react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: {
      line1: '',
      city: '',
      country: '',
      zipcode: ''
    },
    contact_method: [{ contact: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value }
      }));
    } else if (name === 'contact_method') {
      setFormData((prevData) => ({
        ...prevData,
        contact_method: [{ contact: value }]
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'projectId': '66a9f10939e2fdc09bbba007',
        'environmentId': '66a9f10939e2fdc09bbba008'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Address Line 1:</label>
        <input type="text" name="address.line1" value={formData.address.line1} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} required />
      </div>
      <div>
        <label>Country:</label>
        <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} required />
      </div>
      <div>
        <label>Zipcode:</label>
        <input type="text" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact:</label>
        <input type="text" name="contact_method" value={formData.contact_method[0].contact} onChange={handleChange} required />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
