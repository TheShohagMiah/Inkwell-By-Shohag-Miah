import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Feather,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-main relative overflow-hidden transition-colors duration-500">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-primary/5 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-[420px] space-y-10 relative z-10">
        {/* 1. Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3.5 bg-soft border border-border-soft rounded-2xl mb-2 shadow-sm">
            <Feather className="text-txt-main" size={24} strokeWidth={1.5} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tighter text-txt-main uppercase">
              Welcome <span className="text-txt-muted font-light">Back</span>
            </h1>
            <p className="text-txt-muted text-sm font-light tracking-tight">
              Enter your details to access your sanctuary.
            </p>
          </div>
        </div>

        {/* 2. Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-txt-muted ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted/50 group-focus-within:text-txt-main transition-colors"
                  size={18}
                />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-soft border border-border-soft rounded-xl py-4 pl-11 pr-4 text-sm outline-none focus:border-txt-main/30 transition-all text-txt-main placeholder:text-txt-muted/30 font-medium"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-txt-muted">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-semibold uppercase tracking-[0.15em] text-txt-muted hover:text-txt-main transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted/50 group-focus-within:text-txt-main transition-colors"
                  size={18}
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-soft border border-border-soft rounded-xl py-4 pl-11 pr-12 text-sm outline-none focus:border-txt-main/30 transition-all text-txt-main placeholder:text-txt-muted/30 font-medium"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-main transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-txt-main text-main font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 hover:opacity-90 active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-main/30 border-t-main rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-[10px] uppercase tracking-[0.25em]">
                  Sign In
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* 3. Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-soft"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-semibold uppercase tracking-[0.3em]">
            <span className="bg-main px-4 text-txt-muted/60">
              Or continue with
            </span>
          </div>
        </div>

        {/* 4. Social Logins */}
        <button className="w-full bg-soft border border-border-soft text-txt-main font-semibold py-4 rounded-xl hover:border-border-base transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer">
          <Github size={18} className="text-txt-main/70" />
          <span className="text-[10px] uppercase tracking-[0.2em]">GitHub</span>
        </button>

        {/* 5. Footer */}
        <p className="text-center text-[10px] font-medium uppercase tracking-widest text-txt-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-txt-main hover:underline underline-offset-4 ml-1 font-bold"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
