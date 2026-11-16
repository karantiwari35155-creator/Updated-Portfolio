import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from "lucide-react";

// Keep Swiper strictly for the Mobile/Tablet fallback
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const PROJECTS = [
  {
    id: 9,
    title: "Jewellery E-Commerce Admin Dashboard",
    description: "Building a MERN-based e-commerce admin dashboard for a 925 sterling silver jewellery brand. JWT auth, Cloudinary/Multer image pipelines, 28+ dashboard pages. Backend complete; frontend in progress with React (Vite) and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Node.js", "Express", "MongoDB", "React", "JWT", "Cloudinary"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 1,
    title: "RocketPro Tech Solutions",
    description: "Shipped a 10-page business website for a real client with a Gemini API-powered chatbot, filterable product catalogue, 3-tier AMC pricing, and a full local SEO structure (meta tags, schema markup, sitemap). Live since March 2026.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["HTML5", "CSS3", "JavaScript", "Gemini API", "SEO"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "https://rocketprotechsolutions.com",
  },
  {
    id: 2,
    title: "WanderStay Booking",
    description: "End-to-end Airbnb-inspired booking platform with session/cookie-based authentication, property CRUD, reviews & star-rating system, Cloudinary/Multer image uploads with CDN delivery, and location/price/category search with optimized MongoDB queries.",
    image: "/img/Full-stack Web App WanderLust.png",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Cloudinary", "JWT"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "https://airbnb-clone-project-1-2h3n.onrender.com/listings",
  },
  {
    id: 3,
    title: "Sparkal Dantalaya",
    description: "Designed and delivered a modern, responsive website for a dental clinic client using HTML5, CSS3, JS, Bootstrap and EmailJS contact form integration.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["HTML5", "Bootstrap", "JavaScript", "EmailJS"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 4,
    title: "AI Automation Workflows",
    description: "Designed multi-step automation pipelines in n8n connecting LLM APIs for automated email responses and data extraction.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["n8n", "OpenAI API", "Webhooks"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 8,
    title: "Spotify Clone",
    description: "A fully functional Spotify clone with music playback, playlists, and a sleek user interface.",
    image: "/img/Spotify Clone.png",
    tags: ["React", "Tailwind CSS", "Context API"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 5,
    title: "Photography Showcase",
    description: "A stunning, responsive photography gallery featuring modern masonry layouts, image viewing, and UI shortcuts.",
    image: "/img/Photography.png",
    tags: ["React", "UI/UX", "Tailwind CSS"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 6,
    title: "Simon Says Game",
    description: "A classic memory game built with interactive UI, sound effects, and progressive difficulty levels.",
    image: "/img/Simon sayz Game.png",
    tags: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "#",
  },
  {
    id: 7,
    title: "Portfolio v1",
    description: "Built fully responsive personal portfolio showcasing 10+ projects, skills, and certifications with 13 public GitHub repositories.",
    image: "/img/Portfolio.png",
    tags: ["React", "HTML5", "CSS3", "Vercel"],
    github: "https://github.com/karantiwari35155-creator",
    demo: "https://karan-tiwari-portfolio.vercel.app",
  }
];

export function Projects() {
  const [items, setItems] = useState(PROJECTS);
  const isScrolling = useRef(false);

  // Array Rotation logic for the cinematic slider effect
  const handleNext = () => {
    setItems((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  // 2-Finger Trackpad Swipe Logic
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling.current) return;
    
    if (Math.abs(e.deltaX) > 20) {
      isScrolling.current = true;
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        isScrolling.current = false;
      }, 700); // Throttle to match animation speed
    }
  };

  // The Active Project is ALWAYS items[0]
  const activeProject = items[0];

  return (
    <section id="projects" className="py-24 bg-background relative">
      <div className="container mx-auto px-2 lg:px-4 max-w-[1600px]">
        
        {/* Featured Projects Heading */}
        <motion.div 
          className="text-left mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-text drop-shadow-md">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-highlight rounded-full mt-4" />
        </motion.div>

        {/* 
          =============================================
          DESKTOP VIEW: EXACT Array-Rotation Layout
          =============================================
        */}
        <div 
          className="hidden lg:block relative w-full h-[650px] rounded-[2rem] overflow-hidden shadow-2xl bg-black border border-white/10 select-none"
          onWheel={handleWheel}
        >
          
          {/* 1. Dynamic Background Image */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${activeProject.id}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={activeProject.image} 
                alt="background" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* 2. Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0 pointer-events-none" />

          {/* 3. Static Fixed Left Content */}
          <div className="absolute inset-y-0 left-0 w-[50%] z-10 p-8 md:p-12 xl:px-14 xl:py-16 flex flex-col justify-center pointer-events-none">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`text-${activeProject.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="pointer-events-auto"
              >
                <h2 className="text-5xl xl:text-6xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-xl">
                  {activeProject.title}
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-lg">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {activeProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {activeProject.github !== "#" && (
                    <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white hover:text-black transition-colors rounded-full border border-white/30 backdrop-blur-md font-semibold text-sm text-white">
                      <GitBranch size={18} /> GitHub Code
                    </a>
                  )}
                  {activeProject.demo !== "#" && (
                    <a href={activeProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4. Navigation Buttons (Bottom Center matching image) */}
          <div className="absolute bottom-10 left-[45%] z-20 flex gap-4 pointer-events-auto">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-black hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/30 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-lg active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* 5. The Small Thumbnails Container (Exactly 3 cards visible) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-10 z-20 flex gap-6 pointer-events-none">
            <AnimatePresence mode="popLayout">
              {items.slice(1, 4).map((item) => (
                <motion.div
                  layout // This magically animates them shifting left/right!
                  key={`thumb-${item.id}`}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-[200px] xl:w-[240px] h-[300px] xl:h-[360px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 relative cursor-pointer group pointer-events-auto bg-surface"
                  onClick={() => {
                    // Clicking a thumbnail smoothly shifts the array
                    handleNext();
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-6 left-4 right-4">
                    <h4 className="text-white font-bold text-lg drop-shadow-md text-center line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

        {/* 
          =============================================
          MOBILE / TABLET VIEW
          =============================================
        */}
        <div className="block lg:hidden relative w-full h-[600px]">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            spaceBetween={20}
            mousewheel={{ forceToAxis: true }}
            modules={[EffectCoverflow, Mousewheel]}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            className="w-full h-full pb-8"
          >
            {PROJECTS.map((project) => (
              <SwiperSlide key={project.id} className="w-full h-full">
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group bg-black">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      {project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full text-white"><GitBranch size={16}/></a>
                      )}
                      {project.demo !== "#" && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-black"><ExternalLink size={16}/></a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center text-white/40 text-xs mt-4 font-medium uppercase tracking-wider">
            Swipe left/right
          </div>
        </div>

      </div>
    </section>
  );
}
