import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Users, FileSpreadsheet, ShieldCheck, Download, Filter, HelpCircle, Eye, Settings, Plus, RotateCcw, AlertCircle, Trash2, Building2 } from 'lucide-react';
import { AppView, Survey } from '../types';
import { initialSurveys } from '../data';

interface AdminPortalProps {
  onNavigate: (view: AppView) => void;
}

export default function AdminPortal({ onNavigate }: AdminPortalProps) {
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-Launch Pre-Registrants State
  const [preRegistrants, setPreRegistrants] = useState<{ email: string; role: 'seeker' | 'partner'; timestamp: string }[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('pre_registrants');
      if (data) {
        setPreRegistrants(JSON.parse(data));
      } else {
        const defaultRegistrants: { email: string; role: 'seeker' | 'partner'; timestamp: string }[] = [
          { email: 'sibongile.nkosi@gmail.com', role: 'seeker', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
          { email: 'recruit@standardbank.co.za', role: 'partner', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
          { email: 'thabo.radebe@outlook.com', role: 'seeker', timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
          { email: 'talent@sasol.com', role: 'partner', timestamp: new Date(Date.now() - 3600000 * 24).toISOString() }
        ];
        localStorage.setItem('pre_registrants', JSON.stringify(defaultRegistrants));
        setPreRegistrants(defaultRegistrants);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Admin survey state
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [showAddSurveyForm, setShowAddSurveyForm] = useState(false);

  // Dynamic Heatmap Hover State
  const [hoveredHeatmapIndex, setHoveredHeatmapIndex] = useState<number | null>(null);

  // Filters calculation simulating data recalculation
  const statsMultiplier = useMemo(() => {
    let multiplier = 1.0;
    if (selectedAge === '18-24') multiplier *= 0.7;
    if (selectedAge === '25-30') multiplier *= 0.3;
    if (selectedRegion === 'Gauteng') multiplier *= 0.55;
    if (selectedRegion === 'Western Cape') multiplier *= 0.3;
    if (selectedRegion === 'KwaZulu-Natal') multiplier *= 0.15;
    if (selectedSkill === 'Beginner') multiplier *= 0.25;
    if (selectedSkill === 'Intermediate') multiplier *= 0.5;
    if (selectedSkill === 'Advanced') multiplier *= 0.25;
    return multiplier;
  }, [selectedAge, selectedRegion, selectedSkill]);

  const certifiedCount = Math.round(4850 * statsMultiplier);
  const densityPercent = selectedRegion === 'Western Cape' ? 79.8 : selectedRegion === 'KwaZulu-Natal' ? 68.4 : 84.2;

  // Sectors Chart Data
  const sectorData = [
    { label: "Fintech & Banking", value: 34, color: "bg-indigo-500" },
    { label: "Agriculture & IoT", value: 22, color: "bg-emerald-500" },
    { label: "Creative Economy", value: 28, color: "bg-amber-500" },
    { label: "Renewable Energy", value: 16, color: "bg-blue-500" }
  ];

  // Map representation of 5x5 heatmap sectors (representing South African urban hubs & skill levels)
  const heatmapData = [
    { title: "Soweto Hub", density: 85, skill: "Digital Literacy" },
    { title: "Alexandria Tech Corner", density: 72, skill: "Few-Shot Prompting" },
    { title: "Khayelitsha Web Lab", density: 91, skill: "Web Flow Builders" },
    { title: "Mitchells Plain Finance Node", density: 64, skill: "Google Sheets" },
    { title: "Durban Central IoT Base", density: 78, skill: "Data Mapping" },
    { title: "Pretoria East AI Lab", density: 95, skill: "Prompt Engineering" },
    { title: "Tembisa Operations Block", density: 80, skill: "Workspace Suite" },
    { title: "Guguletu Creative Suite", density: 88, skill: "UI Wireframing" },
    { title: "Port Elizabeth Hub", density: 55, skill: "E-Commerce Setup" },
    { title: "Nelspruit Agro Tech Node", density: 62, skill: "Soil Moisture IoT" },
    { title: "Polokwane Digital Base", density: 67, skill: "Google Workspace" },
    { title: "Bloemfontein Code Space", density: 70, skill: "No-Code Apps" },
    { title: "Kimberley Tech Hub", density: 48, skill: "Google Sheets" },
    { title: "Sandton Executive Suite", density: 98, skill: "Critical Reasoning" },
    { title: "Stellenbosch Innovation Lab", density: 94, skill: "Advanced Python" },
    { title: "Randburg Admin Node", density: 76, skill: "Workspace Suite" },
    { title: "Vanderbijlpark IoT Core", density: 59, skill: "Database Basics" },
    { title: "East London Logistics Base", density: 82, skill: "Agile Workflow" },
    { title: "Mamelodi Cloud Hub", density: 86, skill: "No-Code Mastery" },
    { title: "George Craft Hub", density: 74, skill: "UI Design" },
    { title: "Rustenburg Mining IoT Node", density: 50, skill: "Data Tracking" },
    { title: "Midrand FinTech Zone", density: 96, skill: "Smart Contracts" },
    { title: "Belleville Operations Suite", density: 83, skill: "Office Automation" },
    { title: "Kempton Park Cargo Node", density: 69, skill: "Sheets Dashboard" },
    { title: "Siyabuswa Digital Hub", density: 42, skill: "Basic Web Editing" }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated successfully! Verified candidate count: ${certifiedCount}. Filters applied: Demographics: ${selectedAge}, Region: ${selectedRegion}, Skill Level: ${selectedSkill}. Preparing system download.`);
    }, 1500);
  };

  const handleToggleSurveyStatus = (surveyId: string) => {
    setSurveys((prev) => 
      prev.map((srv) => {
        if (srv.id === surveyId) {
          const nextStatusMap: Record<'Active' | 'Scheduled' | 'Completed', 'Active' | 'Scheduled' | 'Completed'> = {
            'Active': 'Completed',
            'Completed': 'Scheduled',
            'Scheduled': 'Active'
          };
          return {
            ...srv,
            status: nextStatusMap[srv.status]
          };
        }
        return srv;
      })
    );
  };

  const handleAddSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSurveyTitle.trim()) return;
    
    const newSurvey: Survey = {
      id: `s_new_${Date.now()}`,
      title: newSurveyTitle,
      status: 'Active',
      responses: 0,
      completionRate: 0.0
    };

    setSurveys((prev) => [newSurvey, ...prev]);
    setNewSurveyTitle('');
    setShowAddSurveyForm(false);
  };

  const handleDeleteSurvey = (surveyId: string) => {
    if (confirm("Are you sure you want to delete this survey dataset?")) {
      setSurveys((prev) => prev.filter(s => s.id !== surveyId));
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex animate-fade-in" id="admin-root">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 hidden lg:flex flex-col justify-between shrink-0" id="admin-sidebar">
        <div>
          {/* Logo element */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="admin-sidebar-logo">
            <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-extrabold text-base shadow-md">
              LW
            </div>
            <div>
              <span className="font-black text-sm tracking-tight text-white block leading-none">LearnWinGrow</span>
              <span className="text-indigo-300 font-bold text-[9px] tracking-widest uppercase">Admin Portal</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1.5" id="admin-sidebar-nav">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-indigo-300 font-bold text-xs uppercase tracking-wider text-left border-l-4 border-indigo-500">
              <BarChart3 className="w-4 h-4" /> Talent Analytics
            </button>
            <button onClick={() => alert("Loading User Management directory.")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider text-left transition-colors">
              <Users className="w-4 h-4" /> User Management
            </button>
            <button onClick={() => onNavigate('assessment')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider text-left transition-colors">
              <ShieldCheck className="w-4 h-4" /> Test Management
            </button>
            <button onClick={() => onNavigate('brands')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider text-left transition-colors">
              <Building2 className="w-4 h-4" /> Employer Hub
            </button>
            <button onClick={() => alert("Loading Content Hub Management panel.")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider text-left transition-colors">
              <FileSpreadsheet className="w-4 h-4" /> Content Hub
            </button>
            <button onClick={() => alert("Loading Surveys moderation panel.")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-xs uppercase tracking-wider text-left transition-colors">
              <Plus className="w-4 h-4" /> Surveys & Audits
            </button>
          </nav>
        </div>

        {/* User identification */}
        <div className="p-4 border-t border-white/10 space-y-3" id="admin-user-widget">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white">
              JD
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200">Jane Doe</span>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Master Admin</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('landing')} 
            className="w-full border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-center text-[10px] font-bold py-2 rounded-lg transition-all"
          >
            Exit Admin Console
          </button>
        </div>
      </aside>

      {/* Main Workspace Column */}
      <div className="flex-grow flex flex-col min-w-0" id="admin-workspace-col">
        
        {/* Top bar */}
        <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 h-16 px-6 flex items-center justify-between" id="admin-workspace-header">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block lg:hidden">LW Admin</span>
            <h1 className="font-extrabold text-base text-white tracking-tight hidden sm:block">Talent Operations Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setSelectedAge('All');
                setSelectedRegion('All');
                setSelectedSkill('All');
              }}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Downloading raw certified candidate database. This may take a minute.")} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-500/15 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Download Report
            </button>
          </div>
        </header>

        {/* Content Panel */}
        <main className="flex-grow p-6 space-y-8 overflow-y-auto" id="admin-workspace-main">
          
          {/* Header Row and Filters */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6 shadow-xl backdrop-blur-md" id="filters-panel">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">Talent Analytics Report</h2>
                <p className="text-xs text-slate-300">Demographic and competency breakdowns across South African candidate nodes</p>
              </div>
              <span className="bg-white/5 text-indigo-300 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                Data Updated 5m ago
              </span>
            </div>

            {/* Filter Hub Controls */}
            <div className="grid sm:grid-cols-4 gap-4" id="filters-grid">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demographics (Age)</label>
                <select 
                  value={selectedAge} 
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-250 outline-none focus:border-indigo-500 text-white"
                >
                  <option value="All">All Ages (18-35)</option>
                  <option value="18-24">18-24 Youth</option>
                  <option value="25-30">25-30 Professionals</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Region / Province</label>
                <select 
                  value={selectedRegion} 
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-250 outline-none focus:border-indigo-500 text-white"
                >
                  <option value="All">All Provinces</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skill Level</label>
                <select 
                  value={selectedSkill} 
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-250 outline-none focus:border-indigo-500 text-white"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner Skills</option>
                  <option value="Intermediate">Intermediate Mastery</option>
                  <option value="Advanced">Advanced Expert</option>
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" /> Calculating...
                    </>
                  ) : (
                    <>
                      <Filter className="w-4 h-4" /> Generate Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" id="admin-quick-stats-grid">
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certified Candidates</span>
              <div>
                <span className="text-3xl font-black text-white">{certifiedCount.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-400 font-bold block mt-1">+12% Monthly Growth</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Talent Density</span>
              <div>
                <span className="text-3xl font-black text-white">{densityPercent}%</span>
                <span className="text-[11px] text-indigo-300 font-bold block mt-1">High in Urban Hubs</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Surveys Logs</span>
              <div>
                <span className="text-3xl font-black text-white">4,740</span>
                <span className="text-[11px] text-indigo-300 font-bold block mt-1">94% Completion Rate</span>
              </div>
            </div>

            {/* Critical Insight Card */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950/40 border border-indigo-500/20 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-1 shadow-xl">
              <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-orange-400" /> Critical Insight
              </span>
              <p className="text-slate-300 text-xs leading-relaxed font-medium">
                Advanced prompt engineers match 35% faster with active tech firms in Gauteng.
              </p>
            </div>

          </section>

          {/* Row 2: Heatmap and radial chart */}
          <section className="grid lg:grid-cols-12 gap-8" id="admin-charts-row">
            
            {/* 5x5 Skills Heatmap */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="heatmap-panel">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-tight">Skills Distribution Heatmap</h3>
                  <p className="text-xs text-slate-400">Relative density of talent certified in specialized competencies</p>
                </div>
                <div className="flex gap-1.5">
                  <span className="bg-white/5 text-indigo-300 text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider">AI Ready</span>
                  <span className="bg-white/5 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider">Digital Literacy</span>
                </div>
              </div>

              {/* Heatmap Grid Wrapper */}
              <div className="relative" id="heatmap-grid-container">
                <div className="grid grid-cols-5 gap-2" id="heatmap-5x5-grid">
                  {heatmapData.map((node, idx) => {
                    // Compute background color based on density
                    let bgClass = "bg-indigo-950/40 text-indigo-300 border-indigo-900/30";
                    if (node.density >= 90) bgClass = "bg-gradient-to-tr from-indigo-500 to-purple-500 text-white border-indigo-400";
                    else if (node.density >= 80) bgClass = "bg-indigo-600/80 text-indigo-100 border-indigo-600/60";
                    else if (node.density >= 65) bgClass = "bg-indigo-800/50 text-indigo-200 border-indigo-700/40";
                    else if (node.density >= 50) bgClass = "bg-indigo-900/20 text-indigo-300 border-indigo-850/20";

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredHeatmapIndex(idx)}
                        onMouseLeave={() => setHoveredHeatmapIndex(null)}
                        className={`aspect-square rounded-xl ${bgClass} border flex items-center justify-center text-[10px] font-extrabold cursor-pointer hover:scale-[1.05] hover:border-white/50 transition-all shadow-sm`}
                      >
                        {node.density}%
                      </div>
                    );
                  })}
                </div>

                {/* Micro-interactive Tooltip on Hover */}
                <div className="h-16 mt-4 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs" id="heatmap-tooltip">
                  {hoveredHeatmapIndex !== null ? (
                    <>
                      <div>
                        <span className="block font-bold text-white leading-none">{heatmapData[hoveredHeatmapIndex].title}</span>
                        <span className="text-[10px] text-slate-400 block mt-1">Focus Skill: <strong>{heatmapData[hoveredHeatmapIndex].skill}</strong></span>
                      </div>
                      <div className="text-right">
                        <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                          Density: {heatmapData[hoveredHeatmapIndex].density}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-slate-300 italic text-[11px] block mx-auto">Hover over blocks of the Skills Heatmap to inspect specific region node details.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Future Skills Gap Radial Chart */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="gap-radial-panel">
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">Future Skills Target</h3>
                <p className="text-xs text-slate-400">Progression towards our national digital literacy milestones</p>
              </div>

              {/* Radial target circle */}
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 relative" id="radial-target-circle">
                <div className="relative w-36 h-36 flex items-center justify-center">
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
                      className="stroke-indigo-400 fill-transparent transition-all duration-1000" 
                      strokeWidth="10" 
                      strokeDasharray={376.8} 
                      strokeDashoffset={376.8 - (376.8 * 72) / 100} 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="block text-3xl font-black text-white leading-none">72%</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 block">AI Literacy</span>
                  </div>
                </div>

                {/* Chart Legends */}
                <div className="w-full grid grid-cols-3 gap-2 pt-6 text-center border-t border-white/10 mt-4" id="target-legends">
                  <div>
                    <span className="block text-xs font-bold text-white">45%</span>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase mt-0.5">Foundations</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-indigo-300">27%</span>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase mt-0.5">Advanced AI</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-300">28%</span>
                    <span className="text-[9px] text-slate-500 font-semibold block uppercase mt-0.5">Trad Tech</span>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* Row 3: Bar Charts and Survey Management Table */}
          <section className="grid lg:grid-cols-12 gap-8" id="admin-data-row">
            
            {/* Sector Interest Bar Chart */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="bar-chart-panel">
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">Talent Interest by Sector</h3>
                <p className="text-xs text-slate-400">Economic sectors drawing the highest candidate matches</p>
              </div>

              {/* Custom high-fidelity bar visualizer */}
              <div className="space-y-4" id="custom-sector-bars">
                {sectorData.map((sect, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>{sect.label}</span>
                      <span className="text-indigo-300">{sect.value}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-lg overflow-hidden border border-white/5">
                      <div className={`h-full ${sect.color} rounded-lg`} style={{ width: `${sect.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quarterly Survey Management */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="surveys-table-panel">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-tight">Quarterly Survey Management</h3>
                  <p className="text-xs text-slate-400">Configure public digital skills benchmarks</p>
                </div>
                <button 
                  onClick={() => setShowAddSurveyForm(!showAddSurveyForm)}
                  className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Add Benchmark
                </button>
              </div>

              {/* Optional Inline Add Survey Form */}
              <AnimatePresence>
                {showAddSurveyForm && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleAddSurvey}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Survey / Benchmark Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Q4 Executive Leadership Survey" 
                        value={newSurveyTitle}
                        onChange={(e) => setNewSurveyTitle(e.target.value)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white"
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2 text-xs pt-1">
                      <button 
                        type="button" 
                        onClick={() => setShowAddSurveyForm(false)}
                        className="bg-white/5 text-slate-300 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Create Active Survey
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Surveys Table */}
              <div className="overflow-x-auto" id="surveys-table-container">
                <table className="w-full text-left border-collapse" id="surveys-table">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pr-2">Survey Title</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 px-2 text-right">Total Responses</th>
                      <th className="pb-3 px-2 text-right">Completion Rate</th>
                      <th className="pb-3 pl-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-white/10 font-medium">
                    {surveys.map((srv) => (
                      <tr key={srv.id} className="hover:bg-white/5 text-slate-300 transition-colors" id={`survey-row-${srv.id}`}>
                        <td className="py-3.5 pr-2 font-bold text-white max-w-[200px] truncate">{srv.title}</td>
                        <td className="py-3.5 px-2">
                          <button 
                            onClick={() => handleToggleSurveyStatus(srv.id)}
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border transition-all ${
                              srv.status === 'Active' 
                                ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]' 
                                : srv.status === 'Scheduled'
                                  ? 'bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#60a5fa]'
                                  : 'bg-white/5 border-white/5 text-slate-400'
                            }`}
                            title="Click to toggle status"
                          >
                            {srv.status}
                          </button>
                        </td>
                        <td className="py-3.5 px-2 text-right font-mono text-slate-200">{srv.responses.toLocaleString()}</td>
                        <td className="py-3.5 px-2 text-right font-mono text-indigo-300">{srv.completionRate}%</td>
                        <td className="py-3.5 pl-2 text-center flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => alert(`Reviewing response logs for survey: ${srv.title}`)}
                            className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-lg transition-colors"
                            title="Inspect Survey Logs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSurvey(srv.id)}
                            className="p-1.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete Survey Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>

          {/* Row 4: Pre-Launch Campaign Standby Registry */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="prelaunch-subscribers-panel">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                  <span>Pre-Launch Standby Queue</span>
                  <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded text-[10px] font-black uppercase">Live Updates</span>
                </h3>
                <p className="text-xs text-slate-400">Visitor emails captured from the "Coming Soon" splash page campaign</p>
              </div>
              <button 
                onClick={() => {
                  alert("Exporting standby list... Total pre-registrations: " + preRegistrants.length + "\nCSV compilation completed successfully. File: careers_avalanche_subscribers.csv");
                }}
                className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export CSV List
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="registrants-table">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Registered Email</th>
                    <th className="pb-3 px-2">Perspective Role</th>
                    <th className="pb-3 px-2">Timestamp</th>
                    <th className="pb-3 pl-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/10 font-medium">
                  {preRegistrants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 italic">No emails registered yet. Join the waitlist on the Splash page to see it instantly updated here!</td>
                    </tr>
                  ) : (
                    preRegistrants.map((reg, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 text-slate-300 transition-colors">
                        <td className="py-3.5 pr-2 font-bold text-white font-mono">{reg.email}</td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                            reg.role === 'seeker' 
                              ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' 
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          }`}>
                            {reg.role === 'seeker' ? 'Job Seeker / Youth' : 'Corporate Partner'}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-mono text-slate-400">{new Date(reg.timestamp).toLocaleString()}</td>
                        <td className="py-3.5 pl-2 text-center">
                          <button 
                            onClick={() => {
                              if (confirm("Are you sure you want to remove this registration?")) {
                                const next = preRegistrants.filter((_, idx) => idx !== rIdx);
                                setPreRegistrants(next);
                                localStorage.setItem('pre_registrants', JSON.stringify(next));
                              }
                            }}
                            className="p-1.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                            title="Remove Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-white/5 border-t border-white/10 py-4 px-6 flex justify-between items-center text-[10px] text-slate-400 shrink-0" id="admin-footer">
          <span>Standard Regional Security Protocols Enabled</span>
          <span>© 2026 LearnWinGrow Africa (Pty) Ltd.</span>
        </footer>
      </div>
    </div>
  );
}
