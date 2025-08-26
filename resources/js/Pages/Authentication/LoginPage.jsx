import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      {/* Background image with overlay */}
      <div 
        className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80')] bg-cover bg-center z-0"
        style={{ filter: 'brightness(0.6)' }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/40 to-gray-900/60 z-10"></div>
      
      {/* Login Card */}
      <div className="relative w-full max-w-md z-20">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
            <p className="text-white/80 text-sm">Welcome back please login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/70" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/70" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 border-white/50 flex items-center justify-center transition-all duration-300 ${rememberMe ? 'bg-green-500 border-green-500' : 'bg-transparent'}`}>
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-white text-sm">Remember me</span>
              </label>
              <button type="button" className="text-white/80 text-sm hover:text-white hover:underline transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-100"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-white/80 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-white font-semibold hover:underline transition-all duration-300"
                >
                  Sign up
                </button>
              </span>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-white/60 text-xs">
              Created by <span className="font-semibold">angdiwilputra</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}