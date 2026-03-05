import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Check, Info, Plane, Users, Gauge, Briefcase, Ruler } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

// --- Types ---
interface AircraftStats {
  passengers: string;
  range: string; // Display string (e.g., "14,260 km")
  speed: string;
  cabinHeight: string;
  baggage: string;
  cabinWidth: string;
  cabinLength: string;
  maxAltitude: string;
}

interface Aircraft {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  stats: AircraftStats;
  pros: string[];
}

// --- Data ---
const fleet: Aircraft[] = [
  {
    id: "global-7500",
    name: "Global 7500",
    category: "Ultra Long Range",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/EBACE_2018,_Le_Grand-Saconnex_(BL7C0351).jpg?width=2500",
    description: "The Global 7500 aircraft stands alone as the world's largest and longest range business jet. Within its luxurious interior are four true living spaces, a full size kitchen and a dedicated crew suite.",
    stats: {
      passengers: "19 Passengers",
      range: "14,260 km",
      speed: "Mach 0.925",
      cabinHeight: "6 ft 2 in",
      baggage: "195 cu ft",
      cabinWidth: "8 ft 0 in",
      cabinLength: "54 ft 5 in",
      maxAltitude: "51,000 ft"
    },
    pros: [
      "Four distinct living spaces",
      "Master suite with permanent bed",
      "Deep recline Nuage seats",
      "Pur Air system for cleaner cabin air"
    ]
  },
  {
    id: "gulfstream-g650er",
    name: "Gulfstream G650ER",
    category: "Ultra Long Range",
    image: "https://jetservicenl.com/files/aircraft/gulfstream-g650.1.jpg",
    description: "The Gulfstream G650ER extends the non-stop reach of the industry's highest performance long-range business aircraft to 7,500 nautical miles.",
    stats: {
      passengers: "19 Passengers",
      range: "13,890 km",
      speed: "Mach 0.925",
      cabinHeight: "6 ft 5 in",
      baggage: "195 cu ft",
      cabinWidth: "8 ft 6 in",
      cabinLength: "46 ft 10 in",
      maxAltitude: "51,000 ft"
    },
    pros: [
      "Lowest cabin altitude",
      "100% fresh air system",
      "Panoramic oval windows",
      "Ka-band connectivity"
    ]
  },
  {
    id: "falcon-8x",
    name: "Dassault Falcon 8X",
    category: "Ultra Long Range",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dassault_Falcon_8X.jpg?width=2500",
    description: "The Falcon 8X offers the longest range in the Falcon family, along with the most extensive choice of cabin configurations.",
    stats: {
      passengers: "16 Passengers",
      range: "11,945 km",
      speed: "Mach 0.90",
      cabinHeight: "6 ft 2 in",
      baggage: "140 cu ft",
      cabinWidth: "7 ft 8 in",
      cabinLength: "42 ft 8 in",
      maxAltitude: "51,000 ft"
    },
    pros: [
      "Short field performance",
      "Quiet cabin acoustics",
      "Flexible cabin layout",
      "Advanced flight deck"
    ]
  },
  {
    id: "gulfstream-g500",
    name: "Gulfstream G500",
    category: "Large Jet",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Airshow-20180210-12-17-00-DSC01312_(28423253559).jpg?width=2500",
    description: "The G500 delivers the optimal balance of speed, maneuverability, and comfort that helps you maximize every minute of your travel.",
    stats: {
      passengers: "19 Passengers",
      range: "9,816 km",
      speed: "Mach 0.925",
      cabinHeight: "6 ft 4 in",
      baggage: "175 cu ft",
      cabinWidth: "7 ft 11 in",
      cabinLength: "41 ft 6 in",
      maxAltitude: "51,000 ft"
    },
    pros: [
      "Symmetry Flight Deck",
      "High-speed cruise",
      "Optimized cabin pressure",
      "Ergonomic seating"
    ]
  },
  {
    id: "challenger-650",
    name: "Challenger 650",
    category: "Large Jet",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Static_display,_EBACE_2018,_Le_Grand-Saconnex_(BL7C0611).jpg?width=2500",
    description: "The Challenger 650 aircraft is the best-selling large business jet platform of all time, offering a wider cabin than any competitor in its class.",
    stats: {
      passengers: "12 Passengers",
      range: "7,408 km",
      speed: "Mach 0.85",
      cabinHeight: "6 ft 0 in",
      baggage: "115 cu ft",
      cabinWidth: "8 ft 2 in",
      cabinLength: "28 ft 4 in",
      maxAltitude: "41,000 ft"
    },
    pros: [
      "Widest-in-class cabin",
      "Smooth ride technology",
      "Advanced connectivity",
      "Direct aisle access"
    ]
  },
  {
    id: "legacy-650e",
    name: "Embraer Legacy 650E",
    category: "Large Jet",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Embraer_Legacy_650_Exterior_facing_left.JPG?width=2500",
    description: "With three distinct cabin zones, the Legacy 650E has the largest cabin, galley, and lavatory in its class.",
    stats: {
      passengers: "14 Passengers",
      range: "7,223 km",
      speed: "Mach 0.80",
      cabinHeight: "6 ft 0 in",
      baggage: "286 cu ft",
      cabinWidth: "6 ft 11 in",
      cabinLength: "49 ft 10 in",
      maxAltitude: "41,000 ft"
    },
    pros: [
      "Three cabin zones",
      "Largest baggage compartment",
      "10-year warranty",
      "Honeywell Primus Elite"
    ]
  },
  {
    id: "praetor-600",
    name: "Embraer Praetor 600",
    category: "Super Midsize",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/EBACE_2019,_Le_Grand-Saconnex_(EB190242).jpg?width=2500",
    description: "The Praetor 600 is the world's farthest-flying super-midsize business jet, allowing non-stop flights from London to New York.",
    stats: {
      passengers: "12 Passengers",
      range: "7,441 km",
      speed: "Mach 0.83",
      cabinHeight: "6 ft 0 in",
      baggage: "155 cu ft",
      cabinWidth: "6 ft 10 in",
      cabinLength: "26 ft 10 in",
      maxAltitude: "45,000 ft"
    },
    pros: [
      "Full fly-by-wire",
      "Best-in-class range",
      "Turbulence reduction",
      "HEPA filter standard"
    ]
  },
  {
    id: "challenger-350",
    name: "Challenger 350",
    category: "Super Midsize",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/OE-HRS_Bombardier_BD-100_-1A10_Challenger_350_CL35_-_IJM_(28329541526).jpg?width=2500",
    description: "The best-selling business jet platform of the last decade. The Challenger 350 aircraft features the widest cabin in its class.",
    stats: {
      passengers: "10 Passengers",
      range: "5,926 km",
      speed: "Mach 0.82",
      cabinHeight: "6 ft 0 in",
      baggage: "106 cu ft",
      cabinWidth: "7 ft 2 in",
      cabinLength: "25 ft 2 in",
      maxAltitude: "45,000 ft"
    },
    pros: [
      "Widest cabin in its class",
      "Access to baggage at all times",
      "Exceptional runway performance",
      "Sound suppressing cabin design"
    ]
  },
  {
    id: "citation-longitude",
    name: "Cessna Citation Longitude",
    category: "Super Midsize",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/EBACE_2019,_Le_Grand-Saconnex_(EB190149).jpg?width=2500",
    description: "The Citation Longitude is designed with your comfort and efficiency in mind, featuring the quietest cabin in its class.",
    stats: {
      passengers: "12 Passengers",
      range: "6,482 km",
      speed: "476 kts",
      cabinHeight: "6 ft 0 in",
      baggage: "112 cu ft",
      cabinWidth: "6 ft 5 in",
      cabinLength: "25 ft 2 in",
      maxAltitude: "45,000 ft"
    },
    pros: [
      "Quietest cabin",
      "Low cabin altitude",
      "Wireless cabin management",
      "Fully flat floor"
    ]
  },
  {
    id: "pilatus-pc24",
    name: "Pilatus PC-24",
    category: "Light Jet",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Antwerp_Pilatus_PC-24_LX-FCB_01.jpg?width=2500",
    description: "The PC-24 is the only aircraft combining the versatility of a turboprop with the cabin size of a medium-light jet and the performance of a light jet.",
    stats: {
      passengers: "10 Passengers",
      range: "3,704 km",
      speed: "440 kts",
      cabinHeight: "5 ft 1 in",
      baggage: "90 cu ft",
      cabinWidth: "5 ft 7 in",
      cabinLength: "23 ft 0 in",
      maxAltitude: "45,000 ft"
    },
    pros: [
      "Unpaved runway capability",
      "Large cargo door",
      "Single pilot certified",
      "Short takeoff and landing"
    ]
  }
];

