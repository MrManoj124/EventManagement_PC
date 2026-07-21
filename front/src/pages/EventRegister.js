import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Notification Modal Overlay State
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const passedEvent = location.state?.event;

  const currentEvent = {
    id: passedEvent?.id || null,
    eventName: passedEvent?.eventName || "Annual Tech Symposium 2024",
    category: passedEvent?.category || "Upcoming Event",
    date: passedEvent?.date || "Oct 25, 2024",
    time: passedEvent?.time || "10:00 AM",
    venue: passedEvent?.venue || "Main Auditorium, Block C",
    eventImage: passedEvent?.eventImage || "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&w=1200&q=80"
  };

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Applied Science',
    batch: '2021/2022'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      setFormData(prev => ({
        ...prev,
        fullName: parsed.full_name || '',
        email: parsed.email || ''
      }));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Please ensure your full name and university email are provided.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        department: formData.department,
        batch: formData.batch,
        eventId: currentEvent.id,
        eventName: currentEvent.eventName,
        eventCategory: currentEvent.category,
        eventDate: currentEvent.date,
        eventTime: currentEvent.time,
        eventVenue: currentEvent.venue
      };

      const response = await axios.post('http://localhost:5000/api/registrations/add', payload);
      
      if (response.status === 201) {
        setSuccessModal({
          isOpen: true,
          title: "Registration Confirmed!",
          message: `You have successfully registered for "${currentEvent.eventName}". Your ticket is saved under My Registrations.`
        });
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to process event registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismissModal = () => {
    setSuccessModal({ isOpen: false, title: '', message: '' });
    navigate('/my-registrations');
  };

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
          <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-200">
            <img src={`https://ui-avatars.com/api/?name=${currentUser?.full_name || 'User'}&background=137fec&color=fff&bold=true`} alt="User" />
          </div>
        </nav>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 flex-grow">
        {/* Dynamic Event Hero Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="relative h-[350px]">
            <img 
              src={currentEvent.eventImage} 
              className="w-full h-full object-cover" 
              alt={currentEvent.eventName}
            />
            <div 
              style={{
                backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/049/484/649/small/blurred-crowd-at-a-concert-with-stage-lights-photo.jpg")'
              }}
              className="absolute inset-0 bg-black/50 bg-blend-overlay bg-cover bg-center flex flex-col justify-center px-12"
            >
              <span className="bg-[#137fec] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                {currentEvent.category}
              </span>
              <h1 className="text-white text-4xl md:text-5xl font-black mb-4 tracking-tight">
                {currentEvent.eventName}
              </h1>
              <p className="text-slate-200 max-w-2xl text-lg leading-relaxed font-medium">
                Join us for an exciting day of activity, connection, and community interaction live at the university campus layout.
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
                <p className="text-sm font-bold text-slate-800">{currentEvent.date} • {currentEvent.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 border-r border-slate-100">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Venue</p>
                <p className="text-sm font-bold text-slate-800">{currentEvent.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
                <p className="text-sm font-bold text-slate-800">Limited Seats Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Registration Form</h2>
            <p className="text-slate-500 mb-10">Please confirm your details to reserve your spot at this event.</p>

            <form className="space-y-8" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 text-sm"
                    placeholder="Alex Johnson"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">University Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 text-sm"
                    placeholder="alex.johnson@university.edu"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
                  <select 
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 text-sm appearance-none"
                  >
                    <option value="Applied Science">Applied Science</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year / Batch</label>
                  <select 
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-[#f8fafc] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 text-sm appearance-none"
                  >
                    <option value="2021/2022">2021/2022</option>
                    <option value="2022/2023">2022/2023</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#f0f9ff] border border-blue-100 p-6 rounded-xl flex gap-4">
                <span className="material-symbols-outlined text-[#137fec]">info</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  By registering, you agree to receive event-related communications and reminders. Your student credentials will be used for attendance verification at the venue.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <p className="text-[10px] italic text-slate-400 font-bold">Limited seats available. First come, first served.</p>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#137fec] hover:bg-[#116ecf] disabled:bg-slate-400 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#137fec]/20 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-xl">person_add</span>
                  {isSubmitting ? "Registering..." : "Register for Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Modal Container */}
      {successModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">{successModal.title}</h2>
            <p className="text-slate-500 mb-6 text-sm font-medium leading-relaxed">{successModal.message}</p>
            <button 
              onClick={handleDismissModal}
              className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-bold py-3.5 rounded-xl transition-all active:scale-95"
            >
              View My Registrations
            </button>
          </div>
        </div>
      )}

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
