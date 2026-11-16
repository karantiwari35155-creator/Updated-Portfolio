import { motion } from "framer-motion";
import { Heart, ArrowUp, GitBranch, Link, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: GitBranch, href: "https://github.com/karantiwari35155-creator", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/karan-tiwari-1056l", label: "LinkedIn" },
  { icon: Mail, href: "mailto:karantiwari35155@gmail.com", label: "Email" },
];

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-text/10 bg-surface/30 overflow-hidden">
      {/* Top decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-24 bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand Column */}
          <div>
            <a href="#home" className="text-3xl font-bold font-heading tracking-tighter text-gradient inline-block mb-3">
              KT
            </a>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Full Stack Developer (MERN) & AI-Integrated Web Applications. Building production-grade apps from Mysuru, Karnataka.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Blurb */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted mb-5">Get In Touch</h4>
            <p className="text-muted text-sm mb-4 leading-relaxed">
              Open for internships and freelance projects. Let's build something amazing together.
            </p>
            <a
              href="mailto:karantiwari35155@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              <Mail size={15} />
              karantiwari35155@gmail.com
            </a>
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for Internships
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-text/10">
          <p className="text-muted text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} Karan Tiwari · Designed & Built with
            <Heart size={13} className="text-red-500 fill-red-500 animate-pulse" />
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
