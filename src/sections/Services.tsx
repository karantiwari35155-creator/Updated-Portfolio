import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layout, Server, Database, Bot } from "lucide-react";
import React from "react";

const SERVICES = [
  {
    icon: Layout,
    title: "Frontend Development",
    description: "Creating beautiful, responsive, and interactive user interfaces using React, Tailwind CSS, and Framer Motion.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Building robust, scalable server-side applications and RESTful APIs using Node.js and Express.",
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Database,
    title: "Full Stack Development",
    description: "End-to-end web application development combining modern frontend frameworks with solid backend architectures.",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Implementing AI features and utilizing LLM APIs to create smart, next-generation web applications.",
    color: "from-orange-500 to-amber-400"
  }
];

function TiltCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full glass-card p-8 rounded-2xl relative group cursor-pointer border border-text/10 hover:border-accent/40 transition-colors"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none" 
             style={{ background: `var(--${service.color})` }} />
        
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
            <div className="w-full h-full bg-surface rounded-xl flex items-center justify-center">
              <service.icon size={28} className="text-accent" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-text group-hover:text-accent transition-colors">
            {service.title}
          </h3>
          <p className="text-muted leading-relaxed">
            {service.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-surface/10 border-t border-b border-text/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">What I Do</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-highlight rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
