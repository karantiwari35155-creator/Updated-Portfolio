import { motion } from "framer-motion";
import { GitBranch, Link, Mail, FileText, Download, ExternalLink } from "lucide-react";
import { AuroraBackground } from "../components/ui/AuroraBackground";
import karanImage from "src/assets/img/karan1.png";

const SOCIAL_LINKS = [
  { icon: GitBranch, href: "https://github.com/karantiwari35155-creator", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/karan-tiwari-1056l", label: "LinkedIn" },
  { icon: Mail, href: "mailto:karantiwari@example.com", label: "Email" },
  { icon: FileText, href: "#resume", label: "Resume" },
];

const TECH_ICONS = [
  "React", "MongoDB", "Node", "Express", "Git", "Tailwind"
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <AuroraBackground />
      
      <div className="container mx-auto px-4 lg:px-8 w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Column: Social Rail (Hidden on mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-center gap-6 col-span-1"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-text/20 mb-4" />
            <div className="-rotate-90 tracking-widest text-xs uppercase text-muted font-medium mb-12 whitespace-nowrap">
              Follow On
            </div>
            
            {SOCIAL_LINKS.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted hover:text-accent hover:bg-accent/10 rounded-full transition-colors relative group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <social.icon size={20} />
                <span className="absolute left-full ml-4 px-2 py-1 bg-surface border border-text/10 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Center Column: Profile Photo */}
          <motion.div 
            className="col-span-1 md:col-span-5 flex justify-center relative order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated Gradient Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-highlight to-transparent animate-spin-slow opacity-50 blur-md" />
              <div className="absolute inset-2 rounded-full bg-surface border border-text/10 z-10 overflow-hidden glass-card flex items-center justify-center">
                <img 
                  src={karanImage} 
                  alt="Karan Tiwari"
                  className="w-[110%] h-[110%] object-cover object-center opacity-90 mix-blend-luminosity hover:mix-blend-normal rotate-3 translate-x-3 translate-y-4 transition-all duration-700"
                />
              </div>
              
              {/* Floating Tech Icons */}
              {TECH_ICONS.map((tech, i) => {
                const angle = (i / TECH_ICONS.length) * Math.PI * 2;
                const radius = 160;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={tech}
                    className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full glass-card flex items-center justify-center text-xs font-bold text-highlight z-20 shadow-lg"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ 
                      x: [x, x + Math.random() * 20 - 10, x],
                      y: [y, y + Math.random() * 20 - 10, y], 
                      opacity: 1 
                    }}
                    transition={{
                      opacity: { duration: 1, delay: 0.5 + i * 0.1 },
                      x: { duration: 5 + Math.random() * 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                      y: { duration: 4 + Math.random() * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                    }}
                  >
                    {tech[0]}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Introduction */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-center order-2 md:order-3 text-center md:text-left relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-accent mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Open for Internship Opportunities
              </div>
              
              <h2 className="text-xl md:text-2xl font-medium text-muted mb-2">Hello, I'm</h2>
              <h1 className="text-5xl md:text-7xl font-bold font-heading mb-4 tracking-tight">
                <span className="text-gradient">Karan</span> Tiwari
              </h1>
              
              {/* Simulated typing animation */}
              <div className="text-2xl md:text-3xl font-semibold mb-6 h-10">
                Full Stack MERN Developer
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-3 h-8 bg-highlight ml-1 align-middle"
                />
              </div>
              
              <p className="text-lg text-muted max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
                Full Stack Developer (MERN) & AI-Integrated Web Applications. BCA student at JSS College with a 8.98 CGPA. I build production-grade web apps using MERN, JWT, Cloudinary, and OpenAI/Gemini APIs. Delivered 2 live client websites and 13+ GitHub projects. Seeking a Full Stack / Backend internship — open to Mysuru, Bangalore, or Remote.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#projects" className="btn-primary">
                  View Projects
                </a>
                <a href="/pdf/Karan_Tiwari_Resume(improved version).pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 group">
                  <ExternalLink size={18} className="group-hover:-translate-y-1 transition-transform" />
                  View Resume
                </a>
                <a href="/pdf/Karan_Tiwari_Resume(improved version).pdf" className="btn-secondary flex items-center gap-2 group" download>
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                  Download
                </a>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
      >
        <span className="-rotate-90 text-xs tracking-widest uppercase font-medium mt-12 mb-4">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-current rounded-full" />
        </motion.div>
      </motion.a>
    </section>
  );
}
