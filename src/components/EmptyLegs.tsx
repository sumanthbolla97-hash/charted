import { motion } from 'motion/react';
import { Plane, ArrowRight, MapPin } from 'lucide-react';
import { useUI } from '../context/UIContext';

const emptyLegs = [
  {
    from: "London (LTN)",
    to: "New York (TEB)",
    date: "Oct 24",
    aircraft: "Global 7500",
    price: "$45,000",
    originalPrice: "$85,000"
  },
  {
    from: "Dubai (DWC)",
    to: "Paris (LBG)",
    date: "Oct 26",
    aircraft: "Challenger 350",
    price: "$28,000",
    originalPrice: "$55,000"
  },
  {
    from: "Los Angeles (VNY)",
    to: "Cabo San Lucas (MMSD)",
    date: "Oct 28",
    aircraft: "Citation XLS",
    price: "$12,000",
    originalPrice: "$22,000"
  }
];

export function EmptyLegs() {
  const { openChat } = useUI();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#D4AF37] text-sm uppercase tracking-[0.2em] mb-4">Opportunities</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight">
              Empty Leg <span className="italic text-gray-500">Flights</span>
            </h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors uppercase text-xs tracking-widest group">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emptyLegs.map((flight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openChat(`I'm interested in the empty leg from ${flight.from} to ${flight.to} on ${flight.date}.`)}
              className="group bg-[#0F0F0F] border border-white/5 p-6 hover:border-[#D4AF37]/30 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 text-[10px] uppercase tracking-widest">
                  {flight.date}
                </div>
                <Plane className="text-gray-600 w-5 h-5 -rotate-45" />
              </div>

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
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Aircraft</p>
                  <p className="text-sm text-white">{flight.aircraft}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 line-through mb-1">{flight.originalPrice}</p>
                  <p className="text-xl text-[#D4AF37] font-serif">{flight.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
