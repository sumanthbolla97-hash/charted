import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

export function FlightSearch() {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('one-way');
  const { openChat } = useUI();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [pax, setPax] = useState('1');

  const handleSearch = () => {
    openChat(`I'd like to book a ${tripType.replace('-', ' ')} flight from ${from || '...'} to ${to || '...'} on ${date || '...'} for ${pax} passengers.`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20 -mt-24 px-4">
      <div className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 shadow-2xl">
        {/* Tabs */}
        <div className="flex justify-center gap-12 mb-10">
          {['One Way', 'Round Trip', 'Multi City'].map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type.toLowerCase().replace(' ', '-') as any)}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative pb-2",
                tripType === type.toLowerCase().replace(' ', '-') 
                  ? "text-white" 
                  : "text-white/40 hover:text-white"
              )}
            >
              {type}
              {tripType === type.toLowerCase().replace(' ', '-') && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A87C]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Origin */}
          <div className="md:col-span-3 p-4 group hover:bg-white/5 transition-colors">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">From</label>
            <input 
              type="text" 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Departure" 
              className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none font-serif text-xl"
            />
          </div>

          {/* Destination */}
          <div className="md:col-span-3 p-4 group hover:bg-white/5 transition-colors">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">To</label>
            <input 
              type="text" 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Arrival" 
              className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none font-serif text-xl"
            />
          </div>

          {/* Date */}
          <div className="md:col-span-3 p-4 group hover:bg-white/5 transition-colors">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none font-sans text-sm uppercase tracking-wider"
            />
          </div>

          {/* Passengers */}
          <div className="md:col-span-2 p-4 group hover:bg-white/5 transition-colors">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">Pax</label>
            <select 
              value={pax}
              onChange={(e) => setPax(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none font-sans text-sm appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                <option key={num} value={num} className="bg-[#0A0A0A] text-white">{num} Passengers</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-1">
            <button 
              onClick={handleSearch}
              className="w-full h-full min-h-[80px] bg-white hover:bg-[#C6A87C] text-black hover:text-white flex items-center justify-center transition-all duration-500 group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
