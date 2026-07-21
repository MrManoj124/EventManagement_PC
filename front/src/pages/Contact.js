import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const navigate = useNavigate();
  // Track user session status to dynamically show page links and auth states
  const [user, setUser] = useState(null);

  // Input State fields matching form data layout matrices
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: 'Select a category',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Notification Modal Overlay State
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (formData.inquiryType === 'Select a category') {
      alert("Please specify a valid inquiry category type.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/contact/send', formData);
      if (response.status === 200) {
        // Clear active inputs
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          inquiryType: 'Select a category',
          message: ''
        });

        // Trigger dynamic success popup overlay
        setSuccessModal({
          isOpen: true,
          title: "Message Dispatched",
          message: "Your inquiry details have been forwarded to the administration. We will review it shortly."
        });
      }
    } catch (error) {
      // Extracted real error responses instead of showing a generic text block
      alert(error.response?.data?.error || "Failed to communicate with mail servers. Verify backend configurations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#f0f4f8] min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#137fec] p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined">school</span>
          </div>
          <span className="text-xl font-bold">UniEvents</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="flex gap-6 text-sm font-medium items-center">
            <Link to="/" className="text-slate-500 hover:text-[#137fec] transition-colors">Home</Link>
            <Link to="/contact" className="text-[#137fec]">Contact Us</Link>
             {/* Campus Info & Guidelines Link */}
            <Link to="/campus-info" className="text-sm font-medium text-slate-600 hover:text-[#137fec] transition-colors">
               Campus Info & Guidelines
            </Link>
            {/* Dynamic Page Link: Displays Only If User Session Is Found */}
            {user && (
              <Link to="/my-registrations" className="text-slate-500 hover:text-[#137fec] transition-colors">
                My Registrations
              </Link>
            )}
          </nav>

          {/* Dynamic Authentication Actions Panel */}
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.full_name || 'User'}&background=137fec&color=fff&bold=true`} 
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 w-full">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-4 tracking-tight">Contact Us</h1>
          <p className="text-slate-500 text-lg max-w-2xl font-medium">
            Have questions about an upcoming event or need help with the management system? Our team is here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
            <form className="space-y-6" onSubmit={handleSendMessage}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Jane" className="w-full border rounded-xl p-3 outline-none focus:border-[#137fec] bg-[#f8fafc] text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Doe" className="w-full border rounded-xl p-3 outline-none focus:border-[#137fec] bg-[#f8fafc] text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="jane.doe@university.edu" className="w-full border rounded-xl p-3 outline-none focus:border-[#137fec] bg-[#f8fafc] text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Inquiry Type</label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange} className="w-full border rounded-xl p-3 outline-none focus:border-[#137fec] bg-[#f8fafc] text-sm text-slate-900" required>
                  <option value="Select a category">Select a category</option>
                  <option value="Event Help">Event Help</option>
                  <option value="Technical Issue">Technical Issue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="How can we help you today?" className="w-full border rounded-xl p-3 outline-none focus:border-[#137fec] bg-[#f8fafc] text-sm resize-none" required></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#137fec] hover:bg-[#116ecf] disabled:bg-slate-400 text-white font-black py-4 rounded-xl text-lg transition-all active:scale-[0.99] shadow-lg shadow-[#137fec]/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Message Sending...</>
                ) : (
                  <>Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
            {[
              { icon: 'location_on', title: 'Our Office', content: '123 University Drive, Academic District, Building A' },
              { icon: 'call', title: 'Phone', content: 'Main: +1 (555) 012-3456 \n Support: +1 (555) 012-7890' },
              { icon: 'mail', title: 'Email', content: 'events@university.edu \n support@unievents.com' }
            ].map((info) => (
              <div key={info.title} className="bg-[#f0f7ff] p-8 rounded-2xl flex gap-6 border border-[#e0efff]">
                <span className="material-symbols-outlined text-[#137fec] text-4xl">{info.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed font-medium">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Success Popup Modal Container Window component */}
      {successModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">{successModal.title}</h2>
            <p className="text-slate-500 mb-6 text-sm font-medium leading-relaxed">{successModal.message}</p>
            <button 
              onClick={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 pt-16 pb-8 px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4 text-[#137fec]">
                <span className="material-symbols-outlined">school</span>
                <span className="text-xl font-bold text-black">UniEvents</span>
             </div>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">The ultimate platform for university event management. Empowering student life.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact; 
