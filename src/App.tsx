import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Compass, User, GraduationCap, Building2, ShieldCheck, BookOpen, Sparkles, Lock } from 'lucide-react';
import { AppView } from './types';
import LandingPage from './components/LandingPage';
import TalentDashboard from './components/TalentDashboard';
import AssessmentCenter from './components/AssessmentCenter';
import BrandHub from './components/BrandHub';
import AdminPortal from './components/AdminPortal';
import CareersBlog from './components/CareersBlog';
import ComingSoonSplash from './components/ComingSoonSplash';
import RegistrationPage from './components/RegistrationPage';
import LwgCorporatePage from './components/LwgCorporatePage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    // Determine initial view based on hostname or search parameter
    const searchParams = new URLSearchParams(window.location.search);
    const org = searchParams.get('org') || searchParams.get('ref') || '';
    const host = window.location.hostname.toLowerCase();
    
    if (
      org.toLowerCase().includes('lwg') || 
      org.toLowerCase().includes('learnwingrow') || 
      host.includes('learnwingrow') || 
      host.includes('lwg')
    ) {
      return 'lwg-corporate';
    }
    return 'splash';
  });
  
  // Developer Mode to access building backend
  const [isDeveloper, setIsDeveloper] = useState<boolean>(() => {
    return localStorage.getItem('is_developer') === 'true';
  });

  const handleUnlockDeveloper = (status: boolean) => {
    setIsDeveloper(status);
    localStorage.setItem('is_developer', status ? 'true' : 'false');
  };

  // Dynamic user test taking state
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(75);
  const [subScores, setSubScores] = useState({
    logical: 84,
    situational: 78,
    quantitative: 68
  });

  const handleCompleteTest = (score: number, logical: number, situational: number, quantitative: number) => {
    setUserScore(score);
    setSubScores({ logical, situational, quantitative });
    setTestCompleted(true);
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render active view with transition
  const renderActiveView = () => {
    switch (currentView) {
      case 'splash':
        return <ComingSoonSplash onEnterApp={() => handleNavigate('register')} onNavigateToView={handleNavigate} />;
      case 'lwg-corporate':
        return <LwgCorporatePage onNavigateToView={handleNavigate} />;
      case 'register':
        return (
          <RegistrationPage 
            onNavigate={handleNavigate} 
            onUnlockDeveloper={handleUnlockDeveloper}
            isDeveloper={isDeveloper}
          />
        );
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <TalentDashboard 
            onNavigate={handleNavigate} 
            userScore={userScore}
            testCompleted={testCompleted}
            subScores={subScores}
          />
        );
      case 'assessment':
        return (
          <AssessmentCenter 
            onNavigate={handleNavigate}
            onCompleteTest={handleCompleteTest}
          />
        );
      case 'brands':
        return <BrandHub onNavigate={handleNavigate} />;
      case 'blog':
        return <CareersBlog onNavigate={handleNavigate} isDeveloper={isDeveloper} />;
      case 'admin':
        return <AdminPortal onNavigate={handleNavigate} />;
      default:
        return <ComingSoonSplash onEnterApp={() => handleNavigate('register')} onNavigateToView={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 relative selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden" id="app-viewport">
      
      {/* Background Mesh Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none z-0"></div>
      
      {/* Active Screen View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="min-h-screen relative z-10"
        >
          {renderActiveView()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Interactive Perspective Control Center - ONLY visible to verified developers */}
      {isDeveloper && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-bounce-short" id="prototype-switcher-container">
          <div className="bg-white/5 backdrop-blur-xl border border-indigo-500/30 text-white p-3.5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col gap-3" id="prototype-switcher-card">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-extrabold uppercase tracking-widest animate-pulse">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Developer Sandbox Active
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Demo Navigation</span>
                <button
                  onClick={() => handleUnlockDeveloper(false)}
                  className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-bold text-red-300 transition-colors flex items-center gap-1"
                  title="Lock Developer Mode"
                >
                  <Lock className="w-2.5 h-2.5" /> Lock Sandbox
                </button>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1" id="prototype-switcher-buttons">
              
              {/* LWG Corp */}
              <button
                onClick={() => handleNavigate('lwg-corporate')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'lwg-corporate' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="LWG Corporate Page"
              >
                <Building2 className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">LWG Corp</span>
              </button>

              {/* Splash */}
              <button
                onClick={() => handleNavigate('splash')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'splash' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Coming Soon Splash"
              >
                <Sparkles className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Splash</span>
              </button>

              {/* Register */}
              <button
                onClick={() => handleNavigate('register')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'register' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Interactive Registration Page"
              >
                <Layers className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Register</span>
              </button>

              {/* Landing */}
              <button
                onClick={() => handleNavigate('landing')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'landing' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Landing (Careers Avalanche)"
              >
                <Compass className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Landing</span>
              </button>

              {/* Dashboard */}
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'dashboard' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Talent Dashboard"
              >
                <User className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Dashboard</span>
              </button>

              {/* Assessment */}
              <button
                onClick={() => handleNavigate('assessment')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'assessment' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Aptitude Assessment Center"
              >
                <GraduationCap className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Assess</span>
              </button>

              {/* Brands */}
              <button
                onClick={() => handleNavigate('brands')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'brands' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Employer Directory & Brands"
              >
                <Building2 className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Brands</span>
              </button>

              {/* Admin Portal */}
              <button
                onClick={() => handleNavigate('admin')}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  currentView === 'admin' 
                    ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg' 
                    : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold block leading-none">Admin</span>
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
