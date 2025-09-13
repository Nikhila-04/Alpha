// src/Components/common/signup.jsx

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      setMessage("Passwords do not match!");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8060/api/${role}/register`,
        {
          name: name,
          email: email,
          pass: pass,
          role: role,
        }
      );

      setMessage(response.data?.message || "Registration successful! You can now log in.");
      setIsSuccess(true);

      setName("");
      setEmail("");
      setPass("");
      setConfirmPass("");
      
    } catch (err) {
      console.error("Registration API error:", err);
      setMessage("Registration failed: " + (err.response?.data?.message || err.message));
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

      <form
        className="p-8 bg-black/70 rounded-lg max-w-md w-full"
        onSubmit={handleRegister}
      >
        <h2 className="text-white text-3xl mb-6 font-semibold">Sign Up</h2>

        {/* Form inputs remain the same... */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          placeholder="Name"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email address"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />

        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          type="password"
          placeholder="Password"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />
        
        <input
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 my-2 rounded-md bg-gray-800/80 text-white border border-gray-600"
        />

        <button type="submit" className="bg-red-600 hover:bg-red-700 p-3 my-6 text-white rounded-md w-full font-medium">
          Sign Up
        </button>

        {message && (
          <p className={`mt-2 text-center font-medium ${
              isSuccess
                ? "text-green-500 [text-shadow:0_0_10px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e]"
                : "text-red-500 [text-shadow:0_0_10px_#ef4444,0_0_20px_#ef4444]"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-white hover:underline">
            Sign In now.
          </Link>
        </div>
      </form>
    </div>
  );
}