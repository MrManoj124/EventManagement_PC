import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="bg-[#f0f4f8] min-h-screen font-display flex flex-col">
      {/* Navbar exactly like the image */}
      <header className="flex items-center justify-between border-b border-slate-300 bg-white px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#137fec] text-white">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <h2 className="text-black text-lg font-bold tracking-tight">UniEvents</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-800 hover:text-blue-500 text-sm font-medium">Home</Link>
          <Link to="/Login" className="text-slate-800 hover:text-blue-500 text-sm font-medium">Login</Link>
        </nav>
      </header>

      {/* Main Registration Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-10">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Create Your Account</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Register to participate in university events</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="Enter your full name"
                    type="text"
                  />
                </div>
              </div>

              {/* University Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">University Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="e.g. student@university.edu"
                    type="email"
                  />
                </div>
              </div>

              {/* University ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">University ID</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="Enter your student ID"
                    type="text"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock_reset</span>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              <button
                className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#137fec]/20 mt-4"
                type="submit"
              >
                Register
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Already have an account?{" "}
                <Link className="text-[#137fec] font-extrabold hover:underline" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="bg-slate-50 py-4 flex justify-center gap-6 border-t border-slate-100">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">verified_user</span> Secure Registration
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">contact_support</span> Help Center
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-xs">
        © 2024 University Event Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
