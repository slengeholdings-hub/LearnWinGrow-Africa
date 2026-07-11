import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Building2, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  MapPin, 
  CheckCircle2, 
  Image as ImageIcon, 
  Upload, 
  Layers, 
  Printer, 
  Smartphone,
  Share2
} from 'lucide-react';

interface DigitalMagazineProps {
  onNavigate?: (view: any) => void;
}

interface MagazinePage {
  pageNumber: number;
  title: string;
  subtitle: string;
  layout: 'cover' | 'editorial' | 'statistics' | 'showcase' | 'adSlot';
  content: React.ReactNode;
}

export default function DigitalMagazine({ onNavigate }: DigitalMagazineProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Custom Ad Simulator state for partner companies
  const [simCompanyName, setSimCompanyName] = useState('Vertex Global Finance');
  const [simTagline, setSimTagline] = useState('Empowering South Africa\'s youth with intelligent financial opportunities.');
  const [simCtaText, setSimCtaText] = useState('Apply Today with Your Match Code');
  const [simIndustry, setSimIndustry] = useState('Fintech');
  const [simLogoBg, setSimLogoBg] = useState('bg-indigo-600');
  const [simColorTheme, setSimColorTheme] = useState<'indigo' | 'emerald' | 'amber' | 'purple'>('indigo');
  const [selectedAdTemplate, setSelectedAdTemplate] = useState<'minimal' | 'display' | 'bold'>('display');

  // Total pages
  const totalPages = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const copyMagazineLink = () => {
    navigator.clipboard.writeText(window.location.href + '?view=magazine');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    alert("Digital Magazine custom share link copied to clipboard! You can share this directly with prospective corporate sponsors.");
  };

  // Render mock pages
  const pages: MagazinePage[] = [
    // Page 1: COVER
    {
      pageNumber: 1,
      title: "Careers Avalanche Magazine",
      subtitle: "The Hybrid Youth Talent & GTM Guide",
      layout: 'cover',
      content: (
        <div className="h-full flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-2xl border border-white/10 shadow-2xl" id="mag-page-cover">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color-dodge pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none"></div>
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-lg">
                LW
              </div>
              <span className="font-black text-sm tracking-tight">LearnWinGrow Africa</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded font-black uppercase tracking-wider block">Hybrid Q3 2026 Edition</span>
            </div>
          </div>

          <div className="my-auto space-y-5 relative z-10 text-center sm:text-left">
            <span className="inline-block text-[11px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse">
              ★ PRINT + DIGITAL HYBRID REVENUE MODEL
            </span>
            
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase">
                Careers <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-300">
                  Avalanche
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-300 tracking-wide">
                Bridging the Gap with Standardized Proctored Aptitude Directories
              </p>
            </div>

            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto sm:mx-0"></div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto sm:mx-0">
              Discover South Africa's leading platform combining localized offline print magazines with interactive, cloud-hosted candidate scores.
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400 relative z-10">
            <div className="flex items-center gap-4">
              <span>Verified Audited Print Reach: <strong className="text-white">15,000+</strong></span>
              <span>Digital Reach: <strong className="text-white">80,000+</strong></span>
            </div>
            <span className="font-mono text-indigo-400 font-extrabold uppercase">Careersavalanche.co.za</span>
          </div>
        </div>
      )
    },
    // Page 2: EDITORIAL NOTE
    {
      pageNumber: 2,
      title: "Editorial & The Hybrid Reach",
      subtitle: "Expanding Reach with Dual Delivery Channels",
      layout: 'editorial',
      content: (
        <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-900 text-slate-100 rounded-2xl border border-white/5 shadow-2xl relative" id="mag-page-editorial">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Page 02 • Editorial & Vision</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Careers Avalanche Magazine</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Why We Are a Hybrid Magazine
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed pt-1">
              <div className="space-y-3">
                <p>
                  South Africa's digital divide is a real logistical challenge. While thousands of high-potential candidates reside in urban and suburban sectors with active fiber feeds, many of our most dedicated youth are situated in environments with high mobile data costs and limited grid stability.
                </p>
                <p>
                  By creating a <strong>hybrid print-and-digital magazine</strong>, we create double impact. The physical printed edition is distributed directly to partner learning nodes, technical colleges, community centres, and youth hubs across Gauteng, Western Cape, and KwaZulu-Natal.
                </p>
              </div>
              <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-extrabold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-indigo-400" />
                  <span>The Offline-to-Online Loop</span>
                </h4>
                <p className="text-[11px] text-slate-300">
                  Every printed copy contains a customized registration code. Candidates read the print articles, take proctored diagnostic quizzes at local stations, and are cataloged instantly onto <strong>careersavalanche.co.za</strong>.
                </p>
                <div className="pt-1.5 flex items-center gap-2">
                  <div className="text-center bg-slate-950 p-2 rounded border border-white/5 flex-grow">
                    <span className="text-[9px] block text-slate-400 uppercase font-bold">Print Outlets</span>
                    <span className="text-xs font-black text-indigo-300 font-mono">120+ Nodes</span>
                  </div>
                  <div className="text-center bg-slate-950 p-2 rounded border border-white/5 flex-grow">
                    <span className="text-[9px] block text-slate-400 uppercase font-bold">Estimated Reach</span>
                    <span className="text-xs font-black text-purple-300 font-mono">95,000+ Youth</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-1">
              <span className="text-[10px] text-indigo-300 font-black uppercase tracking-widest block">For Corporate GTM Partners:</span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Sponsoring this publication guarantees your brand is displayed in both the high-quality print runs in regional youth hubs and the interactive online assessments viewed by hundreds of recruiters.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] text-slate-500">
            <span>LearnWinGrow Africa © 2026</span>
            <span className="font-bold text-indigo-400">August 1st Launch Sequence</span>
          </div>
        </div>
      )
    },
    // Page 3: ASSESSMENT DEMOGRAPHICS / STATISTICS
    {
      pageNumber: 3,
      title: "Aptitude Statistics & Cohorts",
      subtitle: "Verified Diagnostics for South African Enterprises",
      layout: 'statistics',
      content: (
        <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-900 text-slate-100 rounded-2xl border border-white/5 shadow-2xl relative" id="mag-page-stats">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Page 03 • National Cohorts Stats</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Audited Demographics</span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Pre-Launch Youth Demographic Index
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Our real-time testing pool combines geographic reach with highly specialized technical capabilities.
            </p>

            {/* Simulated mini graphs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Tested Candidate Provinces</span>
                
                <div className="space-y-1.5 text-[10px]">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-slate-300 font-bold text-[9px]">
                      <span>Gauteng (JHB & PTA)</span>
                      <span>52%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[52%]"></div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-slate-300 font-bold text-[9px]">
                      <span>Western Cape</span>
                      <span>28%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full w-[28%]"></div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-slate-300 font-bold text-[9px]">
                      <span>KwaZulu-Natal</span>
                      <span>20%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[20%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Top Verified Modules</span>
                  <p className="text-[9px] text-slate-500 leading-snug pt-0.5">Modules with highest 75%+ passing score from active cohort:</p>
                </div>

                <div className="space-y-1 font-mono text-[9px]">
                  <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/5 text-indigo-300 font-extrabold">
                    <span>Google Sheets Automation</span>
                    <span>84% passing</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/5 text-purple-300 font-extrabold">
                    <span>Critical Scenario Logic</span>
                    <span>72% passing</span>
                  </div>
                  <div className="flex items-center justify-between p-1 bg-white/5 rounded border border-white/5 text-amber-300 font-extrabold">
                    <span>Prompt Engineering</span>
                    <span>91% passing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Value Proposition Block */}
            <div className="p-3 bg-indigo-950/40 border border-white/10 rounded-xl space-y-1">
              <h5 className="text-[10px] text-white font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Standardized Recruiting
              </h5>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                By presenting audited metrics to corporate boards, we establish a level-playing field. Partners no longer have to spend millions filtering unverified CV resumes. They simply connect to our directory.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] text-slate-500">
            <span>Verified by Google Cloud Run Analytics</span>
            <span className="font-mono text-indigo-400 font-bold">Careers Avalanche Directories</span>
          </div>
        </div>
      )
    },
    // Page 4: PARTNER SHOWCASE
    {
      pageNumber: 4,
      title: "Partner Showcase",
      subtitle: "How Vertex Global & EcoPower Placement Works",
      layout: 'showcase',
      content: (
        <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-slate-900 text-slate-100 rounded-2xl border border-white/5 shadow-2xl relative" id="mag-page-showcase">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Page 04 • Corporate Case Studies</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Active Collaborations</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Case Study: Empowering Green & Fintech Placement
              </h3>
              <p className="text-xs text-indigo-300 font-semibold">Standard Wealth & Vertex Global Integration</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-[10px]">SG</div>
                  <span className="font-extrabold text-white text-[11px]">Standard Wealth Group</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Standard Wealth JHB required 35 entry-level administrative workers who were proficient in complex Excel and database operations.
                </p>
                <div className="p-2 bg-white/5 rounded border border-white/5 text-[9px] text-slate-300">
                  <strong className="text-emerald-400">Outcome:</strong> Hired 35 top-tested candidates within 12 days. Traditional HR screening overhead reduced by <strong>74%</strong>.
                </div>
              </div>

              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-black text-[10px]">EG</div>
                  <span className="font-extrabold text-white text-[11px]">EcoPower SA</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  EcoPower Cape Town sought microgrid operations coordinators who could manage field team deployments using collaborative tools.
                </p>
                <div className="p-2 bg-white/5 rounded border border-white/5 text-[9px] text-slate-300">
                  <strong className="text-emerald-400">Outcome:</strong> 12 candidates certified in LearnWinGrow's Life & Digital modules placed in full-time roles with 100% satisfaction rating.
                </div>
              </div>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl">
              <p className="text-[10px] text-slate-300 leading-relaxed text-center italic">
                "Our candidates bring zero friction on Day 1. Because their digital and soft competencies are proctored and audited beforehand, they represent the highest caliber talent available."
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[10px] text-slate-500">
            <span>LearnWinGrow Africa • GTM Department</span>
            <span className="font-bold text-indigo-400">careersavalanche.co.za</span>
          </div>
        </div>
      )
    },
    // Page 5: LIVE SPONSOR / AD SLOT SIMULATOR
    {
      pageNumber: 5,
      title: "Interactive Ad Simulator",
      subtitle: "Preview Your Custom Page Advertisement",
      layout: 'adSlot',
      content: (
        <div className={`h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-2xl relative ${
          simColorTheme === 'indigo' ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-indigo-500/30' :
          simColorTheme === 'emerald' ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border-emerald-500/30' :
          simColorTheme === 'amber' ? 'bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 border-amber-500/30' :
          'bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900 border-purple-500/30'
        }`} id="mag-page-ad-slot">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest">Page 05 • Full-Page Corporate Sponsor AD Slot</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Careers Avalanche Hybrid Media</span>
            </div>

            {/* Template Rendering */}
            <div className="text-center space-y-4 py-6" id="sim-ad-core-rendering">
              {/* Fake logo badge */}
              <div className="mx-auto flex justify-center">
                <div className={`w-12 h-12 rounded-2xl ${simLogoBg} border border-white/25 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-black/30`}>
                  {simCompanyName.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full text-white inline-block">
                  Careers Avalanche Official Talent Partner
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight max-w-md mx-auto">
                  {simCompanyName}
                </h2>
              </div>

              <p className="text-xs text-slate-200 italic max-w-sm mx-auto leading-relaxed">
                "{simTagline}"
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button className="bg-white text-slate-950 font-black text-[11px] px-5 py-2.5 rounded-xl uppercase shadow-md pointer-events-none tracking-wider">
                  {simCtaText}
                </button>
                <span className="text-[10px] text-slate-300 font-semibold bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  GTM Tag: <span className="font-mono font-bold text-white">LW-AD-{simCompanyName.replace(/\s+/g, '').slice(0,4).toUpperCase()}</span>
                </span>
              </div>
            </div>

            <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
              <p className="text-[9px] text-slate-400">
                ★ This full-page advertisement will occupy the high-visibility back inside cover of all printed editions distributed to campuses, and will be pinned to the primary digital directory view.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>Sponsor Target: <strong className="text-white">{simIndustry} Sector</strong></span>
            <span>Est. Impression Footprint: <strong className="text-emerald-400">95,000+ views</strong></span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden" id="digital-magazine-container">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-xs text-indigo-300 font-bold uppercase tracking-widest">Hybrid GTM Sales Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-400" />
            <span>Interactive Digital Magazine</span>
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            A real-time visual representation of the print + digital hybrid publication. Flip through pages to preview core content and test our live corporate ad simulator widget.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyMagazineLink}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-slate-200"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied Link!' : 'Share Live Deck'}</span>
          </button>
          
          <button
            onClick={() => alert("Loading full high-resolution print spec layout. Compiled PDF size: 14.8 MB. Offline-distribution agreements enabled.")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/15"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Layout (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Magazine Frame Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10" id="magazine-main-grid">
        
        {/* Left Column: Pages Flipping Container */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4" id="magazine-left-flipping">
          
          {/* Active Page Frame */}
          <div className="aspect-[4/3] min-h-[350px] sm:min-h-[420px] w-full" id="active-page-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full w-full"
              >
                {pages.find(p => p.pageNumber === currentPage)?.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded-2xl border border-white/10" id="magazine-page-nav-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
                currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Page</span>
            </button>

            {/* Page Bullets */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentPage === idx + 1 ? 'w-6 bg-indigo-500' : 'w-2.5 bg-white/10 hover:bg-white/20'
                  }`}
                  title={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
                currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'
              }`}
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="text-[11px] text-slate-300 leading-normal">
              <strong>Interactive Demo Tip:</strong> Choose <strong className="text-indigo-200">Page 5</strong> to see your live custom corporate advertisement simulator, which updates in real-time as you tweak the settings on the right panel!
            </p>
          </div>
        </div>

        {/* Right Column: Live Ad / Sponsor Settings Simulator Panel */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-between space-y-6" id="magazine-right-panel-simulator">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Live Sponsor Ad Simulator</span>
              </span>
              <span className="text-[10px] bg-purple-500/15 border border-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded font-bold uppercase">Rate Calculator</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Simulate how a potential corporate sponsor's branding will look in the printed publication. Enter client details to view changes in real-time on <strong>Page 5</strong>.
            </p>

            <div className="space-y-3.5 text-xs font-semibold">
              <div className="space-y-1">
                <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Company Brand Name</label>
                <input
                  type="text"
                  value={simCompanyName}
                  onChange={(e) => setSimCompanyName(e.target.value)}
                  placeholder="e.g. Standard Wealth Group"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-indigo-500 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Marketing Tagline / Vision</label>
                <input
                  type="text"
                  value={simTagline}
                  onChange={(e) => setSimTagline(e.target.value)}
                  placeholder="Tagline printed on back cover page..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-indigo-500 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Primary Call-To-Action Button Text</label>
                <input
                  type="text"
                  value={simCtaText}
                  onChange={(e) => setSimCtaText(e.target.value)}
                  placeholder="e.g. Apply with Avalanche Score"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-indigo-500 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Target Industry</label>
                  <select
                    value={simIndustry}
                    onChange={(e) => setSimIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-300 text-xs outline-none focus:border-indigo-500"
                  >
                    <option value="Fintech">Fintech</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Tech">Tech</option>
                    <option value="Creative Economy">Creative Economy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400 text-[10px] uppercase tracking-wider">Ad Color Theme</label>
                  <select
                    value={simColorTheme}
                    onChange={(e: any) => {
                      setSimColorTheme(e.target.value);
                      if (e.target.value === 'indigo') setSimLogoBg('bg-indigo-600');
                      else if (e.target.value === 'emerald') setSimLogoBg('bg-emerald-600');
                      else if (e.target.value === 'amber') setSimLogoBg('bg-amber-600');
                      else setSimLogoBg('bg-purple-600');
                      // Force view page 5 to instantly see changes
                      setCurrentPage(5);
                    }}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-300 text-xs outline-none focus:border-indigo-500"
                  >
                    <option value="indigo">Classic Indigo</option>
                    <option value="emerald">Green Tech Emerald</option>
                    <option value="amber">Agritech Amber</option>
                    <option value="purple">Creative Purple</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Estimation widget */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3" id="sponsor-calc-price-widget">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sponsorship Estimates</span>
              <span className="text-[9px] text-slate-500">10,000 Verified Audited Run</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 text-[9px] block">Print Copay cost</span>
                <span className="font-extrabold text-white text-sm font-mono">R 12,500 <span className="text-[9px] font-medium text-slate-400">/quarter</span></span>
              </div>
              <div className="space-y-0.5 border-l border-white/5 pl-2">
                <span className="text-slate-500 text-[9px] block">Estimated ROI</span>
                <span className="font-extrabold text-emerald-400 text-sm font-mono">3.8x <span className="text-[9px] font-medium text-slate-500">Conversion</span></span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Corporate proposal generated successfully for ${simCompanyName}.\nEstimated distribution nodes: 120 Centres.\nSMTP proposal dispatched to LearnWinGrow GTM Office.`);
              }}
              className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white font-extrabold text-xs rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Book Placement Spot</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
