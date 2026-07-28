import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import { ArrowRight, Sparkles, Database, Folder, FileText, Search, MessageSquare, Play, Mic, Plus, CornerDownLeft } from 'lucide-react';
import logo from '../Assets/icon-w.png';


export default function HeroSection() {
  const containerRef = useRef(null);
  const filexRef = useRef(null);
  const fusionxRef = useRef(null);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for smooth parallax
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformed values for panels parallax
  const filexRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const filexRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const fusionxRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const fusionxRotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const connectorLineAnimation = {
    initial: {
      strokeDashoffset: 0,
    },
    animate: {
      strokeDashoffset: -9, // one complete dash cycle (6 + 3)
    },
    transition: {
      duration: 0.6,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  };



  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] lg:overflow-hidden flex flex-col justify-center bg-white py-14 md:py-20 lg:py-6 animate-fade-in"
    >

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-y-12 lg:gap-x-0 items-center relative z-10 pt-16">

        {/* 1. Left Column: FileX */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 order-2 lg:order-1 flex flex-col space-y-3 w-full max-w-[320px] mx-auto lg:mx-0">


          <motion.div
            ref={filexRef}
            style={{ rotateX: filexRotateX, rotateY: filexRotateY }}
            className="bg-white border border-brand-border p-3.5 shadow-xl select-none flex flex-col justify-between h-auto transform-gpu hover:border-black transition-colors space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-border pb-3 -mx-3.5 px-3.5">
                <div className="flex items-center space-x-2">
                  <FileXIcon className="w-5 h-5 text-black" />
                  <span className="font-display font-bold text-[12px] tracking-wider uppercase">FileX</span>
                </div>
                <div className="w-6 h-6 bg-white border border-brand-border flex items-center justify-center ">
                  <Plus className="w-3.5 h-3.5 text-black" />
                </div>
              </div>

              {/* FILES & FOLDERS */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black text-[12px] font-bold">
                  <Folder className="w-3 h-3" />
                  <span>FILES & FOLDERS</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Create, organize, and manage your nested files and folders in a fast, hierarchical explorer tree.
                </p>
              </div>

              {/* STORE DOCUMENTS */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black  text-[12px] font-bold">
                  <FileText className="w-3 h-3" />
                  <span>STORE DOCUMENTS</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Upload corporate documents, PDFs, stylesheets, and spreadsheets into secure database volumes.
                </p>
              </div>

              {/* INSTANT SEARCH */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black  text-[12px] font-bold">
                  <Search className="w-3 h-3" />
                  <span>INSTANT SEARCH</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Locate stored documents and cataloged folder directories instantly with automated tag retrieval.
                </p>
              </div>
            </div>


          </motion.div>
        </div>

        {/* 2. Center Column: Arrows + Logo in a single flex row */}
        <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex flex-row items-center justify-center select-none w-full gap-0">

          {/* Left Arrow */}
          <div className="hidden lg:flex flex-1 items-center pointer-events-none">
            <svg viewBox="0 0 100 24" className="w-full h-6 text-neutral-300 animate-pulse" fill="none" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
              <motion.path
                d="M0,12 L100,12"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 3"
                {...connectorLineAnimation}
              />
            </svg>
          </div>

          {/* Logo Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-20 h-20 bg-black border border-neutral-800 p-4 flex items-center justify-center shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-neutral-900/40 pointer-events-none" />
            <img
              src={logo}
              alt="NEXUS AI Logo"
              className="h-12 w-12 opacity-100 transition-opacity duration-300 relative z-10"
            />
          </motion.div>

          {/* Right Arrow */}
          <div className="hidden lg:flex flex-1 items-center pointer-events-none">
            <svg viewBox="0 0 100 24" className="w-full h-6 text-neutral-300 animate-pulse" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M0,12 L100,12"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="6 3"
                {...connectorLineAnimation}
              />
            </svg>
          </div>

        </div>

        {/* 3. Right Column: FusionX */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3 order-3 lg:order-3 flex flex-col space-y-3 w-full max-w-[320px] mx-auto lg:mx-0">


          <motion.div
            ref={fusionxRef}
            style={{ rotateX: fusionxRotateX, rotateY: fusionxRotateY }}
            className="bg-white border border-brand-border p-3.5 shadow-xl select-none flex flex-col justify-between h-auto transform-gpu hover:border-black transition-colors space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-border pb-3 -mx-3.5 px-3.5">
                <div className="flex items-center space-x-2">
                  <FusionXIcon className="w-5 h-5 text-black" />
                  <span className="font-display font-bold text-[12px] tracking-wider uppercase">FusionX</span>
                </div>
                <div className="w-6 h-6 bg-white border border-brand-border flex items-center justify-center">
                  <CornerDownLeft className="w-3.5 h-3.5 text-black" />
                </div>
              </div>

              {/* AI CHAT & PROMPTING */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black text-[12px] font-bold">
                  <MessageSquare className="w-3 h-3" />
                  <span>AI CHAT & PROMPTING</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Type natural language prompts to draft documentation, write articles, compile notes, or brainstorm.
                </p>
              </div>

              {/* MEDIA GENERATION */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black  text-[12px] font-bold">
                  <Play className="w-3 h-3" />
                  <span>MEDIA GENERATION</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Generate stunning graphics, high-fidelity images, design assets, and marketing video drafts instantly.
                </p>
              </div>

              {/* AUDIO & VOICE INPUT */}
              <div className="space-y-1.5 pb-2">
                <div className="flex items-center space-x-1.5 text-black  text-[12px] font-bold">
                  <Mic className="w-3 h-3" />
                  <span>AUDIO & VOICE INPUT</span>
                </div>
                <p className="text-[12px] text-brand-gray-dark leading-snug">
                  Speak directly to FusionX. Record audio prompts to dictate content and generate outputs hands-free.
                </p>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
