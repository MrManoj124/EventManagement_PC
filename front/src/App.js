import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Create this using your registration HTML
import Contact from './pages/Contact';   // Create this using your contact HTML
import EventRegister from './pages/EventRegister';
import AddEvent from './pages/AddEvent'; 

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
      </Routes>
    </Router>
  );
}

export default App;

