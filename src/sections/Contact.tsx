import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../utils/cn";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // NOTE: Using Web3Forms for zero-backend email delivery.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // You need to replace this key with your own from https://web3forms.com/
          access_key: "5172cf80-71cc-49d6-b986-d06d48ea232e",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        alert("Failed to send message: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Let's Build Something <span className="text-gradient">Amazing</span> Together
            </h2>
            <p className="text-lg text-muted mb-10 max-w-md">
              Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted font-medium uppercase tracking-wider">Email</div>
                  <a href="mailto:karantiwari35155@gmail.com" className="text-lg font-medium hover:text-accent transition-colors">
                    karantiwari35155@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-accent">
                  <span className="font-bold font-mono">Ph</span>
                </div>
                <div>
                  <div className="text-sm text-muted font-medium uppercase tracking-wider">Phone</div>
                  <a href="tel:+917676137780" className="text-lg font-medium hover:text-accent transition-colors">
                    +91 7676137780
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted font-medium uppercase tracking-wider">Location</div>
                  <div className="text-lg font-medium">Mysore, Karnataka</div>
                </div>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 bg-accent/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Open for Internships & Freelance</span>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="glass-card p-8 md:p-10 rounded-3xl border border-text/10 relative overflow-hidden"
            >
              {/* Success Overlay */}
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="absolute inset-0 bg-surface/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl"
                >
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 size={64} className="text-green-500 mb-4 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              )}

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted ml-1">Name</label>
                    <input
                      id="name"
                      {...register("name")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-surface border text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
                        errors.name ? "border-red-500" : "border-text/15 hover:border-accent/50"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted ml-1">Email</label>
                    <input
                      id="email"
                      {...register("email")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-surface border text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
                        errors.email ? "border-red-500" : "border-text/15 hover:border-accent/50"
                      )}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-muted ml-1">Subject</label>
                  <input
                    id="subject"
                    {...register("subject")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-surface border text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
                      errors.subject ? "border-red-500" : "border-text/15 hover:border-accent/50"
                    )}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="text-red-500 text-xs ml-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted ml-1">Message</label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-surface border text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none",
                      errors.message ? "border-red-500" : "border-text/15 hover:border-accent/50"
                    )}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
