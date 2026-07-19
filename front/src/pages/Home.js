import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [liveEvents, setLiveEvents] = useState([]); 
  const [hoveredEvent, setHoveredEvent] = useState(null); 
  const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Dynamic Date Engine state variables
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const currentMonth = currentDate.getMonth(); 
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchLiveEvents();
  }, []);

  const fetchLiveEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/all');
      setLiveEvents(response.data);
    } catch (error) {
      console.error("Error connecting to live events endpoint:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const getEventForDate = (dayNumber) => {
    return liveEvents.find(event => {
      if (!event.date) return false;
      const [evYear, evMonth, evDay] = event.date.split('-');
      return (
        parseInt(evYear) === currentYear &&
        parseInt(evMonth) === (currentMonth + 1) &&
        parseInt(evDay) === dayNumber
      );
    });
  };

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display">
      {/* Header with Dynamic Login/Profile State */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-xl font-bold text-slate-900">UniEvents</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-[#137fec]">Home</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">Contact Us</Link>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.full_name}&background=137fec&color=fff&bold=true`} 
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
              <div className="flex gap-3">
                <Link to="/register" className="inline-flex items-center justify-center rounded-lg border border-[#137fec] px-5 py-2 text-sm font-semibold text-[#137fec] hover:bg-[#137fec]/10 transition-all">
                  Register
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center rounded-lg bg-[#137fec] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#137fec]/90 transition-all">
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center rounded-full bg-[#137fec]/10 px-3 py-1 text-sm font-medium text-[#137fec] ring-1 ring-[#137fec]/20">
                Campus Life & Events
              </div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight sm:text-6xl">
                Event Management System
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                Discover, Register, and Manage University Events Easily. Stay connected with your campus community through the latest workshops, seminars, and festivals.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-slate-200 shadow-2xl overflow-hidden">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/072/288/862/small/rock-band-performing-under-red-stage-lights-in-luxury-hotel-photo.jpg" alt="Hero" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{liveEvents.length} Active Events</p>
                    <p className="text-xs text-slate-500">Join the community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Events Display Grid */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
                <button className="text-sm font-bold text-[#137fec] hover:underline">View all</button>
              </div>
              
              {liveEvents.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-2xl border border-slate-100 font-bold text-slate-400">
                  No active events listed on the dashboard yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {liveEvents.map((event) => (
                    <div key={event.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                      <div className="relative aspect-video">
                        <img 
                          src={event.eventImage || "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=800"} 
                          alt={event.eventName} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-black text-[#137fec] uppercase tracking-wider">
                          {event.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-3 group-hover:text-[#137fec] transition-colors line-clamp-1">
                          {event.eventName}
                        </h3>
                        <div className="space-y-2 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">calendar_today</span> 
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">schedule</span> 
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">location_on</span> 
                            {event.venue}
                          </div>
                        </div>
                        {/* Passes event data object down to EventRegister context route */}
                        <Link 
                          to="/event-register" 
                          state={{ event }}
                          className="block w-full text-center mt-6 py-2.5 rounded-xl bg-[#137fec]/10 text-[#137fec] font-bold text-sm hover:bg-[#137fec] hover:text-white transition-all"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Calendar & Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">Event Calendar</h3>
                  <div className="flex gap-1 text-slate-400">
                    <span onClick={handlePrevMonth} className="material-symbols-outlined cursor-pointer select-none hover:text-slate-900 transition-colors">chevron_left</span>
                    <span onClick={handleNextMonth} className="material-symbols-outlined cursor-pointer select-none hover:text-slate-900 transition-colors">chevron_right</span>
                  </div>
                </div>
                
                <div className="text-center font-bold text-sm mb-4 text-slate-800">
                  {monthNames[currentMonth]} {currentYear}
                </div>

                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
                  <div>SU</div><div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm text-center relative">
                  {[...Array(firstDayIndex)].map((_, idx) => (
                    <div key={`empty-${idx}`} className="py-2"></div>
                  ))}

                  {[...Array(daysInMonth)].map((_, i) => {
                    const dayNum = i + 1;
                    const dayEvent = getEventForDate(dayNum);
                    
                    return (
                      <div 
                        key={`day-${dayNum}`} 
                        onMouseEnter={(e) => {
                          if (dayEvent) {
                            setHoveredEvent(dayEvent);
                            handleMouseMove(e);
                          }
                        }}
                        onMouseMove={(e) => dayEvent && handleMouseMove(e)}
                        onMouseLeave={() => setHoveredEvent(null)}
                        className={`py-2 rounded-lg transition-all relative cursor-default ${
                          dayEvent 
                            ? 'bg-[#137fec] text-white font-black shadow-sm' 
                            : 'hover:bg-slate-50 text-slate-800 font-medium'
                        }`}
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#137fec] p-8 rounded-2xl text-white shadow-lg shadow-[#137fec]/20">
                <h3 className="text-xl font-bold mb-2">Get Notified</h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">Subscribe to our newsletter for weekly event schedules directly in your inbox.</p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input className="w-full px-4 py-3 rounded-xl bg-white/10 border-none placeholder:text-white/60 text-sm focus:ring-2 focus:ring-white outline-none" placeholder="student@university.edu" type="email" required />
                  <button className="w-full py-3 bg-white text-[#137fec] font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Precision Floating Tooltip */}
      {hoveredEvent && (
        <div 
          className="fixed pointer-events-none bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-[9999] border border-slate-800 text-left max-w-xs w-64 transition-transform duration-75 ease-out"
          style={{
            left: `${mousePos.x + 15}px`, 
            top: `${mousePos.y + 15}px`   
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-[#137fec]">
              {hoveredEvent.category}
            </span>
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              {hoveredEvent.date}
            </span>
          </div>
          <h4 className="font-black text-sm text-white leading-tight mb-2">
            {hoveredEvent.eventName}
          </h4>
          <div className="space-y-1 text-[11px] text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#137fec]">schedule</span>
              {hoveredEvent.time}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#137fec]">location_on</span>
              {hoveredEvent.venue}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#137fec] p-1.5 rounded-lg text-white">
                <span className="material-symbols-outlined">school</span>
              </div>
              <span className="text-xl font-bold">UniEvents</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">The central hub for all campus activities and student engagement at Central University.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="#">All Events</Link></li>
              <li><Link to="#">Campus Map</Link></li>
              <li><Link to="#">Guidelines</Link></li>
              <li><Link to="#">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Admin</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/login">Admin Login</Link></li>
              <li><Link to="/add-event">Create Event</Link></li>
              <li><Link to="#">Analytics</Link></li>
              <li><Link to="#">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-slate-400 hover:text-[#137fec] cursor-pointer">public</span>
              <span className="material-symbols-outlined text-slate-400 hover:text-[#137fec] cursor-pointer">alternate_email</span>
              <span className="material-symbols-outlined text-slate-400 hover:text-[#137fec] cursor-pointer">groups</span>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center text-xs text-slate-400 pt-8 border-t border-slate-50">
          © 2024 UniEvents Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home; 
