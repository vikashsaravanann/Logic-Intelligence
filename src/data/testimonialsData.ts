export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string; // e.g. "Founder, FreshBite"
  company: string;
  avatar?: string; // optional path under /public, e.g. "/testimonials/priya.jpg"
  projectSlug?: string; // optional: link to matching /work/[slug] case study
  rating?: number; // 1-5, optional
};

// Add real client quotes here as you collect them.
// Even 2-3 short, specific quotes outperform an empty "coming soon" section.
// Keep quotes short (1-3 sentences) and specific — a number or concrete outcome
// beats generic praise ("They were great!" vs "Cut our booking time from 2 hours to 5 minutes").
export const testimonials: Testimonial[] = [
  // {
  //   id: "priya-freshbite",
  //   quote: "Logic Intelligence rebuilt our ordering flow in three weeks. No-shows dropped almost immediately once customers could see live order status.",
  //   name: "Priya Ramesh",
  //   role: "Founder",
  //   company: "FreshBite",
  //   projectSlug: "freshbite",
  //   rating: 5,
  // },
];
