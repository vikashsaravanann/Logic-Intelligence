"use client";
import { useState, useEffect } from "react";
import { Calculator, Send, Info } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  { name: "Kerala Backwaters (Alleppey + Kochi)", base: 8000, days: 4 },
  { name: "Ooty & Kodaikanal", base: 5500, days: 3 },
  { name: "Goa Beach Holiday", base: 9500, days: 5 },
  { name: "Rajasthan Heritage Tour", base: 14000, days: 7 },
  { name: "Andaman Islands", base: 18000, days: 6 },
  { name: "Manali & Shimla", base: 12000, days: 5 },
  { name: "Mysore & Coorg", base: 4500, days: 2 },
  { name: "Sri Lanka International", base: 22000, days: 5 },
];

const packages = [
  { name: "Budget (Standard hotels, AC bus)", multiplier: 1.0 },
  { name: "Comfort (3-star hotels, train/cab)", multiplier: 1.5 },
  { name: "Premium (4-star hotels, flight included)", multiplier: 2.2 },
  { name: "Luxury (5-star hotels, private cab, flight)", multiplier: 3.5 },
];

export default function CalculatorSection() {
  const [destIndex, setDestIndex] = useState(0);
  const [people, setPeople] = useState(2);
  const [pkgIndex, setPkgIndex] = useState(1); // Default to Comfort
  const [days, setDays] = useState(destinations[0].days);
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<{ total: number; pp: number } | null>(null);

  // Auto update days when destination changes
  useEffect(() => {
    setDays(destinations[destIndex].days);
    setResult(null); // Reset result on input change
  }, [destIndex]);

  const handleCalculate = () => {
    setCalculating(true);
    setTimeout(() => {
      const baseCost = destinations[destIndex].base;
      const mult = packages[pkgIndex].multiplier;
      // Calculate per person cost adjusting linearly for day variance
      const originalDays = destinations[destIndex].days;
      const dayFactor = days / originalDays;
      
      const ppCost = baseCost * mult * dayFactor;
      const totalCost = ppCost * people;

      setResult({ total: Math.round(totalCost), pp: Math.round(ppCost) });
      setCalculating(false);
    }, 600);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Logic Intelligence Technologies Pvt. Ltd., I checked the Travel Quote Calculator on your site.\n\n` +
      `*Destination:* ${destinations[destIndex].name}\n` +
      `*Package:* ${packages[pkgIndex].name}\n` +
      `*People:* ${people}\n` +
      `*Duration:* ${days} Days\n\n` +
      `Estimated Quote: ₹${result?.total.toLocaleString("en-IN")}\n` +
      `Please provide more details on this package.`
    );
    window.open(`https://wa.me/919342877474?text=${text}`, "_blank");
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer";

  return (
    <section id="calculator" className="py-24 bg-[#0A0F1E] relative border-t border-white/5">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Plan Your Trip — Instant Quote Calculator</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Select your destination and preferences to see an estimated travel package cost instantly</h3>
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-[2rem] p-8 md:p-12 shadow-[0_0_40px_rgba(0,191,255,0.1)] relative overflow-hidden">
          {/* Subtle neon grid background inside the card */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Select Destination</label>
                <select value={destIndex} onChange={(e) => setDestIndex(Number(e.target.value))} className={`${inputClass} appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2300BFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]`}>
                  {destinations.map((d, i) => <option key={i} value={i} className="bg-zinc-900">{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Package Type</label>
                <select value={pkgIndex} onChange={(e) => { setPkgIndex(Number(e.target.value)); setResult(null); }} className={`${inputClass} appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2300BFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]`}>
                  {packages.map((p, i) => <option key={i} value={i} className="bg-zinc-900">{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Number of People</label>
                  <input type="number" min={1} max={50} value={people} onChange={(e) => { setPeople(Number(e.target.value)); setResult(null); }} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Number of Days</label>
                  <input type="number" min={1} max={30} value={days} onChange={(e) => { setDays(Number(e.target.value)); setResult(null); }} className={inputClass} />
                </div>
              </div>

              <button onClick={handleCalculate} disabled={calculating} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-primary neon-btn mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
                {calculating ? "Calculating..." : <><Calculator className="w-5 h-5" /> Get My Quote</>}
              </button>
            </div>

            {/* Results Output */}
            <div className="bg-zinc-950/80 rounded-2xl p-8 border border-white/5 flex flex-col justify-center min-h-[300px]">
              {!result ? (
                <div className="text-center text-zinc-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select your preferences and click calculate to see the estimated cost.</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Estimated Quote</h4>
                    
                    <div className="mb-6">
                      <p className="text-sm text-zinc-400 mb-1">Total Package Cost</p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        ₹{result.total.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">Per Person Cost</p>
                        <p className="text-lg font-bold text-white">₹{result.pp.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">Duration</p>
                        <p className="text-lg font-bold text-white">{days} Days / {Math.max(1, days - 1)} Nights</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs text-zinc-500 bg-white/5 p-3 rounded-lg mb-8">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                      <p>Final quote may vary based on exact dates and availability. Contact us for a custom package.</p>
                    </div>
                  </div>

                  <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]">
                    <Send className="w-5 h-5" /> Book This Package on WhatsApp
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-zinc-500 mt-8 max-w-2xl mx-auto">
          * This dynamic calculator is an example of the unique features we can build for your business website to capture leads instantly.
        </p>
      </div>
    </section>
  );
}
