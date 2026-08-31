"use client";

import { useState } from "react";
import { ClipboardList, ArrowRight, Loader2 } from "lucide-react";
import { submitOnboardingForm } from "../actions/portal";
import { toast } from "sonner";

export function OnboardingTab({ onboarding }: { onboarding: any[] }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const hasSubmitted = onboarding.length > 0;

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    const answers = {
      projectGoals: formData.get("goals"),
      targetAudience: formData.get("audience"),
      brandColors: formData.get("colors"),
      competitors: formData.get("competitors"),
      additionalInfo: formData.get("additional")
    };

    const result = await submitOnboardingForm(answers);
    setIsLoading(false);

    if (result.success) {
      toast.success("Onboarding form submitted!");
    } else {
      toast.error(result.error || "Failed to submit form");
    }
  };

  if (hasSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-2xl border-white/10 bg-white/5">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <ClipboardList className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Onboarding Complete</h3>
        <p className="text-white/60 max-w-md">
          Thank you! We've received your project details. Our team is reviewing the information and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-white mb-2">Project Intake Form</h3>
        <p className="text-white/60 text-sm">Help us understand your vision so we can build the perfect solution for you.</p>
      </div>

      <form action={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-2">What are the primary goals of this project?</label>
          <textarea name="goals" required rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 resize-none" placeholder="E.g., Increase sales, establish brand presence..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Who is your target audience?</label>
          <textarea name="audience" required rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 resize-none" placeholder="E.g., Local homeowners, tech startups..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Do you have preferred brand colors or existing branding?</label>
          <input name="colors" type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500" placeholder="E.g., Navy Blue and Gold, or link to brand guidelines" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Are there any competitors or websites you admire?</label>
          <textarea name="competitors" rows={2} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 resize-none" placeholder="List URLs here..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Any additional information or specific features you need?</label>
          <textarea name="additional" rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 resize-none" placeholder="Anything else we should know?" />
        </div>

        <div className="pt-4 border-t border-white/10">
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-8 py-3 bg-white text-black hover:bg-white/90 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            Submit Details
          </button>
        </div>
      </form>
    </div>
  );
}
