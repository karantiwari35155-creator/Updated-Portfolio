import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

const SKILL_CATEGORIES = ["Frontend", "Backend", "Languages", "Tools & Cloud", "AI"];

const SKILLS_DATA = [
  { name: "React / HTML5 / CSS3", level: 90, category: "Frontend", description: "Modern UI, Hooks, Components, Vite" },
  { name: "JavaScript (ES6+)", level: 88, category: "Frontend", description: "DOM, Async/Await, REST" },
  { name: "Tailwind CSS / Bootstrap", level: 92, category: "Frontend", description: "Responsive/Mobile-First Design" },
  
  { name: "Node.js & Express.js", level: 85, category: "Backend", description: "REST APIs, Middleware, Custom Hooks" },
  { name: "MongoDB (Atlas)", level: 80, category: "Backend", description: "NoSQL, Mongoose, Aggregation, Atlas" },
  { name: "MySQL", level: 72, category: "Backend", description: "Relational modeling, SQL queries" },
  { name: "JWT / Session Auth", level: 82, category: "Backend", description: "Secure API Key Management, Cookie Auth" },
  
  { name: "JavaScript", level: 88, category: "Languages", description: "Full-stack ecosystem" },
  { name: "Python", level: 75, category: "Languages", description: "NumPy, Pandas, scripting" },
  { name: "Java & C++", level: 72, category: "Languages", description: "OOP, DSA (50+ problems in Java)" },
  
  { name: "Git & GitHub", level: 88, category: "Tools & Cloud", description: "Version control, 13+ public repos" },
  { name: "Vercel / Render", level: 85, category: "Tools & Cloud", description: "Deployment & Hosting" },
  { name: "Cloudinary / Multer", level: 82, category: "Tools & Cloud", description: "Image uploads, CDN, resizing" },
  { name: "Postman / EmailJS / n8n", level: 80, category: "Tools & Cloud", description: "API testing, email & automation" },

  { name: "Gemini API & OpenAI API", level: 82, category: "AI", description: "Chatbots, Prompt Engineering" },
  { name: "Generative AI Integration", level: 80, category: "AI", description: "AI/LLM-powered web features" },
  { name: "Agentic AI Workflows", level: 75, category: "AI", description: "Multi-step AI pipelines (n8n)" },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const filteredSkills = SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative min-h-screen py-24 bg-surface/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Technical Arsenal</h2>
          <p className="text-muted max-w-2xl text-lg mx-auto md:mx-0">
            A comprehensive overview of my technical skills and the tools I use to build scalable web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Categories */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {SKILL_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-4 rounded-xl font-medium text-left transition-all relative overflow-hidden whitespace-nowrap md:whitespace-normal flex-shrink-0 md:flex-shrink",
                  activeCategory === category 
                    ? "text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]" 
                    : "text-muted hover:text-text hover:bg-text/5 bg-surface/50 border border-text/10"
                )}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-highlight -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>

          {/* Right: Skill Cards */}
          <div className="md:col-span-8 lg:col-span-9 min-h-[400px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glass-card rounded-xl p-6 relative overflow-hidden group"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-text group-hover:text-accent transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-muted">{skill.description}</p>
                    </div>

                    <div className="h-2 w-full bg-text/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accent to-highlight rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating Tech Cloud */}
        <div className="mt-24 pt-12 border-t border-white/10 relative overflow-hidden h-32 flex items-center justify-center opacity-50">
           <div className="flex gap-12 whitespace-nowrap animate-marquee">
              {[...SKILLS_DATA, ...SKILLS_DATA].map((skill, i) => (
                 <span key={`${skill.name}-${i}`} className="text-2xl font-bold font-heading text-muted">
                    {skill.name}
                 </span>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
