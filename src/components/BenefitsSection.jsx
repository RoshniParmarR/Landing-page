import React from 'react';
import { motion } from 'framer-motion';
import {
  Folder, MessageSquare, Mic, Play,
  ShieldCheck, Search
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      title: 'Instant File Explorer',
      desc: 'Navigate and manage complex folder hierarchies and files effortlessly within a clean, visual database interface.',
      icon: Folder,
    },
    {
      title: 'Generative AI Chat',
      desc: 'Draft scripts, documentation, or brainstorm ideas quickly using an intuitive ChatGPT-like AI interface.',
      icon: MessageSquare,
    },
    {
      title: 'Voice Prompting',
      desc: 'Speak naturally to record instructions and generate AI outputs instantly without lifting a finger.',
      icon: Mic,
    },
    {
      title: 'Media Generation',
      desc: 'Produce stunning graphics, images, and video mockups from simple text prompts to enhance your content creation.',
      icon: Play,
    },
    {
      title: 'Secure Document Vault',
      desc: 'Protect your files with enterprise-grade AES-256 encryption, zero-trust sharing policies, and secure key rotation.',
      icon: ShieldCheck,
    },
    {
      title: 'Smart Search & Retrieval',
      desc: 'Instantly search document contents, tags, and metadata with lightning-fast retrieval for efficient information access.',
      icon: Search,
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

  const topBorderOffset = (index) => {
    if (index === 0) return '-top-[1px] -left-[1px]';
    return [
      'top-0 left-0',
      index === 1 && 'md:-top-[1px] md:-left-[1px]',
      index >= 2 && 'md:top-0 md:left-0',
      index <= 2 && 'lg:-top-[1px] lg:-left-[1px]',
      index >= 3 && 'lg:top-0 lg:left-0',
    ].filter(Boolean).join(' ');
  };

  return (
    <section className="relative w-full py-14 md:py-20 bg-white overflow-hidden">

      <div id="benefits" className="scroll-mt-8 max-w-7xl mx-auto px-6 relative z-10">

        {/* Title / Header */}
        <div className="mb-7 max-w-2xl select-none">
          <p className="text-[12px]  uppercase tracking-widest text-brand-gray-dark mb-2">
            Core Outcomes
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading text-black"
          >
            BUILT TO SIMPLIFY WORK
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-brand-border max-md:[&:has(>*:nth-child(2):hover)>*:nth-child(1)]:border-b-transparent max-md:[&:has(>*:nth-child(3):hover)>*:nth-child(2)]:border-b-transparent max-md:[&:has(>*:nth-child(4):hover)>*:nth-child(3)]:border-b-transparent max-md:[&:has(>*:nth-child(5):hover)>*:nth-child(4)]:border-b-transparent max-md:[&:has(>*:nth-child(6):hover)>*:nth-child(5)]:border-b-transparent md:max-lg:[&:has(>*:nth-child(3):hover)>*:nth-child(1)]:border-b-transparent md:max-lg:[&:has(>*:nth-child(4):hover)>*:nth-child(2)]:border-b-transparent md:max-lg:[&:has(>*:nth-child(5):hover)>*:nth-child(3)]:border-b-transparent md:max-lg:[&:has(>*:nth-child(6):hover)>*:nth-child(4)]:border-b-transparent lg:[&:has(>*:nth-child(4):hover)>*:nth-child(1)]:border-b-transparent lg:[&:has(>*:nth-child(5):hover)>*:nth-child(2)]:border-b-transparent lg:[&:has(>*:nth-child(6):hover)>*:nth-child(3)]:border-b-transparent"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative group border-b border-brand-border border-r-0 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 [&:nth-child(n+6)]:border-b-0 md:[&:nth-child(n+5)]:border-b-0 lg:[&:nth-child(n+4)]:border-b-0 p-6 bg-white hover:bg-brand-gray-light/20 hover:z-10 transition-colors duration-500 flex flex-col justify-between min-h-[250px]"
              >
                {/* Border draw animation — thin 1px, all 4 sides */}
                <span className={`pointer-events-none absolute z-10 w-0 h-px bg-brand-gray-dark transition-all duration-500 group-hover:w-full ${topBorderOffset(index)}`} />
                <span className="pointer-events-none absolute -top-[1px] -right-[1px] z-10 w-px h-0 bg-brand-gray-dark transition-all duration-500 delay-75 group-hover:h-full" />
                <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] z-10 w-0 h-px bg-brand-gray-dark transition-all duration-500 delay-150 group-hover:w-full" />
                <span className="pointer-events-none absolute bottom-0 left-0 z-10 w-px h-0 bg-brand-gray-dark transition-all duration-500 delay-[225ms] group-hover:h-full" />

                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 border border-brand-border flex items-center justify-center bg-white group-hover:border-black group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-4 h-4 text-black group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-display font-medium uppercase tracking-tight text-black ">
                      {benefit.title}
                    </h3>
                    <p className="text-brand-gray-dark text-[16px] leading-relaxed font-normal">
                      {benefit.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center text-[10px]  text-brand-gray-dark select-none">
                  <span>OUTCOME // 0{index + 1}</span>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
