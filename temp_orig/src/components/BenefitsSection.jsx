import React from 'react';
import { motion } from 'framer-motion';
import {
  Search, Users, Cpu, LayoutGrid,
  Gauge, ShieldCheck
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      title: 'Find Files Faster',
      desc: 'Instant OCR search yields files in milliseconds, not minutes.',
      icon: Search,
    },
    {
      title: 'Collaborate Better',
      desc: 'Contextual threads tie conversations directly to files.',
      icon: Users,
    },
    {
      title: 'Automate Repetitive Tasks',
      desc: 'Offload routine workflows with instant, visual trigger recipes.',
      icon: Cpu,
    },
    {
      title: 'Stay Organized',
      desc: 'Auto-categorization indexes incoming assets into schemas.',
      icon: LayoutGrid,
    },
    {
      title: 'Improve Team Productivity',
      desc: 'Eliminate duplicate document requests and endless messaging.',
      icon: Gauge,
    },
    {
      title: 'Scale With Confidence',
      desc: 'Enterprise-grade encryption and access controls keep assets safe.',
      icon: ShieldCheck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  return (
    <section id="benefits" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title / Header */}
        <div className="mb-14 max-w-2xl select-none">
          <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-brand-gray-dark mb-3">
            Core Outcomes
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading text-black"
          >
            Built To Simplify Work.
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brand-border"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative group border-r border-b border-brand-border p-8  bg-white hover:bg-brand-gray-light/20 transition-colors duration-500 flex flex-col justify-between min-h-[250px] overflow-hidden"
              >
                {/* Border Drawing Effect */}
                <span className="absolute top-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-500 group-hover:w-full" />
                <span className="absolute top-0 right-0 w-[1.5px] h-0 bg-black transition-all duration-500 delay-75 group-hover:h-full" />
                <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-black transition-all duration-500 delay-150 group-hover:w-full" />
                <span className="absolute bottom-0 left-0 w-[1.5px] h-0 bg-black transition-all duration-500 delay-225 group-hover:h-full" />

                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 border border-brand-border flex items-center justify-center bg-white group-hover:border-black group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4 text-black group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-display font-medium uppercase tracking-tight text-black group-hover:translate-x-1 transition-transform duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-gray-dark text-[16px] leading-relaxed font-normal">
                      {benefit.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-brand-gray-dark select-none">
                  <span>OUTCOME // 0{index + 1}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-black">
                    ACTIVATE →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
