import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Create this using your registration HTML
import Contact from './pages/Contact';   // Create this using your contact HTML
import EventRegister from './pages/EventRegister';
import AddEvent from './pages/AddEvent'; 
import ForgotPassword from './pages/ForgotPassword'; 
import MyRegistrations from './pages/MyRegistrations'; // Imported the registrations screen component

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
        {/* Wired up the personal registration tracking list route */}
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Routes>
    </Router>
  );
}

export default App; 
