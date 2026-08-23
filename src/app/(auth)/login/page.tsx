"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COMPANY } from "@/config/company";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

function validate(email: string, password: string) {
  const errors: { email?: string; password?: string } = {};
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const router = useRouter();

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors(validate(email, password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errors = validate(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setServerError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid login credentials.";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all shadow-inner";
  const inputClass = (field: "email" | "password") =>
    `${inputBase} ${
      touched[field] && fieldErrors[field]
        ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
        : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/30"
    }`;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0A0F1E]">
      {/* ── Same hero background treatment as homepage ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,191,255,0.08)_0%,rgba(10,15,30,1)_70%)]" />
        {/* Blueprint Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik00MCAwSDBWNDBIMzkuNUYwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-60" />
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[130px] mix-blend-screen" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#0D1117]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.08)] overflow-hidden"
        >
          {/* Top accent line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

          <div className="p-8 md:p-10">
            {/* Logo + Brand */}
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
              <h1 className="text-2xl font-black text-white tracking-tight">Login</h1>
              <p className="text-zinc-400 text-sm mt-1 text-center">
                {COMPANY.displayName} — Sign in to manage your project
              </p>
            </div>

            {/* Server Error Banner */}
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {serverError}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) setFieldErrors(validate(e.target.value, password));
                    }}
                    onBlur={() => handleBlur("email")}
                    className={inputClass("email")}
                  />
                </div>
                {touched.email && fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) setFieldErrors(validate(email, e.target.value));
                    }}
                    onBlur={() => handleBlur("password")}
                    className={`${inputClass("password")} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.password && fieldErrors.password && (
                  <p className="mt-1.5 text-xs text-red-400">{fieldErrors.password}</p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-black bg-white hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" /> Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-8 pt-6 border-t border-white/[0.07] text-center space-y-3">
              <p className="text-xs text-zinc-500">
                Don&apos;t have a client account?{" "}
                <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Contact us to get started
                </Link>
              </p>
              <p className="text-xs text-zinc-600 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Secure portal · {COMPANY.legalName}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
