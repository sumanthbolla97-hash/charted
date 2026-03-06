import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

type Airport = {
  code: string;
  city: string;
  name: string;
  lat: number;
  lon: number;
};

const internationalAirports: Airport[] = [
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International', lat: 17.2403, lon: 78.4294 },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International', lat: 13.1986, lon: 77.7066 },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International', lat: 12.9941, lon: 80.1709 },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International', lat: 19.0896, lon: 72.8656 },
  { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International', lat: 28.5562, lon: 77.1 },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose International', lat: 22.6547, lon: 88.4467 },
  { code: 'COK', city: 'Kochi', name: 'Cochin International', lat: 10.152, lon: 76.4019 },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel International', lat: 23.0772, lon: 72.6347 },
  { code: 'GOI', city: 'Goa', name: 'Dabolim International', lat: 15.3808, lon: 73.8314 },
  { code: 'PNQ', city: 'Pune', name: 'Pune International', lat: 18.5821, lon: 73.9197 },
  { code: 'AUH', city: 'Abu Dhabi', name: 'Zayed International', lat: 24.433, lon: 54.6511 },
  { code: 'DOH', city: 'Doha', name: 'Hamad International', lat: 25.2731, lon: 51.6081 },
  { code: 'RUH', city: 'Riyadh', name: 'King Khalid International', lat: 24.9576, lon: 46.6988 },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International', lat: 25.2532, lon: 55.3657 },
  { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz International', lat: 21.6702, lon: 39.1525 },
  { code: 'MCT', city: 'Muscat', name: 'Muscat International', lat: 23.5933, lon: 58.2844 },
  { code: 'KWI', city: 'Kuwait City', name: 'Kuwait International', lat: 29.2266, lon: 47.9689 },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi International', lat: 13.69, lon: 100.7501 },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International', lat: 22.308, lon: 113.9185 },
  { code: 'NRT', city: 'Tokyo', name: 'Narita International', lat: 35.772, lon: 140.3929 },
  { code: 'HND', city: 'Tokyo', name: 'Haneda International', lat: 35.5494, lon: 139.7798 },
  { code: 'ICN', city: 'Seoul', name: 'Incheon International', lat: 37.4602, lon: 126.4407 },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International', lat: 2.7456, lon: 101.7099 },
  { code: 'CGK', city: 'Jakarta', name: 'Soekarno-Hatta International', lat: -6.1256, lon: 106.6559 },
  { code: 'MNL', city: 'Manila', name: 'Ninoy Aquino International', lat: 14.5086, lon: 121.0198 },
  { code: 'SIN', city: 'Singapore', name: 'Changi International', lat: 1.3644, lon: 103.9915 },
  { code: 'PEK', city: 'Beijing', name: 'Beijing Capital International', lat: 40.0799, lon: 116.6031 },
  { code: 'PVG', city: 'Shanghai', name: 'Shanghai Pudong International', lat: 31.1443, lon: 121.8083 },
  { code: 'CAN', city: 'Guangzhou', name: 'Baiyun International', lat: 23.3924, lon: 113.2988 },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith International', lat: -33.9399, lon: 151.1753 },
  { code: 'MEL', city: 'Melbourne', name: 'Melbourne International', lat: -37.6733, lon: 144.8433 },
  { code: 'AKL', city: 'Auckland', name: 'Auckland International', lat: -37.0082, lon: 174.785 },
  { code: 'LHR', city: 'London', name: 'Heathrow International', lat: 51.47, lon: -0.4543 },
  { code: 'LGW', city: 'London', name: 'Gatwick International', lat: 51.1537, lon: -0.1821 },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle International', lat: 49.0097, lon: 2.5479 },
  { code: 'AMS', city: 'Amsterdam', name: 'Schiphol International', lat: 52.31, lon: 4.7683 },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt International', lat: 50.0379, lon: 8.5622 },
  { code: 'MUC', city: 'Munich', name: 'Munich International', lat: 48.3538, lon: 11.7861 },
  { code: 'MAD', city: 'Madrid', name: 'Adolfo Suárez Madrid-Barajas', lat: 40.4983, lon: -3.5676 },
  { code: 'BCN', city: 'Barcelona', name: 'El Prat International', lat: 41.2974, lon: 2.0833 },
  { code: 'FCO', city: 'Rome', name: 'Leonardo da Vinci International', lat: 41.8003, lon: 12.2389 },
  { code: 'ZRH', city: 'Zurich', name: 'Zurich International', lat: 47.4581, lon: 8.5555 },
  { code: 'VIE', city: 'Vienna', name: 'Vienna International', lat: 48.1103, lon: 16.5697 },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', lat: 41.2753, lon: 28.7519 },
  { code: 'ATH', city: 'Athens', name: 'Athens International', lat: 37.9364, lon: 23.9475 },
  { code: 'CPH', city: 'Copenhagen', name: 'Copenhagen International', lat: 55.618, lon: 12.6508 },
  { code: 'ARN', city: 'Stockholm', name: 'Arlanda International', lat: 59.6498, lon: 17.9238 },
  { code: 'OSL', city: 'Oslo', name: 'Oslo Gardermoen International', lat: 60.1939, lon: 11.1004 },
  { code: 'HEL', city: 'Helsinki', name: 'Helsinki-Vantaa International', lat: 60.3172, lon: 24.9633 },
  { code: 'DUB', city: 'Dublin', name: 'Dublin International', lat: 53.4273, lon: -6.2436 },
  { code: 'LIS', city: 'Lisbon', name: 'Lisbon Humberto Delgado International', lat: 38.7742, lon: -9.1342 },
  { code: 'WAW', city: 'Warsaw', name: 'Warsaw Chopin International', lat: 52.1657, lon: 20.9671 },
  { code: 'PRG', city: 'Prague', name: 'Václav Havel Airport Prague', lat: 50.1008, lon: 14.26 },
  { code: 'BUD', city: 'Budapest', name: 'Budapest Ferenc Liszt International', lat: 47.4298, lon: 19.2611 },
  { code: 'OTP', city: 'Bucharest', name: 'Henri Coandă International', lat: 44.5711, lon: 26.085 },
  { code: 'CAI', city: 'Cairo', name: 'Cairo International', lat: 30.1219, lon: 31.4056 },
  { code: 'NBO', city: 'Nairobi', name: 'Jomo Kenyatta International', lat: -1.3192, lon: 36.9278 },
  { code: 'ADD', city: 'Addis Ababa', name: 'Bole International', lat: 8.9779, lon: 38.7993 },
  { code: 'JNB', city: 'Johannesburg', name: 'O.R. Tambo International', lat: -26.1337, lon: 28.242 },
  { code: 'CPT', city: 'Cape Town', name: 'Cape Town International', lat: -33.9715, lon: 18.6021 },
  { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed International', lat: 6.5774, lon: 3.3212 },
  { code: 'CMN', city: 'Casablanca', name: 'Mohammed V International', lat: 33.3675, lon: -7.5899 },
  { code: 'GRU', city: 'São Paulo', name: 'Guarulhos International', lat: -23.4356, lon: -46.4731 },
  { code: 'GIG', city: 'Rio de Janeiro', name: 'Galeão International', lat: -22.809, lon: -43.2506 },
  { code: 'EZE', city: 'Buenos Aires', name: 'Ezeiza International', lat: -34.8222, lon: -58.5358 },
  { code: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez International', lat: -33.3929, lon: -70.7858 },
  { code: 'BOG', city: 'Bogotá', name: 'El Dorado International', lat: 4.7016, lon: -74.1469 },
  { code: 'LIM', city: 'Lima', name: 'Jorge Chávez International', lat: -12.0219, lon: -77.1143 },
  { code: 'PTY', city: 'Panama City', name: 'Tocumen International', lat: 9.0714, lon: -79.3835 },
  { code: 'MEX', city: 'Mexico City', name: 'Benito Juárez International', lat: 19.4361, lon: -99.0719 },
  { code: 'YYZ', city: 'Toronto', name: 'Toronto Pearson International', lat: 43.6777, lon: -79.6248 },
  { code: 'YVR', city: 'Vancouver', name: 'Vancouver International', lat: 49.1947, lon: -123.1792 },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International', lat: 40.6413, lon: -73.7781 },
  { code: 'EWR', city: 'Newark', name: 'Newark Liberty International', lat: 40.6895, lon: -74.1745 },
  { code: 'IAD', city: 'Washington', name: 'Dulles International', lat: 38.9531, lon: -77.4565 },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson International', lat: 33.6407, lon: -84.4277 },
  { code: 'MIA', city: 'Miami', name: 'Miami International', lat: 25.7959, lon: -80.2871 },
  { code: 'ORD', city: 'Chicago', name: 'O’Hare International', lat: 41.9742, lon: -87.9073 },
  { code: 'DFW', city: 'Dallas', name: 'Dallas/Fort Worth International', lat: 32.8998, lon: -97.0403 },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International', lat: 33.9416, lon: -118.4085 },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco International', lat: 37.6213, lon: -122.379 },
  { code: 'SEA', city: 'Seattle', name: 'Seattle-Tacoma International', lat: 47.4502, lon: -122.3088 },
];

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function FlightSearch() {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('one-way');
  const { openQuotes } = useUI();
  const [from, setFrom] = useState('Detecting nearest airport...');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [pax, setPax] = useState('1');

  useEffect(() => {
    const fallback = internationalAirports[0];

    const applyNearestAirport = (lat: number, lon: number) => {
      let nearest = fallback;
      let min = Number.POSITIVE_INFINITY;
      for (const airport of internationalAirports) {
        const d = haversineKm(lat, lon, airport.lat, airport.lon);
        if (d < min) {
          min = d;
          nearest = airport;
        }
      }
      setFrom(`${nearest.city} (${nearest.code})`);
    };

    if (!navigator.geolocation) {
      setFrom(`${fallback.city} (${fallback.code})`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => applyNearestAirport(pos.coords.latitude, pos.coords.longitude),
      () => setFrom(`${fallback.city} (${fallback.code})`),
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 300000 }
    );
  }, []);

  const handleSearch = () => {
    openQuotes({
      tripType,
      from: from.trim(),
      to: to.trim(),
      date,
      pax,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20 -mt-24 px-4">
      <div className="bg-[#0A0A0A] border border-white/10 p-5 md:p-10 shadow-2xl">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-8 md:mb-10">
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
        <div className="border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Origin */}
          <div className="p-4 group hover:bg-white/5 transition-colors min-h-[96px]">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">From (Auto)</label>
            <input 
              type="text" 
              value={from}
              readOnly
              className="w-full bg-transparent text-white/90 focus:outline-none font-serif text-xl cursor-not-allowed"
            />
          </div>

          {/* Destination */}
          <div className="p-4 group hover:bg-white/5 transition-colors min-h-[96px]">
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
          <div className="p-4 group hover:bg-white/5 transition-colors min-h-[96px]">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-2">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none font-sans text-sm uppercase tracking-wider"
            />
          </div>

          {/* Passengers */}
          <div className="p-4 group hover:bg-white/5 transition-colors min-h-[96px]">
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
          </div>

          {/* Search Button */}
          <div className="border-t border-white/10">
            <button 
              onClick={handleSearch}
              className="w-full min-h-[80px] bg-white hover:bg-[#C6A87C] text-black hover:text-white flex items-center justify-center transition-all duration-500 group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
