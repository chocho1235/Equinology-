import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDgwODA4Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxNTE1MTUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10" />

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
            <span>Our Location</span>
            <span className="h-px w-8 bg-gradient-to-l from-[#3CAAFF] to-transparent"></span>
          </div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3CAAFF] to-[#00E0FF] mb-4">
            Situated in the East Sussex Countryside
          </h2>
          <p className="text-[#94a3b8]/80 max-w-2xl mx-auto">
            We're based in the beautiful countryside of Battle, East Sussex, providing a peaceful environment for creativity and innovation.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Image - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#3CAAFF]/20">
              <img
                src="/lane edited xlol 2.jpg"
                alt="Countryside lane in Battle, East Sussex"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Location Info and Map */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-[#111111]/70 backdrop-blur-md p-8 rounded-2xl border border-[#3CAAFF]/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-[#3CAAFF]/10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-[#3CAAFF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Battle, East Sussex</h3>
                    <p className="text-[#94a3b8]/80 font-light">
                      We are situated in the picturesque East Sussex countryside, in the historic town of Battle.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-[#111111]/70 backdrop-blur-md p-8 rounded-2xl border border-[#3CAAFF]/10">
                <h3 className="text-xl font-semibold text-white mb-4">Find Us</h3>
                <div className="mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20087.97787310447!2d0.4862!3d50.9172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47df4b5b5b5b5b5%3A0x5b5b5b5b5b5b5b5!2sBattle%2C%20East%20Sussex!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};