import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  // Fetch jobs with optional filters
  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = '/api/jobs?';
      if (filterStatus) url += `status=${filterStatus}&`;
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      const res = await axios.get(url, {
        headers: { 'x-auth-token': token },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [token]);

  const addJob = async () => {
    try {
      const res = await axios.post(
        '/api/jobs',
        { title, company, status },
        { headers: { 'x-auth-token': token } }
      );
      fetchJobs();
      setTitle('');
      setCompany('');
      setStatus('Applied');
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const downloadCSV = async () => {
    try {
      const res = await axios.get('/api/jobs/export', {
        headers: { 'x-auth-token': token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'job-applications.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>Job Dashboard</h2>

      {/* Add Job Form */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offered</option>
          <option>Rejected</option>
        </select>
        <button onClick={addJob}>Add Job</button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          placeholder="Search jobs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={fetchJobs} style={{ marginRight: '0.5rem' }}>
          Filter
        </button>
        <button onClick={downloadCSV}>Export to CSV</button>
      </div>

      {/* List of Jobs */}
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              {job.title} at {job.company} - {job.status}{' '}
              <button onClick={() => deleteJob(job._id)} style={{ marginLeft: '1rem' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default Dashboard;
