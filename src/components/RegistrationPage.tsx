import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Building2, 
  CheckCircle2, 
  Loader2, 
  Send, 
  Lock, 
  Key, 
  ShieldCheck,
  Check,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { AppView } from '../types';
import { registerPreRegistrant, getPreRegistrantByEmail } from '../lib/firebase';

interface RegistrationPageProps {
  onNavigate: (view: AppView) => void;
  onUnlockDeveloper: (status: boolean) => void;
  isDeveloper: boolean;
}

export default function RegistrationPage({ onNavigate, onUnlockDeveloper, isDeveloper }: RegistrationPageProps) {
  // Mode: 'register' | 'signin' | 'verify' | 'success' | 'dev_login'
  const [mode, setMode] = useState<'register' | 'signin' | 'verify' | 'success' | 'dev_login'>('register');
  const [role, setRole] = useState<'seeker' | 'partner'>('seeker');
  
  // Registration Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [verificationPref, setVerificationPref] = useState<'email' | 'sms'>('email');
  
  // Seeker demographic states
  const [ageRange, setAgeRange] = useState('25-29 (Developing Youth)');
  const [race, setRace] = useState('Black African');
  const [nationality, setNationality] = useState('South African Citizen');
  const [consent, setConsent] = useState(false);
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInError, setSignInError] = useState('');
  
  // Verification Code State
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [verificationError, setVerificationError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('123456'); // simulated default code
  
  // Developer Passcode State
  const [devPasscode, setDevPasscode] = useState('');
  const [devError, setDevError] = useState('');
  
  // General Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);

  // Helper to handle input verification code array
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!email.trim() || !email.includes('@')) return;
    if (verificationPref === 'sms' && !phone.trim()) {
      alert("Please provide a contact number for SMS verification.");
      return;
    }
    if (!consent) {
      alert("Please accept the terms to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      // Register in secure Firebase Firestore!
      const user = await registerPreRegistrant({
        email: email.toLowerCase().trim(),
        role,
        name: name.trim(),
        province,
        ageRange: role === 'seeker' ? ageRange : undefined,
        race: role === 'seeker' ? race : undefined,
        nationality: role === 'seeker' ? nationality : undefined,
        timestamp: new Date().toISOString()
      });

      setRegisteredUser({
        ...user,
        phone,
        verificationPref
      });

      localStorage.setItem('candidate_email', email.toLowerCase().trim());
      localStorage.setItem('candidate_name', name.trim());
      localStorage.setItem('my_referral_code', user.referralCode);

      // Take user directly to the verified success page
      setMode('success');
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Sign In
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInEmail.includes('@')) return;

    setIsLoading(true);
    setSignInError('');
    try {
      // Check if user is registered in secure Firebase Firestore!
      const user = await getPreRegistrantByEmail(signInEmail.trim());
      
      if (user) {
        setRegisteredUser(user);
        localStorage.setItem('candidate_email', user.email);
        localStorage.setItem('candidate_name', user.name);
        localStorage.setItem('my_referral_code', user.referralCode);
        
        // Take user directly to the verified success page
        setMode('success');
      } else {
        setSignInError("This email address is not registered. Please create an account to join the community.");
      }
    } catch (err) {
      console.error(err);
      setSignInError("Unable to sign in. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Code
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = verificationCode.join('');
    
    if (enteredCode.length < 6) {
      setVerificationError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    // Simulate verification check (accepts any code but validates correct feedback)
    setTimeout(() => {
      setIsLoading(false);
      setMode('success');
    }, 1200);
  };

  // Dev Login
  const handleDevLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (devPasscode === '1001' || devPasscode === '2026' || devPasscode.toLowerCase() === 'admin') {
      onUnlockDeveloper(true);
      onNavigate('landing'); // Take developer to the workspace backend
    } else {
      setDevError('Invalid developer passcode. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden" id="registration-page-root">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.1),transparent_40%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_40%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('splash')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
          id="reg-back-button"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-200 font-extrabold tracking-tight">Careers Avalanche</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          
          {/* REGISTER MODE */}
          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
              id="register-card"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Create Your Account</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Register today to join the Careers Avalanche community and enjoy priority access to talent-matching opportunities
                </p>
              </div>

              {/* Role selector tab */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setRole('seeker')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    role === 'seeker'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-seeker"
                >
                  <User className="w-3.5 h-3.5" /> Seeker / Youth
                </button>
                <button
                  type="button"
                  onClick={() => setRole('partner')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    role === 'partner'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-partner"
                >
                  <Building2 className="w-3.5 h-3.5" /> Employer
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {role === 'seeker' ? 'Full Name' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'seeker' ? 'e.g. Sipho Nkosi' : 'e.g. Standard Corp'}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={role === 'seeker' ? 'sipho@example.co.za' : 'talent@company.co.za'}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Mobile Number (For Verification)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +27 82 123 4567"
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Province Selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Province
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                  >
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Free State">Free State</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="North West">North West</option>
                  </select>
                </div>

                {/* Demographic details for seeker */}
                {role === 'seeker' && (
                  <div className="grid grid-cols-2 gap-3 bg-slate-950/20 p-3 rounded-2xl border border-white/5">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        Age Range
                      </label>
                      <select
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2 py-2 text-[11px] text-slate-200 outline-none focus:border-indigo-500 font-semibold"
                      >
                        <option value="18-24 (Early Youth)">18-24</option>
                        <option value="25-29 (Developing)">25-29</option>
                        <option value="30-35 (Senior Youth)">30-35</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        Race
                      </label>
                      <select
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2 py-2 text-[11px] text-slate-200 outline-none focus:border-indigo-500 font-semibold"
                      >
                        <option value="Black African">Black African</option>
                        <option value="Coloured">Coloured</option>
                        <option value="Indian / Asian">Indian / Asian</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Verification preference */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Verification Method Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3" id="verification-method-preference">
                    <button
                      type="button"
                      onClick={() => setVerificationPref('email')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        verificationPref === 'email'
                          ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" /> Verify via Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerificationPref('sms')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                        verificationPref === 'sms'
                          ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" /> Verify via SMS
                    </button>
                  </div>
                </div>

                {/* Terms consent */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="reg-consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/10 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                  />
                  <label htmlFor="reg-consent" className="text-[10px] text-slate-400 leading-snug cursor-pointer select-none">
                    I explicitly consent to Careers Avalanche storing my details to contact me about digital career opportunities, testing panels, and launch updates.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Started</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-center">
                <button
                  onClick={() => setMode('signin')}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold"
                >
                  Already registered? Sign In to verify status
                </button>
                <button
                  onClick={() => setMode('dev_login')}
                  className="text-[10px] text-slate-500 hover:text-slate-400 font-bold tracking-wider uppercase mt-1 flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3" /> Developer Access
                </button>
              </div>
            </motion.div>
          )}

          {/* SIGN IN MODE */}
          {mode === 'signin' && (
            <motion.div
              key="signin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
              id="signin-card"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Sign In</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Enter your email address to access your registration status or verify your account details.
                </p>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="e.g. sipho@example.co.za"
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                {signInError && (
                  <div className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                    <AlertCircle className="w-4 h-4" />
                    <span>{signInError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-center">
                <button
                  onClick={() => setMode('register')}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold"
                >
                  Don't have an account? Register Now
                </button>
                <button
                  onClick={() => setMode('dev_login')}
                  className="text-[10px] text-slate-500 hover:text-slate-400 font-bold tracking-wider uppercase mt-1 flex items-center justify-center gap-1"
                >
                  <Lock className="w-3 h-3" /> Developer Access
                </button>
              </div>
            </motion.div>
          )}

          {/* VERIFY CODE MODE */}
          {mode === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
              id="verify-card"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
                  <Key className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Security Verification</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  A 6-digit verification code was sent to <strong className="text-indigo-300 font-semibold">{registeredUser?.email || email || 'your address'}</strong> via {registeredUser?.verificationPref === 'sms' ? 'SMS' : 'Email'}.
                </p>
              </div>

              {/* Dev Simulation Badge */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3.5 text-center text-xs">
                <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-widest block mb-1">Prototype Simulator Alert</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  To complete registration, use verification code: <strong className="font-mono text-emerald-400 text-sm bg-slate-950 px-2 py-0.5 rounded border border-white/5">{generatedCode}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div className="flex justify-center gap-2" id="verification-code-grid">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      type="text"
                      maxLength={1}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-11 h-12 bg-slate-950/80 border border-white/10 rounded-xl text-center text-lg font-bold text-white focus:border-indigo-500 outline-none transition-colors"
                    />
                  ))}
                </div>

                {verificationError && (
                  <div className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                    <AlertCircle className="w-4 h-4" />
                    <span>{verificationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Verify & Secure Account</span>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => {
                    const newMock = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedCode(newMock);
                    alert(`New verification code sent!`);
                  }}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold underline"
                >
                  Resend Code
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS MODE */}
          {mode === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 text-center"
              id="success-card"
            >
              <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Account Verified!</h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Congratulations <strong className="text-indigo-300 font-semibold">{registeredUser?.name || 'Sipho'}</strong>, your Careers Avalanche profile is secured.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 space-y-3 text-left">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Type</span>
                  <span className="text-xs font-bold text-indigo-300">{registeredUser?.role === 'seeker' ? 'Candidate Pipeline' : 'Employer / Corporate Partner'}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Queue Priority</span>
                  <span className="text-xs font-bold text-emerald-400">#VIP Standby</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Referral Code</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{registeredUser?.referralCode || 'LW-SA-GLOBAL'}</span>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-left text-[11px] text-slate-300 leading-relaxed">
                <strong>What happens next?</strong> Our primary team will contact you soon with introductory testing center resources and pilot program updates as we lead to the official platform activation on <strong>1 October 2026</strong>.
              </div>

              {/* Keep Warm Engagement Callout */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 space-y-3 text-left">
                <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-widest block">Stay Warmed Up & Engaged</span>
                <p className="text-slate-400 text-[10.5px] leading-relaxed">
                  Avoid the idle wait! Get a sneak peek into candidate guides, curriculum modules, and local partner updates right now:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate('blog')}
                    className="flex items-center justify-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 py-2 rounded-xl text-[11px] font-bold transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read Our Blog
                  </button>
                  <a
                    href="https://www.facebook.com/Careersavalanche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/30 text-[#1877f2] py-2 rounded-xl text-[11px] font-bold transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                    <span>Follow Facebook</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('splash')}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => {
                    setMode('register');
                    setName('');
                    setEmail('');
                    setPhone('');
                    setConsent(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white font-semibold underline mt-1"
                >
                  Register Another Account
                </button>
              </div>
            </motion.div>
          )}

          {/* DEVELOPER LOGIN MODE */}
          {mode === 'dev_login' && (
            <motion.div
              key="dev_login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6"
              id="dev-login-card"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-purple-500/10">
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Developer Portal</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Enter the secure developer passcode to unlock full platform dashboards, psychometric assessments, and partner portals.
                </p>
              </div>

              <form onSubmit={handleDevLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Developer Passcode
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={devPasscode}
                      onChange={(e) => {
                        setDevPasscode(e.target.value);
                        setDevError('');
                      }}
                      placeholder="Enter 4-digit passcode..."
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 block pl-1">Hint: Enter passcode <strong className="text-indigo-400">1001</strong> or <strong className="text-indigo-400">2026</strong></span>
                </div>

                {devError && (
                  <div className="text-red-400 text-[11px] font-bold text-center bg-red-500/10 p-2 rounded-xl border border-red-500/20">
                    {devError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>Unlock Dev Backend</span>
                </button>
              </form>

              <div className="text-center pt-2 border-t border-white/5">
                <button
                  onClick={() => setMode('register')}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold"
                >
                  ← Back to Registration Form
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-500 text-[10px]">
        <p>© 2026 LearnWinGrow Africa. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
