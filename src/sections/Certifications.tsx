import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Cloud, Brain, GraduationCap, Sparkles } from "lucide-react";
import { cn } from "../utils/cn";

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Generative AI Foundations Certificate",
    issuer: "upGrad & Microsoft",
    date: "October 2025",
    icon: Brain,
    color: "from-blue-500 to-indigo-500",
    description: "Successfully completed all modules including Prompt Engineering, AI Powered Research, and Content Creation.",
    link: "/pdf/Generative AI Foundations Certificate Program MS.pdf"
  },
  {
    id: 2,
    title: "Solutions Architecture Job Simulation",
    issuer: "AWS & Forage",
    date: "October 2025",
    icon: Cloud,
    color: "from-orange-500 to-amber-500",
    description: "Completed practical tasks in designing simple, scalable, hosting architectures on AWS.",
    link: "/pdf/AWS_completion_certificate.pdf"
  },
  {
    id: 3,
    title: "Cyber Job Simulation",
    issuer: "Deloitte & Forage",
    date: "October 2025",
    icon: ShieldCheck,
    color: "from-green-500 to-emerald-500",
    description: "Completed practical tasks in Cyber Security, focusing on threat analysis and mitigation strategies.",
    link: "/pdf/Deloitte-Cyber_completion_certificate.pdf"
  },
  {
    id: 4,
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    date: "2025",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    description: "Mastered advanced Generative AI concepts and applications.",
    link: "/pdf/Karan_Tiwari_Certificate genAI Mastermind.pdf"
  },
  {
    id: 5,
    title: "Internship Common Aptitude Test (iCAT)",
    issuer: "iCAT",
    date: "August 2025",
    icon: GraduationCap,
    color: "from-red-500 to-rose-500",
    description: "Successfully participated in the Internship Common Aptitude Test.",
    link: "/pdf/Karan Tiwari - icat Participation Certificate.pdf"
  },
  {
    id: 6,
    title: "Delta Full Stack Web Development",
    issuer: "Apna College",
    date: "2024",
    icon: Award,
    color: "from-cyan-500 to-blue-500",
    description: "Successfully completed the Delta Full Stack Web Development course.",
    link: "/pdf/certificate-sigma-7-web-development-karan-68efad107f34ce75a506d742.pdf"
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 bg-surface/20 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Licenses & Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-highlight rounded-full mx-auto" />
          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
            Continuous learning and skill validation through industry-recognized programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl group relative overflow-hidden"
            >
              <div className={cn(
                "absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity",
                cert.color
              )} />
              
              <div className="flex items-start justify-between mb-4 mt-2">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                  cert.color
                )}>
                  <cert.icon size={24} className="text-white" />
                </div>
                <div className="p-2 rounded-full bg-accent/10 border border-text/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <Award size={18} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-text group-hover:text-accent transition-colors">
                {cert.title}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent font-medium text-sm">{cert.issuer}</span>
                <span className="text-muted text-xs font-mono">{cert.date}</span>
              </div>
              
              <p className="text-muted text-sm leading-relaxed mb-6">
                {cert.description}
              </p>

              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-auto text-sm font-semibold text-muted hover:text-accent transition-colors group/btn"
                >
                  View Certificate
                  <ExternalLink size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
