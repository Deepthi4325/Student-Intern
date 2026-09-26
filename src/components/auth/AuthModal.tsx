import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    loginAsDemoUser,
    setCurrentRoute,
    user,
  } = useApp();

  const [authMethod, setAuthMethod] = useState<'google' | 'email' | 'phone'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  if (!showAuthModal) return null;

  const validateEmail = () => {
    const errs: { [key: string]: string } = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please provide a valid college or personal email address';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePhone = () => {
    const errs: { [key: string]: string } = {};
    if (!phoneNumber || phoneNumber.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (otpSent && (!otp || otp.length !== 6)) {
      errs.otp = 'Please enter the 6-digit verification code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAuthModal(false);
      if (!user.isOnboarded) {
        setCurrentRoute('onboarding');
      } else {
        loginAsDemoUser('Alex Chen (Google)', 'Intermediate');
      }
    }, 600);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAuthModal(false);
      const extractedName = email.split('@')[0].replace('.', ' ');
      loginAsDemoUser(extractedName.charAt(0).toUpperCase() + extractedName.slice(1), 'Intermediate');
    }, 600);
  };

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    setErrors({});
    setOtpSent(true);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAuthModal(false);
      loginAsDemoUser(`Student (${phoneNumber.slice(-4)})`, 'Intermediate');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close auth dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg mb-3 shadow-md shadow-indigo-200">
            SI
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Welcome to Smart Intern
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to start your personalized adaptive prep path
          </p>
        </div>

        {/* Auth Method Tabs */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('google');
              setErrors({});
            }}
            className={`rounded-lg py-1.5 transition-all ${
              authMethod === 'google'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setErrors({});
            }}
            className={`rounded-lg py-1.5 transition-all ${
              authMethod === 'email'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setErrors({});
            }}
            className={`rounded-lg py-1.5 transition-all ${
              authMethod === 'phone'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phone (OTP)
          </button>
        </div>

        {/* Google Auth View */}
        {authMethod === 'google' && (
          <div className="space-y-4 py-2">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-400 focus:outline-none"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Authenticating...' : 'Continue with Google Workspace'}</span>
            </button>

            <div className="rounded-lg bg-indigo-50/70 p-3 text-center text-[11px] text-indigo-700">
              Instant login for university accounts (@edu / @college.ac.in). Auto-syncs your placement drive dates.
            </div>
          </div>
        )}

        {/* Email/Password View */}
        {authMethod === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-3 py-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College or Personal Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg border py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
                    errors.email
                      ? 'border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-lg border py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
                    errors.password
                      ? 'border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
            >
              {loading ? 'Verifying...' : 'Sign In with Email'}
            </button>
          </form>
        )}

        {/* Phone OTP View */}
        {authMethod === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-3 py-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`w-full rounded-lg border py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
                    errors.phone
                      ? 'border-rose-500 bg-rose-50/20'
                      : 'border-slate-300 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
              >
                Send Verification OTP
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 py-2 px-3 text-center font-mono text-sm tracking-widest text-slate-900 focus:border-indigo-500 focus:outline-none"
                  />
                  {errors.otp && (
                    <p className="mt-1 text-[11px] text-rose-600">{errors.otp}</p>
                  )}
                  <p className="mt-1 text-[11px] text-slate-400 text-center">
                    Demo OTP code is <span className="font-mono font-bold text-slate-700">123456</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                >
                  {loading ? 'Verifying OTP...' : 'Verify & Continue'}
                </button>
              </>
            )}
          </form>
        )}

        {/* Demo Fast Login */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => {
              setShowAuthModal(false);
              setCurrentRoute('onboarding');
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            New Student? Take 1-Min Ability Assessment →
          </button>
        </div>
      </div>
    </div>
  );
};
