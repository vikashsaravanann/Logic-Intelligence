import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Request a Free Demo",
  description: "Get a free, no-obligation prototype or consultation for your software project before you commit to anything."
};

export default function FreeDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
