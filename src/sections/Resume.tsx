import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Calendar, ExternalLink } from "lucide-react";

const TIMELINE = [
  {
    year: "Oct 2026 – Present",
    title: "Jewellery E-Commerce Admin Dashboard",
    subtitle: "Freelance — Deployment In Progress",
    description: "Developing the backend for a MERN-based e-commerce admin dashboard for a 925 sterling silver jewellery brand using Node.js, Express, and MongoDB Atlas with JWT authentication and Cloudinary/Multer image pipelines. Built 28+ dashboard pages sharing an admin infrastructure, service templates, and custom hooks. Backend is complete; currently contributing to the frontend using React (Vite) and Tailwind CSS.",
    icon: Briefcase,
  },
  {
    year: "Jan 2026 – Mar 2026",
    title: "Full Stack Developer (Freelance) — RocketPro Tech Solutions",
    subtitle: "AI-Powered Business Website | Team of 3 | Live: rocketprotechsolutions.com",
    description: "Shipped a 10-page business website for a real client with zero frontend frameworks, in a 3-person team; live since March 2026 and still serving customers. Built 'RocketPro Assistant,' a Gemini API chatbot across multiple pages; refactored a monolithic HTML file into modular HTML/CSS/JS; resolved widget conflicts, and secured API keys to prevent credential exposure. Built a filterable product catalogue and 3-tier AMC pricing structure, plus a local SEO structure (meta tags, schema markup, sitemap).",
    icon: Briefcase,
  },
  {
    year: "Jun 2024 – May 2027",
    title: "BCA — Bachelor of Computer Applications",
    subtitle: "JSS College of Arts, Commerce & Science, Mysuru",
    description: "CGPA: 8.98/10. Coursework: Data Structures, DBMS, Web Technologies, OOP, Computer Networks, Data Warehousing & Mining, Python (NumPy, Pandas).",
    icon: GraduationCap,
  },
  {
    year: "2022 - 2024",
    title: "2nd PUC (PCMCs)",
    subtitle: "Marimallappa PU College, Mysuru",
    description: "Completed Pre-University College with 90.80% (Science stream).",
    icon: GraduationCap,
    link: "/pdf/puc karan.pdf",
    linkLabel: "View Marks Card"
  },
  {
    year: "2021 - 2022",
    title: "SSLC (10th)",
    subtitle: "S.N.S High School, Mysuru",
    description: "Completed SSLC with 92.80%.",
    icon: GraduationCap,
    link: "/pdf/SSLC karan.pdf",
    linkLabel: "View Marks Card"
  },
];

export function Resume() {
  return (
    <section id="resume" className="relative py-24 bg-surface/30 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-highlight rounded-full" />
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.a
              href="/pdf/Karan_Tiwari_Resume(improved version).pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-text/10 text-text font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <ExternalLink size={18} />
              View
            </motion.a>
            <motion.a
              href="/pdf/Karan_Tiwari_Resume(improved version).pdf"
              download
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download size={18} />
              Download
            </motion.a>
          </div>
        </div>

        <div className="relative border-l-2 border-text/20 ml-6 md:ml-8 pl-8 md:pl-12 space-y-12">
          {TIMELINE.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[42px] md:-left-[58px] top-1 w-5 h-5 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors duration-300 z-10" />
              
              <div className="flex items-center gap-2 text-accent font-mono text-sm font-semibold mb-2">
                <Calendar size={14} />
                <span>{item.year}</span>
              </div>
              
              <div className="glass-card p-6 md:p-8 rounded-2xl group-hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text">{item.title}</h3>
                </div>
                <h4 className="text-muted font-medium mb-4 ml-12">{item.subtitle}</h4>
                <p className="text-muted leading-relaxed ml-12">
                  {item.description}
                </p>
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 ml-12 px-5 py-2.5 text-sm font-semibold rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors border border-accent/20"
                  >
                    <ExternalLink size={16} />
                    {item.linkLabel || "View Details"}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
