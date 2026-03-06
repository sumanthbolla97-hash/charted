import { Wine, Wifi, Shield } from 'lucide-react';

export function Experience() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-6 lg:items-end">
              <div className="relative group aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1604608672516-8b0b2b0b2f8e?q=80&w=2000&auto=format&fit=crop"
                alt="In-flight Service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2000&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="hidden lg:flex relative w-56 h-56 xl:w-64 xl:h-64 flex-col justify-center items-center text-center rounded-[1.75rem] border border-[#D4AF37]/35 bg-[linear-gradient(145deg,#19130a_0%,#0d0d0d_45%,#050505_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.75)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(212,175,55,0.24),transparent_52%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),transparent_25%,transparent_70%,rgba(212,175,55,0.12)_100%)] pointer-events-none" />
              <div className="absolute top-5 left-1/2 -translate-x-1/2 h-[1px] w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.34em] text-[#D4AF37]/90 mb-5 relative font-medium">World Class Verified</span>
              <span className="text-[84px] font-serif text-[#E7C46A] leading-[0.9] mb-2 relative drop-shadow-[0_0_24px_rgba(212,175,55,0.25)]">5★</span>
              <span className="text-[10px] uppercase tracking-[0.26em] text-white/80 relative">Service Rating</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/50 mt-2 relative">Global Concierge Standard</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-[1px] w-40 bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent" />
            </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">The Experience</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-white leading-none mb-10">
              Unparalleled <br /> <span className="italic text-white/50">Service</span>
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
