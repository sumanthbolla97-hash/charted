import { CheckCircle2, Headset, ShieldCheck } from 'lucide-react';
import { useUI } from '../context/UIContext';

function money(value: string) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function MockCheckoutPage() {
  const { openChat } = useUI();
  const params = new URLSearchParams(window.location.search);
  const aircraft = params.get('aircraft') || 'Aircraft';
  const route = params.get('route') || 'Route';
  const date = params.get('date') || 'Date TBD';
  const amount = params.get('amount') || '0';

  return (
    <div className="min-h-screen bg-[#070707] text-white px-6 py-10 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="border border-white/10 bg-[#0D0D0D] p-8 rounded-2xl">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.24em] mb-2">Mock Checkout</p>
          <h1 className="text-3xl md:text-4xl font-serif mb-8">Booking Confirmation</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Aircraft</p>
              <p className="text-lg font-serif">{aircraft}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Route</p>
              <p className="text-lg font-serif">{route}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Departure</p>
              <p className="text-lg font-serif">{date}</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Estimated Total</p>
              <p className="text-2xl font-serif text-[#D4AF37]">{money(amount)}</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-400/25 p-4 rounded-lg flex items-start gap-3 mb-8">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5" />
            <p className="text-sm text-emerald-200">Mock payment accepted. Concierge will contact you shortly.</p>
          </div>

          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-colors"
          >
            Return to Homepage
          </button>
        </div>

        <div className="border border-white/10 bg-[#0D0D0D] p-6 rounded-2xl h-fit">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.24em] mb-4">Live Agent Panel</p>
          <div className="border border-white/10 p-4 mb-4">
            <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Agent Contact</p>
            <p className="text-white font-serif text-lg">+91 7799934943</p>
          </div>
          <div className="space-y-4 mb-6">
            <div className="border border-white/10 p-4">
              <p className="text-white font-serif">Sophia Bennett</p>
              <p className="text-xs text-emerald-300 mt-1">Online now</p>
            </div>
            <div className="border border-white/10 p-4">
              <p className="text-white font-serif">Ethan Cole</p>
              <p className="text-xs text-emerald-300 mt-1">Online now</p>
            </div>
          </div>
          <button
            onClick={() => openChat(`Hi team, I completed mock checkout for ${aircraft} (${route}) and want to finalize.`)}
            className="w-full py-3 bg-[#D4AF37] text-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <Headset className="w-4 h-4" />
            Connect Now
          </button>
          <a
            href="https://wa.me/917799934943"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-3 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center justify-center"
          >
            WhatsApp Connect
          </a>
          <div className="mt-6 text-xs text-white/60 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] mt-0.5" />
            This is a mock payment page for demo use.
          </div>
        </div>
      </div>
    </div>
  );
}
