import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Calendar, Clock, ArrowRight, Download, HelpCircle, CheckCircle2, ChevronRight, Sparkles, UserCheck } from 'lucide-react';
import { AppView } from '../types';
import { blogs } from '../data';
import Footer from './Footer';

interface TalentDashboardProps {
  onNavigate: (view: AppView) => void;
  userScore: number;
  testCompleted: boolean;
  subScores: {
    logical: number;
    situational: number;
    quantitative: number;
  };
}

export default function TalentDashboard({ onNavigate, userScore, testCompleted, subScores }: TalentDashboardProps) {
  const [candidateName, setCandidateName] = useState(() => {
    const saved = localStorage.getItem('candidate_name');
    if (saved && saved !== 'Sibongile') return saved;
    try {
      const data = localStorage.getItem('pre_registrants');
      if (data) {
        const list = JSON.parse(data);
        const lastSeeker = [...list].reverse().find((r: any) => r.role === 'seeker');
        if (lastSeeker && lastSeeker.name) {
          return lastSeeker.name;
        }
      }
    } catch (e) {}
    return 'Guest Candidate';
  });

  const [province, setProvince] = useState(() => {
    return localStorage.getItem('candidate_province') || 'Gauteng';
  });
  const [ageRange, setAgeRange] = useState(() => {
    return localStorage.getItem('candidate_age_range') || '25-29 (Developing Youth)';
  });
  const [race, setRace] = useState(() => {
    return localStorage.getItem('candidate_race') || 'Black African';
  });
  const [nationality, setNationality] = useState(() => {
    return localStorage.getItem('candidate_nationality') || 'South African Citizen';
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleSaveProfile = (newName: string, newProvince: string, newAgeRange: string, newRace: string, newNationality: string) => {
    setCandidateName(newName);
    setProvince(newProvince);
    setAgeRange(newAgeRange);
    setRace(newRace);
    setNationality(newNationality);

    localStorage.setItem('candidate_name', newName);
    localStorage.setItem('candidate_province', newProvince);
    localStorage.setItem('candidate_age_range', newAgeRange);
    localStorage.setItem('candidate_race', newRace);
    localStorage.setItem('candidate_nationality', newNationality);

    // Save/update this candidate in pre_registrants so the admin statistics immediately update!
    try {
      const existing = localStorage.getItem('pre_registrants');
      const list = existing ? JSON.parse(existing) : [];
      
      const email = localStorage.getItem('candidate_email') || `talent.seeker@careersavalanche.co.za`;
      const itemIndex = list.findIndex((r: any) => r.email === email || (r.role === 'seeker' && r.name === candidateName));
      
      const updatedEntry = {
        email,
        role: 'seeker' as const,
        name: newName,
        province: newProvince,
        ageRange: newAgeRange,
        race: newRace,
        nationality: newNationality,
        timestamp: new Date().toISOString()
      };

      if (itemIndex > -1) {
        list[itemIndex] = updatedEntry;
      } else {
        list.push(updatedEntry);
      }
      localStorage.setItem('pre_registrants', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }
    
    setShowProfileModal(false);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Compute overall match percent or display state
  const displayScore = testCompleted ? userScore : 75;
  const displayLogical = testCompleted ? subScores.logical : 84;
  const displaySituational = testCompleted ? subScores.situational : 78;
  const displayQuantitative = testCompleted ? subScores.quantitative : 68;

  const matchedCompanies = [
    { name: "Standard Blue Bank", match: "95% Match", roles: ["Junior Analyst", "Client Relations"], tag: "Finance" },
    { name: "CapeCloud Systems", match: "91% Match", roles: ["Technical Support Specialist"], tag: "Tech" },
    { name: "GreenPulse Tech", match: "88% Match", roles: ["Sustainability Administrator"], tag: "Renewable" },
    { name: "TelcoElite Global", match: "84% Match", roles: ["Operations Coordinator"], tag: "Telecomm" }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans" id="dashboard-root">
      {/* Top NavBar */}
      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white" id="dashboard-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="dashboard-logo">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              LW
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">LearnWinGrow</span>
              <span className="text-indigo-300 font-semibold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="text-indigo-300 font-semibold hover:text-indigo-200 transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('assessment')} className="hover:text-white transition-colors">Tests</button>
            <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">Brands</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">Admin Portal</button>
          </nav>

          <div className="flex items-center gap-4" id="dashboard-user-nav">
            <div className="text-right hidden sm:block">
              <span 
                onClick={() => setShowProfileModal(true)}
                className="block font-bold text-white text-sm hover:text-indigo-300 cursor-pointer transition-colors flex items-center gap-1 justify-end"
                title="Update your candidate profile"
              >
                {candidateName} <span className="text-[10px] opacity-65">✏️</span>
              </span>
              <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Candidate</span>
            </div>
            <div 
              onClick={() => setShowProfileModal(true)}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/10 cursor-pointer hover:brightness-110 transition-all"
              title="Update your candidate profile"
            >
              {getInitials(candidateName)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="dashboard-main-content">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Welcome Banner, Aptitude Status, Recommended Modules */}
          <div className="lg:col-span-8 space-y-8" id="dashboard-left-col">
            
            {/* Welcome Banner */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl" id="welcome-banner">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-35"></div>
              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 border border-indigo-400/25 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Member Account Active
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Welcome back, {candidateName}.</span>
                  <button 
                    onClick={() => setShowProfileModal(true)}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-indigo-300 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                    title="Change your candidate profile details"
                  >
                    ✏️ Edit Profile
                  </button>
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {testCompleted 
                    ? "Congratulations on completing your aptitude test! Your matched skills profiles have been calculated and sent to top regional employers. Explore your recommendations below."
                    : "You are doing great! Complete your pending aptitude tests and browse recommended modules to boost your profile match score with employers."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    onClick={() => onNavigate('assessment')} 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                    id="welcome-btn-test"
                  >
                    {testCompleted ? "Retake Aptitude Assessment" : "Continue Assessment"}
                  </button>
                  <button 
                    onClick={() => onNavigate('brands')} 
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold px-5 py-3 rounded-xl transition-all"
                    id="welcome-btn-careers"
                  >
                    View Career Paths
                  </button>
                </div>
              </div>
            </section>

            {/* Aptitude Status & Skill Analysis Section */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl" id="aptitude-status-section">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight">Aptitude Status</h2>
                  <p className="text-xs text-slate-400">Your verified analytical and competency scores</p>
                </div>
                {testCompleted && (
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Certified Profile
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-12 gap-8 items-center" id="aptitude-scores-grid">
                {/* Score Circle Chart */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl relative border border-white/5" id="radial-score-box">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full -rotate-90">
                      <circle 
                        cx="72" 
                        cy="72" 
                        r="60" 
                        className="stroke-white/10 fill-transparent" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="72" 
                        cy="72" 
                        r="60" 
                        className="stroke-indigo-500 fill-transparent transition-all duration-1000" 
                        strokeWidth="10" 
                        strokeDasharray={376.8} 
                        strokeDashoffset={376.8 - (376.8 * displayScore) / 100} 
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="block text-3xl font-black text-white leading-none">{displayScore}%</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">Aptitude Level</span>
                    </div>
                  </div>
                  <div className="text-center mt-4 space-y-1">
                    <h4 className="font-bold text-white text-sm">
                      {testCompleted ? "Advanced Strategist" : "General Proficiency"}
                    </h4>
                    <p className="text-xs text-slate-400">Based on verified scenario tests</p>
                  </div>
                </div>

                {/* Sub Score Gauges */}
                <div className="sm:col-span-7 space-y-4" id="subscores-list">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                      <span>Logical & Deductive Reasoning</span>
                      <span className="text-indigo-300">{displayLogical}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${displayLogical}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                      <span>Situational & Executive Judgment</span>
                      <span className="text-indigo-300">{displaySituational}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${displaySituational}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                      <span>Quantitative & Data Literacy</span>
                      <span className="text-indigo-300">{displayQuantitative}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${displayQuantitative}%` }}></div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-white/10" id="subscores-meta">
                    <span>Last Assessment: {testCompleted ? "Just Now" : "15 days ago"}</span>
                    <span>Confidence: High</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommended Modules (The Paradigm) */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl" id="recommended-modules-section">
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">Recommended "Paradigm" Modules</h2>
                <p className="text-xs text-slate-400">Targeted modules to unlock pending career paths</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4" id="modules-list">
                
                {/* Module 1 */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-2">
                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">AI Ready</span>
                    <h3 className="font-bold text-white text-sm">Large Language Models (LLMs) Foundations</h3>
                    <p className="text-slate-300 text-xs">Learn few-shot prompting and structuring pipelines for corporate intelligence tasks.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                    <span className="font-bold text-amber-400">Pending Activation</span>
                    <button onClick={() => onNavigate('landing')} className="text-indigo-300 font-bold hover:text-indigo-200 flex items-center gap-0.5">Start <ArrowRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-2">
                    <span className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Enterprise tools</span>
                    <h3 className="font-bold text-white text-sm">Advanced Google Workspace Mastery</h3>
                    <p className="text-slate-300 text-xs">Master Google Sheets lookup, pivots, script integrations and calendar automation flow.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                    <span className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed</span>
                    <span className="text-slate-400 font-medium">Verified Oct 2025</span>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-2">
                    <span className="bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Life Skills</span>
                    <h3 className="font-bold text-white text-sm">Corporate Onboarding & Executive Grit</h3>
                    <p className="text-slate-300 text-xs">How to handle task reporting, active-listening, workplace boundaries and feedback loops.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                    <span className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed</span>
                    <span className="text-slate-400 font-medium">Verified Nov 2025</span>
                  </div>
                </div>

                {/* Module 4 */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="space-y-2">
                    <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">No-Code dev</span>
                    <h3 className="font-bold text-white text-sm">Responsive Web Flow & Basic DB Schema</h3>
                    <p className="text-slate-300 text-xs">Building functional customer data entry web hooks using standard visual layout engines.</p>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-white/10 pt-3">
                    <span className="font-bold text-amber-400">Pending Activation</span>
                    <button onClick={() => onNavigate('landing')} className="text-indigo-300 font-bold hover:text-indigo-200 flex items-center gap-0.5">Start <ArrowRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Right Column: Matched Companies, Upcoming Events, Quick Actions */}
          <div className="lg:col-span-4 space-y-8" id="dashboard-right-col">
            
            {/* Quick Actions Panel */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-2xl" id="quick-actions-panel">
              <h3 className="font-extrabold text-white text-sm tracking-tight border-b border-white/10 pb-2">Quick Actions</h3>
              <div className="space-y-2" id="quick-actions-list">
                
                <button 
                  onClick={() => onNavigate('assessment')} 
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <span>{testCompleted ? "Retake Analytical Assessment" : "Take General Aptitude Test"}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button 
                  onClick={() => onNavigate('brands')} 
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <span>Search Certified Employer Brands</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert(`Preparing Quarterly Talent PDF report for ${candidateName}. Ready for download.`); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <span className="flex items-center gap-1.5"><Download className="w-3.5 h-3.5 text-indigo-300" /> Download Quarterly Report</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <button 
                  onClick={() => onNavigate('landing')} 
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <span>Browse General life Skills</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

              </div>
            </section>

            {/* Companies Looking for Your Profile */}
            <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-5 shadow-2xl" id="companies-matching-panel">
              <div>
                <h3 className="font-extrabold text-white text-sm tracking-tight">Active Brand Matches</h3>
                <p className="text-[11px] text-slate-400">Companies seeking your specific competencies</p>
              </div>

              <div className="space-y-4" id="matching-companies-list">
                {matchedCompanies.map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs sm:text-sm">{comp.name}</span>
                      <span className="bg-emerald-500/10 text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {comp.match}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {comp.roles.map((r, rIdx) => (
                        <span key={rIdx} className="text-[10px] bg-white/10 text-slate-300 font-semibold px-2 py-0.5 rounded-md">
                          {r}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-white/10 pt-2">
                      <span>Sector: <strong>{comp.tag}</strong></span>
                      <button onClick={() => onNavigate('brands')} className="text-indigo-300 font-bold flex items-center gap-0.5 hover:text-indigo-200">Explore Brand <ChevronRight className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Training webinar */}
            <section className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-white/10 backdrop-blur-xl p-6 rounded-3xl relative overflow-hidden shadow-2xl" id="webinar-alert-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"></div>
              <div className="relative space-y-4">
                <div className="flex items-center gap-2 text-indigo-300">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold tracking-wider uppercase">Live Masterclass</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base leading-tight text-white">Leveraging Google Sheets for Business Operations</h4>
                  <p className="text-[11px] text-indigo-200">Featuring Senior Business Analysts from Standard Wealth</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Tomorrow, 14:00 - 15:00 UTC</span>
                </div>
                <button 
                  onClick={() => alert(`Registration confirmed! Access link has been emailed to ${candidateName}.`)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white text-xs font-bold py-3 rounded-xl transition-all block text-center"
                >
                  Reserve My Seat
                </button>
              </div>
            </section>

          </div>
        </div>

        {/* Career Insights Section */}
        <section className="mt-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl" id="insights-section">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-black text-white tracking-tight">Expert Career Insights</h2>
            <p className="text-xs text-slate-400">Handpicked articles and news to stay ahead</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors" id={`dashboard-blog-${blog.id}`}>
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-xl overflow-hidden shrink-0">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-1 bg-transparent">
                  <span className="text-[9px] bg-[#0f172a]/80 text-indigo-300 font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border border-white/10">
                    {blog.category}
                  </span>
                  <h4 className="font-bold text-white text-xs leading-snug line-clamp-2 hover:text-indigo-300 cursor-pointer pt-1">
                    {blog.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block pt-1">{blog.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      
      {/* Profile demographic updating modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" id="profile-modal">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-left"
            id="profile-modal-content"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Your Candidate Profile</h3>
              <p className="text-xs text-slate-400">Specify your details below to align your profile with South Africa's live demographic filters and target career matching.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as any;
              handleSaveProfile(
                target.nameInput.value,
                target.provinceInput.value,
                target.ageInput.value,
                target.raceInput.value,
                target.nationalityInput.value
              );
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  name="nameInput"
                  type="text"
                  required
                  defaultValue={candidateName === 'Guest Candidate' ? '' : candidateName}
                  placeholder="e.g. Sindi Ndlovu"
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Province / Region</label>
                <select 
                  name="provinceInput"
                  defaultValue={province}
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age Range</label>
                  <select 
                    name="ageInput"
                    defaultValue={ageRange}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                  >
                    <option value="18-24 (Early Youth)">18-24 (Early Youth)</option>
                    <option value="25-29 (Developing Youth)">25-29 (Developing Youth)</option>
                    <option value="30-35 (Senior Youth)">30-35 (Senior Youth)</option>
                    <option value="36-40 (Adult)">36-40 (Adult)</option>
                    <option value="41+ (Senior)">41+ (Senior)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Race</label>
                  <select 
                    name="raceInput"
                    defaultValue={race}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                  >
                    <option value="Black African">Black African</option>
                    <option value="Coloured">Coloured</option>
                    <option value="Indian / Asian">Indian / Asian</option>
                    <option value="White">White</option>
                    <option value="Other / Prefer not to say">Other / Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nationality</label>
                <select 
                  name="nationalityInput"
                  defaultValue={nationality}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                >
                  <option value="South African Citizen">South African Citizen</option>
                  <option value="Permanent Resident">Permanent Resident</option>
                  <option value="Foreign National">Foreign National</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
