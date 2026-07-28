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
    { label: 'AI Processed Assets', value: '1M+' },
    { label: 'Customer Rating', value: '4.9/5' },
    { label: 'Global Edge Nodes', value: '150+' },
  ];

  const testimonials = [
    "“FusionX chat makes drafting documentation and scripts incredibly fast.” — Creative VP, Echo",
    "“FileX is the cleanest document manager we’ve used.” — Enterprise User",
    "“Generating design assets and visuals using FusionX prompts saved us weeks of work.” — Lead Designer, CoreLabs",
    "“Speaking to FusionX to dictate instructions and generate video scripts works flawlessly.” — Tech Lead, Velo",
    "“No more lost files. FileX explorer gives us complete control over our documents.” — Product VP, Novus",
  ];

  return (
    <section id="trust" className="relative w-full py-14 md:py-20 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-7 max-w-2xl select-none">
          <p className="text-[12px]  uppercase tracking-widest text-brand-gray-dark mb-2">
            Enterprise Validation
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="section-heading text-black"
          >
            BUILT FOR MODERN TEAMS
          </motion.h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-3 sm:gap-6 mb-10 lg:mb-20 select-none">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`border border-brand-border p-4 sm:p-6 bg-brand-gray-light/30 flex flex-col justify-between h-28 sm:h-32 hover:border-black transition-colors ${idx < 4
                ? 'col-span-1 lg:col-span-2'
                : idx === 4
                  ? 'col-span-1 lg:col-span-2 lg:col-start-2'
                  : idx === 5
                    ? 'col-span-1 lg:col-span-2'
                    : 'col-span-2 lg:col-span-2'
                }`}
            >
              <span className="text-[12px]  text-brand-gray-dark uppercase tracking-wider">
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

          <div className="flex w-max animate-[flowDash_90s_linear_infinite] hover:[animation-play-state:paused]">
            {testimonials.concat(testimonials).map((text, idx) => (
              <div
                key={idx}
                className="text-[16px] font-normal tracking-wide text-neutral-800 shrink-0 select-none flex items-center"
              >
                <span>{text}</span>
                <span className="w-1.5 h-1.5 bg-black mx-12 inline-block" />
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
        .animate-\\[flowDash_90s_linear_infinite\\] {
          animation: marquee 90s linear infinite;
        }
      `}</style>
    </section>
  );
}
