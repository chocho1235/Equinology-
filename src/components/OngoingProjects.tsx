import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, Shield, Zap, Wifi, Plane, Droplets, BarChart3, 
  Video, Stethoscope, Clock, Calendar, Users, Target, TrendingUp,
  Smartphone, Brain, Globe, Database, Cloud, Cpu, Satellite,
  Activity, Bell, Lock, Eye, Compass, Leaf, Sprout, Sun, ArrowRight,
  Network, Layers, GitBranch, Hexagon, Triangle, Square, Code,
  Rocket, ExternalLink, Play, Pause, ChevronRight
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AI-Powered Equine Marketplace",
    subtitle: "FindMyHorse.co.uk",
    description: "Revolutionary platform connecting horse enthusiasts with their perfect companions through advanced AI matching.",
    status: "In Development",
    progress: 75,
    category: "Marketplace",
    color: "from-blue-500 to-purple-600",
    accent: "blue",
    icon: Search,
    metrics: {
      users: "2.5K+",
      matches: "500+",
      success: "92%"
    },
    tags: ["AI/ML", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Smart Agricultural Platform",
    subtitle: "AgriTech Solutions",
    description: "IoT-integrated farming platform with predictive analytics for optimal crop management and sustainable agriculture.",
    status: "Beta Testing",
    progress: 60,
    category: "AgTech",
    color: "from-green-500 to-emerald-600",
    accent: "green",
    icon: Leaf,
    metrics: {
      farms: "150+",
      sensors: "1.2K+",
      efficiency: "+35%"
    },
    tags: ["IoT", "Python", "TensorFlow", "AWS"]
  },
  {
    id: 3,
    title: "Veterinary Telemedicine",
    subtitle: "EquiVet Connect",
    description: "24/7 equine healthcare platform with AI diagnostics and real-time professional consultations.",
    status: "Planning",
    progress: 25,
    category: "HealthTech",
    color: "from-red-500 to-pink-600",
    accent: "red",
    icon: Stethoscope,
    metrics: {
      vets: "50+",
      response: "<15min",
      coverage: "24/7"
    },
    tags: ["WebRTC", "React Native", "Firebase", "AI"]
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
        
        {/* Content */}
        <div className="relative p-6">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${project.color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            <div>
              <span className="text-white/50 text-sm">{project.category}</span>
              <h3 className="text-lg font-semibold text-white">
                {project.subtitle}
              </h3>
            </div>
          </div>

          {/* Title & Description */}
          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-3 leading-tight">
              {project.title}
            </h4>
            <p className="text-white/60 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Status */}
          <div className="mb-4">
            <span className="text-xs text-white/50">Status: </span>
            <span className="text-sm text-white/80">{project.status}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OngoingProjects = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+CjwvnZnPgo=')] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
          >
            <Rocket className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-medium">Current Projects</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">
              Innovation in
            </span>
            <br />
            <span className="text-white/60">
              Progress
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed"
          >
            Take a look at what we're building right now.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <div className="text-white/60">Active Projects</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">19</div>
              <div className="text-white/60">Team Members</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">2.7K+</div>
              <div className="text-white/60">Users Impacted</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">12+</div>
              <div className="text-white/60">Technologies</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OngoingProjects; 