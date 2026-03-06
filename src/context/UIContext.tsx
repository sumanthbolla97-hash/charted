import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isChatOpen: boolean;
  openChat: (initialMessage?: string) => void;
  closeChat: () => void;
  initialMessage: string;
  isFleetOpen: boolean;
  openFleet: () => void;
  closeFleet: () => void;
  isInquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [isFleetOpen, setIsFleetOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openChat = (msg?: string) => {
    if (msg) setInitialMessage(msg);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setInitialMessage('');
  };

  const openFleet = () => setIsFleetOpen(true);
  const closeFleet = () => setIsFleetOpen(false);

  const openInquiry = () => setIsInquiryOpen(true);
  const closeInquiry = () => setIsInquiryOpen(false);
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <UIContext.Provider value={{ 
      isChatOpen, 
      openChat, 
      closeChat, 
      initialMessage,
      isFleetOpen,
      openFleet,
      closeFleet,
      isInquiryOpen,
      openInquiry,
      closeInquiry,
      isAuthOpen,
      openAuth,
      closeAuth
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
