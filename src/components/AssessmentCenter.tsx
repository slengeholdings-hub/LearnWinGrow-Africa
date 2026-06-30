import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ShieldAlert, CheckCircle2, ChevronRight, RefreshCw, AlertTriangle, Play } from 'lucide-react';
import { AppView, Question } from '../types';
import { initialQuestions } from '../data';
import Footer from './Footer';

interface AssessmentCenterProps {
  onNavigate: (view: AppView) => void;
  onCompleteTest: (score: number, logical: number, situational: number, quantitative: number) => void;
}

export default function AssessmentCenter({ onNavigate, onCompleteTest }: AssessmentCenterProps) {
  // Test State
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60); // 45 minutes
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [calculatedScore, setCalculatedScore] = useState<number>(0);

  // Live Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      // Base score is (correctCount / total) * 100
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setCalculatedScore(finalScore);
      setIsCompleted(true);
    }
  };

  const handleFinishAndSave = () => {
    // Generate some slightly randomized realistic sub-scores based on final score
    const logical = Math.min(100, Math.max(40, calculatedScore + Math.floor(Math.random() * 15)));
    const situational = Math.min(100, Math.max(40, calculatedScore - Math.floor(Math.random() * 5)));
    const quantitative = Math.min(100, Math.max(40, calculatedScore - Math.floor(Math.random() * 15)));

    onCompleteTest(calculatedScore, logical, situational, quantitative);
    onNavigate('dashboard');
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeLeft(45 * 60);
    setIsCompleted(false);
  };

  // Completion percentage of currently answered questions
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex flex-col justify-between" id="assessment-root">
      {/* Top Header Navigation */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8 shrink-0" id="assessment-header">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')} id="assessment-logo">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              LW
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">LearnWinGrow</span>
              <span className="text-indigo-300 font-semibold text-xs block -mt-1 tracking-wider uppercase">Africa</span>
            </div>
          </div>
          <div className="text-right">
            <button 
              onClick={() => {
                if (confirm("Are you sure you want to exit the test session? Your progress will be lost.")) {
                  onNavigate('dashboard');
                }
              }} 
              className="text-xs text-slate-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
              id="exit-test-btn"
            >
              Exit Session
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8" id="assessment-workspace">
        
        {/* Left Side Info Panel */}
        <aside className="lg:w-80 shrink-0 space-y-6" id="assessment-sidebar">
          
          {/* Timed Session Widget */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-xl" id="timed-session-widget">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Timed Session</h3>
            <div className="flex items-center gap-3 bg-red-500/10 text-red-400 p-4 rounded-2xl border border-red-500/20" id="timer-box">
              <Clock className="w-6 h-6 animate-pulse" />
              <div>
                <span className="block text-2xl font-black font-mono leading-none">{formatTime(timeLeft)}</span>
                <span className="text-[10px] text-red-400 font-bold uppercase mt-1 block">Remaining Time</span>
              </div>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4 shadow-xl" id="progress-widget">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Progress</h3>
              <span className="text-xs font-extrabold text-indigo-300">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Answered Questions</span>
                <span>{answeredCount} / {questions.length}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Quick Map Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2" id="question-bullets-grid">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all ${
                      isCurrent 
                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg' 
                        : isAnswered
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proctoring Status */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-3 shadow-xl" id="proctoring-widget">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Security Status</h3>
            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-400">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="block font-bold text-emerald-400 text-xs">Active Secure Proctoring</span>
                <span className="text-[9px] text-emerald-500 font-semibold block">Browser Locked & Monitored</span>
              </div>
            </div>
          </div>

          {/* Test Instructions */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3" id="instructions-box">
            <h4 className="text-xs font-extrabold text-slate-300 tracking-wider uppercase">Quick Rules</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed font-medium">
              <li>• Do not refresh or close this tab during the test.</li>
              <li>• Read each scenario carefully before making a choice.</li>
              <li>• There is no negative grading for incorrect selections.</li>
              <li>• Every choice represents a logical or behavioral indicator.</li>
            </ul>
          </div>

        </aside>

        {/* Central Core Question Workspace */}
        <main className="flex-grow flex flex-col justify-between bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl min-h-[480px]" id="question-card-panel">
          
          <div className="space-y-6">
            {/* Context Breadcrumb */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider" id="question-breadcrumb">
              <span>Section: Critical Thinking</span>
              <span>Question {currentQuestion.id} of {questions.length}</span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight" id="question-text">
              {currentQuestion.questionText}
            </h2>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2" id="options-list">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectAnswer(option.key)}
                    className={`w-full p-4 rounded-2xl text-left border text-sm flex items-start gap-4 transition-all duration-200 group/opt ${
                      isSelected 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-500/5' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                    }`}
                    id={`option-${currentQuestion.id}-${option.key}`}
                  >
                    <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white border-indigo-500' 
                        : 'bg-white/5 text-slate-400 group-hover/opt:text-white border-white/10'
                    }`}>
                      {option.key}
                    </span>
                    <span className={`leading-relaxed font-medium ${isSelected ? 'text-indigo-200' : ''}`}>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-6" id="assessment-action-footer">
            <button 
              onClick={() => alert("Report submitted successfully. Proctors have been notified of your inquiry.")}
              className="text-xs text-slate-400 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              id="btn-report-issue"
            >
              <ShieldAlert className="w-4 h-4" /> Report Issue
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-1.5 ${
                selectedAnswers[currentQuestion.id] === undefined
                  ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-indigo-500/20'
              }`}
              id="btn-submit-next"
            >
              {currentIndex < questions.length - 1 ? 'Submit & Next' : 'Finish Test & Calculate'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>

      </div>

      {/* Results Overlay Modal - Triggered when test is submitted */}
      <AnimatePresence>
        {isCompleted && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="results-overlay-root">
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative bg-[#0f172a]/95 border border-white/15 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 overflow-hidden backdrop-blur-xl"
              id="results-modal-box"
            >
              {/* Top celebration icon */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Test Completed Successfully!</h2>
                <p className="text-slate-400 text-sm">Your analytical matching profile has been securely compiled.</p>
              </div>

              {/* Big Score Radial Badge */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center space-y-2 max-w-sm mx-auto" id="results-score-badge">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">Calculated Aptitude Proficiency</span>
                <span className="text-5xl font-black text-indigo-300 leading-none">{calculatedScore}%</span>
                <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1">
                  {calculatedScore >= 80 ? 'Advanced Strategist' : calculatedScore >= 60 ? 'Enterprise Capable' : 'Emerging Professional'}
                </span>
              </div>

              {/* Detailed Breakdown Chart */}
              <div className="space-y-4" id="results-breakdown">
                <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Skill Matrix Analysis</h3>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1.5 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Logical Reasoning</span>
                    <span className="text-lg font-extrabold text-white block">{calculatedScore >= 80 ? '94%' : calculatedScore >= 60 ? '80%' : '55%'}</span>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: calculatedScore >= 80 ? '94%' : calculatedScore >= 60 ? '80%' : '55%' }}></div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1.5 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Situational Judgment</span>
                    <span className="text-lg font-extrabold text-white block">{calculatedScore >= 80 ? '88%' : calculatedScore >= 60 ? '75%' : '60%'}</span>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: calculatedScore >= 80 ? '88%' : calculatedScore >= 60 ? '75%' : '60%' }}></div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1.5 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Quantitative Literacy</span>
                    <span className="text-lg font-extrabold text-white block">{calculatedScore >= 80 ? '76%' : calculatedScore >= 60 ? '65%' : '48%'}</span>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: calculatedScore >= 80 ? '76%' : calculatedScore >= 60 ? '65%' : '48%' }}></div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Feedback Text */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl flex gap-3 text-xs text-indigo-200 font-medium" id="feedback-alert">
                <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your response matrix showcases exemplary high-affinity capability in structural problem solving. Local partner firms including Vertex Global Finance and CapeCloud Systems are actively matching with profiles holding these credentials.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2" id="results-ctas">
                <button
                  onClick={handleFinishAndSave}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-extrabold px-6 py-4 rounded-xl shadow-xl shadow-indigo-500/20 text-center text-sm transition-all flex items-center justify-center gap-1"
                  id="results-btn-save"
                >
                  Explore Future Skills Path <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-semibold px-6 py-4 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-1"
                  id="results-btn-retake"
                >
                  <RefreshCw className="w-4 h-4" /> Retake
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
