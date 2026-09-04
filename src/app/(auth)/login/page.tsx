"use client";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Smartphone, Briefcase, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPANY } from "@/config/company";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";

function validateEmail(email: string) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return undefined;
}

function validatePhone(phone: string) {
  if (!phone) return "Phone number is required.";
  if (phone.length < 10) return "Enter a valid phone number (include country code, e.g. +1).";
  return undefined;
}

function validatePassword(password: string, isSignUp: boolean) {
  if (!password) return "Password is required.";
  if (isSignUp && password.length < 6) return "Password must be at least 6 characters.";
  return undefined;
}

function AuthContent() {
  const supabase = createClientComponentClient({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMode, setAuthMode] = useState<"email" | "phone">("email");
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's an error from OAuth redirect
    const errorDescription = searchParams.get("error_description");
    const errorParam = searchParams.get("error");
    if (errorDescription) {
      setServerError(decodeURIComponent(errorDescription));
    } else if (errorParam) {
      setServerError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  useEffect(() => {
    // If the user is already logged in, redirect them to the dashboard
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleOAuthLogin = async (provider: 'google' | 'apple' | 'github') => {
    try {
      setIsLoading(true);
      setServerError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      // Redirect happens automatically
    } catch (err: any) {
      setServerError(err.message || `Failed to authenticate with ${provider}.`);
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password, isSignUp);
    if (eErr || pErr) {
      setFieldErrors({ email: eErr, password: pErr });
      return;
    }
    
    setIsLoading(true);
    setServerError(null);
    setServerSuccess(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        if (error) throw error;
        setServerSuccess("Account created! Please check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setServerError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    if (!showOtpInput) {
      const pErr = validatePhone(phone);
      if (pErr) {
        setFieldErrors({ phone: pErr });
        return;
      }
      setIsLoading(true);
      setServerError(null);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone,
        });
        if (error) throw error;
        setShowOtpInput(true);
        setServerSuccess("A code has been sent to your phone.");
      } catch (err: any) {
        setServerError(err.message || "Failed to send OTP.");
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!otp) {
        setServerError("Please enter the verification code.");
        return;
      }
      setIsLoading(true);
      setServerError(null);
      try {
        const { error } = await supabase.auth.verifyOtp({
          phone,
          token: otp,
          type: 'sms',
        });
        if (error) throw error;
        router.push("/dashboard");
      } catch (err: any) {
        setServerError(err.message || "Invalid or expired code.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    if (authMode === "email") {
      handleEmailAuth();
    } else {
      handlePhoneAuth();
    }
  };

  const inputBase = "w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-base md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-sm";
  
  return (
    <div className="w-full max-w-[440px] mx-auto z-10 p-6 md:p-0">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all duration-200"
        >
          &larr; Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <img
                  src={COMPANY.logoIconPath}
                  alt={`${COMPANY.displayName} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-black text-white">LI</span>';
                  }}
                />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Logic Intelligence</span>
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-gray-500 text-base">
            {isSignUp ? "Start transforming your business today." : "Enter your details to access your dashboard."}
          </p>
        </div>

        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-start gap-3"
          >
            <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold mb-1">Authentication Error</p>
              <p>{serverError}</p>
              {serverError.toLowerCase().includes("google") && (
                <p className="mt-2 text-xs opacity-80">
                  Note: Google Login requires proper configuration in your Supabase Dashboard (Authentication &gt; Providers &gt; Google) and the Google Cloud Console.
                </p>
              )}
            </div>
          </motion.div>
        )}

        {serverSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {serverSuccess}
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-semibold bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all text-gray-700 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-semibold bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all text-gray-700 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 496 512" fill="#111827">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
            GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="email-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputBase} ${fieldErrors.email ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"}`}
                  />
                </div>
                {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">
                    Password
                  </label>
                  {!isSignUp && (
                    <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputBase} pr-11 ${fieldErrors.password ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.password}</p>}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-primary to-[#0088ff] hover:from-[#0088ff] hover:to-primary transition-all shadow-[0_4px_14px_0_rgba(0,191,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,191,255,0.23)] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed mt-3"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                {isSignUp ? "Create Account" : "Sign In"}
                <ArrowRight className="w-4 h-4" /> 
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setServerError(null);
              setServerSuccess(null);
              setFieldErrors({});
            }}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            {isSignUp ? (
              <>Already have an account? <span className="text-primary font-bold">Sign In</span></>
            ) : (
              <>Don't have an account? <span className="text-primary font-bold">Sign Up</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center relative bg-white">
        <Suspense fallback={<div className="text-gray-900 p-8">Loading...</div>}>
          <AuthContent />
        </Suspense>
      </div>

      {/* Right Column - Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0A0F1E] relative overflow-hidden items-center justify-center">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-1/4 -right-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[40rem] h-[40rem] bg-[#7B2FBE]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="relative z-10 max-w-lg px-12">
          <div className="flex gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Briefcase className="w-6 h-6 text-[#7B2FBE]" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
          </div>
          
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Intelligent solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00FF88]">modern businesses.</span>
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Join hundreds of forward-thinking enterprises that use Logic Intelligence to automate their workflows, secure their data, and accelerate growth.
          </p>

          <div className="flex items-center gap-4 text-sm font-semibold text-gray-400">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-[#0A0F1E]" alt="User" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-10 h-10 rounded-full border-2 border-[#0A0F1E]" alt="User" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-10 h-10 rounded-full border-2 border-[#0A0F1E]" alt="User" />
              <img src="https://i.pravatar.cc/100?img=4" className="w-10 h-10 rounded-full border-2 border-[#0A0F1E]" alt="User" />
            </div>
            <p>Trusted by 500+ professionals</p>
          </div>
        </div>
      </div>
    </main>
  );
}
