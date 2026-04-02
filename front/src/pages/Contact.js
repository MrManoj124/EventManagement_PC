import React from 'react';
import { Link } from 'react-router-dom';
const Contact = () => {
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
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className="text-slate-500">Home</Link>
            <Link to="/contact" className="text-[#137fec]">Contact Us</Link>
          </nav>
          <Link to="/login" className="bg-[#137fec] text-white px-6 py-2 rounded-lg font-bold text-sm">Login</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16 w-full">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-4">Contact Us</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Have questions about an upcoming event or need help with the management system? Our team is here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" placeholder="Jane" className="w-full border rounded-lg p-3 outline-none focus:border-[#137fec]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full border rounded-lg p-3 outline-none focus:border-[#137fec]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" placeholder="jane.doe@university.edu" className="w-full border rounded-lg p-3 outline-none focus:border-[#137fec]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                <select className="w-full border rounded-lg p-3 outline-none focus:border-[#137fec] bg-white">
                  <option>Select a category</option>
                  <option>Event Help</option>
                  <option>Technical Issue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows="4" placeholder="How can we help you today?" className="w-full border rounded-lg p-3 outline-none focus:border-[#137fec]"></textarea>
              </div>
              <button className="w-full bg-[#137fec] text-white font-bold py-4 rounded-lg text-lg">Send Message</button>
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
                  <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer from screenshot */}
      <footer className="border-t border-slate-100 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4 text-[#137fec]">
                <span className="material-symbols-outlined">school</span>
                <span className="text-xl font-bold text-black">UniEvents</span>
             </div>
             <p className="text-sm text-slate-500">The ultimate platform for university event management. Empowering student life.</p>
          </div>
          {/* Add other footer columns (Quick Links, Policies, Newsletter) similarly */}
        </div>
      </footer>
    </div>
  );
};

export default Contact;

