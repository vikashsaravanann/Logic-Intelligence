"use client";

import { User, Building, Phone, Mail, LogOut } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "./actions";

interface ProfileFormProps {
  initialFullName: string;
  email: string;
  initialCompanyName?: string;
  initialPhoneNumber?: string;
}

export default function ProfileForm({
  initialFullName,
  email,
  initialCompanyName = "",
  initialPhoneNumber = "",
}: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }

    setIsLoading(false);
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input 
              type="text" 
              name="fullName"
              defaultValue={initialFullName}
              placeholder="John Doe"
              required
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} /> Email ID
            </label>
            <input 
              type="email" 
              defaultValue={email}
              disabled
              className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed"
            />
          </div>

          {/* Company / College Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Building size={14} /> Company / College Name
            </label>
            <input 
              type="text" 
              name="companyName"
              defaultValue={initialCompanyName}
              placeholder="e.g. Logic Intelligence or XYZ College"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} /> Phone Number
            </label>
            <input 
              type="tel" 
              name="phoneNumber"
              defaultValue={initialPhoneNumber}
              placeholder="+91 00000 00000"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.text}
          </div>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(0,191,255,0.4)]"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          
          <div className="w-full sm:w-auto">
            {/* The sign out form will be handled from the client component or passed as children if needed, but it can just be an anchor or another form here. Since it's /auth/signout which is a POST route, it's better to keep it as a separate form */}
          </div>
        </div>
      </form>

      <form action="/auth/signout" method="POST" className="mt-[-44px] flex justify-end w-full sm:w-auto">
        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2">
          <LogOut size={16} /> Sign Out
        </button>
      </form>
    </div>
  );
}
