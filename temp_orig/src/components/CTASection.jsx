import React from 'react';
import { motion } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      id="trial"
      className="relative w-full py-20 bg-white overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none" />

      <div className="absolute left-0 right-0 h-[1px] bg-neutral-200/50 animate-grid-scan pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center">

        {/* Core Header conforming to spacing rule */}
        <div className="max-w-3xl select-none text-center">
          <div className="inline-flex items-center space-x-2 border border-black bg-neutral-50 px-3.5 py-1 text-[12px] font-mono font-bold uppercase tracking-wider text-black mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Unified Business Operating Ecosystem</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-black leading-none"
          >
            Ready To Work Smarter?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-brand-gray-dark text-[16px] font-normal space-y-1 leading-relaxed max-w-xl mx-auto mt-4 mb-14"
          >
            <p>Store smarter with <strong className="text-black font-semibold">FileX</strong>.</p>
            <p>Collaborate better with <strong className="text-black font-semibold">FusionX</strong>.</p>
            <p className="text-neutral-400 text-xs mt-2 font-normal">Grow without complexity.</p>
          </motion.div>
        </div>

        {/* Dynamic Merge Visual: FileX + FusionX = Connected Workspace */}
        <div className="w-full max-w-3xl border border-brand-border p-6 md:p-8 bg-brand-gray-light/30 relative flex flex-col lg:flex-row items-center justify-between gap-8 select-none mb-12">

          {/* FileX Panel Card */}
          <div className="w-full lg:w-5/12 border border-brand-border bg-white p-4 space-y-4 hover:border-black transition-colors relative group">
            <div className="absolute -top-3 -left-3 bg-white border border-brand-border p-1">
              <FileXIcon className="w-5 h-5 text-black" />
            </div>
            <span className="text-[10px] font-mono text-brand-gray-dark block uppercase tracking-wider">Storage Node</span>
            <div className="border border-brand-border p-2 bg-brand-gray-light text-[10px] space-y-1">
              <p className="font-semibold text-black">shared_ledger_hash.json</p>
              <div className="flex justify-between text-brand-gray-dark text-[8px]">
                <span>Size: 1.4 MB</span>
                <span>Active</span>
              </div>
            </div>
          </div>

          {/* Merge center flow lines */}
          <div className="w-full lg:w-2/12 flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 100 24" className="w-12 h-6 hidden lg:block text-neutral-400" fill="none">
              <path d="M0,12 L100,12" stroke="currentColor" strokeWidth="1.5" className="animate-flow-dash" strokeDasharray="6 3" />
              <path d="M90,7 L100,12 L90,17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
              SYNC
            </span>
          </div>

          {/* FusionX Panel Card */}
          <div className="w-full lg:w-5/12 border border-black bg-neutral-950 text-white p-4 space-y-4 relative group">
            <div className="absolute -top-3 -right-3 bg-black border border-black p-1 text-white">
              <FusionXIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">Workflow Action</span>
            <div className="border border-neutral-800 p-2 bg-neutral-900 text-[10px] space-y-1">
              <p className="font-semibold text-white font-mono">fusionx_across_suite_flow</p>
              <div className="flex justify-between text-neutral-400 text-[8px]">
                <span>Step: Suite_Schedule</span>
                <span className="text-white font-bold">RUNNING</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Pulsing Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <a
            href="#trial-start"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-5 bg-black text-white font-semibold text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-neutral-800 border border-black hover:px-12 active:scale-98 animate-[pulse_3s_infinite]"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
