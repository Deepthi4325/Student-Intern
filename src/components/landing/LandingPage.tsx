import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Users,
  Trophy,
  CheckCircle,
  Play,
  FileText,
  Headphones,
  Compass,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, setShowAuthModal, user } = useApp();

  const handleStart = () => {
    if (user.isOnboarded) {
      setCurrentRoute('dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold shadow-md shadow-indigo-500/20">
              SI
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Smart Intern
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problem-solution" className="hover:text-white transition-colors">Why Smart Intern</a>
            <a href="#multi-format" className="hover:text-white transition-colors">Multi-Format Engine</a>
            <a href="#adaptive-path" className="hover:text-white transition-colors">Adaptive Leveling</a>
            <a href="#opportunities" className="hover:text-white transition-colors">Opportunities</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={handleStart}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              <span>{user.isOnboarded ? 'Go to Dashboard' : 'Get Started Free'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-xs font-medium text-indigo-300">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Next-Gen Adaptive Tech Career Preparation</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                Stop drowning in tutorials. <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-400 bg-clip-text text-transparent">
                  Learn how your brain actually works.
                </span>
              </h1>

              <p className="max-w-2xl text-base text-slate-400 sm:text-lg leading-relaxed">
                Smart Intern diagnoses your exact technical baseline, adapts the curriculum to your target role, and renders every topic across 6 sensory formats: Text, Video, Audio, Visual Diagrams, Comics, and Interactive Sandboxes.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={handleStart}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all text-sm"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentRoute('topic-viewer');
                  }}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-sm"
                >
                  <Play className="h-4 w-4 fill-slate-300" />
                  <span>Preview Topic Engine</span>
                </button>
              </div>

              {/* Social Proof metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">40,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Students Placed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">18 Sheets</div>
                  <div className="text-xs text-slate-400 mt-0.5">Curated CS Subjects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">6 Formats</div>
                  <div className="text-xs text-slate-400 mt-0.5">Per Every Topic</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-slate-700/80 bg-slate-800/50 p-2 shadow-2xl backdrop-blur-xl">
                <img
                  src="/src/assets/images/landing_hero_mockup_1790427173355.jpg"
                  alt="Smart Intern Interactive Learning Workspace"
                  referrerPolicy="no-referrer"
                  className="w-full rounded-xl object-cover shadow-inner aspect-video"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400">Live Active Session</span>
                    <span className="text-[11px] font-mono text-emerald-400">● 1,420 XP Streaking</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Sliding Window & Dynamic Substrings
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Editorial</span> · <span>Interactive Simulator</span> · <span>Audio Byte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem -> Solution Framing */}
      <section id="problem-solution" className="border-t border-slate-800 bg-slate-950/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The Real Problem
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              Students don't lack content. They lack a diagnostic system.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Generic 100-hour video playlists treat absolute beginners and final-year revisionists identically. Smart Intern personalizes everything.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* The Old Way */}
            <div className="rounded-2xl border border-rose-900/40 bg-rose-950/10 p-8 space-y-4">
              <div className="text-rose-400 font-bold text-sm uppercase tracking-wider">
                The Traditional Flawed Way
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Endless 60-hour YouTube playlists you abandon after week 2</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>One-size-fits-all explanations packed with unexplained academic jargon</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Missing one day triggers overwhelming study guilt and schedule collapse</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Zero immediate revision reinforcement; forgetting 80% after 48 hours</span>
                </li>
              </ul>
            </div>

            {/* The Smart Intern Way */}
            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-950/20 p-8 space-y-4 shadow-xl shadow-indigo-950/50">
              <div className="text-indigo-400 font-bold text-sm uppercase tracking-wider">
                The Smart Intern System
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Adaptive Leveling:</strong> Beginner, Intermediate, or Advanced framing per topic</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Multi-Format Engine:</strong> Read notes, watch video, listen on commute, or read comics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Planly Recovery Sprints:</strong> Missed a day? Zero guilt — tasks reshuffle dynamically</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Auto-Triggered Mastery:</strong> Flip flashcards and quick revision quizzes lock memory immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Format Content Showcase */}
      <section id="multi-format" className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Learn Your Way
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              One Topic. Six Ways to Absorb It.
            </p>
            <p className="text-slate-400 text-sm">
              Switch formats with a single click without ever losing your place or progress.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <FileText className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Editorial Notes & Code</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean markdown notes with language syntax tabs, time/space complexity proofs, and edge case checklists.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <Play className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Curated Video Walkthrough</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tightly edited 10-minute masterclasses by industry tech leads with interactive chapter timestamps.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <Headphones className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">PrepCast Audio Bytes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-yield mental models you can listen to while commuting, walking, or resting your eyes.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <Layers className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Step-by-Step Diagrams</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive architecture flowcharts and pointer states that animate node-by-node at your own pace.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <Sparkles className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Illustrated Comics & Metaphors</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complex engineering principles like cache eviction and B-trees explained through fun, memorable stories.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-6 hover:border-indigo-500/50 transition-all">
              <Cpu className="h-7 w-7 text-indigo-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Interactive Sandbox</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag pointers, trigger array lookups, and test live inputs directly in the browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities & Community Section */}
      <section id="opportunities" className="border-t border-slate-800 bg-slate-950/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                <Trophy className="h-3.5 w-3.5" />
                <span>Unstop-Style Live Opportunities</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Connect learning directly to offers.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Don't just solve problems in isolation. Apply directly to verified Hackathons, Summer 2026 Internships, and Graduate SDE positions from Microsoft, Google, Atlassian, and Stripe.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setCurrentRoute('internships')}
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-all"
                >
                  Explore Current Opportunities →
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Google Solution Challenge 2026</span>
                  <span className="text-amber-400 font-mono">8 days left</span>
                </div>
                <div className="text-sm font-bold text-white">$12,000 Prize Pool + Mentorship</div>
                <div className="mt-2 text-xs text-indigo-400">4,120 students applied · Virtual Global</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Microsoft India SDE Intern 2026</span>
                  <span className="text-rose-400 font-mono">4 days left</span>
                </div>
                <div className="text-sm font-bold text-white">₹1,25,000 / month + Housing Stipend</div>
                <div className="mt-2 text-xs text-indigo-400">Pre-final year (Batch 2027) · Bengaluru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-slate-800 py-12 text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-6">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to upgrade your preparation?
          </h2>
          <p className="text-slate-400 text-sm">
            Join over 40,000 engineering students who prepare smarter, stay consistent, and land their dream offers.
          </p>
          <div>
            <button
              onClick={handleStart}
              className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-600/40 hover:bg-indigo-500 transition-all"
            >
              Get Started with Smart Intern
            </button>
          </div>
          <div className="text-xs text-slate-500 pt-6">
            © 2026 Smart Intern. All rights reserved. Adaptive Learning Engine.
          </div>
        </div>
      </footer>
    </div>
  );
};
