import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddEvent = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [venuesList, setVenuesList] = useState([]); 
  const [newVenueInput, setNewVenueInput] = useState(''); 
  const [isAddingVenue, setIsAddingVenue] = useState(false); 

  // Creation Form State
  const [formData, setFormData] = useState({
    eventName: '',
    eventImage: '', 
    date: '',
    time: '',
    venue: '', 
    category: 'Academic'
  });

  // Modal Editing Window States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState({
    id: '',
    eventName: '',
    eventImage: '',
    date: '',
    time: '',
    venue: '',
    category: 'Academic'
  });

  // Security Verification & Initial Fetch
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'admin@university.com' || user.role !== 'admin') {
      alert("Access Denied: Admin privileges required.");
      navigate('/login');
    } else {
      setAdminUser(user);
      loadDashboardData();
    }
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // 1. Fetch venues baseline
      const venuesResponse = await axios.get('http://localhost:5000/api/venues/all');
      setVenuesList(venuesResponse.data);
      
      // 2. Initialize dynamic form selection safely
      if (venuesResponse.data.length > 0) {
        setFormData(prev => ({ ...prev, venue: venuesResponse.data[0].venueName }));
      }

      // 3. Fetch current events list
      const eventsResponse = await axios.get('http://localhost:5000/api/events/all');
      setEventsList(eventsResponse.data);
    } catch (error) {
      console.error("Error connecting to database collections:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/all');
      setEventsList(response.data);
    } catch (error) {
      console.error("Error fetching events list:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
  };

  // Safe client-side response object matching
  const handleAddNewVenue = async () => {
    if (!newVenueInput.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/venues/add', { 
        venueName: newVenueInput.trim() 
      });
      
      if (response.status === 201) {
        alert("Venue added to system dropdown filters.");
        setNewVenueInput('');
        setIsAddingVenue(false);
        
        // Fetch fresh dropdown array options
        const updatedResponse = await axios.get('http://localhost:5000/api/venues/all');
        setVenuesList(updatedResponse.data);
        
        // Set the state dynamically matching verified response properties safely
        if (response.data && response.data.venue) {
          setFormData(prev => ({ ...prev, venue: response.data.venue.venueName }));
        }
      }
    } catch (error) {
      // Extract exact database collision messages out to the user interface
      alert(error.response?.data?.error || "Failed to parse backend data array rows.");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/events/add', formData);
      if (response.status === 201) {
        alert("Event published successfully!");
        setFormData({
          eventName: '',
          eventImage: '',
          date: '',
          time: '',
          venue: venuesList[0]?.venueName || '',
          category: 'Academic'
        });
        fetchEvents(); 
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to publish event. Verify server connection.");
    }
  };

  const startEditing = (event) => {
    setEditingEvent({
      id: event.id,
      eventName: event.eventName,
      eventImage: event.eventImage || '',
      date: event.date,
      time: event.time,
      venue: event.venue || (venuesList[0]?.venueName || ''),
      category: event.category
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${editingEvent.id}`, editingEvent);
      if (response.status === 200) {
        alert("Event updated successfully!");
        setIsEditModalOpen(false);
        fetchEvents(); 
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update target row data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      alert("Error removing the event record from database.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!adminUser) return null;

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display flex flex-col text-slate-900 relative">
      {/* Header View Area Layout */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 lg:px-20 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">UniAdmin Portal</h2>
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-6 items-center">
          <Link to="/" className="text-xs font-bold text-slate-500 hover:text-[#137fec] transition-colors flex items-center gap-1 uppercase tracking-wider pr-2">
            <span className="material-symbols-outlined text-sm">home</span>
            Home
          </Link>

          <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
            <div className="flex items-center gap-2 text-right">
              <div className="hidden lg:block">
                <p className="text-[11px] font-black text-slate-900 leading-none uppercase tracking-tighter">Administrator</p>
                <p className="text-[10px] text-slate-400 font-medium">{adminUser.email}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#137fec]/20 border border-[#137fec]/30 overflow-hidden">
                <img alt="Admin" className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=Admin&background=137fec&color=fff&bold=true`}/>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all font-bold text-xs">
              <span className="material-symbols-outlined text-sm">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10 lg:px-20 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb Module */}
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
          {/* Creation Side Area Column Panel Grid */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-8 text-[#137fec]">
                <span className="material-symbols-outlined font-bold">event_note</span>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Create New Event</h2>
              </div>

              <form className="space-y-5" onSubmit={handlePublish}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Event Name</label>
                  <input name="eventName" value={formData.eventName} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] focus:ring-2 focus:ring-[#137fec] p-3.5 text-sm transition-all outline-none" placeholder="e.g. Graduate Career Fair 2024" type="text" required />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Event Image URL</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">image</span>
                    <input name="eventImage" value={formData.eventImage} onChange={handleInputChange} className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] focus:ring-2 focus:ring-[#137fec] pl-10 pr-4 py-3.5 text-sm transition-all outline-none text-slate-900 placeholder:text-slate-400" placeholder="https://example.com/banner.jpg" type="url" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Date</label>
                    <input name="date" value={formData.date} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="date" required/>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Time</label>
                    <input name="time" value={formData.time} onChange={handleInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="time" required/>
                  </div>
                </div>

                {/* Interactive Dynamic Location selector field element */}
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="block text-sm font-bold text-slate-700">Venue</label>
                    <button 
                      type="button" 
                      onClick={() => setIsAddingVenue(!isAddingVenue)}
                      className="text-xs font-bold text-[#137fec] hover:underline flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-xs">{isAddingVenue ? 'close' : 'add'}</span>
                      {isAddingVenue ? 'Cancel' : 'Add New Venue'}
                    </button>
                  </div>

                  {isAddingVenue ? (
                    <div className="flex gap-2 animate-fadeIn">
                      <input 
                        type="text"
                        value={newVenueInput}
                        onChange={(e) => setNewVenueInput(e.target.value)}
                        placeholder="Enter location name..."
                        className="flex-1 rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#137fec]"
                      />
                      <button 
                        type="button"
                        onClick={handleAddNewVenue}
                        className="bg-[#137fec] text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-[#116ecf] transition-all"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <select 
                        name="venue" 
                        value={formData.venue} 
                        onChange={handleInputChange} 
                        className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none appearance-none focus:ring-2 focus:ring-[#137fec]"
                        required
                      >
                        {venuesList.map((v) => (
                          <option key={v.id} value={v.venueName}>{v.venueName}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['Academic', 'Cultural', 'Sports', 'Workshop'].map((cat) => (
                      <label key={cat} className="cursor-pointer">
                        <input className="peer sr-only" name="category" type="radio" value={cat} checked={formData.category === cat} onChange={handleInputChange} />
                        <span className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 peer-checked:bg-[#137fec] peer-checked:text-white peer-checked:border-[#137fec] transition-all block text-center">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#137fec]/20 transition-all active:scale-[0.98] mt-4" type="submit">
                  <span className="material-symbols-outlined">add_circle</span>
                  Publish Event
                </button>
              </form>
            </div>
          </div>

          {/* Right Layout Display Column: Interactive Events List */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#137fec]">view_list</span>
                Upcoming Events List
              </h2>
              <span className="text-[10px] font-black px-4 py-1.5 bg-[#137fec]/10 text-[#137fec] rounded-md uppercase tracking-widest border border-[#137fec]/10">
                {eventsList.length} Active Events
              </span>
            </div>

            <div className="space-y-4">
              {eventsList.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-2xl border border-slate-200 text-slate-400 font-medium text-sm">
                  No active events built yet. Populate the form to create one.
                </div>
              ) : (
                eventsList.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-[#137fec]/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-[#137fec] text-[9px] font-black uppercase mb-2 tracking-wider">
                          {event.category}
                        </span>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight leading-none group-hover:text-[#137fec] transition-colors">
                          {event.eventName}
                        </h3>
                      </div>
                      
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEditing(event)} className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-slate-50 rounded-xl transition-all">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#137fec]">calendar_today</span> 
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#137fec]">location_on</span> 
                        {event.venue}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#137fec]">schedule</span> 
                        {event.time}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Form Popup Modal Overlay */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xl max-w-lg w-full transform transition-all relative">
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#137fec]">
                <span className="material-symbols-outlined font-bold">edit_note</span>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Modify Event Data</h2>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleUpdateEvent}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Event Name</label>
                <input name="eventName" value={editingEvent.eventName} onChange={handleEditInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] focus:ring-2 focus:ring-[#137fec] p-3.5 text-sm outline-none" type="text" required />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Event Image URL</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">image</span>
                  <input name="eventImage" value={editingEvent.eventImage} onChange={handleEditInputChange} className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] focus:ring-2 focus:ring-[#137fec] pl-10 pr-4 py-3.5 text-sm transition-all outline-none" type="url" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Date</label>
                  <input name="date" value={editingEvent.date} onChange={handleEditInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="date" required/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Time</label>
                  <input name="time" value={editingEvent.time} onChange={handleEditInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none" type="time" required/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Venue</label>
                <select name="venue" value={editingEvent.venue} onChange={handleEditInputChange} className="w-full rounded-xl border-slate-200 bg-[#f8fafc] p-3.5 text-sm outline-none">
                  {venuesList.map((v) => (
                    <option key={v.id} value={v.venueName}>{v.venueName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['Academic', 'Cultural', 'Sports', 'Workshop'].map((cat) => (
                    <label key={cat} className="cursor-pointer">
                      <input className="peer sr-only" name="category" type="radio" value={cat} checked={editingEvent.category === cat} onChange={handleEditInputChange} />
                      <span className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 peer-checked:bg-[#137fec] peer-checked:text-white peer-checked:border-[#137fec] transition-all block text-center">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl text-sm">Cancel</button>
                <button type="submit" className="w-2/3 bg-[#137fec] text-white font-black py-3.5 rounded-xl shadow-lg shadow-[#137fec]/20 text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="mt-auto border-t border-slate-200 py-8 bg-white text-center">
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
          © 2024 University Administration Portal • Event Management Module v2.4.0
        </p>
      </footer>
    </div>
  );
};

export default AddEvent; 
