import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { chatWithConcierge } from '../services/ai';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export function AIConcierge() {
  const { isChatOpen, closeChat, openChat, initialMessage } = useUI();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Welcome to Vista Charter. I am your personal aviation advisor. How may I assist with your travel plans today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle initial message from context
  useEffect(() => {
    if (initialMessage) {
      setInput(initialMessage);
    }
  }, [initialMessage]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await chatWithConcierge(userMsg, history);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I apologize, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to the network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: '100%', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%', scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed z-[100] bg-[#0A0A0A] border border-[#333] shadow-2xl flex flex-col overflow-hidden",
                // Mobile Styles: Full width bottom sheet
                "bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl border-b-0",
                // Desktop Styles: Floating card
                "md:bottom-6 md:right-6 md:left-auto md:w-[400px] md:h-[600px] md:max-h-[calc(100vh-3rem)] md:rounded-2xl md:border"
              )}
            >
              {/* Header */}
              <div className="p-4 border-b border-[#222] bg-[#0F0F0F] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C6A87C] to-[#8A7120] flex items-center justify-center shadow-lg shadow-[#C6A87C]/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white leading-none tracking-wide">Vista AI</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Concierge</p>
                  </div>
                </div>
                <button 
                  onClick={closeChat} 
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <ChevronDown className="md:hidden w-6 h-6" />
                  <X className="hidden md:block w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-[#222] text-white rounded-tr-sm" 
                        : "bg-[#C6A87C]/10 text-[#E0E0E0] border border-[#C6A87C]/20 rounded-tl-sm"
                    )}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#C6A87C]/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#0F0F0F] border-t border-[#222] shrink-0 pb-8 md:pb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about flights or membership..."
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-full py-3.5 px-5 pr-12 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-gray-600 shadow-inner"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#C6A87C] rounded-full text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#C6A87C]/20"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => openChat()}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#C6A87C] text-black shadow-xl shadow-[#C6A87C]/20 z-40 flex items-center justify-center transition-all duration-500 hover:bg-white",
          isChatOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} strokeWidth={1.5} />
      </motion.button>
    </>
  );
}
