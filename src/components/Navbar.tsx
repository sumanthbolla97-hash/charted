import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openFleet, openInquiry, openAuth } = useUI();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-16 py-6",
          isScrolled ? "bg-[#050505]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg" : "bg-transparent py-8"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#C6A87C] transition-colors duration-500">
               <span className="font-serif text-xl text-white group-hover:text-[#C6A87C] transition-colors">V</span>
            </div>
            <span className="font-sans text-sm tracking-[0.2em] text-white font-light group-hover:text-[#C6A87C] transition-colors duration-500">VISTA</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {['The Fleet', 'Membership', 'Empty Legs', 'Experience'].map((link) => (
              <a 
                key={link} 
                href="#" 
                onClick={(e) => {
                  if (link === 'The Fleet') {
                    e.preventDefault();
                    openFleet();
                  }
                }}
                className="text-[11px] uppercase tracking-[0.15em] text-gray-300 hover:text-[#C6A87C] transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C6A87C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8">
            {!user ? (
              <button
                onClick={openAuth}
                className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white hover:text-[#C6A87C] transition-colors"
              >
                Login
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-300 max-w-[180px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-[11px] uppercase tracking-[0.15em] text-white hover:text-[#C6A87C] transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            <button 
              onClick={openInquiry}
              className="px-8 py-3 bg-white text-black hover:bg-[#C6A87C] hover:text-white transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-medium"
            >
              Inquire
            </button>
            <button 
              className="md:hidden text-white hover:text-[#C6A87C] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 bg-[#050505] z-[60] flex flex-col p-8 md:p-16"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-sans text-sm tracking-[0.2em] text-white">VISTA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#C6A87C] transition-colors">
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {['The Fleet', 'Membership', 'Empty Legs', 'Experience', 'About', 'Login'].map((link, i) => (
                <motion.a 
                  key={link} 
                  href="#" 
                  onClick={(e) => {
                    if (link === 'The Fleet') {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      openFleet();
                      return;
                    }
                    if (link === 'Login') {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      if (user) {
                        void logout();
                      } else {
                        openAuth();
                      }
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="font-serif text-4xl md:text-5xl text-white hover:text-[#C6A87C] transition-colors font-light"
                >
                  {link === 'Login' && user ? 'Logout' : link}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-6 bg-[#C6A87C] text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-500"
              >
                Request a Flight
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
