import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Building, Briefcase, Filter, ChevronRight, Play, X, Compass, ExternalLink } from 'lucide-react';
import { AppView, Company } from '../types';
import { initialCompanies } from '../data';
import Footer from './Footer';

interface BrandHubProps {
  onNavigate: (view: AppView) => void;
}

export default function BrandHub({ onNavigate }: BrandHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Video player modal state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  // Partner onboarding state variables
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [onboardingName, setOnboardingName] = useState('');
  const [onboardingEmail, setOnboardingEmail] = useState('');
  const [onboardingSector, setOnboardingSector] = useState('Tech');
  const [onboardingLocation, setOnboardingLocation] = useState('Gauteng');
  const [onboardingStatus, setOnboardingStatus] = useState('Actively Hiring');
  const [onboardingDesc, setOnboardingDesc] = useState('');
  const [onboardingConsent, setOnboardingConsent] = useState(false);
  const [onboardingSuccess, setOnboardingSuccess] = useState(false);

  // Dynamic registered companies loading from localStorage
  const [dynamicCompanies, setDynamicCompanies] = useState<Company[]>(() => {
    try {
      const stored = localStorage.getItem('registered_partners');
      if (stored) {
        return [...initialCompanies, ...JSON.parse(stored)];
      }
    } catch (e) {
      console.error(e);
    }
    return initialCompanies;
  });

  const sectors = ['All', 'Fintech', 'Tech', 'Agriculture', 'Renewable Energy', 'Creative Economy'];
  const locations = ['All', 'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West'];
  const statuses = ['All', 'Actively Hiring', 'Hiring Soon'];

  // Filtered companies computed in real-time
  const filteredCompanies = useMemo(() => {
    return dynamicCompanies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            company.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'All' || company.sector === selectedSector;
      const matchesLocation = selectedLocation === 'All' || company.location === selectedLocation;
      const matchesStatus = selectedStatus === 'All' || company.hiringStatus === selectedStatus;
      
      return matchesSearch && matchesSector && matchesLocation && matchesStatus;
    });
  }, [dynamicCompanies, searchTerm, selectedSector, selectedLocation, selectedStatus]);

  // Featured and regular split for layout bento
  const featuredCompanies = useMemo(() => {
    return filteredCompanies.filter(c => c.isFeatured);
  }, [filteredCompanies]);

  const regularCompanies = useMemo(() => {
    return filteredCompanies.filter(c => !c.isFeatured);
  }, [filteredCompanies]);

  const videos = [
    {
      id: 'v1',
      title: "Life at TechFlow Africa",
      company: "TechFlow",
      length: "2:45",
      thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // open source sample
    },
    {
      id: 'v2',
      title: "Founder's Vision: BlueSky Data",
      company: "BlueSky",
      length: "3:12",
      thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.w3schools.com/html/movie.mp4" // open source sample
    },
    {
      id: 'v3',
      title: "Remote Excellence at CloudHub",
      company: "CloudHub SA",
      length: "1:58",
      thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  const handleOpenVideo = (videoUrl: string, title: string) => {
    setActiveVideoUrl(videoUrl);
    setActiveVideoTitle(title);
  };

  const handlePartnerOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingName || !onboardingEmail || !onboardingConsent) {
      alert("Please complete all required fields and check the consent box.");
      return;
    }

    // 1. Create a new Company item
    const newCompany: Company = {
      id: 'c-dynamic-' + Date.now(),
      name: onboardingName,
      description: onboardingDesc || `An innovative organization committed to building sustainable pipelines in South Africa's ${onboardingSector} industry.`,
      matchRate: Math.floor(Math.random() * 15) + 85, // 85 to 99
      sector: onboardingSector as any,
      location: onboardingLocation,
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200", // standard generic corporate thumbnail
      bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      hiringStatus: onboardingStatus as any,
      isFeatured: Math.random() > 0.5
    };

    // 2. Save company to registered_partners
    try {
      const stored = localStorage.getItem('registered_partners');
      const list = stored ? JSON.parse(stored) : [];
      list.push(newCompany);
      localStorage.setItem('registered_partners', JSON.stringify(list));
      
      // Update state so it renders in real-time
      setDynamicCompanies([...initialCompanies, ...list]);
    } catch (err) {
      console.error(err);
    }

    // 3. Register as subscriber in pre_registrants so it streams to the Admin standby queue!
    try {
      const storedRegs = localStorage.getItem('pre_registrants');
      const regsList = storedRegs ? JSON.parse(storedRegs) : [];
      regsList.push({
        email: onboardingEmail,
        role: 'partner',
        companyName: onboardingName,
        province: onboardingLocation,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('pre_registrants', JSON.stringify(regsList));
    } catch (err) {
      console.error(err);
    }

    // 4. Reset form fields and set success state
    setOnboardingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans" id="brands-root">
      {/* Top NavBar */}
      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white" id="brands-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="brands-logo">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              LW
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">LearnWinGrow</span>
              <span className="text-indigo-300 font-semibold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" id="brands-nav-links">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('assessment')} className="hover:text-white transition-colors">Tests</button>
            <button onClick={() => onNavigate('brands')} className="text-indigo-300 font-semibold hover:text-indigo-200 transition-colors">Brands</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">Admin Portal</button>
          </nav>

          <div className="flex items-center gap-3" id="brands-auth">
            <button onClick={() => onNavigate('dashboard')} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/10 transition-all">
              Go to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="py-16 bg-transparent" id="brands-search-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight" id="brands-title">
            Connect with the Future
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Search and filter through South Africa's top employers hiring certified ready-to-work youth. Review their brand profiles and match metrics.
          </p>

          {/* Large Search Box */}
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-2" id="search-container">
            <div className="flex items-center gap-2 px-3 flex-grow py-1">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search Company Name, keyword, or sector..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-400 font-medium"
              />
            </div>
            <button 
              onClick={() => alert(`Found ${filteredCompanies.length} company matches.`)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all uppercase tracking-wider"
              id="search-action-btn"
            >
              Find My Fit
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filter Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" id="brands-filter-hub">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl space-y-6" id="filter-hub-box">
          <div className="flex items-center gap-2 text-white border-b border-white/10 pb-3">
            <Filter className="w-4 h-4 text-indigo-300" />
            <h2 className="font-extrabold text-sm tracking-tight">Advanced Filter Hub</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6" id="filter-dropdowns">
            {/* Sector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Industry Sector</label>
              <div className="flex flex-wrap gap-1.5">
                {sectors.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedSector === sec 
                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 border-indigo-500 text-white shadow-md' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Location Province</label>
              <div className="flex flex-wrap gap-1.5">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedLocation === loc 
                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 border-indigo-500 text-white shadow-md' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Hiring Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Status</label>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((stat) => (
                  <button
                    key={stat}
                    onClick={() => setSelectedStatus(stat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedStatus === stat 
                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 border-indigo-500 text-white shadow-md' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300 border-t border-white/10 pt-4" id="filter-meta">
            <span>Showing <strong>{filteredCompanies.length}</strong> active brand results</span>
            {(selectedSector !== 'All' || selectedLocation !== 'All' || selectedStatus !== 'All' || searchTerm !== '') && (
              <button 
                onClick={() => {
                  setSelectedSector('All');
                  setSelectedLocation('All');
                  setSelectedStatus('All');
                  setSearchTerm('');
                }}
                className="text-indigo-300 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Companies Bento Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12" id="brands-grid-workspace">
        
        {filteredCompanies.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-16 text-center space-y-3" id="no-brands-matched">
            <Building className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Employers Matched Your Filters</h3>
            <p className="text-slate-300 text-xs max-w-md mx-auto">Try refining your search keyword or switching filters to 'All' to explore other verified companies hiring in South Africa.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Bento Spotlights */}
            {featuredCompanies.length > 0 && (
              <section className="space-y-6" id="spotlight-brands">
                <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Industry Leaders Spotlight</h3>
                
                <div className="grid lg:grid-cols-12 gap-8">
                  {featuredCompanies.map((comp) => (
                    <div 
                      key={comp.id} 
                      className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl hover:border-white/20 transition-all flex flex-col justify-between"
                      id={`featured-card-${comp.id}`}
                    >
                      <div className="relative h-48 bg-white/5 shrink-0">
                        <img src={comp.bannerImage} alt={comp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-4 left-4 bg-[#0f172a]/80 backdrop-blur-md text-indigo-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                          {comp.sector}
                        </span>
                        <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-emerald-500/20">
                          {comp.hiringStatus}
                        </span>
                      </div>
                      
                      <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-bold text-white">{comp.name}</h4>
                            <span className="text-xs font-extrabold text-indigo-300">{comp.matchRate}% Student Match</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{comp.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {comp.location}, SA
                          </span>
                          <button 
                            onClick={() => alert(`Opening career paths portal for ${comp.name}.`)}
                            className="text-indigo-300 hover:text-indigo-200 font-bold flex items-center gap-0.5 group"
                          >
                            Explore Career Paths <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* General Directory Grid */}
            {regularCompanies.length > 0 && (
              <section className="space-y-6" id="general-directory">
                <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Employer Directory</h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularCompanies.map((comp) => (
                    <div 
                      key={comp.id} 
                      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5"
                      id={`company-card-${comp.id}`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                            <img src={comp.logo} alt={comp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            comp.hiringStatus === 'Actively Hiring' 
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                              : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          }`}>
                            {comp.hiringStatus}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors text-base">{comp.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase block">{comp.sector}</span>
                        </div>

                        <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{comp.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {comp.location}
                        </span>
                        <span className="text-indigo-300 font-bold">{comp.matchRate}% Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

        {/* Employer Career Videos */}
        <section className="py-8 space-y-6" id="career-videos-section">
          <div>
            <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Employer Career Reels</h3>
            <p className="text-slate-400 text-xs">Take a virtual office tour or hear from founders firsthand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" id="videos-grid">
            {videos.map((vid) => (
              <div 
                key={vid.id} 
                onClick={() => handleOpenVideo(vid.videoUrl, vid.title)}
                className="group relative h-52 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg cursor-pointer"
                id={`video-card-${vid.id}`}
              >
                <img 
                  src={vid.thumb} 
                  alt={vid.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:brightness-110 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Length tag */}
                <span className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {vid.length}
                </span>

                {/* Video Info overlay */}
                <div className="absolute bottom-4 left-4 right-16 text-white space-y-0.5">
                  <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">{vid.company}</span>
                  <h4 className="font-bold text-sm leading-tight text-white/95 group-hover:text-white line-clamp-1">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Video Player Modal Overlay */}
        <AnimatePresence>
          {activeVideoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="video-player-root">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideoUrl(null)}
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm"
              ></motion.div>

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-black w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-800 shadow-2xl z-10"
                id="video-player-container"
              >
                {/* Header bar */}
                <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center text-white">
                  <h4 className="font-bold text-sm sm:text-base leading-none text-white/95">{activeVideoTitle}</h4>
                  <button 
                    onClick={() => setActiveVideoUrl(null)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Video Element */}
                <video 
                  src={activeVideoUrl} 
                  controls 
                  autoPlay 
                  className="w-full aspect-video"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic Partner Onboarding Form Modal */}
        <AnimatePresence>
          {showOnboardingForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="partner-onboarding-root">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setShowOnboardingForm(false); setOnboardingSuccess(false); }}
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm"
              ></motion.div>

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-slate-900 border border-white/10 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto font-sans text-white space-y-6"
                id="partner-onboarding-container"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <Building className="w-5 h-5 text-indigo-400" /> List Your Company
                    </h3>
                    <p className="text-xs text-slate-400">Join South Africa's verified youth pipeline platform</p>
                  </div>
                  <button 
                    onClick={() => { setShowOnboardingForm(false); setOnboardingSuccess(false); }}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!onboardingSuccess ? (
                  <form onSubmit={handlePartnerOnboarding} className="space-y-4 text-left">
                    {/* Company Name */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company / Institution Name *</label>
                      <input 
                        type="text"
                        required
                        value={onboardingName}
                        onChange={(e) => setOnboardingName(e.target.value)}
                        placeholder="e.g. BlueSky Digital Ltd"
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                      />
                    </div>

                    {/* Contact Email */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corporate Contact Email *</label>
                      <input 
                        type="email"
                        required
                        value={onboardingEmail}
                        onChange={(e) => setOnboardingEmail(e.target.value)}
                        placeholder="e.g. partnership@bluesky.co.za"
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold"
                      />
                    </div>

                    {/* Sector & Region Dropdowns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry Sector *</label>
                        <select
                          value={onboardingSector}
                          onChange={(e) => setOnboardingSector(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                        >
                          <option value="Fintech">Fintech</option>
                          <option value="Tech">Tech</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Renewable Energy">Renewable Energy</option>
                          <option value="Creative Economy">Creative Economy</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Province / Location *</label>
                        <select
                          value={onboardingLocation}
                          onChange={(e) => setOnboardingLocation(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                        >
                          {locations.filter(loc => loc !== 'All').map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Hiring Status */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hiring Status *</label>
                      <select
                        value={onboardingStatus}
                        onChange={(e) => setOnboardingStatus(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                      >
                        <option value="Actively Hiring">Actively Hiring</option>
                        <option value="Hiring Soon">Hiring Soon</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brief Corporate Description</label>
                      <textarea
                        value={onboardingDesc}
                        onChange={(e) => setOnboardingDesc(e.target.value)}
                        placeholder="Tell job seekers about your mission, work environment, and digital skill needs..."
                        rows={3}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-semibold resize-none"
                      />
                    </div>

                    {/* Consent checkbox */}
                    <div className="pt-2 flex items-start gap-2.5">
                      <input 
                        type="checkbox"
                        id="onboarding-consent"
                        required
                        checked={onboardingConsent}
                        onChange={(e) => setOnboardingConsent(e.target.checked)}
                        className="mt-0.5 rounded border-white/10 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                      />
                      <label htmlFor="onboarding-consent" className="text-[10px] text-slate-400 leading-snug select-none cursor-pointer">
                        We explicitly consent to LearnWinGrow Africa listing our brand on the portal and verifying South African youth candidates for our talent pipeline.
                      </label>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setShowOnboardingForm(false)}
                        className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-bold text-xs py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                      >
                        List My Company Now
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Compass className="w-8 h-8 animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-white text-base">Onboarding Completed Successfully!</h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                        Your company brand has been compiled into the **Employer Brand Hub** directory. Job seekers can now review your profile.
                      </p>
                      <p className="text-[11px] text-indigo-300 font-mono mt-2">
                        Contact details verified under secure consent protocols.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button 
                        onClick={() => { setShowOnboardingForm(false); setOnboardingSuccess(false); }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-lg transition-all"
                      >
                        Explore the Updated Hub
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Call to Action Section */}
        <section className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-indigo-500/5" id="brands-cta">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="relative max-w-2xl space-y-4" id="brands-cta-content">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Looking for verified ready-to-work youth?</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Partner with LearnWinGrow Africa to access our certified analytical dashboards, download custom talent insights report, or setup private testing panels for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button 
                onClick={() => setShowOnboardingForm(true)} 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-wider cursor-pointer"
              >
                List Your Company
              </button>
              <button onClick={() => alert("Downloading Corporate Media and Integration Kit.")} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold px-6 py-3.5 rounded-xl transition-all">
                Download Media Kit
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
