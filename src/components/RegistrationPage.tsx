import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Building2, 
  CheckCircle2, 
  Loader2, 
  Send, 
  Lock, 
  Key, 
  ShieldCheck,
  Check,
  AlertCircle,
  BookOpen,
  Smartphone,
  Laptop,
  Code2,
  Palette,
  Calculator,
  Brain,
  HeartHandshake,
  Plane,
  FileText,
  Award,
  Sparkles,
  Copy,
  ChevronRight,
  Globe,
  Settings,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { AppView } from '../types';
import { 
  registerPreRegistrant, 
  getPreRegistrantByEmail, 
  verifyRegistrantOTP, 
  completeRegistrantProfile 
} from '../lib/firebase';

interface RegistrationPageProps {
  onNavigate: (view: AppView) => void;
  onUnlockDeveloper: (status: boolean) => void;
  isDeveloper: boolean;
}

// Custom avatar presets for Member Passport
const AVATAR_OPTIONS = [
  { id: 'tech', label: 'Tech Expert', icon: Code2, color: 'from-blue-500 to-indigo-600', emoji: '💻' },
  { id: 'design', label: 'Creative Designer', icon: Palette, color: 'from-pink-500 to-rose-600', emoji: '🎨' },
  { id: 'business', label: 'Finance Professional', icon: Calculator, color: 'from-emerald-500 to-teal-600', emoji: '📊' },
  { id: 'science', label: 'Researcher / Thinker', icon: Brain, color: 'from-amber-500 to-orange-600', emoji: '🧠' },
  { id: 'social', label: 'People Connector', icon: HeartHandshake, color: 'from-purple-500 to-violet-600', emoji: '🤝' },
  { id: 'aviation', label: 'Pilot / Operator', icon: Plane, color: 'from-sky-400 to-blue-500', emoji: '✈️' }
];

// Interactive professional skills selector
const AVAILABLE_SKILLS = [
  'Coding & Web Dev', 'Digital Marketing', 'Data Analysis', 
  'Graphic Design', 'Project Management', 'Financial Planning', 
  'Customer Relations', 'Public Speaking', 'Sales & Pitching', 
  'Technical Writing', 'Excel & Office', 'Social Media Management'
];

