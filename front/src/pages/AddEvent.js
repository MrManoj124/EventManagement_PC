import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);

  // Security Check: Redirect if not logged in as Admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || user.email !== 'admin@university.com' || user.role !== 'admin') {
      alert("Access Denied: Admin privileges required.");
      navigate('/login');
    } else {
      setAdminUser(user);
    }
  }, [navigate]);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Prevent UI flicker while checking auth
  if (!adminUser) return null;

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display flex flex-col text-slate-900">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 lg:px-20 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">UniAdmin Portal</h2>
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="hidden sm:flex max-w-xs w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input 
              className="w-full bg-[#f0f4f8] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#137fec]/50 outline-none" 
              placeholder="Search events..." 
              type="text"
            />
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {/* Admin Profile & Logout */}
          <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
            <div className="flex items-center gap-2 text-right">
              <div className="hidden lg:block">
                <p className="text-[11px] font-black text-slate-900 leading-none uppercase tracking-tighter">Administrator</p>
                <p className="text-[10px] text-slate-400 font-medium">{adminUser.email}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#137fec]/20 border border-[#137fec]/30 overflow-hidden">
                <img 
                  alt="Admin" 
                  className="w-full h-full object-cover" 
                  src={`https://ui-avatars.com/api/?name=Admin&background=137fec&color=fff&bold=true`}
                />
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
        </div>
      </header>

      <main className="flex-1 px-6 py-10 lg:px-20 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span>Events Management</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#137fec] font-bold">Add New Event</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Event Hub</h1>
          <p className="text-slate-500 mt-1 font-medium">Configure and manage upcoming university activities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Create Event Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-8 text-[#137fec]">
                <span className="material-symbols-outlined font-bold">event_note</span>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Create New Event</h2>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Event Name</label>
                  <input 
                    className="w-full rounded-xl border-slate-200 bg-[#f8fafc] focus:ring-2 focus:ring-[#137fec] p-3.5 text-sm transition-all outline-none" 
                    placeholder="e.g. Graduate Career Fair 2024" 
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Event Image</label>
                  <div className="relative group">
                    <div className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] p-3.5 text-sm group-hover:border-[#137fec]/30 transition-all">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="material-symbols-outlined">image</span>
                        <span>Choose banner...</span>
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      <button type="button" className="bg-[#137fec] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg">Browse</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="date"/>
                  <input className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="time"/>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Venue</label>
                  <select className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none appearance-none">
                    <option>Main Auditorium</option>
                    <option>Tech Plaza</option>
                    <option>Science Block C Hall</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['Academic', 'Cultural', 'Sports', 'Workshop'].map((cat, idx) => (
                      <label key={cat} className="cursor-pointer">
                        <input className="peer sr-only" name="category" type="radio" defaultChecked={idx === 0}/>
                        <span className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 peer-checked:bg-[#137fec] peer-checked:text-white peer-checked:border-[#137fec] transition-all block text-center">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#137fec]/20 transition-all active:scale-[0.98] mt-4" 
                  type="submit"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Publish Event
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Upcoming Events List */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#137fec]">view_list</span>
                Upcoming Events List
              </h2>
              <span className="text-[10px] font-black px-4 py-1.5 bg-[#137fec]/10 text-[#137fec] rounded-md uppercase tracking-widest border border-[#137fec]/10">
                3 Active Events
              </span>
            </div>

            <div className="space-y-5">
              {[
                { name: 'Annual Tech Symposium', cat: 'Academic', date: 'Oct 15, 2024', loc: 'Innovation Lab', reg: '250 Registered', img: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=400' },
                { name: 'Harmony Night 2024', cat: 'Cultural', date: 'Oct 22, 2024', loc: 'Open Theater', reg: '1.2k Registered', img: 'https://images.unsplash.com/photo-1514525253361-bee8d48700ef?w=400' },
                { name: 'UI/UX Masterclass', cat: 'Workshop', date: 'Nov 02, 2024', loc: 'Design Studio', reg: '45 Registered', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400' }
              ].map((event, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-6 group hover:border-[#137fec]/30 transition-all">
                  <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <img alt={event.name} className="w-full h-full object-cover" src={event.img}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-[#137fec] text-[9px] font-black uppercase mb-1.5 tracking-wider">
                          {event.cat}
                        </span>
                        <h3 className="font-black text-slate-900 text-lg">{event.name}</h3>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-slate-50 rounded-xl transition-all"><span className="material-symbols-outlined text-lg">edit</span></button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><span className="material-symbols-outlined text-lg">delete</span></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-5 mt-4 text-xs font-bold text-slate-400">
                      <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span> {event.date}</div>
                      <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span> {event.loc}</div>
                      <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">group</span> {event.reg}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 py-8 bg-white text-center">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
          © 2024 University Administration Portal • Event Management Module v2.4.0
        </p>
      </footer>
    </div>
  );
};

export default AddEvent;
