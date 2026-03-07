import { Wine, Wifi, Shield, Sparkles, Globe2 } from 'lucide-react';

export function Experience() {
  return (
    <section className="py-28 px-6 md:px-12 bg-[linear-gradient(180deg,#050505_0%,#080808_45%,#050505_100%)] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-10 items-stretch">
          <div className="relative border border-white/10 bg-[#0A0A0A] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2200&auto=format&fit=crop"
              alt="Private jet cabin service"
              className="w-full h-full min-h-[420px] object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1604608672516-8b0b2b0b2f8e?q=80&w=2200&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />

            <div className="absolute left-6 right-6 bottom-6 border border-[#D4AF37]/35 bg-black/50 backdrop-blur-md p-5 md:p-6">
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-2">World Class Verified</p>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-5xl md:text-6xl font-serif text-white leading-none">5★</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mt-2">Global Service Rating</p>
                </div>
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0B0B0B] p-7 md:p-10">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-5">The Experience</p>
            <h3 className="text-4xl md:text-5xl font-serif text-white leading-[0.95] mb-6">
              World-Class <br /> <span className="italic text-white/60">Cabin Service</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
              Every mission is curated with precision, privacy, and discretion. From custom dining to global ground coordination,
              our concierge team orchestrates each detail to executive standard.
            </p>

            <div className="space-y-4">
              <div className="border border-white/10 p-4 flex items-start gap-4">
                <Wine className="text-[#D4AF37] w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Fine Dining</h4>
                  <p className="text-xs text-gray-400">Chef-curated menus, premium wines, and dietary personalization on request.</p>
                </div>
              </div>
              <div className="border border-white/10 p-4 flex items-start gap-4">
                <Wifi className="text-[#D4AF37] w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Always Connected</h4>
                  <p className="text-xs text-gray-400">High-speed airborne connectivity for secure business continuity in flight.</p>
                </div>
              </div>
              <div className="border border-white/10 p-4 flex items-start gap-4">
                <Shield className="text-[#D4AF37] w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Safety Leadership</h4>
                  <p className="text-xs text-gray-400">Stringent operator vetting, certified crews, and mission-level compliance controls.</p>
                </div>
              </div>
              <div className="border border-white/10 p-4 flex items-start gap-4">
                <Globe2 className="text-[#D4AF37] w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="text-white font-serif text-xl mb-1">Global Concierge</h4>
                  <p className="text-xs text-gray-400">Worldwide airport handling, chauffeur support, and seamless arrivals at scale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
