import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import { Folder, Search, ArrowRight, Play, CheckCircle, Users, Activity, FileText, Mail, Share2, Globe, Calendar, User, Edit3, Check, CheckSquare, Sparkles, Phone, MessageSquare, Settings } from 'lucide-react';
import LineWaves from './LineWaves';


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



  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen lg:h-screen lg:h-[100dvh] lg:overflow-hidden flex flex-col justify-center bg-white py-12 lg:py-6 animate-fade-in"
    >
      {/* Full-screen LineWaves background animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#e5e5e5"
          color2="#e5e5e5"
          color3="#e5e5e5"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 py-16">

        {/* 1. Left Column: FileX */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 order-2 lg:order-1 flex flex-col space-y-3 w-full max-w-[320px] mx-auto lg:mx-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between px-1">
            <span>01 / Ingestion & Storage</span>
            <span className="text-black font-semibold">FileX</span>
          </div>

          <motion.div
            ref={filexRef}
            style={{ rotateX: filexRotateX, rotateY: filexRotateY }}
            className="bg-white border border-brand-border p-3.5 shadow-xl select-none flex flex-col justify-between h-auto transform-gpu hover:border-black transition-colors space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center space-x-2">
                  <FileXIcon className="w-5 h-5 text-black" />
                  <span className="font-display font-bold text-[10px] tracking-wider uppercase">FileX DB</span>
                </div>
                <div className="w-2 h-2 bg-black animate-pulse" />
              </div>

              {/* FILEX + FUSIONX */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Share2 className="w-3 h-3" />
                  <span>FILEX + FUSIONX</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  This folder has 12 docs. I can summarize in NoteX or create TaskX items from action points.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                  Summarize
                </button>
              </div>

              {/* FILEX + NOTEX */}
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Mail className="w-3 h-3" />
                  <span>FILEX + NOTEX</span>
                </div>
                <div className="text-[10px] text-brand-gray-dark space-y-0.5 leading-snug pl-1 border-l border-neutral-300">
                  <p>Shared — Design review deck — open in NoteX</p>
                  <p>Shared — Q4 goals. Sync with TaskX</p>
                </div>
              </div>

              {/* FILEX + WEBX */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Globe className="w-3 h-3" />
                  <span>FILEX + WEBX</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  Assets ready for WebX. Publish to staging and link from MailX campaign.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                  Publish
                </button>
              </div>

              {/* FILEX -> TASKX */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Calendar className="w-3 h-3" />
                  <span>FILEX &rarr; TASKX</span>
                </div>
                <div className="text-[10px] text-brand-gray-dark space-y-1 pl-1">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>Attach: Proposal v2.pdf Wed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>Review: Onboarding doc —</span>
                  </div>
                </div>
              </div>

              {/* TEAM DRIVE */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Edit3 className="w-3 h-3" />
                  <span>TEAM DRIVE</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  Shared drive 'Launch' — syncs with NoteX and FusionX. Search across both.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>AI Search</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-brand-border pt-3">
              <span className="text-[8px] text-brand-gray-dark font-medium">9.2 GB of 100 GB</span>
              <span className="text-[8px] text-black font-semibold hover:underline cursor-pointer flex items-center space-x-1">
                <span>Explore FileX</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </motion.div>
        </div>

        {/* 2. Center Column: Heading & Subheading */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-6 order-1 lg:order-2 flex flex-col items-center text-center space-y-6 select-none max-w-7xl mx-auto px-2">
          <div className="space-y-2">
            <h1 className="font-display font-medium text-[22px] sm:text-3xl lg:text-[48px] !normal-case text-black leading-tight flex flex-wrap justify-center gap-x-2 lg:gap-x-3">
              {['Autonomous', 'AI', 'Infrastructure', 'For', 'Intelligent', 'Business', 'Systems'].map((text, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {text}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-2 px-4 w-full flex flex-col items-center"
          >
            <p className="text-brand-gray-dark text-[16px] font-normal leading-relaxed max-w-lg">
              The foundational AI layer powering secure, containerized, multi-agent enterprise systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-2"
          >
            <a
              href="#trial"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-black text-white font-semibold text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-neutral-800 border border-black hover:px-10"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* 3. Right Column: FusionX */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 order-3 lg:order-3 flex flex-col space-y-3 w-full max-w-[320px] mx-auto lg:mx-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between px-1">
            <span>02 / Process & Automation</span>
            <span className="text-black font-semibold">FusionX</span>
          </div>

          <motion.div
            ref={fusionxRef}
            style={{ rotateX: fusionxRotateX, rotateY: fusionxRotateY }}
            className="bg-white border border-brand-border p-3.5 shadow-xl select-none flex flex-col justify-between h-auto transform-gpu hover:border-black transition-colors space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center space-x-2">
                  <FusionXIcon className="w-5 h-5 text-black" />
                  <span className="font-display font-bold text-[10px] tracking-wider uppercase">FusionX FLOW</span>
                </div>
                <div className="w-2 h-2 bg-black animate-pulse" />
              </div>

              {/* FUSIONX ACROSS SUITE */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Activity className="w-3 h-3" />
                  <span>FUSIONX ACROSS SUITE</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  Across MailX, WaX, and Crm — 5 leads need follow-up. Book a slot? I'll prep the list.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                  Schedule
                </button>
              </div>

              {/* FUSIONX + NOTEX + WEBX */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Edit3 className="w-3 h-3" />
                  <span>FUSIONX + NOTEX + WEBX</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  NoteX doc + WebX page + Crm data — I can draft one summary for execs.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                  Draft summary
                </button>
              </div>

              {/* FUSIONX + CONTACT */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <User className="w-3 h-3" />
                  <span>FUSIONX + CONTACT</span>
                </div>
                <p className="text-[10px] text-brand-gray-dark leading-snug">
                  Unified view: Contact activity from MailX, WaX, Crm. One click to WaX or MailX.
                </p>
                <button className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 border border-black hover:bg-black hover:text-white transition-all cursor-pointer">
                  Open
                </button>
              </div>

              {/* FUSIONX + TASKX */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-black font-mono text-[10px] font-bold">
                  <Calendar className="w-3 h-3" />
                  <span>FUSIONX + TASKX</span>
                </div>
                <div className="text-[10px] text-brand-gray-dark space-y-1 pl-1">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-3 h-3 text-black shrink-0" />
                    <span>Sprint planning Mon 10:00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-3 h-3 text-black shrink-0" />
                    <span>TaskX updated; MailX invited —</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-brand-border pt-3">
              <div className="flex items-center space-x-1.5">
                <Activity className="w-3 h-3 text-black animate-pulse" />
                <span className="text-[8px] font-medium">8 active flows</span>
              </div>
              <span className="text-[8px] text-black font-semibold hover:underline cursor-pointer flex items-center space-x-1">
                <span>Manage Flows</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
