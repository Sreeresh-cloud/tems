// src/DriversList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DriversList.css';
const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10); // Keep this constant for now

  // Sample data for demonstration
  const sampleData = [
    { id: 1, licenseId: 'GBN-10140715', name: 'Blake, Claire C', licenseType: 'Non-Professional' },
    { id: 2, licenseId: 'CDM-062314', name: 'Smith, Johnny D', licenseType: 'Professional' },
    // Add more sample data as needed
  ];

  useEffect(() => {
    // Simulate fetching data
    setDrivers(sampleData);
  }, []);

  // Filtering drivers based on search term
  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDrivers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredDrivers.length / entriesPerPage);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold my-4">List of Drivers</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="entries" className="mr-2">Show</label>
          <select
            id="entries"
            className="border rounded p-1"
            value={entriesPerPage} // This is kept constant, change logic if needed
            onChange={(e) => {
              // If you want to allow changing entries per page, define a state for it
              console.log("Change entries per page: ", e.target.value);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div>
          <Link to="/drivers/new" className="bg-blue-500 text-white rounded px-4 py-2">
            + Create New
          </Link>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">License ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">License Type</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((driver, index) => (
            <tr key={driver.id}>
              <td className="border p-2">{indexOfFirstEntry + index + 1}</td>
              <td className="border p-2">{driver.licenseId}</td>
              <td className="border p-2">{driver.name}</td>
              <td className="border p-2">{driver.licenseType}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white rounded px-2 py-1">View</button>
                <button className="bg-yellow-500 text-white rounded px-2 py-1 ml-2">Edit</button>
                <button className="bg-red-500 text-white rounded px-2 py-1 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <span>Showing {indexOfFirstEntry + 1} to {indexOfLastEntry > filteredDrivers.length ? filteredDrivers.length : indexOfLastEntry} of {filteredDrivers.length} entries</span>
        <div>
          <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>Previous</button>
          <span className="mx-2">{currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DriversList;