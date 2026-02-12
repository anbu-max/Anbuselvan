"use client";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side: Typography & Text */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8 relative"
            >
                {/* Background Typography */}
                <div className="absolute -top-16 md:-top-24 -left-10 md:-left-20 pointer-events-none select-none z-0">
                    <motion.h2 
                        className="text-[5rem] md:text-[12rem] font-black uppercase tracking-tighter leading-none text-white/5 whitespace-nowrap"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 0.05 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        Say Hello!
                    </motion.h2>
                </div>
                
                <div className="relative z-10 pt-10 md:pt-20">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">Let's work together</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                        Ready to elevate your code base to new heights? Experience the exceptional expertise of a skilled mentor who effortlessly propels projects to the next level. Let's partner with your needs to maximize your code's potential. Don't miss out on this opportunity!
                    </p>

                    <div className="flex gap-4 pt-8">
                        <a href="mailto:anbuselvan.devz@gmail.com" className="text-lg font-medium border-b border-foreground hover:text-brand-blue hover:border-brand-blue transition-colors">
                            anbuselvan.devz@gmail.com
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 viewport={{ once: true }}
                 className="bg-secondary/5 p-6 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm"
            >
                <form className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-muted-foreground font-normal">Your name here</Label>
                        <Input 
                            id="name" 
                            placeholder="Type your name..." 
                            className="bg-black/40 border-0 border-b border-white/20 rounded-none px-4 py-6 focus-visible:ring-0 focus-visible:border-brand-blue text-lg placeholder:text-white/20 transition-colors backdrop-blur-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-muted-foreground font-normal">Your email here</Label>
                        <Input 
                            id="email" 
                            type="email"
                            placeholder="Type your email..." 
                            className="bg-black/40 border-0 border-b border-white/20 rounded-none px-4 py-6 focus-visible:ring-0 focus-visible:border-brand-blue text-lg placeholder:text-white/20 transition-colors backdrop-blur-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interest" className="text-muted-foreground font-normal">What are you interested in?</Label>
                        <Select>
                            <SelectTrigger className="bg-black/40 border-0 border-b border-white/20 rounded-none px-4 py-8 focus:ring-0 focus:border-brand-blue text-lg text-left shadow-none backdrop-blur-sm">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="web-dev">Web Development</SelectItem>
                                <SelectItem value="mentorship">Mentorship</SelectItem>
                                <SelectItem value="consulting">Consulting</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-muted-foreground font-normal">Resume it in a few words</Label>
                        <Textarea 
                            id="message" 
                            placeholder="Tell me about your project..." 
                            className="bg-black/40 border-0 border-b border-white/20 rounded-none px-4 py-6 min-h-[100px] resize-none focus-visible:ring-0 focus-visible:border-brand-blue text-lg placeholder:text-white/20 transition-colors backdrop-blur-sm"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-gray-200 transition-colors">
                            Send Message <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
