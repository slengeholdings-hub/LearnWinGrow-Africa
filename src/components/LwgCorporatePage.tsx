import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { AppView } from '../types';

interface LwgCorporatePageProps {
  onNavigateToView: (view: AppView) => void;
}

export default function LwgCorporatePage({ onNavigateToView }: LwgCorporatePageProps) {
  // Dynamically set the document title for Google Search indexing and browser visibility
  useEffect(() => {
    document.title = "Talent Development, Talent Engagement and Future Workforce";
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-indigo-500 selection:text-white" id="lwg-corp-root">
      
      {/* Premium subtle background meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(168,85,247,0.06),transparent_40%)] pointer-events-none"></div>
      
      {/* Simple Top Bar */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 w-full py-6 flex justify-between items-center border-b border-white/5" id="lwg-corp-header">
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
          <span className="text-xs text-slate-400 font-medium tracking-wide">Pty Ltd Reg: 2024/559030/07</span>
        </div>
      </header>

      {/* Main Corporate Core Content (Simple, Clear, Plain Text Description as requested) */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center w-full" id="lwg-corp-main">
        
        {/* Subtle Category Tag */}
        <div className="mb-6 flex justify-start">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> South African Education &amp; Workforce Innovation
          </div>
        </div>

        {/* Dynamic & Aesthetic Core Heading */}
        <div className="space-y-4 mb-8 text-left" id="corp-hero-title-section">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25]">
            Talent Development, Talent Engagement and Future Workforce
          </h1>
          <p className="text-indigo-300 text-sm sm:text-base font-bold tracking-widest uppercase border-l-2 border-indigo-500 pl-3">
            Unlocking future skills. Inspiring future careers. Connecting future talent.
          </p>
        </div>

        {/* Plain Text Description Area */}
        <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-normal text-left" id="lwg-corporate-text-body">
          <p>
            <strong>Learn Win Grow Africa</strong> is a South African education, career development and workforce innovation company dedicated to preparing people for success in a rapidly evolving world of work. Through innovation, technology and strategic partnerships, the company develops solutions that connect education, industry and employment while equipping individuals with the knowledge, skills and opportunities needed to thrive in the digital economy.
          </p>
          
          <p>
            As the creator and owner of{' '}
            <button
              onClick={() => onNavigateToView('splash')}
              className="text-indigo-400 hover:text-indigo-300 font-extrabold underline decoration-indigo-400/50 hover:decoration-indigo-300 cursor-pointer transition-colors inline-flex items-center gap-0.5"
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
              onClick={() => onNavigateToView('splash')}
              className="text-indigo-400 hover:text-indigo-300 font-extrabold underline decoration-indigo-400/50 hover:decoration-indigo-300 cursor-pointer transition-colors inline-flex items-center gap-0.5"
            >
              Careers Avalanche
            </button>{' '}
            serving as its flagship platform, Learn Win Grow Africa is building an integrated ecosystem that unlocks future skills, inspires future careers and connects future talent. Together, they are helping shape a more inclusive, digitally enabled and economically competitive Africa by strengthening the connection between education, business and society while preparing the next generation for the opportunities of tomorrow.
          </p>

          {/* Core Visit Callout Container */}
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-400">Flagship Platform Access</span>
              <p className="text-sm font-bold text-slate-200">
                Visit <span className="text-indigo-300 underline font-mono font-bold">https://www.careersavalanche.co.za</span> to register / signin.
              </p>
            </div>
            <button
              onClick={() => onNavigateToView('splash')}
              className="self-start sm:self-auto text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/10 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              Go to Splash Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Simple decorative footer */}
      <footer className="py-6 border-t border-white/5 max-w-5xl mx-auto px-6 w-full text-center text-xs text-slate-500">
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
