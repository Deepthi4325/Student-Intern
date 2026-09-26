import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  ChevronDown,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../i18n/translations';

export const LoginPage: React.FC = () => {
  const { loginAsDemoUser, setCurrentRoute, t, currentLang, setLanguage } = useApp();

  const [authMethod, setAuthMethod] = useState<'google' | 'email' | 'phone'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const validateEmail = () => {
    const errs: { [key: string]: string } = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please provide a valid Gmail or university address';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePhone = () => {
    const errs: { [key: string]: string } = {};
    if (!phoneNumber || phoneNumber.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (otpSent && (!otp || otp.length !== 6)) {
      errs.otp = 'Please enter the 6-digit OTP';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginAsDemoUser('Alex Chen (Google User)', 'Intermediate');
    }, 500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const extractedName = email.split('@')[0].replace('.', ' ');
      loginAsDemoUser(
        extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
        'Intermediate'
      );
    }, 500);
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
      loginAsDemoUser(`Student (${phoneNumber.slice(-4)})`, 'Intermediate');
    }, 500);
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'es', label: 'Español (Spanish)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white">
      {/* Top Header with Brand and Language Selector */}
      <div className="mx-auto w-full max-w-5xl flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-extrabold text-lg shadow-lg shadow-indigo-500/30">
            SI
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white block leading-tight">
              Smart Intern
            </span>
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
              Adaptive Learning Platform
            </span>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              {languages.find((l) => l.code === currentLang)?.label || 'English'}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-slate-700 bg-slate-800 py-1.5 shadow-2xl">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-xs font-medium ${
                    currentLang === l.code
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span>{l.label}</span>
                  {currentLang === l.code && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto w-full max-w-md my-auto">
        <div className="rounded-2xl border border-slate-800 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Card Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.loginTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Sign-in Method Tabs */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('google');
                setErrors({});
              }}
              className={`rounded-lg py-2 transition-all ${
                authMethod === 'google'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
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
              className={`rounded-lg py-2 transition-all ${
                authMethod === 'email'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gmail / Email
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone');
                setErrors({});
              }}
              className={`rounded-lg py-2 transition-all ${
                authMethod === 'phone'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Phone (OTP)
            </button>
          </div>

          {/* Option 1: Continue with Google */}
          {authMethod === 'google' && (
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 focus:outline-none"
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
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
                <span>{loading ? 'Connecting Google Account...' : t.continueWithGoogle}</span>
              </button>

              <div className="flex items-center gap-2 rounded-xl bg-indigo-50/70 p-3 text-[11px] text-indigo-900 border border-indigo-100">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Single-click sign in. Syncs campus placement calendar directly.</span>
              </div>
            </div>
          )}

          {/* Option 2: Gmail / Email & Password */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="alex.chen@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
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
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
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
                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Authenticating...' : t.signIn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Option 3: Phone Number with OTP */}
          {authMethod === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-none ${
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
                  className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all"
                >
                  {t.sendOtp}
                </button>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.enterOtp}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-center font-mono text-base tracking-widest text-slate-900 focus:border-indigo-500 focus:outline-none font-bold"
                    />
                    {errors.otp && (
                      <p className="mt-1 text-[11px] text-rose-600">{errors.otp}</p>
                    )}
                    <p className="mt-1 text-[11px] text-slate-500 text-center">
                      Demo code is <strong className="font-mono text-slate-800">123456</strong>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{loading ? 'Verifying OTP...' : t.verifyAndContinue}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          )}

          {/* Quick Demo Access & Assessment buttons */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => loginAsDemoUser('Alex Chen', 'Intermediate')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <UserCheck className="h-4 w-4 text-indigo-600" />
              <span>{t.exploreAsGuest}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentRoute('onboarding')}
              className="w-full text-center text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 py-1"
            >
              New here? Start 1-Min Adaptive Diagnostic →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto w-full max-w-5xl text-center text-xs text-slate-500 pt-4">
        © 2026 Smart Intern. Multi-Format Adaptive Engineering Education.
      </div>
    </div>
  );
};
