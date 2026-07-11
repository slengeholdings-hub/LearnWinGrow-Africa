import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Cpu, Globe, Users, ChevronRight, Award, Flame, LogIn } from 'lucide-react';
import { AppView } from '../types';
import { blogs } from '../data';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [candidateName, setCandidateName] = useState(() => {
    return localStorage.getItem('candidate_name') || 'Sibongile';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setCandidateName(localStorage.getItem('candidate_name') || 'Sibongile');
    };
    window.addEventListener('storage', handleStorageChange);
    setCandidateName(localStorage.getItem('candidate_name') || 'Sibongile');
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500 selection:text-white" id="landing-page-root">
      {/* Top NavBar */}
      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white" id="landing-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="landing-logo-container">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              LW
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">LearnWinGrow</span>
              <span className="text-indigo-300 font-semibold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" id="landing-nav-links">
            <button onClick={() => onNavigate('landing')} className="text-indigo-300 font-semibold hover:text-indigo-200 transition-colors">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('assessment')} className="hover:text-white transition-colors">Tests</button>
            <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">Brands</button>
            <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Blog</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">Admin Portal</button>
          </nav>

          <div className="flex items-center gap-3" id="landing-auth-buttons">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
              id="btn-sign-in"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
            <button 
              onClick={() => onNavigate('assessment')} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:brightness-110 transition-all hover:scale-[1.02]"
              id="btn-get-started"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28" id="landing-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left" id="hero-left-content">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider" id="hero-badge">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> Empowering South Africa's Youth
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]" id="hero-title">
                Careers Avalanche: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300">
                  Assess, Master & Grow
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed" id="hero-desc">
                Identify your true capabilities with our advanced aptitude testing engine, master high-income digital skills inside <span className="font-semibold text-indigo-200">The Paradigm</span>, and connect directly with top South African employers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4" id="hero-actions">
                <button 
                  onClick={() => onNavigate('assessment')} 
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  id="hero-btn-test"
                >
                  Register for Aptitude Test <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('brands')} 
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  id="hero-btn-careers"
                >
                  Explore Careers
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md mx-auto lg:mx-0" id="hero-trust">
                <div>
                  <div className="text-2xl font-extrabold text-white">10,000+</div>
                  <div className="text-xs text-slate-400 font-medium">Tested Candidates</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-xs text-slate-400 font-medium">Partner Brands</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">92%</div>
                  <div className="text-xs text-slate-400 font-medium">Employment Rate</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative" id="hero-right-visual">
              {/* Premium abstract illustration simulating high match capability */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl rotate-3 scale-95 opacity-20 blur-2xl"></div>
              <div className="relative bg-white/10 border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/40 backdrop-blur-xl text-white" id="hero-card-graphics">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Skills Match Engine</h4>
                      <p className="text-xs text-slate-400">Powered by LearnWinGrow Analytics</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
                    98% Optimal Match
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Digital Tools Competency</span>
                      <span className="text-indigo-300">94%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[94%]"></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Scenario Reasoning</span>
                      <span className="text-indigo-300">88%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[88%]"></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Collaboration & Agile Mindset</span>
                      <span className="text-indigo-300">90%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[90%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs" id="hero-card-footer">
                  <span className="text-slate-400">Candidate: <strong className="text-white">{candidateName}</strong></span>
                  <span className="text-slate-400">Status: <strong className="text-indigo-300">Certified Ready</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Paradigm Section */}
      <section className="py-20 bg-transparent" id="landing-paradigm-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-300 tracking-widest uppercase">Our Core Curriculum</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight" id="paradigm-title">
              Mastering "The Paradigm"
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base" id="paradigm-desc">
              We focus on a comprehensive triple-threat module design tailored explicitly for Southern African youth to bridge critical employment skills gaps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" id="paradigm-modules-grid">
            {/* Life Skills */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-5 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300" id="module-life-skills">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Life Skills</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Unlock core professional soft skills and mental models required to excel in collaborative modern enterprises.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Personal Mastery & Grit</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Corporate Communication</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Micro-Money Management</li>
              </ul>
            </div>

            {/* Digital Skills */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-5 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300" id="module-digital-skills">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Digital Skills</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Master the operational tools used by top enterprises, allowing you to hit the ground running with zero onboarding friction.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Google Workspace Proficiency</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> No-Code & Web Builders</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Data Literacy & Visualizers</li>
              </ul>
            </div>

            {/* AI Modules */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-5 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300" id="module-ai-skills">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">AI Modules</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Gain a competitive tech edge. Learn how to responsibly prompt and delegate micro-tasks to modern LLM agents.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Prompt Engineering</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> AI Productivity Pipelines</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Ethical AI Boundaries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-12 bg-white/5 border-y border-white/10 backdrop-blur-md" id="featured-brands-slider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 tracking-wider uppercase mb-6">Empowering placement with industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">Standard Wealth</div>
            <div className="font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">NovaTech SA</div>
            <div className="font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">ConnectAfrica</div>
            <div className="font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">EcoPower Group</div>
            <div className="font-extrabold text-xl tracking-tight text-slate-300 hover:text-white transition-colors">Apex Retailers</div>
          </div>
        </div>
      </section>

      {/* Asymmetric About Section with Stats */}
      <section className="py-20 lg:py-24 bg-transparent" id="asymmetric-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" id="about-left">
              <h2 className="text-xs font-bold text-indigo-300 tracking-widest uppercase">The Impact</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Empowering South Africa's Future Talent Ecosystem
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Careers Avalanche acts as a high-trust matching node. By providing certified standardized testing alongside modular enterprise skill training, we remove the recruitment risk for regional businesses while exposing young applicants to top-tier banking, renewable energy, agricultural, and fintech firms.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4" id="about-bullets">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Skills Verified</h5>
                    <p className="text-xs text-slate-400">Strict proctored assessments.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Direct Placements</h5>
                    <p className="text-xs text-slate-400">Skip secondary HR screenings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" id="about-right-bento">
              <div className="bg-gradient-to-tr from-indigo-500/20 to-indigo-600/20 border border-white/10 backdrop-blur-md text-white p-6 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.02] transition-all duration-300 hover:border-white/20 shadow-xl shadow-black/20">
                <Users className="w-8 h-8 text-indigo-300 opacity-80" />
                <div>
                  <div className="text-3xl font-black text-white">10,000+</div>
                  <div className="text-xs font-medium text-indigo-200">Tested Youth across South Africa</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md text-white p-6 rounded-2xl flex flex-col justify-between h-48 mt-6 hover:scale-[1.02] transition-all duration-300 hover:border-white/20 shadow-xl shadow-black/20">
                <Globe className="w-8 h-8 text-indigo-300 opacity-80" />
                <div>
                  <div className="text-3xl font-black text-white">50+</div>
                  <div className="text-xs font-medium text-slate-300">Active Partner Brands</div>
                </div>
              </div>

              <div className="bg-gradient-to-tr from-emerald-500/20 to-emerald-600/20 border border-white/10 backdrop-blur-md text-white p-6 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.02] transition-all duration-300 hover:border-white/20 shadow-xl shadow-black/20">
                <Award className="w-8 h-8 text-emerald-400 opacity-80" />
                <div>
                  <div className="text-3xl font-black text-white">85%</div>
                  <div className="text-xs font-medium text-emerald-200">Interview Success Rate</div>
                </div>
              </div>

              <div className="bg-gradient-to-tr from-amber-500/20 to-amber-600/20 border border-white/10 backdrop-blur-md text-white p-6 rounded-2xl flex flex-col justify-between h-48 mt-6 hover:scale-[1.02] transition-all duration-300 hover:border-white/20 shadow-xl shadow-black/20">
                <Flame className="w-8 h-8 text-amber-400 opacity-80" />
                <div>
                  <div className="text-3xl font-black text-white">4.8/5</div>
                  <div className="text-xs font-medium text-amber-200">Candidate Joy Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Magazine Promo Section */}
      <section className="py-20 bg-slate-950/40 border-t border-white/10 relative overflow-hidden" id="landing-magazine-promo">
        {/* Subtle decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                ★ Hybrid Media Launch: Print + Digital
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Careers Avalanche <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hybrid Digital Magazine</span>
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                To bridge the regional digital divide, we distribute 15,000+ printed copies of Careers Avalanche directly to community hubs, libraries, and vocational schools across South Africa. 
                Coupled with our interactive proctored online scoreboards, this creates a state-of-the-art hybrid placement framework.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left pt-2">
                <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="text-2xl font-black text-indigo-300 font-mono">15K+</div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Audited Print Run</h5>
                    <p className="text-[11px] text-slate-400">Distributed to 120+ active regional nodes.</p>
                  </div>
                </div>

                <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="text-2xl font-black text-purple-300 font-mono">80K+</div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Digital Ad Reach</h5>
                    <p className="text-[11px] text-slate-400">Recruiters browse proctored lists.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    sessionStorage.setItem('blog_tab', 'magazine');
                    onNavigate('blog');
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/15"
                >
                  <span>Launch Interactive Previewer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <a 
                  href="https://www.facebook.com/Careersavalanche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  Visit Facebook Page (Careersavalanche) <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              {/* Animated visual of a magazine 3D card stacked */}
              <div className="relative w-72 sm:w-80 aspect-[3/4] bg-gradient-to-br from-indigo-950 to-purple-950 p-6 rounded-2xl border border-white/25 shadow-2xl flex flex-col justify-between overflow-hidden group">
                {/* Visual Cover Accent */}
                <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-all duration-500"></div>
                
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded font-black tracking-wider uppercase">Q3 2026 Edition</span>
                  <span className="text-[9px] text-slate-400 font-mono">HYBRID DUAL-CHANNEL</span>
                </div>

                <div className="my-auto space-y-3">
                  <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest block">★ SPONSOR SPOTLIGHT PREVIEW</span>
                  <h4 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
                    Careers <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Avalanche</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-normal font-medium">
                    "Bridging regional employment skills gaps with proctored digital benchmarks and offline print-runs."
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] text-slate-400">
                  <span>LearnWinGrow Africa</span>
                  <button 
                    onClick={() => {
                      sessionStorage.setItem('blog_tab', 'magazine');
                      onNavigate('blog');
                    }}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Flip Pages →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Blogs & Future Insights */}
      <section className="py-20 bg-transparent border-t border-white/10" id="landing-blogs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold text-indigo-300 tracking-widest uppercase mb-2">Knowledge Base</h2>
              <h3 className="text-3xl font-black text-white tracking-tight">Future Insights & Articles</h3>
            </div>
            <button onClick={() => onNavigate('blog')} className="text-indigo-300 font-semibold hover:text-indigo-200 text-sm flex items-center gap-1 mt-4 md:mt-0 transition-colors">
              Read all articles <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 flex flex-col" id={`blog-card-${blog.id}`}>
                <div className="relative h-48 bg-white/5 shrink-0">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#0f172a]/80 backdrop-blur-md text-indigo-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">{blog.readTime}</span>
                    <h4 className="font-bold text-white leading-snug hover:text-indigo-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {blog.snippet}
                    </p>
                  </div>
                  <button onClick={() => onNavigate('blog')} className="text-indigo-300 hover:text-indigo-200 font-bold text-xs flex items-center gap-1 group/btn">
                    Read Article <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" id="landing-cta-section">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-2xl shadow-indigo-500/5">
          {/* Subtle decorative mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-40"></div>
          <div className="relative space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Ready to Define Your Future?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Take our 10-minute diagnostic aptitude assessment right now to verify your Logical Reasoning and Digital Literacy skills.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('assessment')} 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.03]"
                id="cta-start-test"
              >
                Start My Free Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
