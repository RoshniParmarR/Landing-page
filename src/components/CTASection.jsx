import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import { ArrowRight, Sparkles } from 'lucide-react';
// import InstanceModal from './InstanceModal';
import CreateFusionSuiteModal from './CreateFusionSuiteModal';

export default function CTASection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="relative w-full py-14 md:py-20 bg-white overflow-hidden flex flex-col justify-center items-center"
    >

      <div id="trial" className="scroll-mt-8 max-w-5xl mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center">

        {/* Core Header conforming to spacing rule */}
        <div className="max-w-3xl select-none text-center">


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-black leading-none"
          >
            READY TO WORK SMARTER?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-brand-gray-dark text-[18px] font-normal space-y-1 leading-relaxed max-w-xl mx-auto mt-4 "
          >
            <p>Store smarter with <strong className="text-black font-medium">FileX</strong>. Collaborate better with <strong className="text-black font-medium">FusionX</strong>.</p>
            <p className="text-neutral-400 text-[16px] mt-2 font-normal">Grow without complexity.</p>
          </motion.div>

        </div>

        {/* CTA Pulsing Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full sm:w-auto"
        >
          <button
            onClick={() => setShowModal(true)}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-[24px] py-[10px] bg-black text-white font-medium text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-brand-gray-dark border border-brand-gray-dark"
          >
            <span>Start for Free Now</span>
          </button>
        </motion.div>

        {/* <InstanceModal open={showModal} onClose={() => setShowModal(false)} /> */}
        <CreateFusionSuiteModal
          open={showModal}
          onClose={() => setShowModal(false)}
        />

      </div>
    </section>
  );
}