// --- Components ---

function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-[#111]", className)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-[#1A1A1A] flex items-center justify-center">
          <Plane className="text-white/10 w-8 h-8 animate-pulse" />
        </div>
      )}
      <img
        src={hasError ? "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop" : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function AircraftModal({ aircraft, onClose }: { aircraft: Aircraft; onClose: () => void }) {
  const { openInquiry } = useUI();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-5xl bg-[#0A0A0A] border border-[#333] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <ImageWithLoader src={aircraft.image} alt={aircraft.name} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-6 left-6 md:hidden">
            <p className="text-[#C6A87C] text-[10px] uppercase tracking-widest mb-1">{aircraft.category}</p>
            <h3 className="text-3xl font-serif text-white">{aircraft.name}</h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent bg-[#0A0A0A]">
          <div className="hidden md:block mb-8">
            <p className="text-[#C6A87C] text-xs uppercase tracking-[0.2em] mb-2">{aircraft.category}</p>
            <h3 className="text-4xl font-serif text-white">{aircraft.name}</h3>
          </div>

          <p className="text-gray-400 font-light leading-relaxed mb-10 text-sm md:text-base">
            {aircraft.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden mb-10">
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Users size={14} />
                <span className="text-[9px] uppercase tracking-wider">Passengers</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.passengers}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Plane size={14} />
                <span className="text-[9px] uppercase tracking-wider">Range</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.range}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Gauge size={14} />
                <span className="text-[9px] uppercase tracking-wider">Speed</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.speed}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Ruler size={14} />
                <span className="text-[9px] uppercase tracking-wider">Cabin Height</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.cabinHeight}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Ruler size={14} />
                <span className="text-[9px] uppercase tracking-wider">Cabin Width</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.cabinWidth}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Ruler size={14} />
                <span className="text-[9px] uppercase tracking-wider">Cabin Length</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.cabinLength}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Briefcase size={14} />
                <span className="text-[9px] uppercase tracking-wider">Baggage</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.baggage}</p>
            </div>
            <div className="bg-[#0A0A0A] p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[#C6A87C] mb-1">
                <Plane size={14} />
                <span className="text-[9px] uppercase tracking-wider">Max Altitude</span>
              </div>
              <p className="text-sm text-white font-mono">{aircraft.stats.maxAltitude}</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-4 flex items-center gap-2">
              <Info size={16} className="text-[#C6A87C]" />
              Key Features
            </h4>
            <ul className="space-y-3">
              {aircraft.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <Check size={14} className="text-[#C6A87C] mt-1 shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => {
              onClose();
              openInquiry();
            }}
            className="w-full mt-10 py-5 bg-[#C6A87C] text-black font-bold uppercase text-sm tracking-[0.2em] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(198,168,124,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            Inquire About This Aircraft
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FleetOverlay() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const { isFleetOpen, closeFleet } = useUI();

  // Prevent body scroll when fleet overlay is open
  useEffect(() => {
    if (isFleetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFleetOpen]);

  return (
    <AnimatePresence>
      {isFleetOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-[#C6A87C] text-[10px] uppercase tracking-[0.3em] mb-4">The Fleet</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-white leading-none font-light">
                  Engineering <br/> <span className="italic text-white/40">Excellence</span>
                </h3>
              </div>
              <button 
                onClick={closeFleet}
                className="p-3 rounded-full border border-white/10 hover:border-white text-white transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" strokeWidth={1} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-24">
              {fleet.map((jet, index) => (
                <motion.div
                  key={jet.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedAircraft(jet)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-[#111]">
                    <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    <ImageWithLoader 
                      src={jet.image} 
                      alt={jet.name} 
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ArrowRight className="text-white w-6 h-6 -rotate-45" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[#C6A87C] text-[9px] uppercase tracking-[0.2em] mb-2">{jet.category}</p>
                      <h4 className="text-3xl font-serif text-white font-light group-hover:text-[#C6A87C] transition-colors">{jet.name}</h4>
                    </div>

                    <div className="flex justify-between border-t border-white/10 pt-4">
                      <div>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Passengers</p>
                        <p className="text-xs text-white font-mono">{jet.stats.passengers}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Range</p>
                        <p className="text-xs text-white font-mono">{jet.stats.range}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Speed</p>
                        <p className="text-xs text-white font-mono">{jet.stats.speed}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedAircraft && (
              <AircraftModal 
                aircraft={selectedAircraft} 
                onClose={() => setSelectedAircraft(null)} 
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
