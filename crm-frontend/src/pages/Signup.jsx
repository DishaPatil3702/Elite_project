import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password, name }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Signup failed");
      }

      setSuccess("✅ Account created successfully!");
      setTimeout(() => navigate("/login"), 1500); // 1.5s delay, then go login
    } catch (err) {
      setError(typeof err.message === "string" ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Shield, title: "Secure Signups", desc: "Your data is encrypted" },
    { icon: Zap, title: "Fast Setup", desc: "Get started in seconds" },
    { icon: BarChart3, title: "Smart CRM", desc: "Grow with insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">CRMPro</span>
            </h1>
            <p className="text-xl text-gray-300">
              Modern CRM for growing businesses
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
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8"
            style={{ animation: 'slideInRight 0.8s ease-out' }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-300">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              {success && <p className="text-green-400 text-sm text-center">{success}</p>}

              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>

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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Sign Up
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-300">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</a>
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
