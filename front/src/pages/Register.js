import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    registration_number: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        full_name: formData.full_name,
        email: formData.email,
        registration_number: formData.registration_number,
        password: formData.password
      });

      if (response.status === 201) {
        alert("Registration Successful! Please login.");
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen font-display flex flex-col">
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

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Create Your Account</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Register to participate in university events</p>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all"
                    placeholder="Enter your full name"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">University Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all"
                    placeholder="e.g. student@university.edu"
                    type="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Registration Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                  <input
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all"
                    placeholder="Enter your registration number"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-[#137fec] focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px] select-none">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock_reset</span>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-[#137fec] focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px] select-none">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
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


