import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoB from '../Assets/icon-b.png';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Showcase', href: '#showcase' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Journey', href: '#journey' }
  ];

  const startFreeUrl = 'https://portal.nexusai.com/?landing_page=true&next=create-suite';

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-none select-none animate-fade-down">
      <div className="max-w-7xl mx-auto px-6 h-auto pt-8 pb-3 lg:h-16 lg:py-3 flex items-center justify-between relative">

        {/* Left Side: Brand Logo (black icon from Assets) */}
        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-3 cursor-pointer group">
            <img
              src={logoB}
              alt="NEXUS AI Logo"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Middle: Desktop Menu Items */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] font-medium uppercase tracking-wider  transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <a
            href={startFreeUrl}
            className="group relative inline-flex items-center space-x-2 px-6 py-2.5 bg-black text-white font-medium text-[14px] uppercase tracking-widest transition-all duration-300 hover:bg-brand-gray-dark border border-brand-gray-dark active:scale-98"
          >
            <span>Start for Free Now</span>
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none "
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

      </div>

      {/* Mobile/Tablet Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 w-screen h-screen bg-white z-50 flex flex-col justify-between select-none"
          >
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              {/* Header Row (matching closed navbar exactly) */}
              <div className="w-full px-6 h-auto pt-8 pb-3 lg:h-16 lg:py-3 flex items-center justify-between">
                <a href="#" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 cursor-pointer">
                  <img
                    src={logoB}
                    alt="NEXUS AI Logo"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black focus:outline-none "
                  aria-label="Close menu"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>

              {/* Centered Menu Links */}
              <div className="flex-grow flex flex-col items-center justify-start pt-10 space-y-8 px-6">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[14px] font-semibold uppercase tracking-widest text-brand-gray-dark hover:text-black transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="w-full pt-4 max-w-[280px]">
                  <a
                    href={startFreeUrl}
                    onClick={() => setIsOpen(false)}
                    className="group w-full py-3 bg-black text-white font-semibold text-[14px] uppercase tracking-widest flex items-center justify-center space-x-2 border border-black hover:bg-brand-gray-dark transition-all"
                  >
                    <span>Start for Free Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Bottom branding tag */}
              <div className="text-center text-[12px] font-mono tracking-widest text-neutral-400 uppercase pb-6 pt-4">
                © 2026 SHDPIXEL CORPORATION PVT. LTD.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
