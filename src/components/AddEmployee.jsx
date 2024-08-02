import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: {
      line1: '',
      city: '',
      country: '',
      zipcode: ''
    },
    contact_method: [{ type: '', value: '' }]
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    if (nameParts[0] === 'address') {
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [nameParts[1]]: value }
      }));
    } else if (nameParts[0] === 'contact_method') {
      const index = parseInt(nameParts[1], 10);
      const key = nameParts[2];
      setFormData((prevData) => {
        const newContactMethods = [...prevData.contact_method];
        newContactMethods[index][key] = value;
        return { ...prevData, contact_method: newContactMethods };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleAddContactMethod = () => {
    setFormData((prevData) => ({
      ...prevData,
      contact_method: [...prevData.contact_method, { type: '', value: '' }]
    }));
  };

  const handleRemoveContactMethod = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      contact_method: prevData.contact_method.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectId': '66a9f10939e2fdc09bbba007',
          'environmentId': '66a9f10939e2fdc09bbba008'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      navigate('/');
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address.line1" className="block text-sm font-medium text-gray-700">Address Line 1:</label>
          <input
            type="text"
            name="address.line1"
            id="address.line1"
            value={formData.address.line1}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">City:</label>
          <input
            type="text"
            name="address.city"
            id="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">Country:</label>
          <input
            type="text"
            name="address.country"
            id="address.country"
            value={formData.address.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="address.zipcode" className="block text-sm font-medium text-gray-700">Zipcode:</label>
          <input
            type="text"
            name="address.zipcode"
            id="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {formData.contact_method.map((method, index) => (
          <div key={index} className="space-y-2">
            <div>
              <label htmlFor={`contact_method.${index}.type`} className="block text-sm font-medium text-gray-700">Contact Method:</label>
              <select
                name={`contact_method.${index}.type`}
                id={`contact_method.${index}.type`}
                value={method.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="EMAIL">EMAIL</option>
                <option value="PHONE">PHONE</option>
              </select>
            </div>
            <div>
              <label htmlFor={`contact_method.${index}.value`} className="block text-sm font-medium text-gray-700">Value:</label>
              <input
                type="text"
                name={`contact_method.${index}.value`}
                id={`contact_method.${index}.value`}
                value={method.value}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {formData.contact_method.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveContactMethod(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContactMethod}
          className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700"
        >
          Add Contact Method
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
