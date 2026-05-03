import Link from "next/link";
import { ExternalLink, Share2, Globe, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/20 relative overflow-hidden">
      {/* Top Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-cyan-300"></div>
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                L
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">Logic<span className="text-primary">Intel</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Smart, data-driven web solutions engineered with AI precision. From landing pages to custom web apps.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all border border-border/50">
                <span className="sr-only">Twitter / X</span>
                <Share2 className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all border border-border/50">
                <span className="sr-only">LinkedIn</span>
                <Globe className="h-4 w-4" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all border border-border/50">
                <span className="sr-only">GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Services</h3>
                <ul role="list" className="space-y-4">
                  {['Landing Pages', 'E-Commerce', 'Web Applications', 'UI/UX Design', 'Maintenance'].map((item) => (
                    <li key={item}>
                      <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary/50"></span> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Company</h3>
                <ul role="list" className="space-y-4">
                  {['About Us', 'Our Work', 'Careers', 'Contact'].map((item) => (
                    <li key={item}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                         <span className="h-1 w-1 rounded-full bg-primary/50"></span> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Legal</h3>
                <ul role="list" className="space-y-4">
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Contact</h3>
                <ul role="list" className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <a href="mailto:hello@logicintel.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@logicintel.com</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">100 Tech Lane, Suite 300<br/>San Francisco, CA 94105</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Logic Intelligence Technologies. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Next.js 15</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
