import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!email || !pass) {
      alert("Please enter email and password");
      return;
    }

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.email === email && storedUser?.pass === pass) {
        localStorage.setItem('userLoggedIn', 'true');
        navigate('/');
      } else {
        alert("Invalid credentials");
      }
    } else {
      localStorage.setItem('user', JSON.stringify({ email, pass }));
      alert("Registered successfully! Please log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-300">
      <div className="w-full max-w-4xl flex shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Left Section */}
        <div className="w-1/2 bg-amber-100 p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Welcome to Foodigo!</h1>
          <p className="text-gray-700 mb-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* Right Section (Form) */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {isLogin ? "Login to Foodigo" : "Register on Foodigo"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-6"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            onClick={handleAuth}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
