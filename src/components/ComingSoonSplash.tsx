import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Clock
} from 'lucide-react';
import { AppView } from '../types';

interface ComingSoonSplashProps {
  onEnterApp: () => void;
  onNavigateToView?: (view: AppView) => void;
}

export default function ComingSoonSplash({ onEnterApp, onNavigateToView }: ComingSoonSplashProps) {
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 1st October 2026
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

    return () => clearInterval(timer);
  }, []);

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
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigateToView?.('lwg-corporate')}
          id="coming-soon-header-brand"
          title="LearnWinGrow Africa Corporate Profile"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            LW
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-indigo-200 transition-colors">LearnWinGrow</span>
            <span className="text-indigo-300 font-bold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
          </div>
        </div>

        {/* Action Buttons (Focused on Conversion) */}
        <div className="flex items-center gap-4" id="coming-soon-top-actions">
          <button 
            onClick={() => onNavigateToView?.('blog')}
            className="text-xs font-extrabold text-slate-300 hover:text-white transition-colors px-3 py-2"
          >
            Read Our Blog
          </button>
          <button 
            onClick={onEnterApp}
            className="group/btn bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/25 hover:to-purple-500/25 border border-indigo-500/45 rounded-xl px-4 py-2.5 text-xs font-extrabold text-indigo-200 hover:text-white transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Register / Sign In</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-indigo-400" />
          </button>
        </div>
      </header>

      {/* Main Campaign Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow flex flex-col justify-center items-center w-full" id="coming-soon-main">
        
        <div className="flex flex-col items-center w-full">
          {/* Logo and Brand Title with Owner Reference */}
          <div className="flex flex-col items-center gap-3 mb-6" id="careers-avalanche-hero-branding">
            <img 
              src="./careers_logo_concept_b_revised.jpg" 
              alt="Careers Avalanche Logo" 
              className="h-24 w-auto rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)] object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-sm font-extrabold tracking-[0.2em] text-indigo-300 uppercase">Careers Avalanche</span>
            <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase -mt-1">by Learn Win Grow Africa</span>
          </div>

          {/* Launch status tag */}
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 px-4 py-2 rounded-full text-xs font-extrabold text-indigo-300 uppercase tracking-wider mb-8 shadow-sm"
            id="teaser-tag"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Launching 1st October 2026
          </div>

          {/* Main Title & Brand Tagline */}
          <div className="text-center space-y-5 max-w-4xl mb-8" id="teaser-titles">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">Careers Avalanche</span> is Coming.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-semibold">
              A new era of career discovery is about to begin. Careers Avalanche is preparing to redefine how South Africa discovers, develops and connects future talent with tomorrow's opportunities. Unlocking future skills. Inspiring future careers. Connecting future talent.
            </p>
          </div>

          {/* Dynamic Countdown Display */}
          <div
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
          </div>

          {/* Sleek Central CTA Card (Highly focused on Waitlist signups) */}
          <div
            className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full backdrop-blur-md shadow-2xl relative text-center space-y-6 mb-12"
            id="main-cta-container"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
              Grand Launch Preparation
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xl font-black text-white">Join the Standby Waitlist Today</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Whether you are a job seeker looking to discover future skills or an employer searching for verified South African talent, secure your early access today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onEnterApp}
                className="group flex-grow bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs px-5 py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                id="btn-goto-registration"
              >
                <span>Access Interactive Waitlist</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigateToView?.('blog')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-extrabold text-xs px-5 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read Insights Blog</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Verified Cloud Pre-Registrations are Active | Real-Time Synced
            </p>
          </div>

          {/* Hard Copy Magazine Highlight Section */}
          <div
            className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-center sm:text-left relative overflow-hidden mb-12"
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
          </div>

          {/* Corporate Domain Registry Indicators */}
          <div className="text-center space-y-3 pt-4" id="registered-domains-bar">
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
          </div>
        </div>

      </main>

      {/* Footer bar */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-slate-500 text-xs" id="coming-soon-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 LearnWinGrow Africa (Pty) Ltd. Reg No: 2024/559030/07. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => onNavigateToView?.('lwg-corporate')} className="hover:text-slate-400 transition-colors">Owner Profile</button>
            <span className="hover:text-slate-400 cursor-pointer">Afrihost Server Hub</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
