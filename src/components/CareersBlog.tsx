import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  ArrowLeft, 
  Share2, 
  Plus, 
  CheckCircle2, 
  FileText,
  Briefcase,
  Heart,
  Globe,
  Compass
} from 'lucide-react';
import { AppView } from '../types';
import Footer from './Footer';

interface CareersBlogProps {
  onNavigate: (view: AppView) => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: 'Future Work' | 'Technology' | 'Career Guidance' | 'Partnerships' | 'Industry Updates';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  snippet: string;
  content: string[];
  likes: number;
}

export default function CareersBlog({ onNavigate }: CareersBlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // Custom partner contributor form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Future Work' | 'Technology' | 'Career Guidance' | 'Partnerships' | 'Industry Updates'>('Partnerships');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newContent, setNewContent] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Initial rich set of high-relevance blog articles focused on Careers Avalanche and SA industry partnerships
  const [articles, setArticles] = useState<BlogPost[]>([
    {
      id: 'b1',
      title: "Navigating the 4th Industrial Revolution: A South African Youth Perspective",
      category: "Future Work",
      readTime: "5 min read",
      date: "June 28, 2026",
      author: "Naledi Dlamini",
      authorRole: "Lead Talent Strategist at Careers Avalanche",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
      snippet: "How the rapid growth of digital tools and automation presents a unique leapfrogging opportunity for young professionals across Africa.",
      content: [
        "In the rapidly changing landscape of the global economy, South African youth stand at a historic crossroads. The 4th Industrial Revolution (4IR) is not just a buzzword—it is actively reshaping how regional businesses recruit, onboard, and retain high-potential talent.",
        "Traditional entry-level roles are being enhanced by automated workflows, prompting a heavy shift in what employers define as 'baseline competence'. Today, digital literacy combined with proctored scenario reasoning acts as the absolute gold standard for corporate integration.",
        "Through modular platforms like LearnWinGrow's 'The Paradigm', candidates can master Google Workspace, prompt engineering, and no-code builders. This allows local youth to bypass traditional Multi-Year training barriers, directly linking verified skills to standard enterprise requirements.",
        "The key to unlocking this potential is standardized, proctored digital diagnostics that prove competence to high-growth sectors such as Fintech, Agritech, and Renewable Energy. By leapfrogging legacy systems, South Africa is positioned to export high-tier digital services globally."
      ],
      likes: 42
    },
    {
      id: 'b2',
      title: "The Rise of Low-Code/No-Code: Building Enterprise Solutions with Minimal Code",
      category: "Technology",
      readTime: "4 min read",
      date: "June 25, 2026",
      author: "Themba Khumalo",
      authorRole: "Head of Digital Curriculum at LearnWinGrow",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
      snippet: "Discover how non-technical founders and workers are utilizing modern workflow builders to deploy commercial MVPs in days rather than months.",
      content: [
        "The democratization of technology is one of the most exciting trends of this decade. Across Gauteng, Cape Town, and Durban, a new class of digital builders is emerging—one that does not write thousands of lines of syntax, but instead designs high-performing visual apps.",
        "Low-code and no-code tools are transforming traditional corporate infrastructure. Instead of waiting months for IT departments to build simple database trackers or customer portals, marketing and operations professionals can wire secure pipelines within an afternoon.",
        "For South African candidates entering the workforce, proficiency in no-code architectures is highly prized. Employers such as Vertex Global and Nova Green are actively seeking individuals who can design internal automation flows, optimize client intakes, and visually model key metrics.",
        "Our curriculum inside The Paradigm focuses strictly on real-world applications of these tools, ensuring our tested candidates are immediately capable of automating legacy business pipelines."
      ],
      likes: 38
    },
    {
      id: 'b3',
      title: "Acing the Aptitude Test: Strategic Mindsets for Critical Thinkers",
      category: "Career Guidance",
      readTime: "6 min read",
      date: "June 20, 2026",
      author: "Sarah Jenkins",
      authorRole: "Senior Recruiter at Vertex Global Finance",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
      snippet: "Our top recruiters break down the mental framework required to answer complex, scenario-based logical and critical reasoning questions.",
      content: [
        "Aptitude testing remains a major hurdle for many young graduates seeking placement at blue-chip firms. In many cases, it is not a lack of innate intelligence that holds applicants back, but rather a lack of familiarity with strategic scenario-based logic.",
        "Modern cognitive tests do not measure pure memorization. Instead, they test your ability to adapt to volatile data inputs, identify operational bottlenecks, and maintain high ethical standards under strict deadlines.",
        "In this article, we outline three key mental models to master before sitting for the Careers Avalanche Diagnostic test: First, practice active structured thinking—break complex paragraphs into individual logical statements. Second, read the scenario constraints carefully before answering. Third, maintain high pacing—if a question is taking over two minutes, mark your best guess and move on.",
        "LearnWinGrow's standardized scoring lets you see exactly where you stand in Logical Reasoning, Digital Tools, and Agile Mindsets, helping you shore up key weaknesses before employers review your profile."
      ],
      likes: 67
    },
    {
      id: 'b4',
      title: "LearnWinGrow & Careers Avalanche Forge Strategic Alliances with Top Assessment Boards",
      category: "Partnerships",
      readTime: "5 min read",
      date: "June 18, 2026",
      author: "Julian de Wet",
      authorRole: "Director of Partnerships at LearnWinGrow Africa",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
      snippet: "We are officially linking our testing credentials with leading global assessment federations to provide internationally proctored certificates.",
      content: [
        "We are thrilled to announce that LearnWinGrow Africa has signed mutual recognition agreements with prominent professional assessment organizations and industry certification boards.",
        "This partnership guarantees that every candidate who scores above 75% on the Careers Avalanche Diagnostic Assessment receives a proctored micro-credential that is fully verified and recognizable by international auditing and recruitment frameworks.",
        "Additionally, we are partnering with regional corporate giants to load real-time employment demand criteria directly into our backend matching algorithms. This ensures that when a company seeks a digital specialist in Western Cape, they instantly locate candidates who have validated those specific modules.",
        "For companies looking to scale their CSR and digital transformation programs, our unified pipeline provides a friction-free gateway to certified, high-potential South African youth."
      ],
      likes: 94
    },
    {
      id: 'b5',
      title: "Renewable Energy Sector: The Emerging Giant of SA Youth Placements",
      category: "Industry Updates",
      readTime: "3 min read",
      date: "June 12, 2026",
      author: "Adnan Maseko",
      authorRole: "Energy Transition Lead at Nova Green Systems",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
      snippet: "With the scaling of microgrids and private solar initiatives, green enterprises are hiring digital operations specialists at an unprecedented rate.",
      content: [
        "South Africa's energy transition is opening up substantial new avenues for vocational and professional employment. As private solar initiatives and localized microgrids scale across agricultural sectors, the demand for operations personnel is skyrocketing.",
        "These roles do not just require traditional electrical engineering. In fact, the largest labor bottlenecks are in digital asset monitoring, regional logistics pipelines, and localized data analytics.",
        "Young professionals who possess a strong command of Google Sheets, light database structures, and collaborative tools are ideally suited to coordinate these microgrid deployments. We are proud to work alongside Careers Avalanche to target our next batch of operations trainees directly from their top-tier assessment tier."
      ],
      likes: 51
    }
  ]);

  const categories = ['All', 'Future Work', 'Technology', 'Career Guidance', 'Partnerships', 'Industry Updates'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedArticles.includes(id)) {
      setLikedArticles(likedArticles.filter(item => item !== id));
      setArticles(articles.map(art => art.id === id ? { ...art, likes: art.likes - 1 } : art));
    } else {
      setLikedArticles([...likedArticles, id]);
      setArticles(articles.map(art => art.id === id ? { ...art, likes: art.likes + 1 } : art));
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent || !newSnippet) {
      alert("Please fill in all fields before publishing.");
      return;
    }

    const newPost: BlogPost = {
      id: 'b_custom_' + Date.now(),
      title: newTitle,
      category: newCategory,
      readTime: `${Math.max(2, Math.ceil(newContent.split(' ').length / 150))} min read`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: newAuthor,
      authorRole: newAuthorRole || "Company Partner Contributor",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
      snippet: newSnippet,
      content: newContent.split('\n\n').filter(p => p.trim() !== ''),
      likes: 0
    };

    setArticles([newPost, ...articles]);
    setPublishSuccess(true);
    
    // Clear form
    setNewTitle('');
    setNewAuthor('');
    setNewAuthorRole('');
    setNewSnippet('');
    setNewContent('');

    setTimeout(() => {
      setPublishSuccess(false);
      setShowAddForm(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500 selection:text-white" id="blog-root">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white" id="blog-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="blog-logo-link">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              LW
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">LearnWinGrow</span>
              <span className="text-indigo-300 font-semibold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" id="blog-nav-links">
            <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('assessment')} className="hover:text-white transition-colors">Tests</button>
            <button onClick={() => onNavigate('brands')} className="hover:text-white transition-colors">Brands</button>
            <button onClick={() => onNavigate('blog')} className="text-indigo-300 font-semibold hover:text-indigo-200 transition-colors">Blog</button>
            <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">Admin Portal</button>
          </nav>

          <div className="flex items-center gap-3" id="blog-header-ctas">
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-indigo-400" /> Share Partner Update
            </button>
            <button 
              onClick={() => onNavigate('assessment')} 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/20 hover:brightness-110 transition-all"
            >
              Take Test
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="blog-main-content">
        
        <AnimatePresence mode="wait">
          {!activeArticle ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Blog Title & Partner Banner */}
              <section className="text-center md:text-left space-y-4" id="blog-intro">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  <BookOpen className="w-3.5 h-3.5" /> Careers Avalanche Knowledge Hub
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Insights, Partnerships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SA Labor Updates</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Welcome to the Careers Avalanche Blog. Explore expert guidance on digital skills acceleration, corporate partnership milestones with verified certification boards, and live economic announcements tailored to the emerging South African youth workforce.
                </p>
              </section>

              {/* Collaborative Partner & Afrihost Domain Meta-Widget */}
              <section className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 p-6 sm:p-8 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-xl" id="afrihost-meta-widget">
                <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color-dodge"></div>
                <div className="relative grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Registered Corporate Domain Portal</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Active GTM Strategy & Production Domains</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      LearnWinGrow Africa is a registered entity operating under domain <span className="font-extrabold text-indigo-300 underline">www.learwingrow.africa</span>. 
                      Our youth workforce assessment arm is deployed at <span className="font-extrabold text-purple-300 underline">www.careersavalanche.co.za</span>. 
                      Both domains are fully hosted via Afrihost DNS nodes.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md">Hosting: Afrihost Ltd.</span>
                      <span className="bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md">Status: DNS Configured</span>
                      <span className="bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-md">Partnership Registry: Enabled</span>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                    <button 
                      onClick={() => alert("Redirecting to Partnership Proposal Briefing deck. Ideal for potential corporate and assessment partners.")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" /> Partner Proposal Brief
                    </button>
                    <button 
                      onClick={() => alert("Loading Assessment API Integration Schema documentation.")}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Assessment API Link
                    </button>
                  </div>
                </div>
              </section>

              {/* Publisher Contributor Form Modal / Section */}
              <AnimatePresence>
                {showAddForm && (
                  <motion.section 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md overflow-hidden space-y-6 shadow-2xl"
                    id="contributor-form"
                  >
                    <div className="border-b border-white/10 pb-4">
                      <h3 className="text-lg font-black text-white">Share a Corporate Update or Partnership Announcement</h3>
                      <p className="text-xs text-slate-400">Load relevant corporate milestones, hiring logs, or update notices directly to the Careers Avalanche Blog.</p>
                    </div>

                    {publishSuccess ? (
                      <div className="py-8 text-center space-y-3">
                        <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Announcement Published Successfully!</h4>
                        <p className="text-xs text-slate-300">Your live partner article has been injected at the top of the Careers Avalanche network feed.</p>
                      </div>
                    ) : (
                      <form onSubmit={handlePublish} className="space-y-4 text-xs font-semibold">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Announcement / Article Title</label>
                            <input 
                              type="text"
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder="e.g. Careers Avalanche Links Assessment API with National Testing Boards"
                              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Category Classification</label>
                            <select 
                              value={newCategory}
                              onChange={(e: any) => setNewCategory(e.target.value)}
                              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs"
                            >
                              <option value="Partnerships">Partnerships & Alliances</option>
                              <option value="Industry Updates">Industry Updates</option>
                              <option value="Future Work">Future Work Insights</option>
                              <option value="Technology">Technology & Tools</option>
                              <option value="Career Guidance">Career Guidance</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Author Name / Corporate Representative</label>
                            <input 
                              type="text"
                              value={newAuthor}
                              onChange={(e) => setNewAuthor(e.target.value)}
                              placeholder="e.g. Sarah van der Merwe"
                              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Author Role or Company Title</label>
                            <input 
                              type="text"
                              value={newAuthorRole}
                              onChange={(e) => setNewAuthorRole(e.target.value)}
                              placeholder="e.g. Talent Acquisition Lead at EcoPower SA"
                              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Short Summary / Snippet (1-2 sentences)</label>
                          <input 
                            type="text"
                            value={newSnippet}
                            onChange={(e) => setNewSnippet(e.target.value)}
                            placeholder="Briefly state the core objective or update of this publication..."
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Full Content Body (Use double enters to create paragraphs)</label>
                          <textarea 
                            rows={5}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Enter the full press release, update narrative, or educational insights. This will be beautifully formatted for readers."
                            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-slate-200 outline-none focus:border-indigo-500 text-xs font-normal"
                            required
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                          <button 
                            type="button" 
                            onClick={() => setShowAddForm(false)}
                            className="bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/10"
                          >
                            Publish Announcement
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Filtering & Searching Controls */}
              <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md" id="blog-search-filters">
                <div className="flex flex-wrap gap-1.5" id="blog-categories">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative max-w-sm w-full" id="blog-search-box">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search articles & authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-250 outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </section>

              {/* Articles Grid */}
              <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-grid">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art) => (
                    <article 
                      key={art.id} 
                      onClick={() => {
                        setActiveArticle(art);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer group"
                      id={`article-card-${art.id}`}
                    >
                      <div className="relative h-48 bg-white/5 shrink-0 overflow-hidden">
                        <img 
                          src={art.image} 
                          alt={art.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-indigo-300 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-white/10 shadow-sm">
                          {art.category}
                        </span>
                      </div>
                      
                      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {art.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
                          </div>
                          
                          <h4 className="font-extrabold text-base text-white leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                          
                          <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                            {art.snippet}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]" id="article-card-meta">
                          <span className="text-slate-400 flex items-center gap-1 font-bold">
                            <User className="w-3 h-3 text-indigo-400" /> {art.author.split(' ')[0]}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => handleLike(art.id, e)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-bold transition-colors ${
                                likedArticles.includes(art.id)
                                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${likedArticles.includes(art.id) ? 'fill-rose-400' : ''}`} /> {art.likes}
                            </button>
                            <span className="text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                              Read <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center space-y-3" id="no-articles-found">
                    <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="font-bold text-white text-base">No matching articles found</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">Try resetting your filters or modifying your search keyword to view other Careers Avalanche announcements.</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="text-xs font-bold text-indigo-300 hover:underline"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </section>

              {/* Call to action for potential partners */}
              <section className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto text-center relative overflow-hidden" id="blog-cta-partners">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-40"></div>
                <div className="relative space-y-4 max-w-2xl mx-auto">
                  <h3 className="text-xl font-black text-white">Join the Careers Avalanche Partner Network</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Are you a South African business, recruitment expert, or a verified professional assessment agency? 
                    Get in touch to publish local opportunities, connect assessment engines, and tap into our pool of pre-screened, certified youth.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button 
                      onClick={() => alert("Launching partnership inquiries portal. Support email: partnerships@learnwingrow.africa")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md"
                    >
                      Contact Partnerships Office
                    </button>
                    <button 
                      onClick={() => onNavigate('brands')}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs px-5 py-3 rounded-xl transition-all"
                    >
                      View Current Brands
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="article-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto space-y-8"
              id="article-detail-view"
            >
              {/* Back Button */}
              <button 
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold transition-colors"
                id="btn-back-to-blog"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Careers Avalanche Blog
              </button>

              {/* Featured Header */}
              <div className="space-y-4" id="article-header">
                <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-md">
                  {activeArticle.category}
                </span>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  {activeArticle.title}
                </h1>

                {/* Author Info & Date */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-white/10 py-4" id="article-author-info">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs text-white border border-white/10">
                      {activeArticle.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-white block">{activeArticle.author}</span>
                      <span className="text-xs text-slate-400 block">{activeArticle.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-slate-400 font-semibold font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Featured Large Image */}
              <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5" id="article-large-image">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Snippet Introduction Block */}
              <div className="bg-white/5 border-l-4 border-indigo-500 p-5 rounded-r-2xl italic text-slate-200 text-sm sm:text-base leading-relaxed" id="article-quote-introduction">
                "{activeArticle.snippet}"
              </div>

              {/* Formatted Paragraphs */}
              <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed" id="article-paragraphs">
                {activeArticle.content.map((para, pIdx) => (
                  <p key={pIdx} className="font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {/* Strategic Takeaway Highlight (GTM alignment) */}
              <div className="bg-gradient-to-tr from-indigo-950/20 to-purple-950/20 border border-white/10 p-6 rounded-2xl space-y-4" id="strategic-takeaways">
                <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Careers Avalanche GTM Framework
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  This update aligns with our primary Go-To-Market strategy. By coupling our educational portal (<strong>LearnWinGrow Africa</strong>) with verified assessment directories (<strong>Careers Avalanche</strong>) and deploying DNS solutions on secure <strong>Afrihost</strong> networks, we create high-conversion pipelines for local partners.
                </p>
              </div>

              {/* Footer Engagement Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10" id="article-engagement-bar">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => handleLike(activeArticle.id, e)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                      likedArticles.includes(activeArticle.id)
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedArticles.includes(activeArticle.id) ? 'fill-rose-400' : ''}`} /> Like Update ({activeArticle.likes})
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Article link copied to clipboard! Share it with your professional network.");
                    }}
                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
                    title="Share Article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => setActiveArticle(null)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  Return to Blog
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
}
