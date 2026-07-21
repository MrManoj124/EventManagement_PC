import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import EventRegister from './pages/EventRegister';
import AddEvent from './pages/AddEvent'; 
import ForgotPassword from './pages/ForgotPassword'; 
import MyRegistrations from './pages/MyRegistrations';
import CampusInfo from './pages/CampusInfo'; // 👈 Imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/event-register" element={<EventRegister />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/campus-info" element={<CampusInfo />} /> {/* 👈 Added Route */}
      </Routes>
    </Router>
  );
}

export default App; 
