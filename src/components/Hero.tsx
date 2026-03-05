import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2500&auto=format&fit=crop" 
            alt="Private Jet Exterior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 font-medium">
            Global Private Aviation
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-white mb-8 leading-[0.85] tracking-tight">
            Beyond <br/> <span className="italic font-light text-white/90">Expectation</span>
          </h1>
          <div className="h-[1px] w-24 bg-white/30 mx-auto mb-8" />
          <p className="max-w-lg mx-auto text-white/90 text-sm md:text-base leading-relaxed font-light tracking-wide">
            Experience the world's most advanced fleet. Flying to 187 countries worldwide, we define the standard for private travel.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
      </motion.div>
    </section>
  );
}
