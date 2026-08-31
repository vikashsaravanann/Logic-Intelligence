"use client";

import { motion } from "framer-motion";
import { Receipt, Download, AlertCircle } from "lucide-react";

export function BillingTab({ invoices }: { invoices: any[] }) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-2xl border-white/10 bg-white/5">
        <Receipt className="w-12 h-12 mb-4 text-white/20" />
        <h3 className="text-xl font-medium text-white mb-2">No Invoices</h3>
        <p className="text-white/60 max-w-md">
          You don't have any invoices yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice, idx) => (
        <motion.div 
          key={invoice.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 gap-4"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className={`p-3 rounded-lg ${invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium">{invoice.invoice_code}</h4>
              <p className="text-sm text-white/60">
                Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <p className="text-lg font-medium text-white">${Number(invoice.amount).toFixed(2)}</p>
              <p className={`text-xs ${invoice.status === 'Paid' ? 'text-green-400' : 'text-orange-400'}`}>
                {invoice.status}
              </p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="Download PDF (Coming Soon)">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
