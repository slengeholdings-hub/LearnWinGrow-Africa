import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Compass, User, GraduationCap, Building2, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import { AppView } from './types';
import LandingPage from './components/LandingPage';
import TalentDashboard from './components/TalentDashboard';
import AssessmentCenter from './components/AssessmentCenter';
import BrandHub from './components/BrandHub';
import AdminPortal from './components/AdminPortal';
import CareersBlog from './components/CareersBlog';
import ComingSoonSplash from './components/ComingSoonSplash';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('splash');
  
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
        return <ComingSoonSplash onEnterApp={() => handleNavigate('landing')} onNavigateToView={handleNavigate} />;
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
        return <CareersBlog onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPortal onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
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

      {/* Floating Interactive Perspective Control Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4" id="prototype-switcher-container">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-3.5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-3" id="prototype-switcher-card">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-extrabold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" /> Interactive Perspectives
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Demo Navigation</span>
          </div>

          <div className="grid grid-cols-7 gap-1" id="prototype-switcher-buttons">
            
            {/* Splash */}
            <button
              onClick={() => handleNavigate('splash')}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                currentView === 'splash' 
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Coming Soon Splash"
            >
              <Sparkles className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-bold block leading-none">Splash</span>
            </button>

            {/* Landing */}
            <button
              onClick={() => handleNavigate('landing')}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                currentView === 'landing' 
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
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
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
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
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Aptitude Assessment Center"
            >
              <GraduationCap className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-bold block leading-none">Assessment</span>
            </button>

            {/* Brands */}
            <button
              onClick={() => handleNavigate('brands')}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                currentView === 'brands' 
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Employer Directory & Brands"
            >
              <Building2 className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-bold block leading-none">Brands</span>
            </button>

            {/* Blog */}
            <button
              onClick={() => handleNavigate('blog')}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                currentView === 'blog' 
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Careers Avalanche Blog"
            >
              <BookOpen className="w-4 h-4 mb-1" />
              <span className="text-[9px] font-bold block leading-none">Blog</span>
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => handleNavigate('admin')}
              className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                currentView === 'admin' 
                  ? 'bg-gradient-to-tr from-indigo-500/80 to-purple-500/80 border border-white/20 text-white font-bold shadow-lg shadow-indigo-500/20' 
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

    </div>
  );
}
