import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { RecaptchaVerifier, type ConfirmationResult } from 'firebase/auth';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/firebase';

export function AuthModal() {
  const { isAuthOpen, closeAuth } = useUI();
  const { login, signUp, resetPassword, loginWithGoogle, sendPhoneCode, verifyPhoneCode } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const switchMode = (next: 'login' | 'signup' | 'forgot') => {
    setMode(next);
    setError('');
    setSuccessMessage('');
    if (next === 'forgot') {
      setPassword('');
      setName('');
    }
  };

  useEffect(() => {
    if (!isAuthOpen || authMethod !== 'phone' || !auth) return;
    if (recaptchaRef.current) return;

    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
  }, [isAuthOpen, authMethod]);

  useEffect(() => {
    if (!isAuthOpen && recaptchaRef.current) {
      recaptchaRef.current.clear();
      recaptchaRef.current = null;
      setConfirmationResult(null);
      setOtp('');
    }
  }, [isAuthOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setSubmitting(true);
    try {
      if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMessage('Password reset email sent. Please check your inbox.');
        setMode('login');
      } else if (authMethod === 'phone') {
        if (!confirmationResult) {
          if (!phone.trim()) {
            throw new Error('Please enter a valid phone number with country code.');
          }
          if (!recaptchaRef.current) {
            throw new Error('Phone authentication is not ready. Please try again.');
          }
          const result = await sendPhoneCode(phone.trim(), recaptchaRef.current);
          setConfirmationResult(result);
          setSuccessMessage('OTP sent. Enter the verification code.');
        } else {
          if (!otp.trim()) {
            throw new Error('Enter the OTP to continue.');
          }
          await verifyPhoneCode(confirmationResult, otp.trim());
          setSuccessMessage('Phone login successful.');
          closeAuth();
        }
      } else if (mode === 'signup') {
        await signUp(email, password);
        setSuccessMessage('Account created successfully.');
        closeAuth();
      } else {
        await login(email, password);
        setSuccessMessage('Login successful.');
        closeAuth();
      }
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setOtp('');
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
                  onClick={() => switchMode('login')}
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
                  onClick={() => switchMode('signup')}
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
                {mode === 'login'
                  ? 'Login to Vista'
                  : mode === 'signup'
                    ? 'Create Vista Account'
                    : 'Reset Password'}
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                {mode === 'login'
                  ? 'Access your account and manage private travel.'
                  : mode === 'signup'
                    ? 'Register to begin charter requests and concierge support.'
                    : 'Enter your email to receive a reset link.'}
              </p>

              {mode !== 'forgot' && (
                <div className="flex gap-2 mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('email');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className={`px-3 py-2 text-[10px] uppercase tracking-widest border transition-colors ${
                      authMethod === 'email'
                        ? 'border-[#C6A87C] text-[#C6A87C]'
                        : 'border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('phone');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className={`px-3 py-2 text-[10px] uppercase tracking-widest border transition-colors ${
                      authMethod === 'phone'
                        ? 'border-[#C6A87C] text-[#C6A87C]'
                        : 'border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    Mobile OTP
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && authMethod === 'email' && (
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

                {authMethod === 'email' || mode === 'forgot' ? (
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
                ) : (
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                      placeholder="+1XXXXXXXXXX"
                    />
                  </div>
                )}

                {mode !== 'forgot' && authMethod === 'email' && (
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
                )}

                {mode !== 'forgot' && authMethod === 'phone' && confirmationResult && (
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-[#C6A87C]">OTP</label>
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A87C] transition-colors font-light"
                      placeholder="6-digit code"
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-[#C6A87C] hover:text-white transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {mode !== 'forgot' && (
                  <button
                    type="button"
                    onClick={async () => {
                      setError('');
                      setSuccessMessage('');
                      setSubmitting(true);
                      try {
                        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                        await loginWithGoogle(isMobile);
                        closeAuth();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : 'Google authentication failed');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={submitting}
                    className="w-full py-2.5 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] hover:border-[#C6A87C] hover:text-[#C6A87C] transition-colors"
                  >
                    Continue with Google
                  </button>
                )}

                {error && <p className="text-xs text-red-400">{error}</p>}
                {successMessage && <p className="text-xs text-emerald-400">{successMessage}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#C6A87C] text-black font-medium uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-colors mt-2 disabled:opacity-60"
                >
                  {submitting
                    ? 'Please wait...'
                    : mode === 'login'
                      ? 'Login'
                      : mode === 'signup'
                        ? 'Create Account'
                        : confirmationResult
                          ? 'Verify OTP'
                          : authMethod === 'phone'
                            ? 'Send OTP'
                            : 'Send Reset Link'}
                </button>

                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full py-2 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] hover:border-[#C6A87C] hover:text-[#C6A87C] transition-colors"
                  >
                    Back to Login
                  </button>
                )}
                <div id="recaptcha-container" />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
