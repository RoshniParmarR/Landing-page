import React from 'react';
import logo from '../Assets/logo.png';
import { ChevronUp } from 'lucide-react';

export default function Footer() {
  const links = [
    'WebX', 'MailX', 'FileX', 'FormX', 'FusionX', 'WaX', 'NoteX', 'TaskX', 'Contact', 'Crm', 'FlowX'
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-white text-black pt-18 pb-4 relative select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center ">

        {/* Large Logo and Tagline */}
        <div className="flex flex-col items-center text-center ">
          <img
            src={logo}
            alt="NEXUS AI Logo"
            className="h-auto w-[20rem] opacity-25 transition-opacity hover:opacity-100 duration-300"
          />
          <p className="text-[16px] mt-4 pb-[45px] tracking-[0.25em] text-brand-gray-dark uppercase">
            SIMPLIFY . SCALE . SUCCEED
          </p>
        </div>

        {/* Product ecosystem links */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-2 md:gap-x-4 gap-y-2 text-[14px] font-normal text-brand-gray-dark max-w-4xl px-0 pb-6 font-sans uppercase tracking-wider">
          {links.map((link, idx) => (
            <React.Fragment key={link}>
              <span className="text-brand-gray-dark px-0 py-0 inline-block">
                {link}
              </span>
              {idx < links.length - 1 && link !== 'TaskX' && (
                <span className={`text-neutral-200 pointer-events-none mx-1 ${link === 'FormX' ? 'invisible md:visible' : 'visible'}`}>
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="flex flex-col items-center text-center space-y-3 pt-4  w-full max-w-3xl">
          <p className="text-[12px] font-bold tracking-[0.15em] text-brand-gray-dark flex items-center justify-center space-x-1.5 uppercase">
            <span>BUILT IN INDIA</span>
            <img src="https://flagcdn.com/w20/in.png" alt="India Flag" className="h-3.5 w-auto object-contain inline-block" />
          </p>
          <p className="text-[12px]  tracking-widest text-neutral-400 uppercase">
            © 2026 SHDPIXEL CORPORATION PVT. LTD. | ALL RIGHTS RESERVED
          </p>
        </div>

      </div>

      {/* Back to top button */}
      <button
        onClick={handleScrollToTop}
        className="absolute bottom-8 right-6 md:right-12 p-2.5 border border-brand-border bg-white hover:bg-neutral-50 hover:border-black transition-all cursor-pointer"
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4 text-brand-gray-dark" />
      </button>
    </footer>
  );
}
