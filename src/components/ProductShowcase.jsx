import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import {
  Database, Search, Share2, LayoutGrid,
  Users, Cpu, ArrowRight, FileText
} from 'lucide-react';
import filexDashboardImg from '../Assets/filex_dashboard.png';
import filexShareImg from '../Assets/filex_share.png';
import filexOrganizeImg from '../Assets/filex_organize.png';
import fusionxWorkflowImg from '../Assets/fusionx_workflow.png';
import fusionxMediaImg from '../Assets/fusionx_media.png';
import fusionxVoiceImg from '../Assets/fusionx_voice.png';

export default function ProductShowcase() {
  const [filexTab, setFilexTab] = useState('store');
  const [fusionxTab, setFusionxTab] = useState('chat');

  // Auto-slide FileX tabs every 5 seconds
  useEffect(() => {
    const keys = Object.keys(filexFeatures);
    const timer = setTimeout(() => {
      setFilexTab((prev) => {
        const currentIndex = keys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % keys.length;
        return keys[nextIndex];
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [filexTab]);

  // Auto-slide FusionX tabs every 5 seconds
  useEffect(() => {
    const keys = Object.keys(fusionxFeatures);
    const timer = setTimeout(() => {
      setFusionxTab((prev) => {
        const currentIndex = keys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % keys.length;
        return keys[nextIndex];
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [fusionxTab]);

  const filexFeatures = {
    store: {
      title: 'Store',
      desc: 'Enterprise-grade secure document vault designed to safeguard your critical files with robust encryption and seamless access.',
      badge: 'Encrypted',
      img: filexDashboardImg,
    },
    share: {
      title: 'Share',
      desc: 'Effortlessly collaborate by sharing files and folders with granular permission controls.',
      badge: 'Secure',
      img: filexShareImg,
    },
    organize: {
      title: 'Organize',
      desc: 'Intuitively manage nested files and folders in a hierarchical structure for maximum clarity and efficiency.',
      badge: 'Explorer',
      img: filexOrganizeImg,
    }
  };

  const fusionxFeatures = {
    chat: {
      title: 'Chat & Prompts',
      desc: 'Engage with a powerful AI assistant that understands natural language to help draft documentation, generate content, and brainstorm ideas instantly.',
      badge: 'AI Writer',
      img: fusionxWorkflowImg,
    },
    media: {
      title: 'Image & Video',
      desc: 'Create high-fidelity graphics, design assets, and marketing videos directly from text prompts to accelerate your creative workflows.',
      badge: 'Generative',
      img: fusionxMediaImg,
    },
    voice: {
      title: 'Voice Prompts',
      desc: 'Use voice commands to dictate notes, issue instructions, and generate AI-driven outputs hands-free for ultimate productivity.',
      badge: 'Voice AI',
      img: fusionxVoiceImg,
    }
  };

  return (
    <section className="relative w-full py-14 md:py-20 bg-white overflow-hidden">

      <motion.div id="showcase" className="scroll-mt-8 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2  relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >

        {/* Section Header */}
        <div className=" mb-7 select-none col-span-1 lg:col-span-2">
          <p className="text-[12px]  uppercase tracking-widest text-brand-gray-dark mb-2">
            Ecosystem Presenter
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="section-heading text-black"
          >
            FILEX & FUSIONX
          </motion.h2>
        </div>

        {/* Left Column: FileX Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-brand-border p-6 md:p-8 bg-white flex flex-col"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
            <div className="flex items-center space-x-2">
              <FileXIcon className="w-7 h-7 text-black" />
              <span className="font-display font-medium text-lg uppercase tracking-tight">FileX</span>
            </div>
            <span className="text-[10px] border border-brand-gray-dark text-brand-gray-dark px-2 py-0.5 tracking-wider font-semibold w-max">
              Manage Information
            </span>
          </div>

          {/* Feature Selectors (Responsive Grid) */}
          <div
            role="tablist"
            aria-label="FileX features"
            className="grid grid-cols-3 border border-brand-border text-center"
          >
            {Object.keys(filexFeatures).map((key) => {
              const isActive = filexTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`filex-panel-${key}`}
                  id={`filex-tab-${key}`}
                  onClick={() => setFilexTab(key)}
                  className="relative py-2.5 text-[11px] sm:text-xs md:text-[14px] font-semibold uppercase tracking-wider border-r border-b sm:border-b-0 border-brand-border last:border-r-0 cursor-pointer bg-brand-gray-light hover:bg-neutral-100 transition-colors duration-200 overflow-hidden"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilexTab"
                      className="absolute inset-0 bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}>
                    {filexFeatures[key].title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab panel — fixed below nav, content swaps in place */}
          <div
            role="tabpanel"
            id={`filex-panel-${filexTab}`}
            aria-labelledby={`filex-tab-${filexTab}`}
            className="pt-4 space-y-4"
          >
            <div className="min-h-[4.5rem] sm:min-h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={filexTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="text-brand-gray-dark font-normal text-[16px] leading-tight"
                >
                  {filexFeatures[filexTab].desc}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="border border-brand-border p-0 bg-brand-gray-light h-64 flex flex-col justify-center relative overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filexTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={filexFeatures[filexTab].img}
                    alt={`FileX ${filexFeatures[filexTab].title}`}
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.01]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right Column: FusionX Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-brand-border p-6 md:p-8 bg-white flex flex-col"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
            <div className="flex items-center space-x-2">
              <FusionXIcon className="w-7 h-7 text-black" />
              <span className="font-display font-medium text-lg uppercase tracking-tight">FusionX</span>
            </div>
            <span className="text-[10px] border border-brand-gray-dark text-brand-gray-dark uppercase px-2 py-0.5 tracking-wider font-semibold w-max">
              Generative AI
            </span>
          </div>

          {/* Feature Selectors (Responsive Grid) */}
          <div
            role="tablist"
            aria-label="FusionX features"
            className="grid grid-cols-3 border border-brand-border text-center"
          >
            {Object.keys(fusionxFeatures).map((key) => {
              const isActive = fusionxTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`fusionx-panel-${key}`}
                  id={`fusionx-tab-${key}`}
                  onClick={() => setFusionxTab(key)}
                  className="relative py-2.5 text-[11px] sm:text-xs md:text-[14px] font-semibold uppercase tracking-wider border-r border-b sm:border-b-0 border-brand-border last:border-r-0 cursor-pointer bg-brand-gray-light hover:bg-neutral-100 transition-colors duration-200 overflow-hidden"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFusionxTab"
                      className="absolute inset-0 bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}>
                    {fusionxFeatures[key].title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab panel — fixed below nav, content swaps in place */}
          <div
            role="tabpanel"
            id={`fusionx-panel-${fusionxTab}`}
            aria-labelledby={`fusionx-tab-${fusionxTab}`}
            className="pt-4 space-y-4"
          >
            <div className="min-h-[4.5rem] sm:min-h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={fusionxTab}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="text-brand-gray-dark font-normal text-[16px] leading-tight"
                >
                  {fusionxFeatures[fusionxTab].desc}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="border border-brand-border p-0 bg-brand-gray-light h-64 flex flex-col justify-center relative overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fusionxTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={fusionxFeatures[fusionxTab].img}
                    alt={`FusionX ${fusionxFeatures[fusionxTab].title}`}
                    className="w-full h-full object-cover object-top filter grayscale contrast-[1.01]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
