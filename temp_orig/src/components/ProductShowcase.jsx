import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileXIcon, FusionXIcon } from './Icons';
import {
  Database, Search, Share2, LayoutGrid,
  Users, Cpu, ArrowRight, FileText
} from 'lucide-react';
import filexDashboardImg from '../Assets/filex_dashboard.png';
import fusionxWorkflowImg from '../Assets/fusionx_workflow.png';

export default function ProductShowcase() {
  const [filexTab, setFilexTab] = useState('store');
  const [fusionxTab, setFusionxTab] = useState('suite');

  const filexFeatures = {
    store: {
      title: 'Store',
      desc: 'Secure enterprise grade document vault.',
      badge: 'Encrypted',
    },
    share: {
      title: 'Share',
      desc: 'Granular permissions and expiring file portals.',
      badge: 'Zero-Trust',
    },
    organize: {
      title: 'Organize',
      desc: 'Automatic metadata schemas and classification rules.',
      badge: 'Custom Schema',
    }
  };

  const fusionxFeatures = {
    suite: {
      title: 'Across Suite',
      desc: 'Across MailX, WaX, and Crm — 5 leads need follow-up. Book a slot? I\'ll prep the list.',
      badge: 'Orchestrate',
    },
    summarize: {
      title: 'NoteX + WebX',
      desc: 'NoteX doc + WebX page + Crm data — I can draft one summary for execs.',
      badge: 'AI Draft',
    },
    contact: {
      title: 'Contact',
      desc: 'Unified view: Contact activity from MailX, WaX, Crm. One click to WaX or MailX.',
      badge: 'Unified',
    },
    taskx: {
      title: 'TaskX',
      desc: 'Sprint planning Mon 10:00. TaskX updated; MailX invited —',
      badge: 'Task Flow',
    }
  };

  return (
    <section id="showcase" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative z-10">

        {/* Section Header */}
        <div className=" mb-14 select-none col-span-1 lg:col-span-2">
          <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-brand-gray-dark mb-3">
            Ecosystem Presenter
          </p>
          <h2 className="section-heading text-black">
            FileX & FusionX.
          </h2>
        </div>

        {/* Left Column: FileX Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-brand-border p-6 md:p-8 bg-white flex flex-col justify-between min-h-[520px] lg:min-h-[580px]"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-2">
              <div className="flex items-center space-x-2">
                <FileXIcon className="w-7 h-7 text-black" />
                <span className="font-display font-medium text-lg uppercase tracking-tight">FileX</span>
              </div>
              <span className="text-[10px] border border-black uppercase px-2 py-0.5 tracking-wider font-semibold w-max">
                Manage Information
              </span>
            </div>

            {/* Feature Selectors (Responsive Grid) */}
            <div className="grid grid-cols-3 border border-brand-border text-center">
              {Object.keys(filexFeatures).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilexTab(key)}
                  className={`py-2.5 text-[11px] sm:text-xs md:text-[14px] font-semibold uppercase tracking-wider border-r border-b sm:border-b-0 border-brand-border last:border-r-0 transition-colors cursor-pointer ${filexTab === key ? 'bg-black text-white' : 'bg-brand-gray-light text-black hover:bg-neutral-100'
                    }`}
                >
                  {filexFeatures[key].title}
                </button>
              ))}
            </div>

            {/* Description & Badge */}
            <div className="h-20 py-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] bg-neutral-900 text-white font-mono font-bold uppercase px-[12px] py-[6px]">
                  {filexFeatures[filexTab].badge}
                </span>
              </div>
              <p className="text-black font-normal text-[16px] leading-tight">
                {filexFeatures[filexTab].desc}
              </p>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="border border-brand-border p-0 bg-brand-gray-light h-64 flex flex-col justify-center relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={filexTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full relative"
              >
                <img
                  src={filexDashboardImg}
                  alt="FileX Dashboard"
                  className="w-full h-full object-cover object-top filter contrast-[1.01]"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-black p-3.5 select-none max-w-[250px] shadow-lg">
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase tracking-wider block w-max mb-1">
                    {filexFeatures[filexTab].title}
                  </span>
                  <p className="text-[10px] text-neutral-500 font-mono leading-tight">
                    {filexFeatures[filexTab].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs select-none">
            <span className="text-brand-gray-dark font-medium text-[10px]">Explore storage engines</span>
            <a href="#explore" className="font-semibold text-black hover:underline inline-flex items-center space-x-1 text-[14px]">
              <span>System Docs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: FusionX Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-brand-border p-6 md:p-8 bg-white flex flex-col justify-between min-h-[520px] lg:min-h-[580px]"
        >
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-2">
              <div className="flex items-center space-x-2">
                <FusionXIcon className="w-7 h-7 text-black" />
                <span className="font-display font-medium text-lg uppercase tracking-tight">FusionX</span>
              </div>
              <span className="text-[10px] border border-black uppercase px-2 py-0.5 tracking-wider font-semibold w-max">
                Manage Collaboration
              </span>
            </div>

            {/* Feature Selectors (Responsive Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-brand-border text-center">
              {Object.keys(fusionxFeatures).map((key) => (
                <button
                  key={key}
                  onClick={() => setFusionxTab(key)}
                  className={`py-2.5 text-[11px] sm:text-xs md:text-[14px] font-semibold uppercase tracking-wider border-r border-b sm:border-b-0 border-brand-border last:border-r-0 transition-colors cursor-pointer ${fusionxTab === key ? 'bg-black text-white' : 'bg-brand-gray-light text-black hover:bg-neutral-100'
                    }`}
                >
                  {fusionxFeatures[key].title}
                </button>
              ))}
            </div>

            {/* Description & Badge */}
            <div className="h-20 py-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] bg-neutral-900 text-white font-mono font-bold uppercase px-[12px] py-[6px]">
                  {fusionxFeatures[fusionxTab].badge}
                </span>
              </div>
              <p className="text-black font-normal text-[16px] leading-tight">
                {fusionxFeatures[fusionxTab].desc}
              </p>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="border border-brand-border p-0 bg-brand-gray-light h-64 flex flex-col justify-center relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={fusionxTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full relative"
              >
                <img
                  src={fusionxWorkflowImg}
                  alt="FusionX Workflow"
                  className="w-full h-full object-cover object-top filter contrast-[1.01]"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-black p-3.5 select-none max-w-[250px] shadow-lg">
                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-bold uppercase tracking-wider block w-max mb-1">
                    {fusionxFeatures[fusionxTab].title}
                  </span>
                  <p className="text-[10px] text-neutral-500 font-mono leading-tight">
                    {fusionxFeatures[fusionxTab].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs select-none">
            <span className="text-brand-gray-dark font-medium text-[10px]">Explore visual workflows</span>
            <a href="#explore" className="font-semibold text-black hover:underline inline-flex items-center space-x-1 text-[14px]">
              <span>Workflow Docs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
