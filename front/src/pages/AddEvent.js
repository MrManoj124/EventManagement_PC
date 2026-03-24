import React from 'react';

const AddEvent = () => {
  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen font-display flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-slate-900 px-6 py-3 lg:px-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">UniAdmin Portal</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-[#137fec] text-sm font-medium" href="#">Dashboard</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-[#137fec] text-sm font-medium" href="#">Users</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="hidden sm:flex max-w-xs w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50" placeholder="Search events..." type="text"/>
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 overflow-hidden">
            <img alt="Admin Profile" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Admin&background=137fec&color=fff"/>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 lg:px-20 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span>Events Management</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#137fec] font-medium">Add New Event</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Event Hub</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Configure and manage upcoming university activities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-6 text-[#137fec]">
                <span className="material-symbols-outlined">event_note</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Event</h2>
              </div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Event Name</label>
                  <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-[#137fec] focus:border-[#137fec] text-sm" placeholder="e.g. Graduate Career Fair 2024" type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date</label>
                    <div className="relative">
                      <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-[#137fec] focus:border-[#137fec] text-sm" type="date"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Time</label>
                    <div className="relative">
                      <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-[#137fec] focus:border-[#137fec] text-sm" type="time"/>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Venue</label>
                  <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-[#137fec] focus:border-[#137fec] text-sm">
                    <option>Main Auditorium</option>
                    <option>Tech Plaza</option>
                    <option>Science Block C Hall</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['Academic', 'Cultural', 'Sports', 'Workshop'].map((cat, idx) => (
                      <label key={cat} className="cursor-pointer">
                        <input className="peer sr-only" name="category" type="radio" defaultChecked={idx === 0}/>
                        <span className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-medium peer-checked:bg-[#137fec] peer-checked:text-white peer-checked:border-[#137fec] block">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                  <textarea className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-[#137fec] focus:border-[#137fec] text-sm" placeholder="Briefly describe the event..." rows="4"></textarea>
                </div>
                <button className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#137fec]/20" type="submit">
                  <span className="material-symbols-outlined">add_circle</span> Publish Event
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#137fec]">view_list</span> Upcoming Events List
              </h2>
              <span className="text-xs font-semibold px-2 py-1 bg-[#137fec]/10 text-[#137fec] rounded-md uppercase tracking-wider">3 Active Events</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Annual Tech Symposium', cat: 'Academic', date: 'Oct 15, 2024', loc: 'Innovation Lab', reg: '250 Registered', img: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=200' },
                { name: 'Harmony Night 2024', cat: 'Cultural', date: 'Oct 22, 2024', loc: 'Open Theater', reg: '1.2k Registered', img: 'https://images.unsplash.com/photo-1514525253361-bee8d48700ef?w=200' },
                { name: 'UI/UX Masterclass', cat: 'Workshop', date: 'Nov 02, 2024', loc: 'Design Studio', reg: '45 Registered', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=200' }
              ].map((event, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                  <img src={event.img} className="w-24 h-24 rounded-lg object-cover bg-slate-100" alt={event.name}/>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-[#137fec] text-[10px] font-bold rounded uppercase mb-1">{event.cat}</span>
                        <h3 className="font-bold text-slate-900 dark:text-white">{event.name}</h3>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-[#137fec] rounded-lg"><span className="material-symbols-outlined text-xl">edit</span></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"><span className="material-symbols-outlined text-xl">delete</span></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> {event.date}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {event.loc}</div>
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> {event.reg}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">add_task</span>
                <p className="text-sm font-medium text-slate-500">More events on the calendar?</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 py-6 bg-white text-center">
        <p className="text-slate-500 text-sm">© 2024 University Administration Portal • Event Management Module v2.4.0</p>
      </footer>
    </div>
  );
};

export default AddEvent;
