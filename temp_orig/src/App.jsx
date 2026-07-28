import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import BenefitsSection from './components/BenefitsSection';
import ProductJourney from './components/ProductJourney';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        {/* SECTION 1 — HERO */}
        <HeroSection />

        {/* SECTION 2 — PRODUCT SHOWCASE */}
        <ProductShowcase />

        {/* SECTION 3 — BENEFITS */}
        <BenefitsSection />

        {/* SECTION 4 — PRODUCT JOURNEY */}
        <ProductJourney />

        {/* SECTION 5 — TRUST SECTION */}
        <TrustSection />

        {/* SECTION 6 — FINAL CTA */}
        <CTASection />
      </main>

      {/* SECTION 7 — FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
