import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Building2, 
  Award, 
  Globe, 
  FileText,
  Clock,
  ArrowUpRight,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Users,
  Loader2
} from 'lucide-react';
import { AppView } from '../types';
import { registerPreRegistrant, getTeaserStats, simulateFriendReferral, PreRegistrant } from '../lib/firebase';

interface ComingSoonSplashProps {
  onEnterApp: () => void;
  onNavigateToView?: (view: AppView) => void;
}

export default function ComingSoonSplash({ onEnterApp, onNavigateToView }: ComingSoonSplashProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'seeker' | 'partner'>('seeker');
  const [name, setName] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [ageRange, setAgeRange] = useState('25-29 (Developing Youth)');
  const [race, setRace] = useState('Black African');
  const [nationality, setNationality] = useState('South African Citizen');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [count, setCount] = useState(1482); // Simulated base + live count
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  // Secure Database and Referral States
  const [userReferralCode, setUserReferralCode] = useState(() => localStorage.getItem('my_referral_code') || '');
  const [referredByInput, setReferredByInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dbRegistrants, setDbRegistrants] = useState<PreRegistrant[]>([]);

  // Viral Referral & Gamification State
  const [referralsCount, setReferralsCount] = useState<number>(() => {
    return Number(localStorage.getItem('teaser_referrals_count') || '0');
  });
  const [referralEmail, setReferralEmail] = useState('');
  const [referralSuccess, setReferralSuccess] = useState(false);
  const [copiedReferralLink, setCopiedReferralLink] = useState(false);
  const [subscriberQueueRank, setSubscriberQueueRank] = useState<number>(1483);

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Load real-time database stats and list of registrants
  const loadStats = async () => {
    try {
      const stats = await getTeaserStats();
      setDbRegistrants(stats.list);
      // Add the live database count to the base of 1482
      setCount(1482 + stats.totalCount);
      
      // Update logged-in user's referral info if they exist in DB
      const myEmail = localStorage.getItem('candidate_email');
      if (myEmail) {
        const found = stats.list.find(u => u.email === myEmail.toLowerCase().trim());
        if (found) {
          setUserReferralCode(found.referralCode);
          setReferralsCount(found.referralsCount || 0);
          localStorage.setItem('my_referral_code', found.referralCode);
          localStorage.setItem('teaser_referrals_count', String(found.referralsCount || 0));
        }
      }
    } catch (err) {
      console.error("Error loading stats from Firebase: ", err);
    }
  };

  useEffect(() => {
    // 1st October 2026 (using standard ISO string but computing difference locally)
    const targetDate = new Date('2026-10-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    // Initial fetch of Firestore stats
    loadStats();

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) {
      alert("Please check the consent box to submit your registration.");
      return;
    }

    setIsLoading(true);
    try {
      // Register in secure Firebase Firestore!
      const registered = await registerPreRegistrant({
        email,
        role,
        name: name.trim(),
        province,
        ageRange: role === 'seeker' ? ageRange : undefined,
        race: role === 'seeker' ? race : undefined,
        nationality: role === 'seeker' ? nationality : undefined,
        timestamp: new Date().toISOString()
      }, referredByInput.trim() || undefined);

      setUserReferralCode(registered.referralCode);
      setReferralsCount(registered.referralsCount || 0);
      
      localStorage.setItem('my_referral_code', registered.referralCode);
      localStorage.setItem('candidate_email', email.toLowerCase().trim());
      localStorage.setItem('teaser_referrals_count', String(registered.referralsCount || 0));
      
      // Also save name in candidate_name to instantly personalize greeting!
      if (role === 'seeker' && name.trim()) {
        localStorage.setItem('candidate_name', name.trim());
      }
      
      setSubscribed(true);
      await loadStats(); // refresh database counts and list
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again. The service is securely protected.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentQueueRank = useMemo(() => {
    return Math.max(12, 1483 - (referralsCount * 125));
  }, [referralsCount]);

  const handleSimulateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralEmail.trim() || !referralEmail.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    try {
      const codeToUse = userReferralCode || `LW-SA-TEMP-${count}`;
      const success = await simulateFriendReferral(codeToUse, referralEmail);
      if (success) {
        setReferralSuccess(true);
        setReferralEmail('');
        setTimeout(() => setReferralSuccess(false), 3000);
        await loadStats(); // refresh counts and user stats!
      } else {
        alert("This email is already registered.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDomain(label);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white" id="coming-soon-root">
      
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_45%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Header bar */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex justify-between items-center" id="coming-soon-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
            LW
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">LearnWinGrow</span>
            <span className="text-indigo-300 font-bold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
          </div>
        </div>

        {/* Live Platform Link Selector */}
        <div className="flex items-center gap-3" id="coming-soon-top-actions">
          <button 
            onClick={onEnterApp}
            className="group/btn bg-indigo-600/15 hover:bg-indigo-600/35 border border-indigo-500/45 rounded-xl px-4 py-2.5 text-xs font-bold text-indigo-200 hover:text-white transition-all flex items-center gap-1.5 shadow-md hover:shadow-indigo-500/10"
          >
            <span>Explore Platform</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-indigo-400" />
          </button>
        </div>
      </header>

      {/* Main Campaign Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col justify-center items-center" id="coming-soon-main">
        
        {/* Launch status tag */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 px-4 py-2 rounded-full text-xs font-extrabold text-indigo-300 uppercase tracking-wider mb-8 shadow-sm"
          id="teaser-tag"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Launching 1st October 2026
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center space-y-4 max-w-3xl"
          id="teaser-titles"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Careers Avalanche</span> is Coming.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            LearnWinGrow Africa is merging offline education with state-of-the-art talent diagnostics. We are preparing to launch South Africa's most scalable youth workforce deployment ecosystem, complete with local print magazines, proctored assessments, and direct corporate matching.
          </p>
        </motion.div>

        {/* Dynamic Countdown Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full my-8 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md"
          id="countdown-grid"
        >
          <div className="text-center p-2 rounded-xl bg-slate-950/40">
            <span className="text-2xl sm:text-3xl font-black text-indigo-300 block font-mono">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Days</span>
          </div>
          <div className="text-center p-2 rounded-xl bg-slate-950/40">
            <span className="text-2xl sm:text-3xl font-black text-indigo-300 block font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Hrs</span>
          </div>
          <div className="text-center p-2 rounded-xl bg-slate-950/40">
            <span className="text-2xl sm:text-3xl font-black text-purple-300 block font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Mins</span>
          </div>
          <div className="text-center p-2 rounded-xl bg-slate-950/40">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Secs</span>
          </div>
        </motion.div>

        {/* Pre-registration Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full backdrop-blur-md shadow-2xl relative"
          id="sub-form-card"
        >
          {/* Decorative Tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
            Join the Pre-Launch List
          </div>

          <div className="text-center space-y-2 mb-6 pt-2">
            <h3 className="text-lg font-black text-white">Secure Your Early Access Spot</h3>
            <p className="text-xs text-slate-300">
              Be the first to know when the Careers Avalanche testing center opens, and receive digital curriculum updates.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-4" id="pre-reg-form">
                
                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/80 rounded-xl border border-white/10" id="role-selector">
                  <button
                    type="button"
                    onClick={() => { setRole('seeker'); setName(''); }}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      role === 'seeker'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Job Seeker / Youth
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRole('partner'); setName(''); }}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      role === 'partner'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Corporate / Employer
                  </button>
                </div>

                {/* Name Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {role === 'seeker' ? 'Full Name' : 'Company / Institution Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'seeker' ? 'Enter your first and last name...' : 'Enter your organization name...'}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>

                {/* Email inputs */}
                <div className="space-y-1" id="email-input-wrapper">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={role === 'seeker' ? 'Enter your personal email...' : 'Enter your corporate work email...'}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                    />
                  </div>
                </div>

                {/* Province Selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Province / Region
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                  >
                    <option value="Gauteng" className="bg-slate-950 text-white">Gauteng</option>
                    <option value="Western Cape" className="bg-slate-950 text-white">Western Cape</option>
                    <option value="KwaZulu-Natal" className="bg-slate-950 text-white">KwaZulu-Natal</option>
                    <option value="Eastern Cape" className="bg-slate-950 text-white">Eastern Cape</option>
                    <option value="Free State" className="bg-slate-950 text-white">Free State</option>
                    <option value="Limpopo" className="bg-slate-950 text-white">Limpopo</option>
                    <option value="Mpumalanga" className="bg-slate-950 text-white">Mpumalanga</option>
                    <option value="Northern Cape" className="bg-slate-950 text-white">Northern Cape</option>
                    <option value="North West" className="bg-slate-950 text-white">North West</option>
                  </select>
                </div>

                {/* Demographic Form Fields (Visible for Job Seeker / Youth only) */}
                {role === 'seeker' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="demographic-grid">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Age Range
                      </label>
                      <select
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="18-24 (Early Youth)" className="bg-slate-950 text-white">18-24 (Early Youth)</option>
                        <option value="25-29 (Developing Youth)" className="bg-slate-950 text-white">25-29 (Developing Youth)</option>
                        <option value="30-35 (Senior Youth)" className="bg-slate-950 text-white">30-35 (Senior Youth)</option>
                        <option value="36-40 (Adult)" className="bg-slate-950 text-white">36-40 (Adult)</option>
                        <option value="41+ (Senior)" className="bg-slate-950 text-white">41+ (Senior)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Race / Ethnicity
                      </label>
                      <select
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="Black African" className="bg-slate-950 text-white">Black African</option>
                        <option value="Coloured" className="bg-slate-950 text-white">Coloured</option>
                        <option value="Indian / Asian" className="bg-slate-950 text-white">Indian / Asian</option>
                        <option value="White" className="bg-slate-950 text-white">White</option>
                        <option value="Other / Prefer not to say" className="bg-slate-950 text-white">Other / Prefer not to say</option>
                      </select>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Nationality
                      </label>
                      <select
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="South African Citizen" className="bg-slate-950 text-white">South African Citizen</option>
                        <option value="Permanent Resident" className="bg-slate-950 text-white">Permanent Resident</option>
                        <option value="Foreign National" className="bg-slate-950 text-white">Foreign National</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Secure Referral Link Entry Field */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Have a Referral Code? (Optional)</span>
                    <span className="text-[9px] text-indigo-400 font-black tracking-widest font-mono">Booster</span>
                  </label>
                  <input
                    type="text"
                    value={referredByInput}
                    onChange={(e) => setReferredByInput(e.target.value)}
                    placeholder="e.g. LW-SA-NAME-1234"
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-mono uppercase font-semibold"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/10 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                  />
                  <label htmlFor="consent-checkbox" className="text-[10px] text-slate-400 leading-snug select-none cursor-pointer">
                    I explicitly consent to Careers Avalanche storing my details to contact me about digital career opportunities, testing panels, and integration updates.
                  </label>
                </div>

                {/* Direct Mail Prompt */}
                <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-center text-[10px] text-slate-300">
                  Are you a seeker with direct questions? Reach out to our team at <a href="mailto:talent@careersavalanche.co.za" className="text-indigo-300 font-bold hover:underline">talent@careersavalanche.co.za</a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>{role === 'seeker' ? 'Pre-Register as Candidate' : 'Request Corporate Integration'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  Join <span className="text-indigo-300 font-bold">{count}</span> South Africans already on the launch standby list.
                </p>

                {/* Real-time Registration Feed */}
                {dbRegistrants.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-left" id="live-registration-feed">
                    <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Cloud Registry
                    </span>
                    <div className="space-y-1 text-[10px] text-slate-400">
                      {dbRegistrants.slice(0, 3).map((reg) => (
                        <div key={reg.id || reg.email} className="flex justify-between items-center bg-slate-950/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <span className="font-semibold text-slate-300">{reg.name} ({reg.role === 'seeker' ? 'Candidate' : 'Partner'})</span>
                          <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/10">{reg.province || 'RSA'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-2 text-center space-y-5"
                id="pre-reg-success-dashboard"
              >
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-lg tracking-tight">You are Officially Registered!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    We have secured your priority queue position for the August 1st and October 1st launch sequences.
                  </p>
                </div>

                {/* Queue Stats Widget */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-white/10" id="queue-stats-widget">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Current Rank</span>
                    <span className="text-xl font-black text-indigo-300 block font-mono">#{currentQueueRank}</span>
                    <span className="text-[9px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                      {referralsCount > 0 ? `▲ Moved up ${referralsCount * 125} spots` : 'Active Seeker'}
                    </span>
                  </div>
                  <div className="text-center space-y-1 border-l border-white/10">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Verified Referrals</span>
                    <span className="text-xl font-black text-purple-300 block font-mono">{referralsCount}</span>
                    <span className="text-[9px] text-slate-400 font-semibold block">Invite friends to boost rank</span>
                  </div>
                </div>

                {/* Sharing Platform Actions */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block text-left pl-1">Share Referral Link</span>
                  <div className="grid grid-cols-2 gap-2" id="referral-share-actions">
                    <button
                      onClick={() => {
                        copyToClipboard(`https://careersavalanche.co.za/join?ref=${userReferralCode || 'LW-SA-GLOBAL'}`, 'REFERRAL');
                        setCopiedReferralLink(true);
                        setTimeout(() => setCopiedReferralLink(false), 2000);
                      }}
                      className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-slate-200"
                    >
                      {copiedReferralLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! I just pre-registered for South Africa's Careers Avalanche digital aptitude panel by LearnWinGrow Africa. Secure your priority spot too using my referral link: https://careersavalanche.co.za/join?ref=${userReferralCode || 'LW-SA-GLOBAL'} at www.careersavalanche.co.za`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Instant Referral Simulator Tool */}
                <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 text-left space-y-2.5" id="referral-simulator-box">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-indigo-300 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Simulate Friend Referral
                    </span>
                    <span className="text-[9px] bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded font-extrabold uppercase">Queue Booster</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Test the viral loop! Submit a mockup friend email address to simulate them signing up with your link. This will instantly increase your referrals and skip you ahead in line!
                  </p>
                  
                  <form onSubmit={handleSimulateReferral} className="flex gap-2" id="sim-referral-form">
                    <input
                      type="email"
                      required
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                      placeholder="friend@email.co.za"
                      className="flex-grow bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs px-3.5 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Invite"}
                    </button>
                  </form>
                  <AnimatePresence>
                    {referralSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5 pt-0.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Referral registered successfully! Queue rank boosted!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-white/5 text-[10px] text-slate-400">
                  <span>Registration Code: <strong className="font-mono text-indigo-300">{userReferralCode || `LW-SA-${count}`}</strong></span>
                  <button
                    onClick={() => setSubscribed(false)}
                    className="text-slate-400 hover:text-white font-bold underline cursor-pointer"
                  >
                    ← Register Another Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hard Copy Magazine Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-center sm:text-left relative overflow-hidden"
          id="magazine-teaser-campaign"
        >
          <div className="grid sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-8 space-y-3">
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Offline Rural Distribution Channel
              </span>
              <h3 className="text-xl font-black text-white tracking-tight">Careers Avalanche Print Magazine</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                We are combating the digital divide in South Africa by preparing a free high-impact print magazine. 
                Distributed directly to township and rural schools, the magazine will host physical career roadmaps, advertorials from partner companies, and local entry points to link schools without computers to digital skills acceleration.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-slate-400 justify-center sm:justify-start">
                <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Free School Delivery</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Advertorial Slots Open</span>
                <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Rural Upliftment Priority</span>
              </div>
            </div>
            <div className="sm:col-span-4 flex flex-col gap-2">
              <div className="aspect-[4/5] bg-slate-900 border border-white/10 rounded-2xl relative shadow-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300" 
                  alt="Magazine Mockup" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1">
                  <span className="text-[8px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Issue #1 Cover</span>
                  <span className="font-extrabold text-[10px] text-white block truncate">Careers Avalanche Print Edition</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Corporate Domain Registry Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center space-y-3"
          id="registered-domains-bar"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Registered Corporate Nodes</span>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
            <button 
              onClick={() => copyToClipboard('www.learnwingrow.africa', 'LWG')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> 
              <span>{copiedDomain === 'LWG' ? 'Copied Link!' : 'www.learnwingrow.africa'}</span>
            </button>
            <button 
              onClick={() => copyToClipboard('www.careersavalanche.co.za', 'CA')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" /> 
              <span>{copiedDomain === 'CA' ? 'Copied Link!' : 'www.careersavalanche.co.za'}</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Domain Hosting Provider: Afrihost Ltd. | Fully DNS Linked
          </p>
        </motion.div>

      </main>

      {/* Footer bar */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-slate-500 text-xs" id="coming-soon-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 LearnWinGrow Africa (Pty) Ltd. Reg No: 2024/559030/07. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Official GTM Registry</span>
            <span className="hover:text-slate-400 cursor-pointer">Afrihost Server Hub</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
