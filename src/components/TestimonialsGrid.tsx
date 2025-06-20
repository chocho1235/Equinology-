import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Thompson",
    role: "Marketing Director",
    company: "Elite Equestrian",
    content: "Working with Equinology was a game-changer for our business. Their attention to detail and understanding of the equestrian industry is unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "James Wilson",
    role: "Owner",
    company: "Wilson Stables",
    content: "The website they created exceeded our expectations. Professional, modern, and perfectly aligned with our brand vision.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "Emma Davis",
    role: "CEO",
    company: "Davis Dressage",
    content: "From concept to execution, their team delivered excellence at every step. The results have been transformative for our business.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  }
];

const TestimonialsGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDgwODA4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxNTE1MTUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-2 text-[#3CAAFF] text-sm font-medium tracking-wider uppercase mb-4 justify-center">
            <span className="h-px w-8 bg-gradient-to-r from-[#3CAAFF] to-transparent"></span>
            <span>Client Testimonials</span>
            <span className="h-px w-8 bg-gradient-to-l from-[#3CAAFF] to-transparent"></span>
          </div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-[#94a3b8]/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#111111]/70 backdrop-blur-md rounded-2xl p-8 border border-[#3CAAFF]/10 relative group hover:border-[#3CAAFF]/30 transition-colors duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -right-4 bg-[#3CAAFF]/10 p-3 rounded-full">
                <Quote className="w-6 h-6 text-[#3CAAFF]" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3CAAFF] fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-[#94a3b8]/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3CAAFF]/20"
                />
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-[#94a3b8]/70 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGrid; 