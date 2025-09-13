// src/main.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './main.css';
import Header from './Components/common/header';
import MainContent from './Components/common/maincontent'; // Fixed casing
import Register from './Components/common/signup';
import Login from './Components/common/signin'; // Added missing import

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* Added a main wrapper for consistent background and layout */}
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);