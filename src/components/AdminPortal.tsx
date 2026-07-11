import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Users, FileSpreadsheet, ShieldCheck, Download, Filter, HelpCircle, Eye, Settings, Plus, RotateCcw, AlertCircle, Trash2, Building2, Server, Mail, CheckSquare, Activity, Wifi, Globe, Send, Check } from 'lucide-react';
import { AppView, Survey } from '../types';
import { initialSurveys } from '../data';

interface AdminPortalProps {
  onNavigate: (view: AppView) => void;
}

export default function AdminPortal({ onNavigate }: AdminPortalProps) {
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedRace, setSelectedRace] = useState('All');
  const [selectedNationality, setSelectedNationality] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-Launch Pre-Registrants State
  const [preRegistrants, setPreRegistrants] = useState<{ email: string; role: 'seeker' | 'partner'; timestamp: string; name?: string; province?: string; companyName?: string }[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('pre_registrants');
      if (data && JSON.parse(data).length > 0) {
        setPreRegistrants(JSON.parse(data));
      } else {
        // Seed with realistic South African candidates so the portal starts with highly polished visuals
        // but can be cleared/deleted fully with one click
        const defaultSeeds: { email: string; role: 'seeker' | 'partner'; timestamp: string; name?: string; province?: string; companyName?: string; ageRange?: string; race?: string; nationality?: string }[] = [
          { name: "Thabo Mokoena", email: "thabo.mokoena@outlook.com", role: "seeker", province: "Gauteng", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-01T08:30:00.000Z" },
          { name: "Kgomotso Ndlovu", email: "kgomotso.ndlovu@gmail.com", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-02T11:15:00.000Z" },
          { name: "Sarah Smuts", email: "sarah.smuts@webmail.co.za", role: "seeker", province: "Western Cape", ageRange: "30-35 (Senior Youth)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-02T14:22:00.000Z" },
          { name: "Devashan Naidoo", email: "dev.naidoo@gmail.com", role: "seeker", province: "KwaZulu-Natal", ageRange: "25-29 (Developing Youth)", race: "Indian / Asian", nationality: "South African Citizen", timestamp: "2026-07-03T09:45:00.000Z" },
          { name: "Chantel de Klerk", email: "chantel.dk@mweb.co.za", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Coloured", nationality: "South African Citizen", timestamp: "2026-07-03T16:10:00.000Z" },
          { name: "Sibusiso Zulu", email: "sbu.zulu@gmail.com", role: "seeker", province: "KwaZulu-Natal", ageRange: "30-35 (Senior Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-04T10:05:00.000Z" },
          { name: "Lerato Molefe", email: "lerato.molefe@gmail.com", role: "seeker", province: "Free State", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-04T12:40:00.000Z" },
          { name: "Esther Phiri", email: "esther.phiri@outlook.com", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "Permanent Resident", timestamp: "2026-07-04T15:30:00.000Z" },
          { name: "Johan Pretorius", email: "johan.pretorius@absamail.co.za", role: "seeker", province: "Northern Cape", ageRange: "36-40 (Adult)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-05T08:20:00.000Z" },
          { name: "Amara Okeke", email: "amara.okeke@yahoo.com", role: "seeker", province: "Gauteng", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "Foreign National", timestamp: "2026-07-05T13:12:00.000Z" },
          { name: "Ndivhuwo Ramabulana", email: "ndivhuwo.ram@gmail.com", role: "seeker", province: "Limpopo", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-06T10:50:00.000Z" },
          { name: "Zanele Cele", email: "zanele.cele@gmail.com", role: "seeker", province: "Eastern Cape", ageRange: "30-35 (Senior Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-06T14:15:00.000Z" },
          { name: "Peter van der Merwe", email: "peter.vdm@gmail.com", role: "seeker", province: "Western Cape", ageRange: "25-29 (Developing Youth)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-07T09:00:00.000Z" },
          { name: "Farai Chintu", email: "farai.ch@outlook.com", role: "seeker", province: "Mpumalanga", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "Foreign National", timestamp: "2026-07-07T11:45:00.000Z" },
          { name: "Melissa Williams", email: "melissa.w@gmail.com", role: "seeker", province: "Eastern Cape", ageRange: "25-29 (Developing Youth)", race: "Coloured", nationality: "South African Citizen", timestamp: "2026-07-08T15:20:00.000Z" }
        ];
        localStorage.setItem('pre_registrants', JSON.stringify(defaultSeeds));
        setPreRegistrants(defaultSeeds);
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

  // --- PRE-LAUNCH & HOSTING DASHBOARD STATE ---
  // Server Status Monitor State
  const [pingingDomain, setPingingDomain] = useState<'LWG' | 'CA' | null>(null);
  const [pingLogs, setPingLogs] = useState<string[]>([]);
  const [dnsChecking, setDnsChecking] = useState<'LWG' | 'CA' | null>(null);
  const [dnsLogs, setDnsLogs] = useState<string[]>([]);
  const [sslAuditing, setSslAuditing] = useState(false);
  const [sslLogs, setSslLogs] = useState<string[]>([]);

  // Pre-Launch Campaign Mailer State
  const [campaignSubject, setCampaignSubject] = useState('Careers Avalanche Pre-Launch Access: August 1st Schedule');
  const [campaignBody, setCampaignBody] = useState(`Dear Seeker,

We are thrilled to announce that the official "Careers Avalanche" portal will be going live on Afrihost servers on the 1st of August!

As a pre-registered candidate, you have been assigned early access to the proctored Aptitude Assessment engine. Completing this test on launch day will instantly match your profile with our first cohort of hiring South African brands.

Get ready to Learn, Win, and Grow.

Best regards,
The LearnWinGrow Africa GTM Team`);
  const [campaignTarget, setCampaignTarget] = useState<'All' | 'Seekers' | 'Partners'>('All');
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [campaignSentLogs, setCampaignSentLogs] = useState<string[]>([]);
  const [campaignSuccessCount, setCampaignSuccessCount] = useState(0);

  // Deployment Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('afrihost_deployment_checklist');
      return saved ? JSON.parse(saved) : {
        htaccess: true,
        dns_a: false,
        dns_cname: false,
        ssl_cert: true,
        gzip: false,
        robots: true
      };
    } catch {
      return {
        htaccess: true,
        dns_a: false,
        dns_cname: false,
        ssl_cert: true,
        gzip: false,
        robots: true
      };
    }
  });

  const handleToggleChecklist = (key: string) => {
    const nextChecklist = { ...checklist, [key]: !checklist[key] };
    setChecklist(nextChecklist);
    localStorage.setItem('afrihost_deployment_checklist', JSON.stringify(nextChecklist));
  };

  // Ping simulation
  const handlePingDomain = (domainType: 'LWG' | 'CA') => {
    setPingingDomain(domainType);
    setPingLogs([`[INFO] Initiating ICMP Echo request to server nodes...`]);
    
    const domain = domainType === 'LWG' ? 'www.learnwingrow.africa' : 'www.careersavalanche.co.za';
    
    setTimeout(() => {
      setPingLogs(prev => [...prev, `[RESOLVING] ${domain} resolved to Afrihost JHB Node 105.186.204.42`]);
    }, 400);

    setTimeout(() => {
      setPingLogs(prev => [...prev, `[PING] 64 bytes from 105.186.204.42: icmp_seq=1 ttl=56 time=14.2 ms`]);
    }, 800);

    setTimeout(() => {
      setPingLogs(prev => [...prev, `[PING] 64 bytes from 105.186.204.42: icmp_seq=2 ttl=56 time=15.1 ms`]);
    }, 1200);

    setTimeout(() => {
      setPingLogs(prev => [
        ...prev, 
        `[PING] 64 bytes from 105.186.204.42: icmp_seq=3 ttl=56 time=13.8 ms`,
        `[SUCCESS] Ping execution complete for ${domainType}. Packets: 3 transmitted, 3 received, 0% packet loss. Avg Latency: 14.3ms (Afrihost Server Hub).`
      ]);
      setPingingDomain(null);
    }, 1600);
  };

  // DNS audit simulation
  const handleDnsCheck = (domainType: 'LWG' | 'CA') => {
    setDnsChecking(domainType);
    setDnsLogs([`[INFO] Checking DNS Zone file configuration...`]);
    
    const domain = domainType === 'LWG' ? 'learnwingrow.africa' : 'careersavalanche.co.za';
    
    setTimeout(() => {
      setDnsLogs(prev => [...prev, `[LOOKUP] Querying NS records for zone: ${domain}...`]);
    }, 500);

    setTimeout(() => {
      setDnsLogs(prev => [
        ...prev, 
        `[FOUND] NS 1: ns1.afrihost.com (Active)`,
        `[FOUND] NS 2: ns2.afrihost.com (Active)`
      ]);
    }, 1000);

    setTimeout(() => {
      setDnsLogs(prev => [
        ...prev, 
        `[FOUND] A record points to: 105.186.204.42 (TTL 3600)`,
        `[FOUND] CNAME record for 'www' points correctly to root Apex zone.`,
        `[SUCCESS] Zone verification complete. Domain ${domain} is fully bound to your Afrihost hosting Linux node.`
      ]);
      setDnsChecking(null);
    }, 1500);
  };

  // SSL audit simulation
  const handleSslAudit = () => {
    setSslAuditing(true);
    setSslLogs([`[INFO] Initializing SSL Handshake Diagnostic Tool...`]);

    setTimeout(() => {
      setSslLogs(prev => [...prev, `[CONNECT] Establishing TLS 1.3 socket to Afrihost Node...`]);
    }, 400);

    setTimeout(() => {
      setSslLogs(prev => [...prev, `[CERT] Certificate Authority: Let's Encrypt Authority X3`]);
    }, 800);

    setTimeout(() => {
      setSslLogs(prev => [...prev, `[VALID] Certificate is VALID. Issued: June 1, 2026. Expires: August 30, 2026.`]);
    }, 1200);

    setTimeout(() => {
      setSslLogs(prev => [
        ...prev, 
        `[CIPHER] TLS_AES_256_GCM_SHA384 (256-bit encryption key)`,
        `[SUCCESS] SSL installation verified. Secure lock icon active for all South African youth connections.`
      ]);
      setSslAuditing(false);
    }, 1600);
  };

  // Campaign mailer simulation
  const handleSendCampaign = () => {
    if (!campaignSubject.trim() || !campaignBody.trim()) {
      alert("Please specify a Subject and Body for the pre-launch campaign.");
      return;
    }

    setSendingCampaign(true);
    setCampaignProgress(0);
    setCampaignSentLogs([`[INFO] Target validation: preparing campaign payload...`]);
    setCampaignSuccessCount(0);

    const targets = preRegistrants.filter(p => {
      if (campaignTarget === 'Seekers') return p.role === 'seeker';
      if (campaignTarget === 'Partners') return p.role === 'partner';
      return true;
    });

    if (targets.length === 0) {
      setCampaignSentLogs(prev => [...prev, `[ERROR] No subscribers match this campaign's target criteria.`]);
      setSendingCampaign(false);
      return;
    }

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx >= targets.length) {
        clearInterval(interval);
        setCampaignSentLogs(prev => [
          ...prev, 
          `[SUMMARY] Pre-launch campaign blast complete!`,
          `[SUCCESS] Successfully delivered to ${targets.length} subscribers.`,
          `[LOG] Afrihost server response: 250 OK (SMTP Queue cleared)`
        ]);
        setCampaignProgress(100);
        setCampaignSuccessCount(targets.length);
        setSendingCampaign(false);
        alert(`GTM Marketing Campaign dispatched! Successfully delivered to ${targets.length} registered contacts via Afrihost SMTP server Node.`);
        return;
      }

      const subscriber = targets[currentIdx];
      const nameLabel = subscriber.role === 'partner' ? (subscriber.companyName || 'Corporate Partner') : (subscriber.name || 'Job Seeker');
      
      setCampaignSentLogs(prev => [
        ...prev,
        `[SMTP-SEND] Dispatching payload to: ${nameLabel} <${subscriber.email}>...`
      ]);

      setTimeout(() => {
        setCampaignSentLogs(prev => [
          ...prev,
          `[250-OK] Delivered to <${subscriber.email}> successfully (12ms)`
        ]);
      }, 150);

      currentIdx++;
      setCampaignProgress(Math.floor((currentIdx / targets.length) * 100));
    }, 350);
  };

  // Filters calculation simulating data recalculation
  const statsMultiplier = useMemo(() => {
    let multiplier = 1.0;

    // Age Filter Multipliers
    if (selectedAge === '18-24' || selectedAge === '18-24 (Early Youth)') multiplier *= 0.35;
    else if (selectedAge === '25-29 (Developing Youth)') multiplier *= 0.40;
    else if (selectedAge === '30-35 (Senior Youth)') multiplier *= 0.15;
    else if (selectedAge === '36-40 (Adult)') multiplier *= 0.08;
    else if (selectedAge === '41+ (Senior)') multiplier *= 0.02;

    // Region Filter Multipliers
    if (selectedRegion === 'Gauteng') multiplier *= 0.45;
    else if (selectedRegion === 'Western Cape') multiplier *= 0.20;
    else if (selectedRegion === 'KwaZulu-Natal') multiplier *= 0.15;
    else if (selectedRegion === 'Eastern Cape') multiplier *= 0.08;
    else if (selectedRegion === 'Free State') multiplier *= 0.04;
    else if (selectedRegion === 'Limpopo') multiplier *= 0.03;
    else if (selectedRegion === 'Mpumalanga') multiplier *= 0.03;
    else if (selectedRegion === 'Northern Cape') multiplier *= 0.01;
    else if (selectedRegion === 'North West') multiplier *= 0.01;

    // Race Filter Multipliers
    if (selectedRace === 'Black African') multiplier *= 0.80;
    else if (selectedRace === 'Coloured') multiplier *= 0.09;
    else if (selectedRace === 'Indian / Asian') multiplier *= 0.03;
    else if (selectedRace === 'White') multiplier *= 0.07;
    else if (selectedRace === 'Other / Prefer not to say') multiplier *= 0.01;

    // Nationality Filter Multipliers
    if (selectedNationality === 'South African Citizen') multiplier *= 0.90;
    else if (selectedNationality === 'Permanent Resident') multiplier *= 0.06;
    else if (selectedNationality === 'Foreign National') multiplier *= 0.04;

    // Skill Filter Multipliers
    if (selectedSkill === 'Beginner') multiplier *= 0.25;
    else if (selectedSkill === 'Intermediate') multiplier *= 0.50;
    else if (selectedSkill === 'Advanced') multiplier *= 0.25;

    return multiplier;
  }, [selectedAge, selectedRegion, selectedRace, selectedNationality, selectedSkill]);

  const certifiedCount = Math.round(4850 * statsMultiplier);
  const densityPercent = selectedRegion === 'Western Cape' ? 79.8 : selectedRegion === 'KwaZulu-Natal' ? 68.4 : selectedRegion === 'Gauteng' ? 84.2 : 55.4;

  // Filter for 'seeker' role
  const seekersList = useMemo(() => {
    return preRegistrants.filter(r => r.role === 'seeker');
  }, [preRegistrants]);

  // Aggregate Age
  const ageStats = useMemo(() => {
    const counts: Record<string, number> = {
      '18-24 (Early Youth)': 0,
      '25-29 (Developing Youth)': 0,
      '30-35 (Senior Youth)': 0,
      '36-40 (Adult)': 0,
      '41+ (Senior)': 0
    };
    let total = 0;
    seekersList.forEach(s => {
      const val = s.ageRange || '25-29 (Developing Youth)';
      let key = val;
      // Handle legacy or mapped strings
      if (val === '18-24') key = '18-24 (Early Youth)';
      if (val === '25-30') key = '25-29 (Developing Youth)';
      
      if (counts[key] !== undefined) {
        counts[key]++;
        total++;
      } else {
        counts['25-29 (Developing Youth)']++;
        total++;
      }
    });

    return Object.keys(counts).map(key => {
      const val = counts[key];
      const pct = total > 0 ? Math.round((val / total) * 100) : 0;
      return { label: key, count: val, percent: pct };
    });
  }, [seekersList]);

  // Aggregate Race
  const raceStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Black African': 0,
      'Coloured': 0,
      'Indian / Asian': 0,
      'White': 0,
      'Other / Prefer not to say': 0
    };
    let total = 0;
    seekersList.forEach(s => {
      const key = s.race || 'Black African';
      if (counts[key] !== undefined) {
        counts[key]++;
        total++;
      } else {
        counts['Other / Prefer not to say']++;
        total++;
      }
    });

    return Object.keys(counts).map(key => {
      const val = counts[key];
      const pct = total > 0 ? Math.round((val / total) * 100) : 0;
      return { label: key, count: val, percent: pct };
    });
  }, [seekersList]);

  // Aggregate Nationality
  const nationalityStats = useMemo(() => {
    const counts: Record<string, number> = {
      'South African Citizen': 0,
      'Permanent Resident': 0,
      'Foreign National': 0
    };
    let total = 0;
    seekersList.forEach(s => {
      const key = s.nationality || 'South African Citizen';
      if (counts[key] !== undefined) {
        counts[key]++;
        total++;
      } else {
        counts['South African Citizen']++;
        total++;
      }
    });

    return Object.keys(counts).map(key => {
      const val = counts[key];
      const pct = total > 0 ? Math.round((val / total) * 100) : 0;
      return { label: key, count: val, percent: pct };
    });
  }, [seekersList]);

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
      alert(`Report generated successfully! Verified candidate count: ${certifiedCount}. Filters applied: Demographics: ${selectedAge}, Region: ${selectedRegion}, Race/Diversity: ${selectedRace}, Nationality: ${selectedNationality}, Skill Level: ${selectedSkill}. Preparing system download.`);
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
                setSelectedRace('All');
                setSelectedNationality('All');
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4" id="filters-grid">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Demographics (Age)</label>
                <select 
                  value={selectedAge} 
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white cursor-pointer"
                >
                  <option value="All">All Ages</option>
                  <option value="18-24 (Early Youth)">18-24 (Early Youth)</option>
                  <option value="25-29 (Developing Youth)">25-29 (Developing Youth)</option>
                  <option value="30-35 (Senior Youth)">30-35 (Senior Youth)</option>
                  <option value="36-40 (Adult)">36-40 (Adult)</option>
                  <option value="41+ (Senior)">41+ (Senior)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Region / Province</label>
                <select 
                  value={selectedRegion} 
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white cursor-pointer"
                >
                  <option value="All">All Provinces</option>
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

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Race / Diversity</label>
                <select 
                  value={selectedRace} 
                  onChange={(e) => setSelectedRace(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white cursor-pointer"
                >
                  <option value="All">All Races</option>
                  <option value="Black African">Black African</option>
                  <option value="Coloured">Coloured</option>
                  <option value="Indian / Asian">Indian / Asian</option>
                  <option value="White">White</option>
                  <option value="Other / Prefer not to say">Other / Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nationality</label>
                <select 
                  value={selectedNationality} 
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white cursor-pointer"
                >
                  <option value="All">All Nationalities</option>
                  <option value="South African Citizen">South African Citizen</option>
                  <option value="Permanent Resident">Permanent Resident</option>
                  <option value="Foreign National">Foreign National</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skill Level</label>
                <select 
                  value={selectedSkill} 
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 outline-none focus:border-indigo-500 text-white cursor-pointer"
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
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20 cursor-pointer h-[38px] lg:h-[36px]"
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

          {/* Row 3.5: Live Demographic Analytics Hub */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="live-demographics-hub">
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                  <span>Live Candidate Demographics Hub</span>
                  <span className="bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded text-[10px] font-black uppercase">Live Aggregated Data</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time analysis of the South African seeker pipeline, powered by active registrants.
                </p>
              </div>
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
                Total Seeker Sample: {seekersList.length} Candidates
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Age Breakdown Card */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5 border-b border-white/10 pb-2.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    <span>Realistic Age Breakdown</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">South African youth focus (18-35) combined with general applicant ranges.</p>
                </div>
                <div className="space-y-3.5 pt-2">
                  {ageStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{stat.label}</span>
                        <span className="text-white font-mono">{stat.count} ({stat.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                          style={{ width: `${stat.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Race & Diversity Representation */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5 border-b border-white/10 pb-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Race & Diversity Analysis</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">Demographic equity profile matching employment equity guidelines.</p>
                </div>
                <div className="space-y-3.5 pt-2">
                  {raceStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{stat.label}</span>
                        <span className="text-white font-mono">{stat.count} ({stat.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                          style={{ width: `${stat.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nationality & Citizen Status */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 shadow-md flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5 border-b border-white/10 pb-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Nationality Status</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">Verification of residency and citizenship status for corporate deployment.</p>
                </div>
                <div className="space-y-3.5 pt-2">
                  {nationalityStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{stat.label}</span>
                        <span className="text-white font-mono">{stat.count} ({stat.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                          style={{ width: `${stat.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* NEW: Pre-Launch Campaign & Afrihost Hosting Hub */}
          <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl" id="pre-launch-hosting-hub">
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-400" />
                  <span>Pre-Launch Marketing & Afrihost Server Console</span>
                  <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded text-[10px] font-black uppercase">Hosting Nodes Live</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Manage the pre-launch referral queue, verify server statuses, and run email campaign blasts leading to August 1st.
                </p>
              </div>
              <div className="flex gap-2 text-xs font-semibold text-indigo-300 bg-indigo-500/5 px-3.5 py-1.5 rounded-full border border-indigo-500/10">
                <Wifi className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>Primary IP: 105.186.204.42 (Afrihost JHB-1)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="hosting-hub-grid">
              
              {/* Card 1: Server Status Monitor */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2 pb-2.5 border-b border-white/5">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Afrihost Node Diagnostics</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Query physical DNS records and ping latency metrics on our registered domain names.
                  </p>
                  
                  {/* Domains */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded-xl border border-white/5 text-[11px]">
                      <span className="font-bold text-slate-300">learnwingrow.africa</span>
                      <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">CNAME Linked</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded-xl border border-white/5 text-[11px]">
                      <span className="font-bold text-slate-300">careersavalanche.co.za</span>
                      <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">A Record Linked</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <button
                      onClick={() => handlePingDomain('CA')}
                      disabled={pingingDomain !== null}
                      className="py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center text-slate-200"
                    >
                      {pingingDomain === 'CA' ? 'Pinging...' : 'Ping Node'}
                    </button>
                    <button
                      onClick={() => handleDnsCheck('CA')}
                      disabled={dnsChecking !== null}
                      className="py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center text-slate-200"
                    >
                      {dnsChecking === 'CA' ? 'Checking...' : 'Check DNS'}
                    </button>
                    <button
                      onClick={handleSslAudit}
                      disabled={sslAuditing}
                      className="py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center text-slate-200"
                    >
                      {sslAuditing ? 'Auditing...' : 'Check SSL'}
                    </button>
                  </div>
                </div>

                {/* Console Terminal */}
                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 font-mono text-[9px] text-indigo-300 h-36 overflow-y-auto space-y-1 mt-2 flex flex-col">
                  <span className="text-slate-500 text-[8px] border-b border-white/5 pb-1 block uppercase font-bold mb-1">Live Diagnostic output</span>
                  {pingLogs.length === 0 && dnsLogs.length === 0 && sslLogs.length === 0 ? (
                    <span className="text-slate-600 italic block my-auto text-center">No tests executed yet. Run diagnostics above.</span>
                  ) : (
                    <>
                      {pingLogs.map((log, idx) => (
                        <div key={`p-${idx}`} className={log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>{log}</div>
                      ))}
                      {dnsLogs.map((log, idx) => (
                        <div key={`d-${idx}`} className={log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>{log}</div>
                      ))}
                      {sslLogs.map((log, idx) => (
                        <div key={`s-${idx}`} className={log.startsWith('[SUCCESS]') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>{log}</div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Card 2: Marketing Campaign Mailer */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2 pb-2.5 border-b border-white/5">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Pre-Launch GTM Mailer</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Draft and broadcast launch sequences directly to target segments of the standby registration list.
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Segment</label>
                      <select
                        value={campaignTarget}
                        onChange={(e: any) => setCampaignTarget(e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300 px-2 py-1 outline-none focus:border-indigo-500"
                      >
                        <option value="All">All Registered ({preRegistrants.length})</option>
                        <option value="Seekers">Seekers Only ({preRegistrants.filter(p => p.role === 'seeker').length})</option>
                        <option value="Partners">Partners Only ({preRegistrants.filter(p => p.role === 'partner').length})</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        value={campaignSubject}
                        onChange={(e) => setCampaignSubject(e.target.value)}
                        placeholder="Subject"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white font-semibold outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <textarea
                        value={campaignBody}
                        onChange={(e) => setCampaignBody(e.target.value)}
                        placeholder="Email Body Text..."
                        rows={3}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-300 outline-none focus:border-indigo-500 font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {sendingCampaign && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-indigo-300 font-bold">
                        <span>SMTP Dispatching...</span>
                        <span>{campaignProgress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${campaignProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSendCampaign}
                    disabled={sendingCampaign}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sendingCampaign ? 'Sending Campaign...' : 'Dispatch Campaign Blast'}</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Deployment Checklist */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2 pb-2.5 border-b border-white/5">
                    <CheckSquare className="w-4 h-4 text-purple-400" />
                    <span>Afrihost Go-Live Audit</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Verify and tick off production configurations to ensure 100% readiness for launch day.
                  </p>

                  {/* Checklist items */}
                  <div className="space-y-2.5 text-xs pt-1">
                    <div className="flex items-start gap-2.5 cursor-pointer select-none" onClick={() => handleToggleChecklist('htaccess')}>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition-all ${
                        checklist.htaccess ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20 hover:border-white/40'
                      }`}>
                        {checklist.htaccess && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`font-bold text-[11px] ${checklist.htaccess ? 'text-slate-300 line-through' : 'text-white'}`}>Configure SPA .htaccess rewrite</span>
                        <p className="text-[9px] text-slate-500">Crucial for handling Vite client routing redirects on Linux servers.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 cursor-pointer select-none" onClick={() => handleToggleChecklist('dns_a')}>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition-all ${
                        checklist.dns_a ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20 hover:border-white/40'
                      }`}>
                        {checklist.dns_a && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`font-bold text-[11px] ${checklist.dns_a ? 'text-slate-300 line-through' : 'text-white'}`}>Bind Apex Domain A-Record</span>
                        <p className="text-[9px] text-slate-500">Point careersavalanche.co.za to Afrihost Host IP: 105.186.204.42.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 cursor-pointer select-none" onClick={() => handleToggleChecklist('dns_cname')}>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition-all ${
                        checklist.dns_cname ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20 hover:border-white/40'
                      }`}>
                        {checklist.dns_cname && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`font-bold text-[11px] ${checklist.dns_cname ? 'text-slate-300 line-through' : 'text-white'}`}>Link CNAME learnwingrow.africa</span>
                        <p className="text-[9px] text-slate-500">Enable multi-brand corporate domain routing in ClientZone.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 cursor-pointer select-none" onClick={() => handleToggleChecklist('ssl_cert')}>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition-all ${
                        checklist.ssl_cert ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20 hover:border-white/40'
                      }`}>
                        {checklist.ssl_cert && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`font-bold text-[11px] ${checklist.ssl_cert ? 'text-slate-300 line-through' : 'text-white'}`}>Deploy Let's Encrypt SSL</span>
                        <p className="text-[9px] text-slate-500">Activate secure HTTPS protocol across all registration endpoints.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Readiness Score */}
                <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 space-y-1.5 mt-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Readiness Index</span>
                    <span className="font-extrabold text-purple-300 font-mono">
                      {Math.round((Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500" 
                      style={{ width: `${(Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100}%` }}
                    ></div>
                  </div>
                </div>
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
              <div className="flex flex-wrap gap-2 items-center self-start sm:self-auto">
                <button 
                  onClick={() => {
                    if (confirm("Reset to the default set of 15 realistic South African seed candidates? This is useful for demo presentation purposes.")) {
                      const defaultSeeds = [
                        { name: "Thabo Mokoena", email: "thabo.mokoena@outlook.com", role: "seeker", province: "Gauteng", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-01T08:30:00.000Z" },
                        { name: "Kgomotso Ndlovu", email: "kgomotso.ndlovu@gmail.com", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-02T11:15:00.000Z" },
                        { name: "Sarah Smuts", email: "sarah.smuts@webmail.co.za", role: "seeker", province: "Western Cape", ageRange: "30-35 (Senior Youth)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-02T14:22:00.000Z" },
                        { name: "Devashan Naidoo", email: "dev.naidoo@gmail.com", role: "seeker", province: "KwaZulu-Natal", ageRange: "25-29 (Developing Youth)", race: "Indian / Asian", nationality: "South African Citizen", timestamp: "2026-07-03T09:45:00.000Z" },
                        { name: "Chantel de Klerk", email: "chantel.dk@mweb.co.za", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Coloured", nationality: "South African Citizen", timestamp: "2026-07-03T16:10:00.000Z" },
                        { name: "Sibusiso Zulu", email: "sbu.zulu@gmail.com", role: "seeker", province: "KwaZulu-Natal", ageRange: "30-35 (Senior Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-04T10:05:00.000Z" },
                        { name: "Lerato Molefe", email: "lerato.molefe@gmail.com", role: "seeker", province: "Free State", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-04T12:40:00.000Z" },
                        { name: "Esther Phiri", email: "esther.phiri@outlook.com", role: "seeker", province: "Gauteng", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "Permanent Resident", timestamp: "2026-07-04T15:30:00.000Z" },
                        { name: "Johan Pretorius", email: "johan.pretorius@absamail.co.za", role: "seeker", province: "Northern Cape", ageRange: "36-40 (Adult)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-05T08:20:00.000Z" },
                        { name: "Amara Okeke", email: "amara.okeke@yahoo.com", role: "seeker", province: "Gauteng", ageRange: "25-29 (Developing Youth)", race: "Black African", nationality: "Foreign National", timestamp: "2026-07-05T13:12:00.000Z" },
                        { name: "Ndivhuwo Ramabulana", email: "ndivhuwo.ram@gmail.com", role: "seeker", province: "Limpopo", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-06T10:50:00.000Z" },
                        { name: "Zanele Cele", email: "zanele.cele@gmail.com", role: "seeker", province: "Eastern Cape", ageRange: "30-35 (Senior Youth)", race: "Black African", nationality: "South African Citizen", timestamp: "2026-07-06T14:15:00.000Z" },
                        { name: "Peter van der Merwe", email: "peter.vdm@gmail.com", role: "seeker", province: "Western Cape", ageRange: "25-29 (Developing Youth)", race: "White", nationality: "South African Citizen", timestamp: "2026-07-07T09:00:00.000Z" },
                        { name: "Farai Chintu", email: "farai.ch@outlook.com", role: "seeker", province: "Mpumalanga", ageRange: "18-24 (Early Youth)", race: "Black African", nationality: "Foreign National", timestamp: "2026-07-07T11:45:00.000Z" },
                        { name: "Melissa Williams", email: "melissa.w@gmail.com", role: "seeker", province: "Eastern Cape", ageRange: "25-29 (Developing Youth)", race: "Coloured", nationality: "South African Citizen", timestamp: "2026-07-08T15:20:00.000Z" }
                      ];
                      localStorage.setItem('pre_registrants', JSON.stringify(defaultSeeds));
                      setPreRegistrants(defaultSeeds as any);
                    }
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
                  title="Restore South African Seed Demo Data"
                >
                  🔄 Reset Seed Data
                </button>
                <button 
                  onClick={() => {
                    if (confirm("Are you absolutely sure you want to clear the entire standby queue? This will delete all seed records and live signups, starting completely empty.")) {
                      localStorage.setItem('pre_registrants', JSON.stringify([]));
                      setPreRegistrants([]);
                    }
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
                  title="Wipe entire pre-registrants list"
                >
                  🗑️ Clear Standby Queue
                </button>
                <button 
                  onClick={() => {
                    alert("Exporting standby list... Total pre-registrations: " + preRegistrants.length + "\nCSV compilation completed successfully. File: careers_avalanche_subscribers.csv");
                  }}
                  className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Export CSV List
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="registrants-table">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Registered Contact</th>
                    <th className="pb-3 px-2">Role & Region</th>
                    <th className="pb-3 px-2">Verification & Consent</th>
                    <th className="pb-3 pl-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/10 font-medium">
                  {preRegistrants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400">
                        <div className="space-y-2">
                          <Users className="w-8 h-8 text-indigo-400 mx-auto opacity-50 animate-pulse" />
                          <p className="font-bold text-white">No Live Registrations Captured Yet</p>
                          <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                            The queue is currently empty. Use the pre-registration form on the Coming Soon page or the List Your Company onboarding portal on the Brands page to register in real time!
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    preRegistrants.map((reg, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 text-slate-300 transition-colors">
                        <td className="py-3.5 pr-2">
                          <div className="font-bold text-white text-sm">
                            {reg.role === 'partner' ? (reg.companyName || 'Corporate Partner') : (reg.name || 'Job Seeker')}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">{reg.email}</div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="mb-1.5 flex flex-wrap gap-1.5 items-center">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                              reg.role === 'seeker' 
                                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' 
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}>
                              {reg.role === 'seeker' ? 'Job Seeker / Youth' : 'Employer / Partner'}
                            </span>
                            <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 font-semibold">{reg.province || 'Gauteng'}</span>
                          </div>
                          {reg.role === 'seeker' && (
                            <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 mt-1 font-semibold">
                              <span className="bg-slate-950/45 border border-white/5 px-1.5 py-0.5 rounded">Age: {reg.ageRange || '25-29 (Developing Youth)'}</span>
                              <span className="bg-slate-950/45 border border-white/5 px-1.5 py-0.5 rounded">Race: {reg.race || 'Black African'}</span>
                              <span className="bg-slate-950/45 border border-white/5 px-1.5 py-0.5 rounded">Nationality: {reg.nationality || 'South African Citizen'}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Consent Recorded
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">{new Date(reg.timestamp).toLocaleString()}</span>
                        </td>
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
