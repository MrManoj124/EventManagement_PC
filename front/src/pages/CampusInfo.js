import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CampusInfo = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const locations = [
    { name: 'Main Auditorium (Block C)', category: 'Events & Keynotes', icon: 'theater_comedy', zone: 'Academic Zone 1' },
    { name: 'ICT Lab Complex', category: 'Workshops & Hackathons', icon: 'computer', zone: 'Technology Block' },
    { name: 'University Sports Ground', category: 'Sports & Cultural Fests', icon: 'sports_soccer', zone: 'Recreation Complex' },
    { name: 'Administration Center', category: 'Helpdesk & Passes', icon: 'corporate_fare', zone: 'Main Entrance' }
  ];

  const guidelines = [
    {
      title: 'Event Entry & Verification',
      content: 'Present your digital registration pass or student ID card at the venue entrance. Entry closes 15 minutes after the scheduled start time.'
    },
    {
      title: 'Code of Conduct',
      content: 'All attendees must adhere to university discipline guidelines. Disruptive behavior or unauthorized access to restricted areas is strictly prohibited.'
    },
    {
      title: 'Cancellation Policy',
      content: 'If you cannot attend an event, please cancel your reservation via the "My Registrations" tab at least 2 hours in advance to release the seat.'
    },
    {
      title: 'Safety & Emergency Procedures',
      content: 'Follow staff instructions during emergencies. First aid stations are located in Block C and the Sports Complex.'
    }
  ];

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-sans flex flex-col text-slate-900">
      {/* Header / Navbar */}
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
            <Link to="/campus-info" className="text-sm font-medium text-[#137fec]">Campus Info & Guidelines</Link>
            
            {user && (
              <Link to="/my-registrations" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">
                My Registrations
              </Link>
            )}

            {user ? (
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
            ) : (
              <Link to="/login" className="bg-[#137fec] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#116ecf] transition-all">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12 flex-grow space-y-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#137fec] font-bold">Campus Info & Guidelines</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Campus Map & Guidelines</h1>
          <p className="text-slate-500 mt-1 font-medium">Find event locations around campus and read venue participation rules.</p>
        </div>

        {/* Section 1: Campus Map */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#137fec]/10 p-2.5 rounded-xl text-[#137fec]">
              <span className="material-symbols-outlined text-2xl">map</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Campus Layout & Venues</h2>
              <p className="text-slate-500 text-sm">Key university locations for upcoming events</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 min-h-[320px] flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80" 
                alt="Campus Map Visual" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-end p-6">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 max-w-md">
                  <p className="text-xs font-black text-[#137fec] uppercase tracking-wider mb-1">University Campus Navigation</p>
                  <p className="text-xs text-slate-600 font-medium">Use the directory list to identify venue zones and registration check-in gates.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Venue Directory</h3>
              {locations.map((loc) => (
                <div key={loc.name} className="p-4 rounded-xl border border-slate-100 bg-[#f8fafc] hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#137fec] text-2xl mt-0.5">{loc.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{loc.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{loc.category}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-[#137fec] bg-blue-100/60 px-2 py-0.5 rounded">
                      {loc.zone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Event Guidelines */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#137fec]/10 p-2.5 rounded-xl text-[#137fec]">
              <span className="material-symbols-outlined text-2xl">gavel</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Event Guidelines</h2>
              <p className="text-slate-500 text-sm">Rules and regulations for participants</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((guide, idx) => (
              <div key={guide.title} className="p-6 rounded-xl bg-[#f8fafc] border border-slate-100 flex gap-4">
                <div className="h-8 w-8 rounded-full bg-[#137fec] text-white font-black flex items-center justify-center shrink-0 text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{guide.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{guide.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 flex flex-col items-center gap-6 border-t border-slate-200 bg-white mt-12">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 CampusEvents University Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CampusInfo; 
