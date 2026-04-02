import React from 'react';
import { Link } from 'react-router-dom';

const EventRegister = () => {
  return (
    <div className="bg-[#f6f7f8] min-h-screen font-sans flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#137fec] text-white">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CampusEvents</span>
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">Home</Link>
          <Link to="/my-registrations" className="text-sm font-medium text-slate-600 hover:text-[#137fec]">My Registrations</Link>
          <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200">
            <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=e2e8f0&color=475569" alt="User" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 flex-grow">
        {/* Event Hero Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-[350px]">
            <img 
              src="https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover" 
              alt="Tech Symposium"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12">
              <span className="bg-[#137fec] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                Upcoming Event
              </span>
              <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
                Annual Tech Symposium 2024
              </h1>
              <p className="text-slate-200 max-w-2xl text-lg leading-relaxed">
                Join us for a day of innovation, networking, and industry-leading keynotes from tech visionaries.
              </p>
            </div>
          </div>

          {/* Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-4 p-6 border-r border-slate-100">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Date & Time</p>
                <p className="text-sm font-bold text-slate-800">Oct 25, 2024 • 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 border-r border-slate-100">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Venue</p>
                <p className="text-sm font-bold text-slate-800">Main Auditorium, Block C</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
                <p className="text-sm font-bold text-slate-800">500 Seats Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Registration Form</h2>
            <p className="text-slate-500 mb-10">Please confirm your details to reserve your spot at the symposium.</p>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900"
                    placeholder="Alex Johnson"
                    type="text"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Email</label>
                  <input 
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900"
                    placeholder="alex.johnson@university.edu"
                    type="email"
                  />
                </div>
                {/* Department */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
                  <select className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 appearance-none">
                    <option>Select your department</option>
                    <option>ICT</option>
                    <option>Engineering</option>
                    <option>Business</option>
                  </select>
                </div>
                {/* Batch */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year / Batch</label>
                  <select className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 appearance-none">
                    <option>Select your year</option>
                    <option>2021/2022</option>
                    <option>2022/2023</option>
                  </select>
                </div>
              </div>

              {/* Information Alert */}
              <div className="bg-[#f0f9ff] border border-blue-100 p-6 rounded-xl flex gap-4">
                <span className="material-symbols-outlined text-[#137fec]">info</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  By registering, you agree to receive event-related communications and reminders. Your student credentials will be used for attendance verification at the venue.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <p className="text-[10px] italic text-slate-400 font-bold">Limited seats available. First come, first served.</p>
                <button className="bg-[#137fec] hover:bg-[#116ecf] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#137fec]/20 transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined text-xl">person_add</span>
                  Register for Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Small Footer Icons */}
      <footer className="py-12 flex flex-col items-center gap-6">
        <div className="flex gap-8 text-slate-400">
          <span className="material-symbols-outlined hover:text-[#137fec] cursor-pointer">help</span>
          <span className="material-symbols-outlined hover:text-[#137fec] cursor-pointer">policy</span>
          <span className="material-symbols-outlined hover:text-[#137fec] cursor-pointer">share</span>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 CampusEvents University Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EventRegister;
