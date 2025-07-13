import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, Heart, Shield, Zap, Wifi, Plane, Droplets, BarChart3, 
  Video, Stethoscope, Clock, Calendar, Users, Target, TrendingUp,
  Smartphone, Brain, Globe, Database, Cloud, Cpu, Satellite,
  Activity, Bell, Lock, Eye, Compass, Leaf, Sprout, Sun, ArrowRight,
  Network, Layers, GitBranch, Hexagon, Triangle, Square, Code,
  Rocket, ExternalLink, Play, Pause, ChevronRight, CheckCircle, ArrowDown
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Horse Listing Aggregator Platform",
    subtitle: "FindMyHorse.co.uk",
    description: "A centralized platform that aggregates horse listings from multiple selling platforms, making it easier for buyers to find horses and for sellers to reach more customers.",
    status: "Beta Testing",
    progress: 85,
    category: "Web Platform",
    color: "from-blue-500 to-purple-600",
    accent: "blue",
    icon: Search,
    metrics: {
      listings: "1.2K+",
      visits: "850+",
      inquiries: "340+"
    },
    tags: ["React", "Node.js", "PostgreSQL", "API Integration"],
    timeline: "Jan 2024 - Apr 2024"
  },
  {
    id: 2,
    title: "Farm Management Dashboard",
    subtitle: "AgriTrack Pro",
    description: "A comprehensive farm management system helping agricultural businesses track crops, livestock, and equipment with automated reporting and analytics.",
    status: "In Development",
    progress: 65,
    category: "AgTech",
    color: "from-green-500 to-emerald-600",
    accent: "green",
    icon: Leaf,
    metrics: {
      farms: "35+",
      records: "2.8K+",
      efficiency: "+28%"
    },
    tags: ["Vue.js", "Python", "MySQL", "Chart.js"],
    timeline: "Mar 2024 - Aug 2024"
  },
  {
    id: 3,
    title: "Veterinary Appointment System",
    subtitle: "VetConnect",
    description: "An online booking and management system for veterinary clinics, featuring appointment scheduling, client communications, and basic record management.",
    status: "Planning Phase",
    progress: 30,
    category: "Healthcare",
    color: "from-red-500 to-pink-600",
    accent: "red",
    icon: Stethoscope,
    metrics: {
      clinics: "12+",
      bookings: "450+",
      satisfaction: "94%"
    },
    tags: ["React", "Express.js", "MongoDB", "Socket.io"],
    timeline: "May 2024 - Oct 2024"
  }
];

const ProjectTimeline = ({ project, index }: { project: any, index: number }) => {
  const Icon = project.icon;
  const isEven = index % 2 === 0;
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Simple scroll-based animation for the timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"]
  });
  
  // Simple line progress animation
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={timelineRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative"
    >
      <div className={`flex items-center gap-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header */}
          <div className={`flex items-center gap-4 ${isEven ? 'justify-start' : 'justify-end'}`}>
            <div className="flex items-center gap-4">
              <motion.div 
                className={`p-4 rounded-3xl bg-gradient-to-br ${project.color} shadow-xl`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>
              <div className={`${isEven ? 'text-left' : 'text-right'}`}>
                <h3 className="text-3xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-[#3CAAFF] font-semibold text-lg">{project.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`${isEven ? 'text-left' : 'text-right'}`}>
            <p className="text-xl text-[#B8BCC4] leading-relaxed mb-6">
              {project.description}
            </p>
            <div className={`flex items-center gap-3 mb-6 ${isEven ? 'justify-start' : 'justify-end'}`}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3CAAFF]" />
                <span className="text-sm text-white/70">Timeline:</span>
                <span className="text-sm text-[#3CAAFF] font-medium">{project.timeline}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className={`flex justify-between items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  project.status === 'Beta Testing' ? 'bg-yellow-400' :
                  project.status === 'In Development' ? 'bg-blue-400' :
                  'bg-purple-400'
                }`} />
                <span className="text-sm text-white/90 font-medium">{project.status}</span>
              </div>
              <span className="text-lg text-[#3CAAFF] font-bold">{project.progress}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="h-3 bg-gradient-to-r from-[#3CAAFF] via-[#00E0FF] to-[#3CAAFF] rounded-full relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Enhanced Tags */}
          <div className={`flex flex-wrap gap-3 ${isEven ? 'justify-start' : 'justify-end'}`}>
            {project.tags.map((tag: string, tagIndex: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3CAAFF]/10 to-[#00E0FF]/10 border border-[#3CAAFF]/30 text-sm font-medium text-[#3CAAFF] backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </motion.div>
  );
};

const OngoingProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.3", "end 0.7"]
  });
  
  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#111111]/80 to-[#111111]/90 backdrop-blur-xl border border-[#3CAAFF]/30 shadow-[0_0_30px_rgba(60,170,255,0.1)] mb-12"
          >
            <Rocket className="w-6 h-6 text-[#3CAAFF]" />
            <span className="text-white/90 font-semibold text-base">Featured Projects</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold mb-8 leading-tight"
          >
            <span className="text-white">
              Innovation in{" "}
            </span>
            <span className="bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent">
              Progress
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-[#B8BCC4] max-w-4xl mx-auto leading-relaxed"
          >
            We're constantly building and improving solutions for our clients. Here are some of our current featured projects making real impact.
          </motion.p>
        </motion.div>

        {/* Projects Timeline */}
        <div className="relative space-y-24 mb-32">
          {/* Enhanced Scroll-Based Timeline Line */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-px h-full">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 w-1 bg-gradient-to-b from-[#3CAAFF]/40 to-[#00E0FF]/40 blur-sm -left-0.5"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            />
            
            {/* Main Timeline Line */}
            <motion.div
              className="relative w-full bg-gradient-to-b from-[#3CAAFF] via-[#00E0FF] to-[#3CAAFF] shadow-lg shadow-[#3CAAFF]/30"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
            />
            
            {/* Subtle Pulse Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/20 to-transparent"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Moving Arrow at Bottom */}
            <motion.div
              className="absolute w-6 h-6 -left-2.5 flex items-center justify-center"
              style={{
                top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
              }}
            >
              <div className="relative">
                {/* Arrow Glow */}
                <div className="absolute inset-0 rounded-full bg-[#3CAAFF]/30 blur-sm scale-150" />
                
                {/* Arrow Background */}
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#3CAAFF] to-[#00E0FF] shadow-lg shadow-[#3CAAFF]/50 flex items-center justify-center">
                  <ArrowDown className="w-3 h-3 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {projects.map((project, index) => (
            <ProjectTimeline key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3CAAFF]/5 to-[#00E0FF]/5 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-r from-[#111111]/50 to-[#111111]/80 backdrop-blur-sm rounded-3xl border border-[#3CAAFF]/20 p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent mb-3">20+</div>
                <div className="text-[#B8BCC4] text-lg">Active Projects</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent mb-3">19</div>
                <div className="text-[#B8BCC4] text-lg">Team Members</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent mb-3">50+</div>
                <div className="text-[#B8BCC4] text-lg">Clients Served</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] bg-clip-text text-transparent mb-3">98%</div>
                <div className="text-[#B8BCC4] text-lg">Success Rate</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OngoingProjects; 