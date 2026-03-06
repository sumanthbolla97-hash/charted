import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';

export function AuthModal() {
  const { isAuthOpen, closeAuth } = useUI();
  const { login, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      setEmail('');
      setPassword('');
      setName('');
      closeAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeAuth} />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={closeAuth}
              className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                    mode === 'login'
                      ? 'border-[#C6A87C] text-[#C6A87C]'
                      : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                    mode === 'signup'
                      ? 'border-[#C6A87C] text-[#C6A87C]'
                      : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-xl font-serif text-white mb-2">
                {mode === 'login' ? 'Login to Vista' : 'Create Vista Account'}
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                {mode === 'login'
                  ? 'Access your account and manage private travel.'
                  : 'Register to begin charter requests and concierge support.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                      placeholder="Jane Doe"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#C6A87C] text-black font-medium uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors mt-2 disabled:opacity-60"
                >
                  {submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
