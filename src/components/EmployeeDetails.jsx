import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        headers: {
          'projectId': '66a9f10939e2fdc09bbba007',
          'environmentId': '66a9f10939e2fdc09bbba008',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Employee details:', data);

      setEmployee(data);
    } catch (err) {
      console.error('Failed to fetch employee details:', err);
      setError('Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'projectId': '66a9f10939e2fdc09bbba007',
          'environmentId': '66a9f10939e2fdc09bbba008',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/');
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setError('Failed to delete employee');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!employee) {
    return <p className="text-center text-gray-500">No employee details available</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Employee ID:</strong> {employee.emp_id || employee._id}</p>
        <p><strong>Address:</strong></p>
        <ul className="list-disc list-inside">
          <li>Line1: {employee.address.line1}</li>
          <li>City: {employee.address.city}</li>
          <li>Country: {employee.address.country}</li>
          <li>Zip Code: {employee.address.zipcode}</li>
        </ul>
      </div>
      <div className="mb-4">
        <p><strong>Contact Methods:</strong></p>
        <ul className="list-disc list-inside">
          {employee.contact_method.map((method, index) => (
            <li key={index}>{method.type}: {method.value}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Back to Employee List</Link>
        <button
          onClick={deleteEmployee}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Delete Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
