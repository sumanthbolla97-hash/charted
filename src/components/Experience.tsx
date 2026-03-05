import { motion } from 'motion/react';
import { Wine, Wifi, Shield } from 'lucide-react';

export function Experience() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1583413230540-ddf906819630?q=80&w=2000&auto=format&fit=crop" 
                alt="In-flight Service" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-[#0A0A0A] p-10 border border-white/10 hidden md:flex flex-col justify-center items-center text-center shadow-2xl z-20">
              <span className="text-5xl font-serif text-[#D4AF37] mb-3">5★</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Service Rating</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">The Experience</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white leading-none mb-10">
              Unparalleled <br/> <span className="italic text-white/50">Service</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-16 font-light">
              Every journey is curated to your exacting standards. From Michelin-starred dining to sommelier-selected wines, your cabin is your sanctuary.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex gap-5 group">
                <Wine className="text-[#D4AF37] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-3">Fine Dining</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Menus crafted by world-renowned chefs, tailored to your dietary preferences.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <Wifi className="text-[#D4AF37] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-3">Connectivity</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    High-speed Ka-band Wi-Fi ensuring you stay connected globally.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <Shield className="text-[#D4AF37] w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-3">Safety First</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Exceeding global safety standards with the most experienced crew.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
