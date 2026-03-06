import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Plane, ReceiptText, X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { subscribeUserBookings, type BookingRecord } from '../services/bookings';

export function UserPanel() {
  const { isUserPanelOpen, closeUserPanel } = useUI();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }
    const unsub = subscribeUserBookings(user.uid, setBookings);
    return unsub;
  }, [user]);

  return (
    <AnimatePresence>
      {isUserPanelOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[240] flex justify-end"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeUserPanel} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="relative w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif text-white">My Bookings</h3>
              <button onClick={closeUserPanel} className="p-2 text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {!user && (
              <p className="text-sm text-gray-400">Please log in to view bookings.</p>
            )}

            {user && bookings.length === 0 && (
              <p className="text-sm text-gray-400">No bookings yet. Your new bookings will appear here.</p>
            )}

            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="border border-white/10 p-4 bg-[#0F0F0F]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                    {b.source === 'live_quote' ? 'Live Quote' : 'Empty Leg'}
                  </p>
                  <p className="text-lg font-serif text-white mb-3">{b.aircraft}</p>
                  <div className="space-y-2 text-sm text-white/80">
                    <p className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#D4AF37]" />
                      {b.route}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                      {b.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <ReceiptText className="w-4 h-4 text-[#D4AF37]" />
                      {b.amountUsd}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
