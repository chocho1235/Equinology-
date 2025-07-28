"use client";

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useTheme } from "next-themes";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Shield,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Contact } from '../components/Contact';
import ProcessSteps from '../components/ProcessSteps';

// Lazy load the SwirlBackground component
const SwirlBackground = lazy(() => import('../components/background/SwirlBackground'));

const ContactHero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Swirl background */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="absolute inset-0 bg-[#0A0A0A]" />}>
          <SwirlBackground />
        </Suspense>
      </div>
      {/* Grid overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-[0.03] z-20"
      />
      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-1.5 text-sm font-medium border border-[#3CAAFF]/20 bg-[#3CAAFF]/5 rounded-full inline-flex items-center">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2 h-2 w-2 rounded-full bg-[#3CAAFF]"
                />
                <span className="text-[#3CAAFF]/90">Available for New Projects</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] via-white to-[#3CAAFF] leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Let's Create<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] to-[#93c5fd]">
                Something Amazing
              </span>
            </motion.h1>
            <motion.p
              className="text-lg text-[#94a3b8]/90 max-w-xl font-light leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Have a project in mind? We're here to turn your vision into reality. Our team combines creativity with
              technical expertise to deliver exceptional results.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#process"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A0A0A] bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] rounded-lg hover:shadow-lg hover:shadow-[#3CAAFF]/25 transition-all duration-300"
              >
                View Our Process
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:enquiries@equinology.co.uk"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-[#3CAAFF]/20 rounded-lg hover:bg-[#3CAAFF]/5 transition-all duration-300"
              >
                Contact Us
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
          {/* Right quick info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:pl-12"
          >
            <div className="bg-[#0A0A0A]/40 backdrop-blur-xl rounded-2xl border border-[#3CAAFF]/10 p-8">
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Us', value: 'enquiries@equinology.co.uk' },
                  { icon: Phone, label: 'Call Us', value: '+44 7493 303857' },
                  { icon: MapPin, label: 'Location', value: 'East Sussex, England' }
                ].map((info, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                  >
                    <div className="bg-[#3CAAFF]/10 p-3 rounded-xl">
                      <info.icon className="w-6 h-6 text-[#3CAAFF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white/90">{info.label}</h3>
                      <p className="text-[#94a3b8]/80 font-light">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator with dynamic opacity */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#94a3b8]/60 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-8 rounded-full bg-gradient-to-b from-[#3CAAFF]/30 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Benefits section
const Benefits = () => {
  const benefits = [
    { 
      icon: Calendar, 
      title: 'Swift & Efficient Delivery', 
      desc: 'We understand the value of your time. Most projects are completed within a week, with regular updates and transparent communication throughout the process.' 
    },
    { 
      icon: Users, 
      title: 'Passionate Expert Team', 
      desc: 'Our dedicated specialists bring years of experience and genuine enthusiasm to every project. We\'re not just developers – we\'re creative problem-solvers who care about your success.' 
    },
    { 
      icon: Shield, 
      title: 'Trusted & Secure Partnership', 
      desc: 'Your business is precious to us. We implement enterprise-grade security standards and maintain the highest levels of confidentiality, ensuring your data and projects are always protected.' 
    },
    { 
      icon: CheckCircle, 
      title: 'Excellence in Every Detail', 
      desc: 'We believe in doing things properly. Every project undergoes thorough testing, optimisation, and quality assurance to ensure it not only meets but exceeds your expectations.' 
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-2 text-[#3CAAFF] text-sm font-medium tracking-wider uppercase mb-4 justify-center">
            <span className="h-px w-8 bg-gradient-to-r from-[#3CAAFF] to-transparent"></span>
            <span>Why Choose Us</span>
            <span className="h-px w-8 bg-gradient-to-l from-[#3CAAFF] to-transparent"></span>
          </div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] mb-4">
            Benefits of Working With Us
          </h2>
          <p className="text-[#94a3b8]/80 max-w-2xl mx-auto">
            Experience the difference of working with a team that puts your success first.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111111]/70 backdrop-blur-md p-8 rounded-2xl border border-[#3CAAFF]/10 group hover:border-[#3CAAFF]/30 transition-all duration-300"
            >
              <div className="bg-[#3CAAFF]/10 p-4 rounded-xl w-fit mb-6 group-hover:bg-[#3CAAFF]/20 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-[#3CAAFF]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-[#94a3b8]/80">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <div className="bg-black min-h-screen">
    <ContactHero />
    <Contact />
    <Benefits />
    <ProcessSteps />
  </div>
);

export default ContactPage;