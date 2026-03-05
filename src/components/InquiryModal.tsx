import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useUI } from '../context/UIContext';

export function InquiryModal() {
  const { isInquiryOpen, closeInquiry } = useUI();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    address: ''
  });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isInquiryOpen) {
      setIsSubmitted(false);
      setFormData({ name: '', companyName: '', address: '' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isInquiryOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      // Auto-close after 3 seconds
      setTimeout(() => {
        closeInquiry();
      }, 3000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isInquiryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeInquiry} />
          
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
          >
            <button 
              onClick={closeInquiry}
              className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  <h2 className="text-xl font-serif text-white mb-2">Inquire Now</h2>
                  <p className="text-gray-400 text-xs mb-6">Please provide your details below.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                        placeholder="Acme Corp"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Address</label>
                      <textarea 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light resize-none"
                        placeholder="123 Business Rd, Suite 100"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#C6A87C] text-black font-medium uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors mt-2"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#C6A87C]/20 flex items-center justify-center mb-4">
                    <Check className="text-[#C6A87C] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Thank You</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                    Our team will get in touch with you shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
