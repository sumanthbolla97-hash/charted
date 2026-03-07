import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import heroJet from '../assets/hero-jet.png';
import { useEffect, useState } from 'react';

export function Hero() {
  const [overlayProgress, setOverlayProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, window.scrollY / (h * 0.35)));
      setOverlayProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src={heroJet}
            alt="Private Jet Exterior" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" style={{ opacity: overlayProgress }} />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(198,168,124,0.15),transparent_42%)]"
          style={{ opacity: overlayProgress }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-[#050505]"
          style={{ opacity: overlayProgress }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 transition-opacity duration-300"
        style={{ opacity: overlayProgress }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.45em] mb-7 font-medium">
            Bespoke Private Aviation
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8.5rem] text-white mb-8 leading-[0.86] tracking-tight">
            Fly the <br /> <span className="italic font-light text-[#E7E2D9]">Extraordinary</span>
          </h1>
          <div className="h-[1px] w-28 bg-[#D4AF37]/50 mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-white/85 text-sm md:text-base leading-relaxed font-light tracking-wide">
            Charter elite aircraft with global reach, curated cabin service, and mission-ready concierge support for every journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-[#D4AF37] text-black uppercase text-[10px] tracking-[0.24em] hover:bg-white transition-colors">
              Request Charter
            </button>
            <button className="px-8 py-3 border border-white/25 text-white uppercase text-[10px] tracking-[0.24em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2">
              Explore Fleet
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
