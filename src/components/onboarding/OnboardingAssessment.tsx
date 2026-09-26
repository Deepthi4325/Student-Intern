import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Brain,
  Layers,
  GraduationCap,
  FastForward,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProficiencyLevel, ContentFormat } from '../../types';

export const OnboardingAssessment: React.FC = () => {
  const { user, setUser, setCurrentRoute } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  // Step 1: Technical Proficiency Level
  const [level, setLevel] = useState<ProficiencyLevel>('Intermediate');

  // Step 2: Target Career Goal
  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer (SDE-1)');
  const [targetTier, setTargetTier] = useState<any>('FAANG/Tier-1');
  const [weeklyHours, setWeeklyHours] = useState<number>(15);

  // Step 3: Preferred Learning Format
  const [preferredFormat, setPreferredFormat] = useState<ContentFormat>('interactive');

  const handleSkip = () => {
    // Defaults to standard track
    setUser((prev) => ({
      ...prev,
      level: 'Intermediate',
      targetRole: 'Software Development Engineer (SDE-1)',
      preferredFormat: 'interactive',
      isOnboarded: true,
    }));
    setCurrentRoute('dashboard');
  };

  const handleFinish = () => {
    setUser((prev) => ({
      ...prev,
      level,
      targetRole,
      targetCompanyTier: targetTier,
      weeklyHoursGoal: weeklyHours,
      preferredFormat,
      isOnboarded: true,
    }));
    setCurrentRoute('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl text-slate-100">
        {/* Top Progress & Skip */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
                SI
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Ability Assessment & Personalization
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Step {step} of {totalSteps}: {step === 1 ? 'Determine Baseline' : step === 2 ? 'Target Goals' : 'Format Preference'}
            </h1>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Skip for Now (Standard Track)</span>
            <FastForward className="h-3.5 w-3.5 text-indigo-400" />
          </button>
        </div>

        {/* Step 1: Technical Proficiency Level */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-400">
                Where are you currently in your computer science preparation? Smart Intern will calibrate the editorial tone, diagram complexity, and challenge prompts to match.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'Beginner' as ProficiencyLevel,
                  title: 'Beginner (Intuition & Metaphors First)',
                  description:
                    'I am learning basic data structures (arrays, strings, recursion). I want visual analogies, zero academic jargon, and step-by-step foundation building.',
                  badge: 'Foundations',
                },
                {
                  id: 'Intermediate' as ProficiencyLevel,
                  title: 'Intermediate (Interview Invariants & Patterns)',
                  description:
                    'I know common data structures. I need high-yield interview patterns (Sliding Window, Two Pointers, Graph BFS/DFS, LRU Cache) and time-space proofs.',
                  badge: 'Most Popular',
                },
                {
                  id: 'Advanced' as ProficiencyLevel,
                  title: 'Advanced (Distributed Systems & Scale)',
                  description:
                    'I solve medium/hard problems easily. I want deep dive system design, cache stampede mitigation, lock-free concurrency, and staff-level trade-offs.',
                  badge: 'Tier-1 Target',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLevel(item.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    level === item.id
                      ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{item.title}</span>
                      <span className="rounded bg-indigo-900/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                        {item.badge}
                      </span>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        level === item.id
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {level === item.id && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Target Career Goals */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-400">
                What role and timeline are you gearing up for? We'll adapt your Planly study sprints accordingly.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Target Engineering Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Software Development Engineer (SDE-1)',
                    'Frontend & Fullstack Engineer',
                    'Cloud / DevOps Engineer',
                    'Data Engineer & AI Specialist',
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`rounded-lg border p-3 text-left font-medium transition-all ${
                        targetRole === role
                          ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Target Company Ambition
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'FAANG/Tier-1', label: 'FAANG / Tier-1' },
                    { id: 'High-Growth Unicorn', label: 'Tech Unicorns' },
                    { id: 'Mid-size Tech', label: 'Mid-size SaaS' },
                    { id: 'Open Source', label: 'Open Source / Remote' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setTargetTier(tier.id)}
                      className={`rounded-lg border p-2.5 text-center font-medium transition-all ${
                        targetTier === tier.id
                          ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Weekly Study Commitment:
                  </label>
                  <span className="font-mono text-sm font-bold text-indigo-400">
                    {weeklyHours} Hours / Week
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5h (Light Prep)</span>
                  <span>15h (Recommended Sprint)</span>
                  <span>35h (Intensive Placement Boot)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Preferred Learning Format */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-400">
                Choose your default format. Every topic has all 6 formats available, but this format will automatically open first.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'interactive', title: 'Interactive Sandbox', desc: 'Step through code & arrays live' },
                { id: 'diagram', title: 'Visual Diagrams', desc: 'Architecture flows & memory charts' },
                { id: 'text', title: 'Editorial Notes', desc: 'Crisp code, edge cases & proofs' },
                { id: 'video', title: 'Video Walkthrough', desc: '10-min focused tech lead breakdowns' },
                { id: 'audio', title: 'PrepCast Audio Byte', desc: '5-min commute mental models' },
                { id: 'comic', title: 'Illustrated Comic', desc: 'Fun metaphors & story analogies' },
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setPreferredFormat(fmt.id as ContentFormat)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                    preferredFormat === fmt.id
                      ? 'border-indigo-500 bg-indigo-950/50 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-1">{fmt.title}</div>
                  <div className="text-[11px] text-slate-400 leading-tight">{fmt.desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-indigo-900/50 bg-indigo-950/20 p-4 text-xs text-indigo-300">
              ⚡ <strong>Your Planly Blueprint is Ready:</strong> Level set to <span className="font-bold text-white">{level}</span>, targeting <span className="font-bold text-white">{targetRole}</span> with <span className="font-bold text-white">{weeklyHours}h/week</span>. Flashcards and revision quizzes will be auto-triggered on topic completion.
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-all"
            >
              <span>Launch My Personalized Path</span>
              <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
