import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
        setShowModal(true); // Show the "Password is changed" modal
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#137fec]/10 mb-4">
            <span className="material-symbols-outlined text-[#137fec] text-4xl">lock_reset</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Reset Password</h1>
          <p className="text-slate-500 mt-2 text-sm">Enter your email and a new password</p>
        </div>

        <form className="space-y-5" onSubmit={handleReset}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3.5 bg-[#f0f4f8] rounded-xl outline-none" 
            placeholder="Your Registered Email" 
            required 
          />
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            className="w-full p-3.5 bg-[#f0f4f8] rounded-xl outline-none" 
            placeholder="New Password" 
            required 
          />
          <button className="w-full bg-[#137fec] text-white font-bold py-4 rounded-xl shadow-lg" type="submit">
            Update Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link className="text-[#137fec] font-bold text-sm hover:underline" to="/login">Back to Login</Link>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Success!</h2>
            <p className="text-slate-500 mb-6 font-medium">Password is changed</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all"
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
