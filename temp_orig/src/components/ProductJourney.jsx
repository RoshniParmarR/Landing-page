import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import {
  Database, Users, Share2, Play,
  ArrowRight, FileSpreadsheet, Send, Terminal
} from 'lucide-react';
import filexDashboardImg from '../Assets/filex_dashboard.png';
import fusionxWorkflowImg from '../Assets/fusionx_workflow.png';

export default function ProductJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      title: 'Store Files In FileX',
      desc: 'Documents, assets, and spreadsheets are ingested into our encrypted vault. Auto-tagging starts immediately.',
      icon: Database,
    },
    {
      title: 'Access Across Teams',
      desc: 'File permissions are configured instantly. Teams get immediate, controlled access based on active directory profiles.',
      icon: Share2,
    },
    {
      title: 'Connect Across Suite',
      desc: 'Link MailX, WaX, and CRM leads. Access unified contact details and draft summaries in NoteX/WebX instantly.',
      icon: Users,
    },
    {
      title: 'Automate Tasks',
      desc: 'Schedule planning meetings, update tasks, and send automated invitations to team members dynamically.',
      icon: Play,
    },
    {
      title: 'Achieve Results',
      desc: 'Manual tasks drop by 90%. Speed and compliance scale together seamlessly with absolute security.',
      icon: Terminal,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full py-20 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className=" mb-14 max-w-2xl select-none">
          <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-brand-gray-dark mb-3">
            Ecosystem Pipeline
          </p>
          <h2 className="section-heading text-black">
            From File To Action.
          </h2>
        </div>

        {/* Timeline Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">

          {/* Left Column: Interactive Steps Timeline */}
          <div className="lg:col-span-7 relative pl-8 select-none">

            <div className="absolute left-[10px] top-[10px] bottom-[10px] w-[2px] bg-brand-gray-mid">
              <div
                className="w-full bg-black transition-all duration-700 ease-out"
                style={{
                  height: `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="relative flex items-start space-x-6 cursor-pointer group"
                  >
                    <div
                      className={`absolute left-[-32px] top-1.5 w-6 h-6 border flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-black border-black text-white scale-110'
                        : 'bg-white border-brand-border text-brand-gray-dark group-hover:border-black'
                        }`}
                    >
                      <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className={`text-sm md:text-base font-display font-medium uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-black' : 'text-brand-gray-dark group-hover:text-black'
                        }`}>
                        {step.title}
                      </h3>
                      <p className={`text-[16px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-black' : 'text-neutral-400'
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
            <div className="w-full max-w-md border border-brand-border p-6 bg-brand-gray-light/30 shadow-lg min-h-[300px] flex flex-col justify-between">

              <div className="flex items-center justify-between border-b border-brand-border pb-3 mb-6 select-none">
                <div className="flex items-center space-x-2">
                  {activeStep < 2 ? (
                    <FileXIcon className="w-5 h-5 text-black" />
                  ) : (
                    <FusionXIcon className="w-5 h-5 text-black" />
                  )}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    {activeStep < 2 ? 'FileX // INGEST' : 'FusionX // DISPATCH'}
                  </span>
                </div>
                <span className="font-mono text-[8px] text-brand-gray-dark">
                  STEP 0{activeStep + 1}
                </span>
              </div>

              <div className="flex-grow flex flex-col justify-center h-64 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full relative border border-brand-border bg-white"
                  >
                    <img
                      src={activeStep < 2 ? filexDashboardImg : fusionxWorkflowImg}
                      alt="Pipeline Preview Screenshot"
                      className="w-full h-full object-cover object-top filter contrast-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center p-4">
                      <div className="bg-white/95 backdrop-blur-sm border border-black p-3.5 max-w-[240px] shadow-lg">
                        <p className="text-[8px] font-mono text-brand-gray-dark uppercase tracking-wider mb-1">
                          {activeStep < 2 ? 'FileX // INGEST' : 'FusionX // DISPATCH'}
                        </p>
                        <p className="text-[10px] font-mono font-bold text-black leading-snug">
                          {steps[activeStep].desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-3 border-t border-brand-border flex items-center justify-between text-[8px] font-mono text-brand-gray-dark select-none">
                <span>STAGE: {activeStep < 2 ? 'FILE_SYSTEM' : activeStep < 4 ? 'TEAM_COLLAB' : 'AUTOMATED_RESULT'}</span>
                <span className="text-black font-semibold">ONLINE // SYNCED</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
