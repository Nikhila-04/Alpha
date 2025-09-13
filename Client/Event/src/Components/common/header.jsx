// src/Components/common/header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-[#0B132B]/80 backdrop-blur-md text-[#F8F6F0] sticky top-0 z-40 border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading text-white cursor-pointer">
          Alpha<span className="text-[#C9A66B]">Events</span>
        </Link>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6 font-semibold tracking-wider">
            <Link to="/" className="hover:text-[#C9A66B] transition-colors">
              Events
            </Link>
            <Link to="/my-bookings" className="hover:text-[#C9A66B] transition-colors">
              My Bookings
            </Link>
          </div>
          <div className="hidden md:block w-px h-6 bg-slate-700"></div>
          <div className="flex items-center space-x-3">
            <Link to="/sign-in">
              <button className="bg-[#C9A66B] hover:bg-amber-500 text-[#0B132B] px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="bg-transparent border border-slate-600 hover:border-[#C9A66B] hover:text-[#C9A66B] px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}