import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Start Your Project",
  description: "Contact Logic Intelligence Technologies to discuss your next web, app, or custom software project."
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
