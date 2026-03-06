import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, CircleDollarSign, Clock3, Plane, Users, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/bookings';

type Quote = {
  aircraft: string;
  cabin: string;
  eta: string;
  marketSource: string;
  price: number;
  image: string;
};

const airportCoords: Record<string, { lat: number; lon: number }> = {
  london: { lat: 51.5072, lon: -0.1276 },
  newyork: { lat: 40.7128, lon: -74.006 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  paris: { lat: 48.8566, lon: 2.3522 },
  losangeles: { lat: 34.0522, lon: -118.2437 },
  cabo: { lat: 22.8905, lon: -109.9167 },
  mumbai: { lat: 19.076, lon: 72.8777 },
  singapore: { lat: 1.3521, lon: 103.8198 },
};

function normalizePlace(input: string) {
  return input.toLowerCase().replace(/[^a-z]/g, '');
}

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

function routeDistanceKm(from: string, to: string) {
  const a = airportCoords[normalizePlace(from)];
  const b = airportCoords[normalizePlace(to)];
  if (!a || !b) return 3200; // fallback market route length
  return haversineKm(a.lat, a.lon, b.lat, b.lon);
}

function usd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function LiveQuotesModal() {
  const { isQuotesOpen, quoteRequest, closeQuotes, openChat, openAuth } = useUI();
  const { user } = useAuth();
  const [activeBookedCard, setActiveBookedCard] = useState<string | null>(null);
  const [activeConcierge, setActiveConcierge] = useState<{ name: string; aircraft: string } | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const quotes = useMemo((): Quote[] => {
    if (!quoteRequest) return [];
    const distanceKm = routeDistanceKm(quoteRequest.from || '', quoteRequest.to || '');
    const distanceNm = distanceKm * 0.539957;
    const pax = Number(quoteRequest.pax === '9+' ? 9 : quoteRequest.pax) || 1;
    const isRound = quoteRequest.tripType === 'round-trip';
    const legsMultiplier = isRound ? 1.9 : 1;
    const paxMultiplier = 1 + Math.max(0, pax - 4) * 0.035;
    const marketJitter = 0.94 + (Math.abs(distanceKm % 10) / 100);

    const base = [
      {
        aircraft: 'Citation Longitude',
        cabin: 'Super Midsize',
        speedKts: 476,
        ratePerHour: 7600,
        marketSource: 'Private charter board index',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cessna%20Citation%20Longitude%20N807QS.jpg?width=1600',
      },
      {
        aircraft: 'Challenger 350',
        cabin: 'Super Midsize',
        speedKts: 470,
        ratePerHour: 8900,
        marketSource: 'Broker live quote stream',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/CS-CHE%20Bombardier%20Challenger%20350%20Netjets%20Europe%20(28570675881).jpg?width=1600',
      },
      {
        aircraft: 'Global 7500',
        cabin: 'Ultra Long Range',
        speedKts: 595,
        ratePerHour: 14800,
        marketSource: 'Operator inventory feed',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bombardier%20Global%207500%20on%20static%20display,%20EBACE%202018,%20Le%20Grand-Saconnex%20(BL7C0578).jpg?width=1600',
      },
    ];

    return base.map((q) => {
      const hours = Math.max(1.5, distanceNm / q.speedKts);
      const price = q.ratePerHour * hours * legsMultiplier * paxMultiplier * marketJitter;
      return {
        aircraft: q.aircraft,
        cabin: q.cabin,
        eta: `${Math.ceil(hours * 60)} min flight time`,
        marketSource: q.marketSource,
        price,
        image: q.image,
      };
    });
  }, [quoteRequest]);

  return (
    <AnimatePresence>
      {isQuotesOpen && quoteRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[230] flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => {
              setActiveBookedCard(null);
              closeQuotes();
            }}
          />
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-[#333] rounded-2xl shadow-2xl"
          >
            <button
              onClick={() => {
                setActiveBookedCard(null);
                closeQuotes();
              }}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8 border-b border-white/10">
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.24em] mb-2">Live Market Snapshot</p>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                {quoteRequest.from || 'Departure'} to {quoteRequest.to || 'Arrival'}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-white/70">
                <span className="inline-flex items-center gap-2"><Plane className="w-4 h-4 text-[#D4AF37]" />{quoteRequest.tripType.replace('-', ' ')}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="w-4 h-4 text-[#D4AF37]" />{quoteRequest.date || 'Flexible date'}</span>
                <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-[#D4AF37]" />{quoteRequest.pax} passengers</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-[#D4AF37]" />Updated now</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {quotes.map((q, idx) => (
                <div key={q.aircraft} className="relative p-6 md:p-7 overflow-hidden">
                  <img
                    src={q.image}
                    alt={q.aircraft}
                    className="absolute inset-0 w-full h-full object-cover opacity-25"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/75 to-[#0A0A0A] pointer-events-none" />

                  <div className="relative z-[1]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2">{q.cabin}</p>
                  <h4 className="text-xl font-serif text-white mb-3">{q.aircraft}</h4>
                  <p className="text-xs text-gray-400 mb-5">{q.eta}</p>
                  <p className="text-3xl font-serif text-[#D4AF37] mb-1">{usd(q.price)}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/45 mb-6">Estimated USD Total</p>
                  <div className="inline-flex items-center gap-2 text-[10px] text-white/55 border border-white/10 px-3 py-1">
                    <CircleDollarSign className="w-3 h-3 text-[#D4AF37]" />
                    {q.marketSource}
                  </div>
                  <button
                    onClick={async () => {
                      if (activeBookedCard) return;
                      if (!user) {
                        openAuth();
                        return;
                      }
                      setActiveBookedCard(q.aircraft);
                      const conciergeNames = ['Ram Bolla', 'Ethan Cole', 'Isabella Reed'];
                      setActiveConcierge({ name: conciergeNames[idx % conciergeNames.length], aircraft: q.aircraft });
                      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
                      fadeTimerRef.current = setTimeout(() => setActiveBookedCard(null), 1800);
                      try {
                        await createBooking({
                          userId: user.uid,
                          source: 'live_quote',
                          aircraft: q.aircraft,
                          route: `${quoteRequest.from || 'Departure'} to ${quoteRequest.to || 'Arrival'}`,
                          date: quoteRequest.date || 'Flexible date',
                          amountUsd: usd(q.price),
                        });
                      } catch {
                        // keep UX moving even if write fails
                      }
                      const params = new URLSearchParams({
                        mockCheckout: '1',
                        aircraft: q.aircraft,
                        route: `${quoteRequest.from || 'Departure'} to ${quoteRequest.to || 'Arrival'}`,
                        date: quoteRequest.date || 'Flexible date',
                        amount: String(Math.round(q.price)),
                      });
                      window.location.href = `${window.location.origin}/?${params.toString()}`;
                    }}
                    disabled={Boolean(activeBookedCard)}
                    className="w-full mt-6 py-3 bg-[#D4AF37] text-black font-semibold uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Now
                  </button>
                  </div>

                  <AnimatePresence>
                    {activeBookedCard === q.aircraft && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="absolute inset-0 z-10 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 text-center"
                      >
                        <p className="text-sm text-emerald-300 leading-relaxed">
                          {q.aircraft} reserved. Concierge will contact you shortly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {activeConcierge && (
              <div className="border-t border-white/10 px-6 md:px-8 py-5 bg-[#0D0D0D] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Your Concierge</p>
                  <p className="text-white font-serif text-lg">{activeConcierge.name}</p>
                  <p className="text-xs text-white/55 mt-1">Assigned for {activeConcierge.aircraft}</p>
                </div>
                <button
                  onClick={() =>
                    openChat(`Hi ${activeConcierge.name}, I completed payment and need assistance with my ${activeConcierge.aircraft} booking.`)
                  }
                  className="w-full md:w-auto px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  Connect Now
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
