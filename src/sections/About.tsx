import { motion } from "framer-motion";
import { Code2, Target, Zap, Coffee } from "lucide-react";

const STATS = [
  { icon: Code2, value: "13+", label: "GitHub Repos" },
  { icon: Target, value: "2", label: "Live Client Sites" },
  { icon: Zap, value: "Black Belt", label: "5x National Qualifier" },
  { icon: Coffee, value: "Open", label: "Internship Ready" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Who I Am</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-highlight rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Professional Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert"
          >
            <p className="text-xl text-text/90 leading-relaxed mb-6 font-medium">
              I'm Karan Tiwari, a Full Stack Developer (MERN) & AI-Integrated Web Applications specialist, currently pursuing BCA at JSS College of Arts, Commerce & Science, Mysuru with a CGPA of 8.98/10.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              I specialize in building production-grade web apps using the MERN stack (MongoDB, Express.js, React, Node.js) with JWT auth, Cloudinary media pipelines, and AI/LLM integration via OpenAI API and Gemini API. I've delivered complete client websites and complex full-stack platforms from scratch. Certified in Generative AI, AWS Solutions Architecture, and Cybersecurity.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Beyond the keyboard, I am a Karate Black Belt and 5x National Qualifier representing Karnataka and India at international level. This discipline and focus translate directly into my engineering approach.
            </p>
            <p className="text-muted leading-relaxed">
              I have 13+ public GitHub repositories spanning full stack, game dev, and UI clones. I'm currently seeking a Full Stack / Backend internship — open to roles in Mysuru, Bangalore, or Remote.
            </p>
          </motion.div>

          {/* Right: Animated Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <stat.icon size={28} />
                </div>
                <div className="text-3xl font-bold font-heading mb-2 text-gradient">
                  {stat.value}
                </div>
                <div className="text-muted font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 -right-[20%] w-[40%] aspect-square rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
    </section>
  );
}
