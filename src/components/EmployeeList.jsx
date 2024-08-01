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
      console.log('API response:', data);

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
        },
        body: JSON.stringify({}) // Sending an empty body
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
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Employee List</h1>
      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No Employees in the system</p>
      ) : (
        <ul className="space-y-4">
          {employees.map((employee) => (
            <li key={employee._id} className="p-6 bg-white rounded-lg shadow flex justify-between items-center border border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-800">{employee.name}</p>
                <p className="text-sm text-gray-500">Employee ID: {employee.emp_id ||  employee._id}</p>
              </div>
              <div className="flex space-x-4">
                <Link to={`/employee/${employee._id}`} className="text-blue-600 hover:text-blue-800">View Details</Link>
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center mt-8">
        <Link to="/add-employee" className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300">Add New Employee</Link>
      </div>
    </div>
  );
};

export default EmployeeList;
