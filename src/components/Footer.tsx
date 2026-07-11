import React from 'react';
import { Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-white/5 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 overflow-hidden text-slate-300 font-sans" id="global-footer">
      {/* Dynamic decorative backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="space-y-4" id="footer-brand-col">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                LW
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight block leading-none">LearnWinGrow</span>
                <span className="text-indigo-300 font-bold text-[10px] tracking-wider uppercase">Africa</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Empowering South African youth through proctored diagnostics, verified digital skills portfolios, and automated corporate placement pipelines.
            </p>
            <div className="text-[10px] text-slate-500 space-y-1">
              <p>LearnWinGrow Africa (Pty) Ltd.</p>
              <p>Careers Avalanche Registered Brand.</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4" id="footer-links-col">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-indigo-500 pl-2">
              Platform Directory
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white hover:underline transition-colors">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white hover:underline transition-colors">
                  Talent Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assessment')} className="hover:text-white hover:underline transition-colors">
                  Aptitude Assessments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brands')} className="hover:text-white hover:underline transition-colors">
                  Employer Brand Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-indigo-300 hover:text-indigo-200 hover:underline transition-colors flex items-center gap-1">
                  Careers Avalanche Blog <span className="bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">News</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Domain & Afrihost DNS column */}
          <div className="space-y-4" id="footer-domains-col">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-purple-500 pl-2">
              Corporate Domains
            </h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Official Portal</span>
                <a 
                  href="https://www.learnwingrow.africa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white hover:text-indigo-300 font-extrabold flex items-center gap-1 transition-colors"
                >
                  www.learnwingrow.africa <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Assessment Hub</span>
                <a 
                  href="https://www.careersavalanche.co.za" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-white hover:text-purple-300 font-extrabold flex items-center gap-1 transition-colors"
                >
                  www.careersavalanche.co.za <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
              <div className="bg-slate-900/60 border border-white/5 p-2 rounded-xl text-[10px] text-slate-400">
                <span className="font-bold text-white block mb-0.5">DNS & CDN Hosting</span>
                Managed & hosted securely on Afrihost enterprise DNS nodes.
              </div>
            </div>
          </div>

          {/* Contact & Socials column */}
          <div className="space-y-4" id="footer-contact-col">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
              Official Headquarters
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Regus Office Park,<br />
                  6 Kikuyu Road, Sunninghill,<br />
                  2157, South Africa
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:info@learnwingrow.africa" className="hover:text-white hover:underline">
                    info@learnwingrow.africa
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <a href="mailto:talent@careersavalanche.co.za" className="hover:text-white hover:underline text-indigo-300 font-bold">
                    talent@careersavalanche.co.za
                  </a>
                </div>
              </div>

              {/* Social Media Row */}
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Connect With Us</span>
                <div className="flex items-center gap-2.5">
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/2711000000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-[#10b981] hover:text-white rounded-xl border border-emerald-500/20 hover:scale-105 transition-all"
                    title="WhatsApp Careers Line"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/Careersavalanche" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-blue-600/10 hover:bg-blue-600/20 text-[#3b82f6] hover:text-white rounded-xl border border-blue-500/20 hover:scale-105 transition-all"
                    title="Careersavalanche Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/learnwingrow" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-[#ec4899] hover:text-white rounded-xl border border-pink-500/20 hover:scale-105 transition-all"
                    title="Instagram Profile"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a 
                    href="https://x.com/learnwingrow" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 hover:scale-105 transition-all"
                    title="X (Twitter) Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/company/learnwingrow-africa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-[#0077b5] hover:text-white rounded-xl border border-blue-500/20 hover:scale-105 transition-all"
                    title="LinkedIn Professional Network"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>© 2026 LearnWinGrow Africa (Pty) Ltd.</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Reg No: 2024/559030/07</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">GTM Registry Code: LWG-SA-2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
