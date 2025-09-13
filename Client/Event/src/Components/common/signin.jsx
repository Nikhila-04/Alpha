// src/Components/common/signin.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8060/api/${role}/login`,
        {
          email: email,
          pass: pass,
        }
      );

      setMessage(response.data?.message || "Login successful!");
      setIsSuccess(true);
      
    } catch (err) {
      console.error("Login API error:", err);
      setMessage("Login failed: " + (err.response?.data?.message || err.message));
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full relative">

      {/* Back button now navigates to the Events page ('/') */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        &larr; Back to Events
      </button>

      <form className="p-8 bg-black/70 rounded-lg max-w-md w-full" onSubmit={handleSubmit}>
        <h2 className="text-white text-3xl mb-6 font-semibold">Sign In</h2>

        {/* Form inputs remain the same... */}
        <input
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />

        <input
          value={pass}
          required
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 my-2 rounded-md text-white border border-gray-600 bg-gray-800/80"
        >
          <option value="User" className="text-black">User</option>
          <option value="Admin" className="text-black">Admin</option>
        </select>

        <button type="submit" className="bg-red-600 hover:bg-red-700 p-3 my-6 text-white rounded-md w-full font-medium">
          Sign In
        </button>

        <div className="text-gray-400 mt-4">
          New to AlphaEvents?{' '}
          <Link to="/sign-up" className="text-white hover:underline">
            Sign up now.
          </Link>
        </div>
        
        {message && (
          <p className={`mt-4 text-center font-medium ${
              isSuccess 
                ? "text-green-500 [text-shadow:0_0_10px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e]" 
                : "text-red-500 [text-shadow:0_0_10px_#ef4444,0_0_20px_#ef4444]"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}