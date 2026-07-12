import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ArrowRight, X, Globe, Sparkles, Award, Network, ChevronRight } from 'lucide-react';
import { AppView } from '../types';

interface LwgCorporatePageProps {
  onNavigateToView: (view: AppView) => void;
}

export default function LwgCorporatePage({ onNavigateToView }: LwgCorporatePageProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white" id="lwg-corp-root">
      
      {/* Premium subtle backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.18),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(168,85,247,0.08),transparent_40%)] pointer-events-none"></div>
      
      {/* Simple Top Bar */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-6 flex justify-between items-center" id="lwg-corp-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
            LW
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight block">LearnWinGrow</span>
            <span className="text-indigo-300 font-bold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-slate-400 font-medium tracking-wide">Pty Ltd Reg: 2024/559030/07</span>
          <button 
            onClick={() => onNavigateToView('splash')}
            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl font-extrabold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            id="corp-nav-splash-btn"
          >
            <span>Platform Teaser</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </div>
      </header>

      {/* Main Corporate Core Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center items-center text-center w-full" id="lwg-corp-main">
        
        {/* Subtle decorative emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-8"
          id="corp-sub-badge"
        >
          <Building2 className="w-4 h-4 text-indigo-400" /> South African Education & Workforce Innovation
        </motion.div>

        {/* Dynamic & Aesthetic Core Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl"
          id="corp-hero-title-section"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Learn Win Grow Africa
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-semibold tracking-widest uppercase text-indigo-300/90">
            Unlocking future skills. Inspiring future careers. Connecting future talent.
          </p>
        </motion.div>

        {/* Primary Interactive Clickable Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-2xl mt-12"
          id="corp-click-target-container"
        >
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-full text-left bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 hover:border-indigo-500/60 rounded-3xl p-6 sm:p-10 transition-all shadow-[0_15px_40px_-15px_rgba(99,102,241,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.3)] duration-300 relative group overflow-hidden cursor-pointer flex flex-col justify-between"
            id="lwg-corporate-trigger-card"
          >
            {/* Ambient light glow inside the card on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 group-hover:to-indigo-500/10 transition-all duration-500"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  Our Solutions Matrix
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-snug group-hover:text-indigo-200 transition-colors">
                Talent Development, Talent Engagement &amp; Future Workforce Solutions
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Preparing individuals and connecting industry for South Africa's digital economy. Click here to read our full corporate profile, core mission statement, and flagship ecosystems.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 relative z-10" id="corp-trigger-footer">
              <span className="group-hover:text-slate-300 transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Click to view company profile
              </span>
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                Read Profile <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </button>
        </motion.div>

        {/* Bottom indicator */}
        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-12">
          Learn Win Grow Africa Pty Ltd &copy; 2026. All rights reserved.
        </p>
      </main>

      {/* Pristine Sliding/Fading Modal for Company Profile */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="lwg-profile-modal-overlay">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-slate-900 border border-white/10 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col justify-between"
              id="lwg-profile-modal-card"
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                    LW
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">Learn Win Grow Africa</h3>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider -mt-0.5">Corporate Description</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Profile"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable text container */}
              <div className="flex-grow overflow-y-auto pr-2 my-6 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal text-justify" id="lwg-modal-scroller">
                <div className="border-b border-white/5 pb-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-indigo-300/90 mb-1">Our Credo</h4>
                  <p className="text-lg font-black text-white tracking-tight leading-tight">
                    Unlocking future skills. Inspiring future careers. Connecting future talent.
                  </p>
                </div>

                <p>
                  <strong>Learn Win Grow Africa</strong> is a South African education, career development and workforce innovation company dedicated to preparing people for success in a rapidly evolving world of work. Through innovation, technology and strategic partnerships, the company develops solutions that connect education, industry and employment while equipping individuals with the knowledge, skills and opportunities needed to thrive in the digital economy.
                </p>
                
                <p>
                  As the creator and owner of{' '}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigateToView('splash');
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-black underline decoration-indigo-400/50 hover:decoration-indigo-300 cursor-pointer transition-colors"
                  >
                    Careers Avalanche
                  </button>
                  , one of South Africa's most ambitious career discovery and workforce connectivity ecosystems, Learn Win Grow Africa is driving a new approach to career development by exposing learners, students, graduates and emerging professionals to future skills, digital capabilities, scarce skills and careers of the future. The company's mission is to ensure that every individual has greater visibility into tomorrow's opportunities while enabling employers to access a stronger, future-ready talent pipeline.
                </p>
                
                <p>
                  Learn Win Grow Africa believes that talent is universal, but access to opportunity is not. By bridging the gap between education and employment, the company empowers young people to make informed career decisions while supporting employers, educational institutions, industry partners and government in developing the workforce required for South Africa's future economy.
                </p>
                
                <p>
                  Its solutions are built around the principle that career success begins long before employment. It starts with awareness, exploration, informed decision-making, continuous learning and meaningful engagement with the world of work. Through digital innovation, career intelligence, workforce connectivity and collaborative partnerships, Learn Win Grow Africa creates pathways that prepare individuals not only for today's opportunities but also for the emerging industries, future skills and careers that will define tomorrow's economy.
                </p>
                
                <p>
                  With{' '}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigateToView('splash');
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-black underline decoration-indigo-400/50 hover:decoration-indigo-300 cursor-pointer transition-colors"
                  >
                    Careers Avalanche
                  </button>{' '}
                  serving as its flagship platform, Learn Win Grow Africa is building an integrated ecosystem that unlocks future skills, inspires future careers and connects future talent. Together, they are helping shape a more inclusive, digitally enabled and economically competitive Africa by strengthening the connection between education, business and society while preparing the next generation for the opportunities of tomorrow.
                </p>

                {/* Highly prominent action callout inside profile description */}
                <div className="mt-8 p-5 bg-gradient-to-r from-indigo-950/50 to-purple-950/30 border border-indigo-500/20 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">Flagship Ecosystem Ready</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Join our active standby pre-registrations to secure your early access before the official October launch.
                  </p>
                  <div className="pt-1.5 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigateToView('splash');
                      }}
                      className="text-xs font-extrabold text-white bg-indigo-500 hover:bg-indigo-400 px-4 py-2.5 rounded-xl transition-all shadow-md text-center cursor-pointer"
                    >
                      Visit Careers Avalanche Splash Page
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigateToView('register');
                      }}
                      className="text-xs font-extrabold text-indigo-300 border border-indigo-500/30 hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all text-center cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-1">
                    Visit <span className="text-indigo-300 font-mono">https://www.careersavalanche.co.za</span> to register.
                  </p>
                </div>
              </div>

              {/* Footer inside modal */}
              <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Official Registrations</span>
                  <span className="text-xs text-slate-400 font-mono font-bold">Pty Ltd. Reg No: 2024/559030/07</span>
                </div>
                
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-extrabold text-xs px-5 py-3 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simple decorative footer */}
      <footer className="py-6 border-t border-white/5 max-w-7xl mx-auto px-6 w-full text-center text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Learn Win Grow Africa &copy; 2026</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigateToView('splash')} className="hover:text-indigo-400 transition-colors">Careers Avalanche Platform</button>
            <button onClick={() => onNavigateToView('blog')} className="hover:text-indigo-400 transition-colors">Insights Blog</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
