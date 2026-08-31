"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { createSupportTicket } from "../actions/portal";
import { toast } from "sonner";

export function SupportTab({ tickets }: { tickets: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await createSupportTicket(formData);
    setIsLoading(false);

    if (result.success) {
      toast.success("Support ticket created!");
      (document.getElementById("ticket-form") as HTMLFormElement)?.reset();
    } else {
      toast.error(result.error || "Failed to create ticket");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-white">Create a Ticket</h3>
        <form id="ticket-form" action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">Subject</label>
            <input 
              name="subject" 
              required 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
              placeholder="E.g., Need help with my domain"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1">Message</label>
            <textarea 
              name="message" 
              required 
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Describe your issue or request..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Ticket
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium text-white">Previous Tickets</h3>
        {tickets.length === 0 ? (
          <div className="p-8 border border-white/10 bg-white/5 rounded-2xl text-center">
            <MessageSquare className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No support tickets found.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{ticket.subject}</h4>
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    ticket.status === 'Open' ? 'bg-orange-500/20 text-orange-400' : 
                    ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-white/60 line-clamp-2">{ticket.message}</p>
                <p className="text-xs text-white/40 mt-3">{new Date(ticket.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
