import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Lightbulb,
  Code2,
  TestTube,
  Rocket,
  Zap,
  Layers,
  Palette,
  Monitor,
  Shield,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery & Planning",
    description: "We start with an in-depth consultation to understand your vision, goals, and requirements. Our team analyzes your needs and creates a detailed project roadmap.",
    subPoints: [
      "Requirements gathering and analysis",
      "Project scope definition",
      "Timeline and milestone planning",
      "Technology stack selection"
    ],
    color: "from-[#3CAAFF]/30 to-[#00E0FF]/30"
  },
  {
    icon: Palette,
    title: "Design & Architecture",
    description: "Our designers and architects work together to create a solid foundation for your project, ensuring both beauty and functionality.",
    subPoints: [
      "UI/UX design and wireframing",
      "System architecture planning",
      "Database schema design",
      "API endpoint mapping"
    ],
    color: "from-[#00E0FF]/30 to-[#93c5fd]/30"
  },
  {
    icon: Code2,
    title: "Development",
    description: "Using modern technologies and best practices, we bring your vision to life with clean, efficient, and scalable code.",
    subPoints: [
      "Agile development methodology",
      "Regular code reviews",
      "Continuous integration",
      "Progressive enhancement"
    ],
    color: "from-[#93c5fd]/30 to-[#3CAAFF]/30"
  },
  {
    icon: TestTube,
    title: "Testing & Quality Assurance",
    description: "Rigorous testing across multiple devices and scenarios ensures your project works flawlessly for all users.",
    subPoints: [
      "Automated testing suite",
      "Cross-browser compatibility",
      "Performance optimisation",
      "Security testing"
    ],
    color: "from-[#3CAAFF]/30 to-[#00E0FF]/30"
  },
  {
    icon: Rocket,
    title: "Deployment & Launch",
    description: "We handle the deployment process with care, ensuring a smooth transition from development to production.",
    subPoints: [
      "Infrastructure setup",
      "SSL certificate installation",
      "CDN configuration",
      "Performance monitoring"
    ],
    color: "from-[#00E0FF]/30 to-[#93c5fd]/30"
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Our commitment doesn't end at launch. We provide ongoing support and maintenance to ensure continued success.",
    subPoints: [
      "24/7 monitoring",
      "Regular updates and patches",
      "Performance optimisation",
      "Security audits"
    ],
    color: "from-[#93c5fd]/30 to-[#3CAAFF]/30"
  }
];

const ProcessSteps: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDgwODA4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxNTE1MTUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-2 text-[#3CAAFF]/70 text-sm font-medium tracking-wider uppercase mb-4 justify-center">
            <span className="h-px w-8 bg-gradient-to-r from-[#3CAAFF]/30 to-transparent"></span>
            <span>Our Process</span>
            <span className="h-px w-8 bg-gradient-to-l from-[#3CAAFF]/30 to-transparent"></span>
          </div>
          <h2 className="text-4xl font-bold text-white/90 mb-4">
            How We Work
          </h2>
          <p className="text-[#94a3b8]/60 max-w-2xl mx-auto">
            Our proven development process ensures consistent, high-quality results through every stage of your project.
          </p>
        </motion.div>

        <div className="grid gap-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-start gap-8">
                {/* Step number and icon */}
                <div className="w-20 h-20 shrink-0 mt-2">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                    <div className="w-full h-full bg-[#111111] rounded-2xl flex items-center justify-center relative">
                      <step.icon className="w-8 h-8 text-[#3CAAFF]/70" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center border border-[#3CAAFF]/10">
                        <span className="text-[#3CAAFF]/70 font-medium">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white/90 mb-3">{step.title}</h3>
                  <p className="text-[#94a3b8]/60 leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Sub points */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.subPoints.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-[#94a3b8]/60"
                      >
                        <ArrowRight className="w-4 h-4 text-[#3CAAFF]/50" />
                        <span>{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 top-24 w-0.5 h-24 bg-gradient-to-b from-[#3CAAFF]/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps; 