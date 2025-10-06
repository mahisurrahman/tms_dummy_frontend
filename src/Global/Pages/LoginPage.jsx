import React, { useState, useEffect, useContext } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Star,
  Heart,
  Zap,
  Coffee,
  Rocket,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { userAPI } from "../../api/endpoints/user.api";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner/Spinner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const { user, handleLoginData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  // Generate floating icons
  useEffect(() => {
    const icons = [Star, Heart, Zap, Coffee, Rocket];
    const newFloatingIcons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email,
      password,
    };
    const response = await handleLoginData(payload);
    toast.success("Logged In Successfully");

    if (response) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setLoading(false);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ id, Icon, x, y, delay, duration }) => (
          <div
            key={id}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div
        className="absolute top-20 right-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 animate-bounce">
              Welcome Back! 🚀
            </h1>
            <p className="text-xl text-purple-200 animate-pulse">
              Ready for another adventure?
            </p>
          </div>

          {/* Login form */}
          <div
            className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 ${
              isShaking ? "animate-pulse" : ""
            }`}
          >
            <div className="space-y-6">
              {/* Email input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-300 group-focus-within:text-pink-400 transition-colors duration-200 group-focus-within:animate-spin" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border border-white/30 rounded-2xl bg-white/10 text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 transition-all duration-300 hover:bg-white/20"
                  placeholder="Your cosmic email..."
                />
              </div>

              {/* Password input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-pink-400 transition-colors duration-200 group-focus-within:animate-bounce" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-4 border border-white/30 rounded-2xl bg-white/10 text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 transition-all duration-300 hover:bg-white/20"
                  placeholder="Secret magic words..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-pink-400 transition-colors duration-200 hover:animate-pulse"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Login button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-violet-600 transform transition-all duration-300 hover:scale-110 hover:rotate-1 focus:outline-none focus:ring-4 focus:ring-pink-500/50 shadow-lg hover:shadow-pink-500/50 active:animate-pulse"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Rocket className="w-5 h-5 animate-pulse" />
                    <span>Launch Into TraBun! 🌟</span>
                  </span>
                )}
              </button>
            </div>

            {/* Fun links */}
            <div className="mt-6 flex justify-between text-sm">
              <a
                href="#"
                className="text-purple-200 hover:text-pink-300 transition-colors duration-200 hover:animate-bounce"
              >
                Forgot your magic? ✨
              </a>
              <a
                href="#"
                className="text-purple-200 hover:text-pink-300 transition-colors duration-200 hover:animate-bounce"
              >
                Join the fun! 🎉
              </a>
            </div>

            {/* Social login buttons */}
            {/* <div className="mt-8 space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:-rotate-1 border border-white/20">
                Continue with Google 🎨
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:rotate-1 border border-white/20">
                Continue with GitHub 🐙
              </button>
            </div> */}
          </div>

          {/* Fun footer message */}
          <div className="text-center mt-8">
            <p className="text-purple-200 animate-pulse">
              Made with 💜 from TraIdeas ☕
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
