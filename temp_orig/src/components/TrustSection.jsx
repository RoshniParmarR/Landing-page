import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const match = target.match(/^([\d.]+)([K%+]?)([+]*)$/);
    if (!match) {
      setCount(target);
      return;
    }

    const numValue = parseFloat(match[1]);
    const suffix = (match[2] || '') + (match[3] || '');

    let start = 0;
    const end = numValue;
    const isFloat = match[1].includes('.');
    const steps = 60;
    const stepTime = (duration * 1000) / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const val = start + (end - start) * (currentStep / steps);

      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount((isFloat ? val.toFixed(2) : Math.floor(val)) + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count || '0'}</span>;
}

export default function TrustSection() {
  const metrics = [
    { label: 'Files Managed', value: '10K+' },
    { label: 'Teams Connected', value: '500+' },
    { label: 'Availability', value: '99.99%' },
    { label: 'Security Grade', value: 'Enterprise' },
  ];

  const testimonials = [
    "“We automated 90% of our document ingestion in weeks.” — Tech Lead, Velo",
    "“FileX search speed is unbelievable. Instant OCR results.” — Ops Director, Matrix",
    "“The single sign-on mapping was set up in 10 minutes.” — SecOps, Novus",
    "“No more lost documents or endless threads. Perfect solution.” — Product VP, Echo",
    "“Ecosystem sync makes team handoffs instantaneous.” — Founder, CoreLabs",
  ];

  return (
    <section id="trust" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-14 max-w-2xl select-none">
          <p className="text-[12px] font-mono font-bold uppercase tracking-widest text-brand-gray-dark mb-3">
            Enterprise Validation
          </p>
          <h2 className="section-heading text-black">
            Built For Modern Teams.
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-20 select-none">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-brand-border p-4 sm:p-6 bg-brand-gray-light/30 flex flex-col justify-between h-28 sm:h-32 hover:border-black transition-colors"
            >
              <span className="text-[12px] font-mono text-brand-gray-dark uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl font-display font-medium uppercase tracking-tight text-black break-words">
                {metric.value.match(/[\d.]+/) ? (
                  <Counter target={metric.value} />
                ) : (
                  metric.value
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Auto-Scrolling Ticker / Marquee */}
        <div className="border-t border-b border-brand-border py-3 select-none relative overflow-hidden bg-brand-gray-light/10">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max space-x-12 animate-[flowDash_30s_linear_infinite] hover:[animation-play-state:paused]">
            {testimonials.concat(testimonials).map((text, idx) => (
              <div
                key={idx}
                className="text-[16px] font-normal tracking-wide text-neutral-800 shrink-0 select-none flex items-center space-x-2"
              >
                <span>{text}</span>
                <span className="w-1.5 h-1.5 bg-black ml-6 inline-block" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[flowDash_30s_linear_infinite\\] {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
