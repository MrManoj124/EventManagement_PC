import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin Credential Check
    if (email === 'admin@university.com' && password === 'admin123') {
      navigate('/add-event'); 
    } else {
      navigate('/'); 
    }
  };

  // Function to toggle visibility state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-display flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-[#f6f7f8] px-6 md:px-10 py-4">
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
            {/* Top Icon Circle */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#137fec]/10 mb-4">
                <span className="material-symbols-outlined text-[#137fec] text-4xl">lock_open</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Access your university event dashboard</p>
            </div>

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="admin@university.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-end mb-1.5">
                  <button type="button" className="text-xs font-bold text-[#137fec] hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                  <input
                    className="w-full pl-10 pr-12 py-3.5 bg-[#f0f4f8] border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                    // Dynamic type based on state
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Single visibility toggle button */}
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none" 
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    <span className="material-symbols-outlined select-none">
                      {showPassword ? "visibility_off" : "visibility"} 
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center px-1">
                <input className="w-4 h-4 text-[#137fec] border-slate-300 rounded focus:ring-[#137fec]" id="remember" type="checkbox" />
                <label className="ml-2 text-xs font-semibold text-slate-500" htmlFor="remember">Remember me on this device</label>
              </div>

              <button className="w-full bg-[#137fec] hover:bg-[#116ecf] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#137fec]/20 active:scale-[0.98]" type="submit">
                Sign In
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Don't have an account? <Link className="text-[#137fec] font-extrabold hover:underline" to="/register">Register here</Link>
              </p>
            </div>
          </div>
          <div className="h-1.5 bg-[#137fec] w-full"></div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-xs">
        © 2024 UniEvents Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
