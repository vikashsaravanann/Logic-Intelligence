"use client";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  { name: "Rajan M.", role: "Hotel Owner, Ooty", text: "Logic Intelligence Technologies Pvt. Ltd. built our hotel website in just 7 days. Bookings through the site started immediately. Highly professional team." },
  { name: "Priya S.", role: "Travel Agency Owner, Coimbatore", text: "Our travel agency now has a quotation system where customers select their package and see the price instantly. We get 3x more inquiries now." },
  { name: "Karthik R.", role: "Business Owner, Chennai", text: "They understood exactly what we needed for our business software. Delivered on time and the support after delivery was excellent." },
  { name: "Meena V.", role: "Startup Founder, Bangalore", text: "Best decision we made for our brand. The website looks better than what agencies quoted us ₹80,000 for. We paid less than half." },
  { name: "Arun K.", role: "E-Commerce Seller, Coimbatore", text: "The e-commerce store they built works perfectly. Razorpay integration, order tracking, admin panel — everything is smooth." },
];

export default function TestimonialsSection() {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        setScrollPos((prev) => {
          const maxScroll = containerRef.current!.scrollWidth - containerRef.current!.clientWidth;
          if (prev >= maxScroll) return 0;
          return prev + 1;
        });
      }
    }, 30); // Scrolling speed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPos;
    }
  }, [scrollPos]);

  return (
    <section className="py-24 bg-[#0A0F1E] relative border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">What Our Clients Say</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Real feedback from real businesses we have helped grow</h3>
        </div>
      </div>

      {/* Auto-scrolling Carousel */}
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-hidden whitespace-nowrap px-6 md:px-12 py-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Render twice for seamless loop effect visually (in a real infinite marquee we'd clone) */}
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="inline-block whitespace-normal w-[350px] md:w-[450px] shrink-0 p-8 rounded-2xl glass-card bg-zinc-900/60 text-left">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-lg text-zinc-300 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div>
              <h4 className="text-white font-bold text-lg">{t.name}</h4>
              <p className="text-sm text-zinc-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
