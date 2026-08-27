"use client";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPANY } from "@/config/company";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

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
    if (errorDescription) {
      setServerError(decodeURIComponent(errorDescription));
    }
  }, [searchParams]);

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

  const inputBase = "w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all shadow-inner";
  
  return (
    <div className="w-full max-w-md relative z-10">
      <div className="mb-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#0D1117]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.08)] overflow-hidden"
      >
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-5 block">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/15 shadow-[0_0_24px_rgba(0,191,255,0.3)] animate-neon-pulse bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                <img
                  src={COMPANY.logoIconPath}
                  alt={`${COMPANY.displayName} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-xl font-black text-white">LIT</span>';
                  }}
                />
              </div>
            </Link>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-zinc-400 text-sm mt-1 text-center">
              {COMPANY.displayName} — {isSignUp ? "Sign up to start your project" : "Sign in to manage your project"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-colors text-white disabled:opacity-50"
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
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-colors text-white disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 496 512" fill="currentColor">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-[1px] bg-white/10" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="flex rounded-xl bg-white/[0.02] p-1 mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => setAuthMode("email")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === "email" ? "bg-primary text-black shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("phone");
                setShowOtpInput(false);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === "phone" ? "bg-primary text-black shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Phone Number
            </button>
          </div>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {serverError}
            </motion.div>
          )}

          {serverSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              {serverSuccess}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <AnimatePresence mode="wait">
              {authMode === "email" ? (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${inputBase} ${fieldErrors.email ? "border-red-500/60" : "border-white/10"}`}
                      />
                    </div>
                    {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type={showPass ? "text" : "password"}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputBase} pr-11 ${fieldErrors.password ? "border-red-500/60" : "border-white/10"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.password}</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phone-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={showOtpInput}
                        className={`${inputBase} ${fieldErrors.phone ? "border-red-500/60" : "border-white/10"} ${showOtpInput ? 'opacity-50' : ''}`}
                      />
                    </div>
                    {fieldErrors.phone && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone}</p>}
                  </div>

                  {showOtpInput && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2 mt-5">
                        Verification Code
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="000000"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={`${inputBase} border-white/10`}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!isSignUp && authMode === "email" && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black bg-white hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  Please wait…
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" /> 
                  {authMode === "phone" ? (showOtpInput ? "Verify Code" : (isSignUp ? "Send Code" : "Send Login Code")) : (isSignUp ? "Create Account" : "Sign In")}
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.07] text-center space-y-4">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setServerError(null);
                setServerSuccess(null);
                setFieldErrors({});
              }}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {isSignUp ? (
                <>Already have an account? <span className="text-primary font-medium">Sign In</span></>
              ) : (
                <>Don't have an account? <span className="text-primary font-medium">Sign Up</span></>
              )}
            </button>
            <p className="text-xs text-zinc-600 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Secure portal · {COMPANY.legalName}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[130px] mix-blend-screen" />
      </div>
      <Suspense fallback={<div className="text-white z-10">Loading...</div>}>
        <AuthContent />
      </Suspense>
    </main>
  );
}
