import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      login(data.access_token);
      localStorage.setItem("token", data.access_token);
      setSuccess("✅ You have successfully logged in!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security" },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized performance" },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">CRMPro</span>
            </h1>
            <p className="text-xl text-gray-300">
              Advanced Customer Relationship Management for modern businesses
            </p>
          </div>
          
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 group"
                style={{ animation: `slideInLeft 0.6s ease-out ${index * 0.2}s both` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-40 w-20 h-20 bg-purple-500/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8"
            style={{ animation: 'slideInRight 0.8s ease-out' }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300">Sign in to your CRM dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {success && <p className="text-green-400 text-sm text-center">{success}</p>}

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded bg-transparent" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Create one now</a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