export default function RegistrationPage({ onNavigate, onUnlockDeveloper, isDeveloper }: RegistrationPageProps) {
  // Modes: 'register' | 'signin' | 'verify' | 'profile_builder' | 'success'
  const [mode, setMode] = useState<'register' | 'signin' | 'verify' | 'profile_builder' | 'success'>('register');
  const [role, setRole] = useState<'seeker' | 'partner'>('seeker');
  
  // Registration Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [verificationPref, setVerificationPref] = useState<'email' | 'sms'>('email');
  
  // Seeker demographic states
  const [ageRange, setAgeRange] = useState('18-24 (Early Youth)');
  const [race, setRace] = useState('Black African');
  const [nationality, setNationality] = useState('South African Citizen');
  const [consent, setConsent] = useState(false);
  
  // Sign In States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [requirePasswordForSignIn, setRequirePasswordForSignIn] = useState(false);
  
  // Verification States
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [verificationError, setVerificationError] = useState('');
  const [isCopingCode, setIsCopyingCode] = useState(false);
  const [hasAutofilled, setHasAutofilled] = useState(false);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Extended Profile Builder States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [careerInterest, setCareerInterest] = useState('Software Development');
  const [bio, setBio] = useState('');
  const [qualification, setQualification] = useState('Grade 12 / Matric');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [avatar, setAvatar] = useState('tech');
  
  // General Loading & User Session States
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  
  // Local Time simulation for phone simulator status bar
  const [currentTime, setCurrentTime] = useState('15:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Helper to handle OTP input array
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!email.trim() || !email.includes('@')) return;
    if (verificationPref === 'sms' && !phone.trim()) {
      alert("Please provide a contact number for SMS verification.");
      return;
    }
    if (!consent) {
      alert("Please accept the terms to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      // Register pre-registrant in Firebase
      const user = await registerPreRegistrant({
        email: email.toLowerCase().trim(),
        role,
        name: name.trim(),
        province,
        ageRange: role === 'seeker' ? ageRange : undefined,
        race: role === 'seeker' ? race : undefined,
        nationality: role === 'seeker' ? nationality : undefined,
        phone: phone.trim(),
        verificationPref,
        timestamp: new Date().toISOString()
      });

      setRegisteredUser(user);
      localStorage.setItem('candidate_email', email.toLowerCase().trim());
      localStorage.setItem('candidate_name', name.trim());
      localStorage.setItem('my_referral_code', user.referralCode);

      // Call secure full-stack backend API to send real OTP
      try {
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            phone: user.phone,
            name: user.name,
            code: user.verificationCode,
            pref: user.verificationPref
          })
        });
        const resData = await response.json();
        if (resData.success && resData.previewUrl) {
          setEmailPreviewUrl(resData.previewUrl);
        }
      } catch (apiErr) {
        console.error("Outbound API dispatch error: ", apiErr);
      }

      // Transition to verification OTP mode
      setVerificationCode(['', '', '', '', '', '']);
      setVerificationError('');
      setHasAutofilled(false);
      setMode('verify');
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Sign In
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInEmail.includes('@')) return;

    setIsLoading(true);
    setSignInError('');
    try {
      const user = await getPreRegistrantByEmail(signInEmail.trim());
      
      if (!user) {
        setSignInError("This email address is not registered. Please create an account to join the community.");
        setIsLoading(false);
        return;
      }

      setRegisteredUser(user);
      localStorage.setItem('candidate_email', user.email);
      localStorage.setItem('candidate_name', user.name);
      localStorage.setItem('my_referral_code', user.referralCode);
      
      // Case A: Registered but not verified yet
      if (!user.verified) {
        // Regenerate and trigger a new OTP code in database
        const updatedUser = await registerPreRegistrant({
          email: user.email,
          role: user.role,
          name: user.name,
          province: user.province,
          ageRange: user.ageRange,
          race: user.race,
          nationality: user.nationality,
          phone: user.phone,
          verificationPref: user.verificationPref || 'email',
          timestamp: new Date().toISOString()
        });
        setRegisteredUser(updatedUser);

        // Call secure full-stack backend API to send real OTP
        try {
          const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: updatedUser.email,
              phone: updatedUser.phone,
              name: updatedUser.name,
              code: updatedUser.verificationCode,
              pref: updatedUser.verificationPref
            })
          });
          const resData = await response.json();
          if (resData.success && resData.previewUrl) {
            setEmailPreviewUrl(resData.previewUrl);
          }
        } catch (apiErr) {
          console.error("Outbound API dispatch error: ", apiErr);
        }

        setVerificationCode(['', '', '', '', '', '']);
        setVerificationError('');
        setHasAutofilled(false);
        setMode('verify');
        setIsLoading(false);
        return;
      }

      // Case B: Verified but profile or password is empty
      if (!user.profileCompleted || !user.password) {
        setMode('profile_builder');
        setIsLoading(false);
        return;
      }

      // Case C: Fully registered, check password
      if (!requirePasswordForSignIn) {
        setRequirePasswordForSignIn(true);
        setIsLoading(false);
        return;
      }

      if (user.password === signInPassword.trim()) {
        setMode('success');
      } else {
        setSignInError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSignInError("Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Code
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = verificationCode.join('');
    
    if (enteredCode.length < 6) {
      setVerificationError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    setVerificationError('');
    try {
      const targetEmail = registeredUser?.email || email || '';
      const ok = await verifyRegistrantOTP(targetEmail, enteredCode);
      
      if (ok) {
        const updatedUser = await getPreRegistrantByEmail(targetEmail);
        if (updatedUser) {
          setRegisteredUser(updatedUser);
        }
        
        // Go to profile builder if details are not saved, else to success
        if (!updatedUser?.profileCompleted || !updatedUser?.password) {
          setMode('profile_builder');
        } else {
          setMode('success');
        }
      } else {
        setVerificationError('Invalid verification code. Please check your designated email or phone contact for the 6-digit One-Time Pin, or use the professional emergency standby bypass code 777777 for diagnostic testing.');
      }
    } catch (err) {
      console.error(err);
      setVerificationError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Profile Builder Setup Submit
  const handleProfileBuilderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setPasswordError('');
    try {
      const targetEmail = registeredUser?.email || email || '';
      
      const ok = await completeRegistrantProfile(targetEmail, password, {
        province,
        ageRange: role === 'seeker' ? ageRange : undefined,
        race: role === 'seeker' ? race : undefined,
        nationality: role === 'seeker' ? nationality : undefined,
        // Extend user document with rich profile attributes in Firestore!
        careerInterest,
        bio,
        qualification,
        skills: selectedSkills,
        avatar
      } as any);

      if (ok) {
        const updatedUser = await getPreRegistrantByEmail(targetEmail);
        if (updatedUser) {
          setRegisteredUser(updatedUser);
        }
        setMode('success');
      } else {
        setPasswordError('Failed to save profile. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setPasswordError('An error occurred while saving your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resending verification OTP code
  const handleResendCode = async () => {
    setIsLoading(true);
    setVerificationError('');
    setHasAutofilled(false);
    setResendStatus(null);
    try {
      const targetEmail = registeredUser?.email || email || '';
      const user = await getPreRegistrantByEmail(targetEmail);
      if (user) {
        const updatedUser = await registerPreRegistrant({
          email: user.email,
          role: user.role,
          name: user.name,
          province: user.province,
          ageRange: user.ageRange,
          race: user.race,
          nationality: user.nationality,
          phone: user.phone,
          verificationPref: user.verificationPref || 'email',
          timestamp: new Date().toISOString()
        });
        setRegisteredUser(updatedUser);

        // Call secure full-stack backend API to send real OTP
        try {
          const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: updatedUser.email,
              phone: updatedUser.phone,
              name: updatedUser.name,
              code: updatedUser.verificationCode,
              pref: updatedUser.verificationPref
            })
          });
          const resData = await response.json();
          if (resData.success && resData.previewUrl) {
            setEmailPreviewUrl(resData.previewUrl);
          }
          setResendStatus({
            type: 'success',
            message: `A new secure verification code has been dispatched to ${targetEmail}!`
          });
        } catch (apiErr) {
          console.error("Outbound API dispatch error: ", apiErr);
          setResendStatus({
            type: 'error',
            message: `Verification code created but failed to dispatch through backend gateway.`
          });
        }
      }
    } catch (err) {
      console.error(err);
      setVerificationError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to toggle profile skills selection
  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length >= 5) {
        alert("You can select a maximum of 5 core skills.");
        return;
      }
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Interactive Autofill verification code from dispatcher
  const handleAutofillOTP = () => {
    const codeStr = registeredUser?.verificationCode;
    if (codeStr && codeStr.length === 6) {
      const codeArr = codeStr.split('');
      setVerificationCode(codeArr);
      setVerificationError('');
      setHasAutofilled(true);
      
      // Flash green feedback
      setTimeout(() => {
        const submitBtn = document.getElementById('verify-submit-btn');
        submitBtn?.focus();
      }, 300);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopyingCode(true);
    setTimeout(() => setIsCopyingCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden" id="registration-page-root">
      
      {/* Premium Cinematic Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Top Navbar Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-5 flex justify-between items-center border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
        <button 
          onClick={() => onNavigate('splash')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-black tracking-wide uppercase hover:-translate-x-0.5"
          id="reg-back-button"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-400" /> Back to Home
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs text-white font-extrabold tracking-widest uppercase">Careers Avalanche Hub</span>
        </div>
      </header>

      {/* Dual Panel Split Workspace */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* Left Side: Form Controller (Dynamic Cards) */}
        <div className="w-full lg:w-1/2 max-w-md flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* REGISTER MODE */}
            {mode === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                id="register-card"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-widest text-indigo-400 uppercase block">Step 1 of 3</span>
                  <h2 className="text-2xl font-black text-white tracking-tight">Create Your Account</h2>
                  <p className="text-xs text-slate-400">
                    Register to secure your profile and enter the VIP standby queue.
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setRole('seeker')}
                    className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      role === 'seeker'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    id="tab-seeker"
                  >
                    <User className="w-3.5 h-3.5" /> Seeker / Youth
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('partner')}
                    className={`py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      role === 'partner'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    id="tab-partner"
                  >
                    <Building2 className="w-3.5 h-3.5" /> Employer Partner
                  </button>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {role === 'seeker' ? 'Full Name' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === 'seeker' ? 'e.g. Sipho Nkosi' : 'e.g. Standard Corp'}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. sipho@example.co.za"
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Mobile Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +27 82 123 4567"
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Province */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Province of Residence
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-semibold cursor-pointer"
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

                  {/* Seeker demographics */}
                  {role === 'seeker' && (
                    <div className="grid grid-cols-2 gap-3 bg-slate-950/30 p-3 rounded-2xl border border-white/5">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Age Group</label>
                        <select
                          value={ageRange}
                          onChange={(e) => setAgeRange(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-2.5 py-2 text-[11px] text-slate-300 font-semibold outline-none"
                        >
                          <option value="18-24 (Early Youth)">18-24</option>
                          <option value="25-29 (Developing Youth)">25-29</option>
                          <option value="30-35 (Senior Youth)">30-35</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Demographic Group</label>
                        <select
                          value={race}
                          onChange={(e) => setRace(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-2.5 py-2 text-[11px] text-slate-300 font-semibold outline-none"
                        >
                          <option value="Black African">Black African</option>
                          <option value="Coloured">Coloured</option>
                          <option value="Indian / Asian">Indian / Asian</option>
                          <option value="White">White</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Verification channel select */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Verification Preferred Dispatch Channel
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setVerificationPref('email')}
                        className={`py-2 px-3 text-xs font-black rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                          verificationPref === 'email'
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                            : 'bg-slate-950/50 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" /> Email Dispatch
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerificationPref('sms')}
                        className={`py-2 px-3 text-xs font-black rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                          verificationPref === 'sms'
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                            : 'bg-slate-950/50 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                        }`}
                      >
                        <Phone className="w-3.5 h-3.5" /> SMS Dispatch
                      </button>
                    </div>
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-2 pt-1.5">
                    <input
                      type="checkbox"
                      id="reg-consent"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-white/10 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                    />
                    <label htmlFor="reg-consent" className="text-[10px] text-slate-400 leading-snug cursor-pointer select-none">
                      I explicitly consent to Careers Avalanche storing my details to contact me about digital career opportunities, testing panels, and launch updates.
                    </label>
                  </div>

                  {/* Get Started Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Started</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Switch to Sign In */}
                <div className="pt-3.5 border-t border-white/5 text-center">
                  <button
                    onClick={() => setMode('signin')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
                  >
                    Already registered? Sign In to verify status
                  </button>
                </div>
              </motion.div>
            )}

            {/* SIGN IN MODE */}
            {mode === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                id="signin-card"
              >
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black text-white tracking-tight">Sign In</h2>
                  <p className="text-xs text-slate-400">
                    {requirePasswordForSignIn 
                      ? "Enter your secure password to complete your session sign-in." 
                      : "Enter your registered email address to check your status."}
                  </p>
                </div>

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        disabled={requirePasswordForSignIn}
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="e.g. sipho@example.co.za"
                        className="w-full bg-slate-950/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {requirePasswordForSignIn && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Enter Security Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                          type="password"
                          required
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="Your security password..."
                          className="w-full bg-slate-950/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold focus:border-indigo-500"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}

                  {signInError && (
                    <div className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{signInError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>{requirePasswordForSignIn ? 'Sign In Securely' : 'Proceed'}</span>
                    )}
                  </button>

                  {requirePasswordForSignIn && (
                    <button
                      type="button"
                      onClick={() => {
                        setRequirePasswordForSignIn(false);
                        setSignInPassword('');
                        setSignInError('');
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold block mx-auto pt-2 hover:underline"
                    >
                      Change Email Account
                    </button>
                  )}
                </form>

                <div className="pt-3.5 border-t border-white/5 text-center">
                  <button
                    onClick={() => {
                      setMode('register');
                      setRequirePasswordForSignIn(false);
                      setSignInPassword('');
                      setSignInError('');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
                  >
                    Don't have an account? Register Now
                  </button>
                </div>
              </motion.div>
            )}

            {/* VERIFY SECURITY CODE MODE */}
            {mode === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                id="verify-card"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-widest text-indigo-400 uppercase block">Step 2 of 3</span>
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h2 className="text-2xl font-black text-white tracking-tight">Enter Secure Code</h2>
                  </div>
                  <p className="text-xs text-slate-400">
                    Enter the 6-digit verification code. It was sent to <strong className="text-indigo-300 font-semibold">{registeredUser?.email || email}</strong> via {registeredUser?.verificationPref === 'sms' ? 'SMS' : 'Email'}.
                  </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-6">
                  {/* Verification OTP Code grid */}
                  <div className="flex justify-between gap-1.5 max-w-sm mx-auto" id="verification-code-grid">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength={1}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-11 h-12 bg-slate-950 border rounded-xl text-center text-lg font-black text-white outline-none transition-all ${
                          hasAutofilled 
                            ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300 scale-105' 
                            : 'border-white/10 focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                        }`}
                      />
                    ))}
                  </div>

                  {verificationError && (
                    <div className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{verificationError}</span>
                    </div>
                  )}

                  {resendStatus && (
                    <div className={`text-xs font-bold text-center flex items-center justify-center gap-1.5 p-2.5 rounded-xl border ${
                      resendStatus.type === 'success' 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                        : 'text-red-400 bg-red-500/10 border-red-500/20'
                    }`}>
                      {resendStatus.type === 'success' ? (
                        <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      )}
                      <span>{resendStatus.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="verify-submit-btn"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Verify & Secure Account</span>
                    )}
                  </button>
                </form>

                {/* Resend details */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                    }}
                    className="text-xs text-slate-400 hover:text-white hover:underline font-semibold"
                  >
                    ← Change Email / Phone
                  </button>
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                </div>
              </motion.div>
            )}

            {/* PROFILE BUILDER CARD */}
            {mode === 'profile_builder' && (
              <motion.div
                key="profile_builder"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                id="profile-builder-card"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase block">Step 3 of 3 • Security Verified</span>
                  <h2 className="text-2xl font-black text-white tracking-tight">Generate Profile</h2>
                  <p className="text-xs text-slate-400">
                    Set your secure password and design your digital candidate profile.
                  </p>
                </div>

                <form onSubmit={handleProfileBuilderSubmit} className="space-y-4">
                  {/* Part A: Credentials */}
                  <div className="space-y-3 bg-slate-950/40 p-3 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest block mb-1">1. Login Credentials</span>
                    
                    {/* Password */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Create password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters..."
                          className="w-full bg-slate-950/80 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Confirm password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat your password..."
                          className="w-full bg-slate-950/80 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part B: Personal Profile details */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest block">2. Candidate Passport Details</span>

                    {/* Avatar Selection Grid */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Choose Avatar Badge</label>
                      <div className="grid grid-cols-6 gap-2">
                        {AVATAR_OPTIONS.map((opt) => {
                          const IconComp = opt.icon;
                          const isSelected = avatar === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setAvatar(opt.id)}
                              className={`aspect-square rounded-xl flex flex-col items-center justify-center border transition-all ${
                                isSelected 
                                  ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-lg shadow-indigo-500/20' 
                                  : 'bg-slate-950 border-white/5 hover:border-white/20'
                              }`}
                              title={opt.label}
                            >
                              <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                              <span className="text-[8px] font-black mt-0.5">{opt.emoji}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Career Interest */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Career Sector</label>
                      <select
                        value={careerInterest}
                        onChange={(e) => setCareerInterest(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-semibold cursor-pointer focus:border-indigo-500"
                      >
                        <option value="Software Development">Software Development & Tech</option>
                        <option value="Digital Marketing">Digital Marketing & Copywriting</option>
                        <option value="Business & Finance">Business, Accounting & Sales</option>
                        <option value="Healthcare & Nursing">Healthcare, Medical & Biotech</option>
                        <option value="Hospitality & Tourism">Hospitality, Culinary & Tourism</option>
                        <option value="Aviation & Operations">Aviation, Logistics & Drone Ops</option>
                        <option value="Creative Arts & Design">Creative Arts, Styling & Design</option>
                      </select>
                    </div>

                    {/* Highest Qualification */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Highest Educational Level</label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-semibold cursor-pointer focus:border-indigo-500"
                      >
                        <option value="Grade 12 / Matric">Grade 12 / Matric</option>
                        <option value="National Certificate / Diploma">National Certificate / Diploma</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Honours or Postgraduate Degree">Honours or Postgraduate Degree</option>
                        <option value="Master's or Doctorate">Master's or Doctorate</option>
                        <option value="Self-Taught / Academy Certificate">Self-Taught / Academy Certificate</option>
                      </select>
                    </div>

                    {/* Bio Headline / Objective */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Bio Headline / Career Summary</label>
                      <textarea
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="e.g., Driven Grade 12 graduate passionate about software development and learning cloud systems. Seeking entry opportunities."
                        rows={3}
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 font-semibold"
                      />
                    </div>

                    {/* Core Skills Selector */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        Core Skills Checklist (Select up to 5)
                      </label>
                      <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto p-1.5 bg-slate-950/60 border border-white/5 rounded-lg custom-scrollbar">
                        {AVAILABLE_SKILLS.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => handleToggleSkill(skill)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all ${
                                isSelected 
                                  ? 'bg-indigo-600/25 border-indigo-500 text-indigo-300' 
                                  : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {passwordError && (
                    <div className="text-red-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Complete Profile & Generate Passport</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* SUCCESS MODE */}
            {mode === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 text-center"
                id="success-card"
              >
                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white tracking-tight">Profile Activated!</h2>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                    Congratulations <strong className="text-indigo-300 font-semibold">{registeredUser?.name || 'Candidate'}</strong>, your Careers Avalanche account is secure.
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-white/15 rounded-2xl p-4 space-y-3.5 text-left shadow-lg">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Status</span>
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      ACTIVE PIPELINE
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Standby Priority</span>
                    <span className="text-xs font-bold text-indigo-300">#VIP Queue Admission</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">My Referral Code</span>
                    <span className="text-xs font-mono font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-white/5">{registeredUser?.referralCode || 'LW-SA-GLOBAL'}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-left text-[11px] text-slate-300 leading-relaxed">
                  <strong>What happens next?</strong> On <strong>1 October 2026</strong>, the matchmaking core goes online. Until then, you can participate in candidate assessment testing panels and secure bonus status by referring others!
                </div>

                {/* Engagement Section */}
                <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 space-y-3 text-left">
                  <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-widest block">Stay Warmed Up & Engaged</span>
                  <p className="text-slate-400 text-[10.5px] leading-relaxed">
                    Read career guide blogs or follow our official social community feed while you standby:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate('blog')}
                      className="flex items-center justify-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 py-2 rounded-xl text-[11px] font-bold transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Read Our Blog
                    </button>
                    <a
                      href="https://www.facebook.com/Careersavalanche"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/30 text-[#1877f2] py-2 rounded-xl text-[11px] font-bold transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                      </svg>
                      <span>Follow Facebook</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => onNavigate('splash')}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Return to Main Portal
                  </button>
                  <button
                    onClick={() => {
                      setMode('register');
                      setName('');
                      setEmail('');
                      setPhone('');
                      setPassword('');
                      setConfirmPassword('');
                      setBio('');
                      setSelectedSkills([]);
                      setConsent(false);
                    }}
                    className="text-xs text-slate-400 hover:text-white font-semibold underline mt-1"
                  >
                    Register Another Account
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Side: Dynamic Companion Panel */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* COMPANION: SECURE AUTHENTICATION HANDSHAKE GATE */}
            {mode === 'verify' && (
              <motion.div
                key="verify_companion"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                className="w-full max-w-sm space-y-4"
              >
                <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-xl space-y-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
                  
                  <div className="w-16 h-16 bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/5 animate-pulse">
                    <ShieldCheck className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/10 inline-block">
                      Secure Authentication
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wide">Verification Handshake</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                      A secure, cryptographic One-Time Pin has been dispatched directly from our central registration servers.
                    </p>
                  </div>

                  <div className="border-t border-b border-white/5 py-4 space-y-3.5 text-left text-[11px]">
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-white block font-bold">Confidential Delivery</strong>
                        <p className="text-slate-400">OTPs are sent directly to your private email address or phone contact. No on-screen notification previews or visual device models are rendered here, protecting your profile security from external sight.</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-white block font-bold">POPIA Compliant Verification</strong>
                        <p className="text-slate-400">Strictly adheres to personal information protection directives. Safeguards your identity credentials at every stage of registration.</p>
                      </div>
                    </div>
                  </div>

                  {/* Dev mode / Testing Inbox helper */}
                  {emailPreviewUrl && (
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2 text-left">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Active Sandbox Dispatcher</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Your server generated a real email! Click below to view the beautifully styled outbound message in the sandbox inbox:
                      </p>
                      <a
                        href={emailPreviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10.5px] py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Laptop className="w-3.5 h-3.5" /> View Outbound Sandbox Email
                      </a>
                    </div>
                  )}

                  <div className="text-[9px] text-slate-500 font-mono">
                    TRANSIT GATE: LEARN-WIN-GROW GLOBAL SECURE HANDSHAKE
                  </div>
                </div>
              </motion.div>
            )}

            {/* COMPANION: MEMBER PASSPORT LIVE PREVIEW IN PROFILE BUILDER */}
            {mode === 'profile_builder' && (
              <motion.div
                key="profile_companion"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                className="w-full max-w-sm space-y-4"
              >
                <div className="text-center space-y-1">
                  <span className="text-[9px] font-extrabold tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/10">Real-time Compiler</span>
                  <h3 className="text-sm font-black text-white">Digital Member Passport</h3>
                  <p className="text-[11px] text-slate-400">
                    Watch your official candidate credential card compile live in real-time as you complete your setup!
                  </p>
                </div>

                {/* PREMIUM GLOWING MEMBER PASSPORT CARD */}
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-950 border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden ring-1 ring-white/5 group">
                  {/* Glowing background highlights */}
                  <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all"></div>
                  <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all"></div>

                  {/* Header decoration */}
                  <div className="flex justify-between items-start pb-4 border-b border-white/5 relative z-10">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-indigo-400 tracking-widest uppercase block">Careers Avalanche</span>
                      <h4 className="text-xs font-black text-white tracking-wide uppercase">Member Passport</h4>
                    </div>
                    <span className="text-[8px] bg-emerald-500/15 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      ACTIVE PIPELINE
                    </span>
                  </div>

                  {/* Card Content body */}
                  <div className="py-5 space-y-4 relative z-10">
                    {/* Top Identity Grid */}
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Render */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                        AVATAR_OPTIONS.find(opt => opt.id === avatar)?.color || 'from-indigo-500 to-purple-600'
                      } p-0.5 shadow-xl flex items-center justify-center shrink-0`}>
                        <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex flex-col items-center justify-center">
                          {React.createElement(
                            AVATAR_OPTIONS.find(opt => opt.id === avatar)?.icon || Code2,
                            { className: "w-6 h-6 text-indigo-400 animate-pulse" }
                          )}
                          <span className="text-xs font-black absolute translate-y-4 translate-x-4">
                            {AVATAR_OPTIONS.find(opt => opt.id === avatar)?.emoji}
                          </span>
                        </div>
                      </div>

                      {/* Name / Sector details */}
                      <div className="space-y-0.5">
                        <h5 className="text-sm font-black text-white tracking-tight">{name || registeredUser?.name || 'Sipho Nkosi'}</h5>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-indigo-400" />
                          <span>{province} • South Africa</span>
                        </p>
                        <p className="text-[9px] font-extrabold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/10 inline-block">
                          {role === 'seeker' ? 'Candidate Pipeline' : 'Employer Partner'}
                        </p>
                      </div>
                    </div>

                    {/* Bio Paragraph */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">Candidate Bio Objective</span>
                      <p className="text-[10.5px] text-slate-300 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-white/5 min-h-[56px]">
                        "{bio || 'Start typing your bio headline on the left form. Your description will update live on this passport...'}"
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="grid grid-cols-2 gap-3.5 pt-1.5 text-[10.5px]">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Qualification</span>
                        <span className="font-extrabold text-white text-[10px] truncate block">{qualification}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Target Sector</span>
                        <span className="font-extrabold text-indigo-300 text-[10px] truncate block">{careerInterest}</span>
                      </div>
                    </div>

                    {/* Skills Tag grid */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Core Skills Inventory</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkills.length > 0 ? (
                          selectedSkills.map((sk) => (
                            <span key={sk} className="text-[9px] font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                              <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                              {sk}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9.5px] text-slate-500 italic">No skills selected yet. Select on the left form!</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500 relative z-10 font-mono">
                    <span>MEMBER ID: {registeredUser?.referralCode || 'LW-SA-CANDIDATE'}</span>
                    <span>OCTOBER 2026</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* COMPANION: BRAND SHOWCASE & ACCREDITATION (REGISTER OR SIGN IN MODE) */}
            {(mode === 'register' || mode === 'signin') && (
              <motion.div
                key="brand_companion"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                className="w-full max-w-sm space-y-6"
              >
                <div className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-white/10 rounded-3xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Priority Benefits</h3>
                  </div>

                  {/* Benefits checklists */}
                  <ul className="space-y-4 text-[11px] leading-relaxed">
                    <li className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-white block font-bold">Dual-Channel Dispatch</strong>
                        <p className="text-slate-400">Receive actual mobile security SMS or secure email verification codes on registration.</p>
                      </div>
                    </li>
                    <li className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-white block font-bold">Personal Passport Compilation</strong>
                        <p className="text-slate-400">Design your digital passport, selecting an industry avatar badge and documenting skills.</p>
                      </div>
                    </li>
                    <li className="flex gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-white block font-bold">3x Matching Acceleration</strong>
                        <p className="text-slate-400">Pre-registered and verified standby members will be prioritized first during the 1 October 2026 activation.</p>
                      </div>
                    </li>
                  </ul>

                  {/* Privacy pledge */}
                  <div className="p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-1">
                    <span className="text-[8px] font-black text-indigo-300 uppercase tracking-widest block">🔒 POPIA Compliance Guarantee</span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      We strictly adhere to the Protection of Personal Information Act. Your credentials and demographic details are secure, private, and encrypted.
                    </p>
                  </div>
                </div>

                {/* Micro branding tagline */}
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">LearnWinGrow Africa</span>
                  <span className="text-[9px] text-slate-600 block">Empowering Youth Career Trajectories</span>
                </div>
              </motion.div>
            )}

            {/* COMPANION: SUCCESS ADMISSION STATUS (SUCCESS MODE) */}
            {mode === 'success' && (
              <motion.div
                key="success_companion"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                className="w-full max-w-sm space-y-4"
              >
                <div className="text-center space-y-1">
                  <span className="text-[9px] font-extrabold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/10">Standby Core</span>
                  <h3 className="text-sm font-black text-white">Your Candidate Credentials</h3>
                  <p className="text-[11px] text-slate-400">
                    Your active digital passport has been successfully compiled and registered in our database!
                  </p>
                </div>

                {/* THE FINAL COMPILED MEMBER PASSPORT DISPLAYED ON SUCCESS */}
                <div className="bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-950 border border-emerald-500/20 rounded-3xl p-5 shadow-2xl relative overflow-hidden ring-1 ring-emerald-500/10">
                  {/* Glowing background highlights */}
                  <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

                  {/* Header decoration */}
                  <div className="flex justify-between items-start pb-4 border-b border-white/5 relative z-10">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-indigo-400 tracking-widest uppercase block">Careers Avalanche</span>
                      <h4 className="text-xs font-black text-white tracking-wide uppercase">Member Passport</h4>
                    </div>
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest flex items-center gap-1 shadow-md">
                      🟢 ACTIVE PIPELINE
                    </span>
                  </div>

                  {/* Card Content body */}
                  <div className="py-5 space-y-4 relative z-10">
                    {/* Top Identity Grid */}
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Render */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                        AVATAR_OPTIONS.find(opt => opt.id === (registeredUser?.avatar || avatar))?.color || 'from-indigo-500 to-purple-600'
                      } p-0.5 shadow-xl flex items-center justify-center shrink-0`}>
                        <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex flex-col items-center justify-center">
                          {React.createElement(
                            AVATAR_OPTIONS.find(opt => opt.id === (registeredUser?.avatar || avatar))?.icon || Code2,
                            { className: "w-6 h-6 text-indigo-400 animate-pulse" }
                          )}
                          <span className="text-xs font-black absolute translate-y-4 translate-x-4">
                            {AVATAR_OPTIONS.find(opt => opt.id === (registeredUser?.avatar || avatar))?.emoji}
                          </span>
                        </div>
                      </div>

                      {/* Name / Sector details */}
                      <div className="space-y-0.5">
                        <h5 className="text-sm font-black text-white tracking-tight">{registeredUser?.name || name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-indigo-400" />
                          <span>{registeredUser?.province || province} • South Africa</span>
                        </p>
                        <p className="text-[9px] font-extrabold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/10 inline-block">
                          {registeredUser?.role === 'seeker' ? 'Candidate Pipeline' : 'Employer Partner'}
                        </p>
                      </div>
                    </div>

                    {/* Bio Paragraph */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">Candidate Bio Objective</span>
                      <p className="text-[10.5px] text-slate-300 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-xl border border-white/5 min-h-[56px]">
                        "{registeredUser?.bio || bio || 'No biography written.'}"
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="grid grid-cols-2 gap-3.5 pt-1.5 text-[10.5px]">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Qualification</span>
                        <span className="font-extrabold text-white text-[10px] truncate block">{registeredUser?.qualification || qualification}</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Target Sector</span>
                        <span className="font-extrabold text-indigo-300 text-[10px] truncate block">{registeredUser?.careerInterest || careerInterest}</span>
                      </div>
                    </div>

                    {/* Skills Tag grid */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">Core Skills Inventory</span>
                      <div className="flex flex-wrap gap-1">
                        {registeredUser?.skills && registeredUser.skills.length > 0 ? (
                          registeredUser.skills.map((sk: string) => (
                            <span key={sk} className="text-[9px] font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              {sk}
                            </span>
                          ))
                        ) : selectedSkills.length > 0 ? (
                          selectedSkills.map((sk) => (
                            <span key={sk} className="text-[9px] font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              {sk}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9.5px] text-slate-500 italic">No skills selected.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500 relative z-10 font-mono">
                    <span>MEMBER ID: {registeredUser?.referralCode || 'LW-SA-GLOBAL'}</span>
                    <span>ADMITTED: {currentTime}</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* Corporate Legal Footer */}
      <footer className="relative z-10 py-5 text-center text-slate-500 text-[10px] border-t border-white/5 bg-slate-950/60 backdrop-blur-md">
        <p>© 2026 LearnWinGrow Africa. All Rights Reserved. POPIA Compliant & Secure.</p>
      </footer>
    </div>
  );
}
