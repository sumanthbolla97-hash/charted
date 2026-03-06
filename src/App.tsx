import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlightSearch } from './components/FlightSearch';
import { FleetOverlay } from './components/FleetSection';
import { EmptyLegs } from './components/EmptyLegs';
import { Experience } from './components/Experience';
import { AIConcierge } from './components/AIConcierge';
import { InquiryModal } from './components/InquiryModal';
import { AuthModal } from './components/AuthModal';
import { LiveQuotesModal } from './components/LiveQuotesModal';
import { MockCheckoutPage } from './components/MockCheckoutPage';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

function App() {
  const params = new URLSearchParams(window.location.search);
  const isMockCheckout = params.get('mockCheckout') === '1';

  if (isMockCheckout) {
    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
        <MockCheckoutPage />
        <AIConcierge />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <Hero />
      <div className="relative z-30 px-6">
        <FlightSearch />
      </div>
      <Experience />
      <EmptyLegs />
      
      {/* Footer */}
      <footer className="bg-[#020202] py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <span className="font-serif text-2xl text-white tracking-wider block mb-6">VISTA</span>
            <p className="text-gray-500 text-sm leading-relaxed">
              The world's first and only global private aviation company.
            </p>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Program</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">On Demand</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Empty Legs</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Corporate</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs mb-6">Contact</h4>
            <p className="text-gray-500 text-sm mb-4">+1 (800) 555-0123</p>
            <p className="text-gray-500 text-sm mb-4">concierge@vistacharter.com</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2026 Vista Charter. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      <AIConcierge />
      <FleetOverlay />
      <InquiryModal />
      <AuthModal />
      <LiveQuotesModal />
    </div>
  );
}

export default App;
