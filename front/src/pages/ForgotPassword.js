import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', {
        email,
        newPassword
      });

      if (response.status === 200) {
        setShowModal(true); // Trigger the success modal
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password. Please check your email.");
    }
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display flex flex-col">
      {/* Navbar exactly like Login */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#137fec] text-white">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <h2 className="text-black text-lg font-bold tracking-tight">UniEvents</h2>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-10">
            {/* Top Icon Circle matching Login design */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#137fec]/10 mb-4">
                <span className="material-symbols-outlined text-[#137fec] text-4xl">lock_reset</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900">Reset Password</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Update your account credentials</p>
            </div>

            {/* Reset Form */}
            <form className="space-y-5" onSubmit={handleReset}>
              <div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="Registered Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                  <input
                    className="w-full pl-10 pr-12 py-3.5 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px] select-none">
                      {showPassword ? "visibility_off" : "visibility"} 
                    </span>
                  </button>
                </div>
              </div>

              <button className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#137fec]/20 active:scale-[0.98]" type="submit">
                Update Password
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Remembered your password? <Link className="text-[#137fec] font-extrabold hover:underline" to="/login">Login here</Link>
              </p>
            </div>
          </div>
          {/* Bottom Accent Bar matching Login */}
          <div className="h-1.5 bg-[#137fec] w-full"></div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-xs">
        © 2024 UniEvents Management System. All rights reserved.
      </footer>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Password is changed</h2>
            <p className="text-slate-500 mb-6 text-sm">Your credentials have been updated successfully. You can now login with your new password.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
