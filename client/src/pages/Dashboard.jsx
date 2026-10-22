import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchJobs();
  }, [token, navigate]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
      setErrorMsg('');
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setErrorMsg('Could not load jobs from server. Make sure backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/jobs', 
        { company, position, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs([res.data, ...jobs]);
      setCompany('');
      setPosition('');
      setStatus('Applied');
      setErrorMsg('');
    } catch (err) {
      console.error('Failed to add job:', err);
      setErrorMsg(err.response?.data?.msg || 'Failed to add job application.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/jobs/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.map(job => job._id === id ? res.data : job));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredJobs = filter === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  const getBadgeColor = (st) => {
    switch (st) {
      case 'Applied': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Interview': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Offer': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
            JT
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
            Job Application Tracker
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold px-5 py-2 rounded-xl transition duration-150 shadow-md shadow-rose-600/30 text-sm"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {errorMsg && (
          <div className="bg-red-500/20 border-l-4 border-red-500 text-red-200 p-4 rounded-xl shadow-md text-sm backdrop-blur">
            {errorMsg}
          </div>
        )}

        {/* Add Job Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <h2 className="text-lg font-black text-cyan-300 mb-4 flex items-center">
            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-2 shadow-lg shadow-cyan-400/50"></span>
            Add New Job Application
          </h2>
          <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Company Name (e.g. Google)" 
              className="px-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-slate-400 bg-slate-900/50 font-medium shadow-inner" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required 
            />
            <input 
              type="text" 
              placeholder="Position (e.g. Software Engineer)" 
              className="px-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-slate-400 bg-slate-900/50 font-medium shadow-inner" 
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required 
            />
            <select 
              className="px-4 py-3.5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white bg-slate-900/80 font-bold shadow-inner cursor-pointer" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied" className="bg-slate-900 text-cyan-300">Applied</option>
              <option value="Interview" className="bg-slate-900 text-amber-300">Interview</option>
              <option value="Offer" className="bg-slate-900 text-emerald-300">Offer</option>
              <option value="Rejected" className="bg-slate-900 text-rose-300">Rejected</option>
            </select>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-90 text-white font-black py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition duration-200 flex items-center justify-center space-x-2"
            >
              <span>Add Application</span>
            </button>
          </form>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'All', color: 'from-slate-700 to-slate-800 text-white' },
            { name: 'Applied', color: 'from-cyan-600 to-blue-600 text-white' },
            { name: 'Interview', color: 'from-amber-600 to-orange-600 text-white' },
            { name: 'Offer', color: 'from-emerald-600 to-teal-600 text-white' },
            { name: 'Rejected', color: 'from-rose-600 to-pink-600 text-white' }
          ].map((tab) => {
            const count = tab.name === 'All' ? jobs.length : jobs.filter(j => j.status === tab.name).length;
            const isActive = filter === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setFilter(tab.name)}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-sm transition shadow-lg ${
                  isActive 
                    ? `bg-gradient-to-r ${tab.color} ring-2 ring-white/50 scale-105 shadow-xl` 
                    : 'bg-white/10 backdrop-blur text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                {tab.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Job Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-bold">Loading your applications...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg shadow-cyan-500/30">
              📂
            </div>
            <h3 className="text-lg font-bold text-slate-200">No job applications found</h3>
            <p className="text-slate-400 text-sm mt-1">Start by adding your first job application using the form above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div key={job._id} className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col justify-between hover:border-cyan-400/50 transition duration-300 group">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition line-clamp-1">{job.position}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-sm ${getBadgeColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-indigo-200 font-bold text-sm mb-4">{job.company}</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Applied: {new Date(job.createdAt).toLocaleDateString()}</span>
                  <select 
                    value={job.status} 
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    className="bg-slate-900/90 border border-white/25 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md cursor-pointer"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}