import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyRegistrations = () => {
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedUser = localStorage.getItem('user');
    
    if (!savedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchUserRegistrations(parsedUser.email);
    }
  }, [navigate]);

  const fetchUserRegistrations = async (studentEmail) => {
    try {
      // Adjust endpoint string to match your registration lookup API if necessary
      const response = await axios.get(`http://localhost:5000/api/registrations/student/${studentEmail}`);
      setRegisteredEvents(response.data);
    } catch (error) {
      console.error("Error fetching registration arrays:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-sans flex flex-col text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-xl font-bold text-slate-900">UniEvents</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">Home</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">Contact Us</Link>
            <Link to="/my-registrations" className="text-sm font-medium text-[#137fec]">My Registrations</Link>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.full_name || 'Student'}&background=137fec&color=fff&bold=true`} 
                  alt="Profile" 
                  className="h-9 w-9 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-black text-slate-900 leading-none">{user.full_name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all font-bold text-xs"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Panel Content Area */}
      <main className="container mx-auto max-w-5xl px-4 py-12 flex-grow">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#137fec] font-bold">My Registrations</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Reserved Spots</h1>
          <p className="text-slate-500 mt-1 font-medium">Review and track your upcoming university event schedules.</p>
        </div>

        {isLoading ? (
          <div className="text-center p-20 bg-white rounded-2xl border border-slate-200 text-slate-400 font-bold text-sm">
            Streaming entry passes...
          </div>
        ) : registeredEvents.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">confirmation_number</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Registrations Found</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">You haven't reserved any event seats yet.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#137fec] hover:bg-[#116ecf] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all">
              Explore Upcoming Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registeredEvents.map((registration) => (
              <div key={registration.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 rounded bg-blue-50 text-[#137fec] text-[9px] font-black uppercase tracking-wider">
                      {registration.Event?.category || "Category"}
                    </span>
                    <span className="text-[10px] text-green-600 font-black bg-green-50 px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-0.5 border border-green-200/40">
                      <span className="material-symbols-outlined text-xs">verified</span> Confirmed
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl tracking-tight leading-tight mb-4">
                    {registration.Event?.eventName || registration.eventName}
                  </h3>
                  
                  <div className="space-y-2 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#137fec]">calendar_today</span> 
                      {registration.Event?.date || "Date N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#137fec]">schedule</span> 
                      {registration.Event?.time || "Time N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#137fec]">location_on</span> 
                      {registration.Event?.venue || "Venue N/A"}
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#f8fafc] border-t border-slate-100 px-6 py-4 flex justify-between items-center text-[11px] text-slate-400 font-bold">
                  <span>Pass ID: #{registration.id?.toString().padStart(5, '0')}</span>
                  <span className="text-[#137fec]">View Digital Ticket →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 flex flex-col items-center gap-6 border-t border-slate-200 bg-white mt-20">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 CampusEvents University Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MyRegistrations; 
