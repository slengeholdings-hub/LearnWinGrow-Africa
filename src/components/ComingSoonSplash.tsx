import React, { useState, useEffect } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { AppView } from '../types';

interface ComingSoonSplashProps {
  onEnterApp: () => void;
  onNavigateToView?: (view: AppView) => void;
}

export default function ComingSoonSplash({ onEnterApp, onNavigateToView }: ComingSoonSplashProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'seeker' | 'partner'>('seeker');
  const [subscribed, setSubscribed] = useState(false);
  const [count, setCount] = useState(1482); // Simulated starting subscribers count
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    // Ticking countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Save to local storage list
    try {
      const existing = localStorage.getItem('pre_registrants');
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        email,
        role,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('pre_registrants', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setSubscribed(true);
    setCount(prev => prev + 1);
    setEmail('');

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
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

        {/* Demo Link Selector for Partners */}
        <div className="flex items-center gap-3" id="coming-soon-top-actions">
          <button 
            onClick={onEnterApp}
            className="group/btn bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-indigo-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Enter Demo Preview</span>
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
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Launching September 2026
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
                    onClick={() => setRole('seeker')}
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
                    onClick={() => setRole('partner')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      role === 'partner'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Corporate / Employer
                  </button>
                </div>

                {/* Email inputs */}
                <div className="relative" id="email-input-wrapper">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'seeker' ? 'Enter your personal email...' : 'Enter your corporate work email...'}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {role === 'seeker' ? 'Pre-Register as Candidate' : 'Request Corporate Integration'} <Send className="w-3.5 h-3.5" />
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  Join <span className="text-indigo-300 font-bold">{count}</span> South Africans already on the launch standby list.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-6 text-center space-y-4"
                id="pre-reg-success"
              >
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6.5 h-6.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-base">You're On the Standby List!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for joining the Careers Avalanche pre-launch list. We have reserved your queue position and will send updates as we approach active launch day.
                  </p>
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5 inline-block text-[10px] text-indigo-300 font-bold">
                  Queue Registration Code: LW-SA-{count}
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
