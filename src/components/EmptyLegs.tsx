import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ArrowRight, Clock3, X, Users, Gauge, CalendarDays, CheckCircle2 } from 'lucide-react';

type EmptyLegListing = {
  id: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  aircraft: string;
  category: string;
  seats: string;
  speed: string;
  range: string;
  price: string;
  originalPrice: string;
  image: string;
  status: 'hot' | 'new' | 'last-seats';
  updatedMinutesAgo: number;
};

const emptyLegs: EmptyLegListing[] = [
  {
    id: 'el-001',
    from: 'London (LTN)',
    to: 'New York (TEB)',
    date: 'Mar 14, 2026',
    departureTime: '08:20 UTC',
    aircraft: 'Global 7500',
    category: 'Ultra Long Range',
    seats: 'Up to 14 guests',
    speed: 'Mach 0.925',
    range: '14,260 km',
    price: '$45,000',
    originalPrice: '$85,000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bombardier%20Global%207500%20on%20static%20display,%20EBACE%202018,%20Le%20Grand-Saconnex%20(BL7C0578).jpg?width=2200',
    status: 'hot',
    updatedMinutesAgo: 3,
  },
  {
    id: 'el-002',
    from: 'Dubai (DWC)',
    to: 'Paris (LBG)',
    date: 'Mar 16, 2026',
    departureTime: '10:45 UTC',
    aircraft: 'Challenger 350',
    category: 'Super Midsize',
    seats: 'Up to 8 guests',
    speed: 'Mach 0.82',
    range: '5,926 km',
    price: '$28,000',
    originalPrice: '$55,000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/CS-CHE%20Bombardier%20Challenger%20350%20Netjets%20Europe%20(28570675881).jpg?width=2200',
    status: 'new',
    updatedMinutesAgo: 7,
  },
  {
    id: 'el-003',
    from: 'Los Angeles (VNY)',
    to: 'Cabo (MMSD)',
    date: 'Mar 17, 2026',
    departureTime: '17:10 UTC',
    aircraft: 'Citation Longitude',
    category: 'Super Midsize',
    seats: 'Up to 8 guests',
    speed: '476 kts',
    range: '6,482 km',
    price: '$12,000',
    originalPrice: '$22,000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cessna%20Citation%20Longitude%20N807QS.jpg?width=2200',
    status: 'last-seats',
    updatedMinutesAgo: 11,
  },
];

function statusLabel(status: EmptyLegListing['status']) {
  if (status === 'hot') return 'High Demand';
  if (status === 'last-seats') return 'Last Seats';
  return 'New Listing';
}

function statusClass(status: EmptyLegListing['status']) {
  if (status === 'hot') return 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40';
  if (status === 'last-seats') return 'bg-red-500/15 text-red-300 border-red-400/30';
  return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30';
}

export function EmptyLegs() {
  const [selected, setSelected] = useState<EmptyLegListing | null>(null);
  const [confirmed, setConfirmed] = useState<EmptyLegListing | null>(null);

  const marketPulse = useMemo(() => `${emptyLegs.length} live opportunities`, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4">Marketplace</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
              Empty Leg <span className="italic text-gray-500">Flights</span>
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
            <Clock3 className="w-4 h-4" />
            {marketPulse}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emptyLegs.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelected(flight)}
              className="group bg-[#0F0F0F] border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={flight.image}
                  alt={flight.aircraft}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest px-3 py-1 border ${statusClass(flight.status)}`}>
                  {statusLabel(flight.status)}
                </span>
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-white/80 bg-black/30 border border-white/20 px-3 py-1">
                  {flight.updatedMinutesAgo}m ago
                </span>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full border border-gray-500" />
                    <span className="text-lg text-white font-serif">{flight.from}</span>
                  </div>
                  <div className="h-8 border-l border-dashed border-gray-700 ml-1" />
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-lg text-white font-serif">{flight.to}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{flight.aircraft}</p>
                    <p className="text-sm text-white/80">{flight.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 line-through mb-1">{flight.originalPrice}</p>
                    <p className="text-xl text-[#D4AF37] font-serif">{flight.price}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[190] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-5xl bg-[#0A0A0A] border border-[#333] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selected.image} alt={selected.aircraft} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto bg-[#0A0A0A]">
                <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.24em] mb-2">Live Marketplace Listing</p>
                <h3 className="text-3xl font-serif text-white mb-6">{selected.aircraft}</h3>

                <div className="space-y-4 mb-8 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <Plane className="w-4 h-4 text-[#D4AF37] -rotate-45" />
                    <span>{selected.from} to {selected.to}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selected.date} • {selected.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selected.seats}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="w-4 h-4 text-[#D4AF37]" />
                    <span>{selected.speed} • Range {selected.range}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-8">
                  <div className="bg-[#0A0A0A] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-white/50 mb-1">Category</p>
                    <p className="text-white">{selected.category}</p>
                  </div>
                  <div className="bg-[#0A0A0A] p-4 text-right">
                    <p className="text-[9px] uppercase tracking-wider text-white/50 mb-1">Market Price</p>
                    <p className="text-white line-through">{selected.originalPrice}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <p className="text-white/70 text-sm">Today&apos;s empty-leg offer</p>
                  <p className="text-3xl text-[#D4AF37] font-serif">{selected.price}</p>
                </div>

                <button
                  onClick={() => {
                    setConfirmed(selected);
                    setSelected(null);
                  }}
                  className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  Book This Empty Leg
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setConfirmed(null)} />
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-[#333] rounded-2xl p-8 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h4 className="text-2xl font-serif text-white mb-3">Booking Confirmed</h4>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Your booking request for {confirmed.from} to {confirmed.to} on {confirmed.date} has been received.
              </p>
              <button
                onClick={() => setConfirmed(null)}
                className="w-full py-3 bg-[#D4AF37] text-black font-medium uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
