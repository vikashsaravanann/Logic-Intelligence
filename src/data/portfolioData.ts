export type PortfolioProject = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  externalUrl?: string;
  results?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "freshbite",
    title: "FreshBite — Restaurant Ordering Platform",
    description:
      "Full-stack food ordering with order tracking, payments, and an admin dashboard for multi-location restaurants.",
    category: "E-Commerce",
    tags: ["Next.js", "Stripe", "Supabase", "Tailwind CSS"],
    image: "/portfolio/freshbite.jpg",
    results: "Demo project — replace with your live case study",
  },
  {
    slug: "vaulthr",
    title: "VaultHR — HR Management Suite",
    description:
      "Employee onboarding, leave management, and payroll workflows in a single cloud platform.",
    category: "SaaS",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    image: "/portfolio/vaulthr.jpg",
    results: "Demo project — replace with your live case study",
  },
  {
    slug: "luxe-interiors",
    title: "Luxe Interiors — Design Studio Portfolio",
    description:
      "Portfolio site with project galleries and a client inquiry flow for an interior design studio.",
    category: "Corporate",
    tags: ["Next.js", "Framer Motion", "Vercel"],
    image: "/portfolio/luxe.jpg",
    results: "Demo project — replace with your live case study",
  },
  {
    slug: "mediconnect",
    title: "MediConnect — Clinic Booking System",
    description:
      "Online appointment scheduling, patient records, and automated reminders for clinics.",
    category: "Web App",
    tags: ["Next.js", "Supabase", "Twilio", "Tailwind CSS"],
    image: "/portfolio/mediconnect.jpg",
    results: "Demo project — replace with your live case study",
  },
  {
    slug: "greenleaf",
    title: "GreenLeaf — Organic E-Commerce Store",
    description:
      "E-commerce storefront with subscriptions, inventory management, and delivery tracking.",
    category: "E-Commerce",
    tags: ["Next.js", "Stripe", "Sanity CMS", "Vercel"],
    image: "/portfolio/greenleaf.jpg",
    results: "Demo project — replace with your live case study",
  },
  {
    slug: "urbanfit",
    title: "UrbanFit — Gym Management Platform",
    description:
      "Membership management, class scheduling, trainer profiles, and payment processing.",
    category: "SaaS",
    tags: ["React", "FastAPI", "PostgreSQL", "Razorpay"],
    image: "/portfolio/urbanfit.jpg",
    results: "Demo project — replace with your live case study",
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
