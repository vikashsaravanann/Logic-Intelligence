"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const project_type = formData.get("project_type") as string;
    const details = formData.get("details") as string;

    // Send data to Supabase Database
    const { error } = await supabase
      .from("leads")
      .insert([{ name, whatsapp, project_type, details }]);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset(); // Clear the form
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Hero Copy */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-[#0a192f] tracking-tight mb-6">
            Stop Paying for Scope Creep.
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We build custom web apps, mobile apps, and enterprise software using a rigorous 31-point scoping framework. Get exactly what you pay for.
          </p>
          
          <div className="space-y-5 mb-8" id="services">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">✓</span>
              <p className="text-lg text-gray-700 font-medium">Digital Launch Pack (₹8,999+)</p>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">✓</span>
              <p className="text-lg text-gray-700 font-medium">Business Pro Pack (₹18,999+)</p>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">✓</span>
              <p className="text-lg text-gray-700 font-medium">Enterprise Software (Custom)</p>
            </div>
          </div>
        </div>

        {/* Right Column: Database Form */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#0a192f] mb-2">Request a Free Demo Prototype</h3>
            <p className="text-gray-500 mb-6">Answer a few questions so we can scope your project.</p>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                <h4 className="text-xl font-bold mb-2">Request Received! 🚀</h4>
                <p>We will review your details and contact you on WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a192f] outline-none" placeholder="Vikash Saravanan" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
                  <input type="tel" name="whatsapp" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a192f] outline-none" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Project Type</label>
                  <select name="project_type" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a192f] outline-none">
                    <option value="">Select an option...</option>
                    <option value="Web Development">Business Website (Pro Pack)</option>
                    <option value="Mobile App">Mobile App (iOS/Android)</option>
                    <option value="Custom Software">Custom Software / ERP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Project Goals</label>
                  <textarea name="details" rows={3} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a192f] outline-none" placeholder="Briefly describe what this project must achieve..."></textarea>
                </div>
                
                <button type="submit" disabled={status === "loading"} className="w-full bg-[#0a192f] hover:bg-blue-900 text-white font-bold py-4 rounded-lg transition duration-200 mt-4 shadow-md disabled:bg-gray-400">
                  {status === "loading" ? "Submitting to Database..." : "Submit Request & Get Prototype"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
