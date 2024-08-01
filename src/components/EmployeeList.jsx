import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=10&offset=0', {
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
      console.log('API response:', data); // Log the entire response

      // Set employees state with the data array from the response
      if (Array.isArray(data.data)) {
        setEmployees(data.data);
      } else {
        throw new Error('API response does not contain a data array');
      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'projectId': '66a9f10939e2fdc09bbba007',
          'environmentId': '66a9f10939e2fdc09bbba008',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setError('Failed to delete employee');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.name} - {employee.emp_id || 'N/A'}
              <Link to={`/employee/${employee._id}`}>View Details</Link>
              <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add">Add New Employee</Link>
    </div>
  );
};

export default EmployeeList;
