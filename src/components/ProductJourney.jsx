import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import {
  Database, Folder, MessageSquare, Mic, Terminal, ArrowRight
} from 'lucide-react';
import filexDashboardImg from '../Assets/filex_dashboard.png';
import filexOrganizeImg from '../Assets/filex_organize.png';
import fusionxWorkflowImg from '../Assets/fusionx_workflow.png';
import fusionxMediaImg from '../Assets/fusionx_media.png';
import fusionxVoiceImg from '../Assets/fusionx_voice.png';

export default function ProductJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [lineLayout, setLineLayout] = useState({ top: 18, totalHeight: 0, activeHeight: 0 });

  const stepImages = [
    filexDashboardImg,
    filexOrganizeImg,
    fusionxWorkflowImg,
    fusionxVoiceImg,
    fusionxMediaImg
  ];

  const steps = [
    {
      title: 'Store Documents in File X',
      desc: 'Upload spreadsheets, PDFs, and digital assets into a secure, centralized document vault.',
      icon: Database,
    },
    {
      title: 'Organize Folders',
      desc: 'Structure your files into hierarchical folders with strict zero-trust permissions for enhanced security.',
      icon: Folder,
    },
    {
      title: 'Prompt FusionX AI',
      desc: 'Use natural language prompts to summarize files, draft documentation, or generate new content effortlessly.',
      icon: MessageSquare,
    },
    {
      title: 'Speak to Command',
      desc: 'Dictate notes, issue commands, and create image or video outputs hands-free using voice prompting.',
      icon: Mic,
    },
    {
      title: 'Generate Assets',
      desc: 'Instantly produce high-quality graphics, copy drafts, and video assets all within a unified workspace.',
      icon: Terminal,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateLineLayout = () => {
      const firstEl = stepRefs.current[0];
      const lastEl = stepRefs.current[steps.length - 1];
      const activeEl = stepRefs.current[activeStep];
      if (firstEl && lastEl && activeEl) {
        const firstCenter = firstEl.offsetTop + 18;
        const lastCenter = lastEl.offsetTop + 18;
        const activeCenter = activeEl.offsetTop + 18;
        setLineLayout({
          top: firstCenter,
          totalHeight: lastCenter - firstCenter,
          activeHeight: activeCenter - firstCenter,
        });
      }
    };

    updateLineLayout();
    window.addEventListener('resize', updateLineLayout);
    return () => window.removeEventListener('resize', updateLineLayout);
  }, [activeStep]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-14 md:py-20 bg-white overflow-hidden"
    >

      <motion.div id="journey" className="scroll-mt-8 max-w-7xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >

        {/* Section Header */}
        <div className=" mb-7 max-w-2xl select-none">
          <p className="text-[12px]  uppercase tracking-widest text-brand-gray-dark mb-2">
            Ecosystem Pipeline
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="section-heading text-black"
          >
            FROM FILE TO ACTION
          </motion.h2>
        </div>

        {/* Timeline Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

          {/* Left Column: Interactive Steps Timeline */}
          <div className="lg:col-span-7 relative pl-10 select-none">

            <div
              className="absolute left-[10px] w-px bg-brand-gray-mid"
              style={{
                top: `${lineLayout.top}px`,
                height: `${lineLayout.totalHeight}px`,
              }}
            >
              <div
                className="w-full bg-brand-gray-dark transition-all duration-700 ease-out"
                style={{
                  height: `${lineLayout.activeHeight}px`,
                }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => (stepRefs.current[idx] = el)}
                    onClick={() => setActiveStep(idx)}
                    className="relative flex items-start space-x-6 cursor-pointer group"
                  >
                    <div
                      className={`absolute left-[-42px] top-1.5 w-6 h-6 border flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-black border-black text-white scale-110'
                        : idx < activeStep
                          ? 'bg-brand-gray-dark border-brand-gray-dark text-white'
                          : 'bg-white border-brand-border text-brand-gray-dark group-hover:border-black'
                        }`}
                    >
                      <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <h3 className={`text-sm md:text-base font-display font-medium uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-black' : 'text-brand-gray-dark group-hover:text-black'
                        }`}>
                        {step.title}
                      </h3>
                      <p className={`text-[16px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-brand-gray-dark' : 'text-neutral-400'
                        }`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Preview Panels */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md h-64 relative overflow-hidden border border-brand-border bg-white shadow-md group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full relative"
                >
                  <img
                    src={stepImages[activeStep]}
                    alt="Pipeline Preview Screenshot"
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.01] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-100"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
