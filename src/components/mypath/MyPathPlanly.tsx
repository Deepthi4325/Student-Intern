import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Calendar,
  AlertCircle,
  TrendingUp,
  Target,
  RefreshCw,
  Flame,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialRoadmapSteps } from '../../data/mockData';

export const MyPathPlanly: React.FC = () => {
  const { user, openTopic, recoverMissedTasks } = useApp();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(1); // Default to Step 2 (Weekly Sprints)
  const [roadmapSteps, setRoadmapSteps] = useState(initialRoadmapSteps);

  // Recovery handler state
  const [recoveryTriggered, setRecoveryTriggered] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  // Time Tracker (Pomodoro) state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [focusMinutesLogged, setFocusMinutesLogged] = useState(50);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      setFocusMinutesLogged((prev) => prev + 25);
      setTimerSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRecoverMissedDay = () => {
    setRecoveryTriggered(true);
    recoverMissedTasks();
    setRecoveryNotice(
      'Buffer Restructure Activated! 2 missed tasks from Thursday have been smoothed into your Saturday buffer window (2h) and Sunday review slot (1h). Zero backlog guilt — keep pushing!'
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              <Compass className="h-3.5 w-3.5" />
              <span>Planly · AI-Driven Adaptive Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Personalized Study Blueprint
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-xl">
              Calibrated for <span className="font-bold text-amber-300">{user.targetRole}</span> @ {user.targetCompanyTier}. Your sprint adapts automatically based on real practice speeds and missed days.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-xs">
              <div className="text-xs text-indigo-200">Current Velocity</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">7/10 Sprints</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-xs">
              <div className="text-xs text-indigo-200">Weekly Target</div>
              <div className="text-lg font-bold font-mono text-amber-300 tabular-nums">{user.weeklyHoursGoal}h / wk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guided Step Progress Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          The 6 Guided Planly Steps
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {roadmapSteps.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/40 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : step.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  {step.status === 'completed' && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 truncate">
                  {step.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Interactive Workspace */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        {/* Step 1: Goals */}
        {activeStepIndex === 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-indigo-600">Step 1</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Understanding Your Goals</h2>
              <p className="text-xs text-slate-500">
                Your goals serve as the baseline constraints for AI-generated study paths.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <span className="text-xs font-semibold text-slate-500">Proficiency Level</span>
                <div className="text-base font-bold text-slate-900 mt-1">{user.level} Track</div>
                <p className="text-[11px] text-slate-500 mt-1">Multi-format notes adapt to this depth.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <span className="text-xs font-semibold text-slate-500">Target Role</span>
                <div className="text-base font-bold text-slate-900 mt-1">{user.targetRole}</div>
                <p className="text-[11px] text-slate-500 mt-1">Focus on DSA and Distributed Systems.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <span className="text-xs font-semibold text-slate-500">Target Company Tier</span>
                <div className="text-base font-bold text-slate-900 mt-1">{user.targetCompanyTier}</div>
                <p className="text-[11px] text-slate-500 mt-1">High conversion mock rounds prioritized.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStepIndex(1)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <span>Proceed to Weekly Sprints</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Personalized Weekly Sprints */}
        {activeStepIndex === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-600">Step 2</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">Personalized Weekly Sprints</h2>
                <p className="text-xs text-slate-500">
                  Four 1-week iterative micro-milestones designed to avoid burnout.
                </p>
              </div>
              <span className="self-start rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                Current: Sprint 2 (Week 3)
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  sprint: 'Sprint 1',
                  title: 'Core Two Pointers, Sliding Window & Frequency Counting',
                  status: 'Completed',
                  tasks: '10 of 10 tasks solved · 100% accuracy',
                  badge: 'Mastered',
                },
                {
                  sprint: 'Sprint 2 (Active)',
                  title: 'Binary Trees, Graphs (BFS/DFS) & LRU Caches',
                  status: 'In Progress',
                  tasks: '7 of 10 tasks solved · 3 remaining',
                  badge: 'Due in 3 days',
                },
                {
                  sprint: 'Sprint 3',
                  title: 'Dynamic Programming Invariants & Knapsack Patterns',
                  status: 'Upcoming',
                  tasks: '12 curated interview challenges queued',
                  badge: 'Locked',
                },
                {
                  sprint: 'Sprint 4',
                  title: 'High-Level System Design & Mock Interview Simulations',
                  status: 'Upcoming',
                  tasks: 'Distributed Caching, Rate Limiting & TinyURL',
                  badge: 'Locked',
                },
              ].map((s) => (
                <div
                  key={s.sprint}
                  className={`rounded-xl border p-4 transition-all ${
                    s.status === 'In Progress'
                      ? 'border-indigo-500 bg-indigo-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{s.sprint}</span>
                      <span className="text-xs font-semibold text-slate-700">· {s.title}</span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        s.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.status === 'In Progress'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.tasks}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveStepIndex(2)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <span>Jump to Practice Tasks</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Solve & Practice */}
        {activeStepIndex === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-indigo-600">Step 3</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Solve & Practice</h2>
              <p className="text-xs text-slate-500">
                Pattern-oriented problem sets with built-in multi-format breakdowns.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'topic-sliding-window',
                  name: 'Sliding Window & Dynamic Substrings (LeetCode #3 & #76)',
                  diff: 'Medium',
                  status: 'Solved',
                  time: '25m',
                },
                {
                  id: 'topic-distributed-caching',
                  name: 'Design an In-Memory LRU Cache with O(1) Operations',
                  diff: 'Hard',
                  status: 'Solved',
                  time: '30m',
                },
                {
                  id: 'topic-database-indexing',
                  name: 'Database Indexing & Leftmost Prefix Rule Exploration',
                  diff: 'Medium',
                  status: 'Ready to Solve',
                  time: '20m',
                },
              ].map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        task.status === 'Solved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {task.status === 'Solved' ? '✓' : '•'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{task.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {task.diff} · Est. {task.time} · Multi-format available
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openTopic(task.id)}
                    className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    <span>Launch Viewer</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStepIndex(3)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <span>Track Study Time</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Track Your Time (Pomodoro / Focus) */}
        {activeStepIndex === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-indigo-600">Step 4</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Track Your Time</h2>
              <p className="text-xs text-slate-500">
                Log high-focus deep work sessions without phone or tab distractions.
              </p>
            </div>

            {/* Pomodoro Timer Widget */}
            <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-xs">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Pomodoro Focus Interval
              </span>

              <div className="my-6 text-5xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                {formatTimer(timerSeconds)}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all ${
                    timerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{timerRunning ? 'Pause Session' : 'Start Focus (25m)'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-200"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
                Today's Logged Deep Work: <strong className="text-slate-800 font-mono">{focusMinutesLogged} mins</strong>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStepIndex(4)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <span>View Progress Tracker</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Progress Tracker & Skill Radar */}
        {activeStepIndex === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-indigo-600">Step 5</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Progress Tracker & Skill Radar</h2>
              <p className="text-xs text-slate-500">
                Comprehensive skill confidence across core placement disciplines.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Data Structures & Algorithms', score: 78, status: 'Strong', color: 'bg-indigo-600' },
                { name: 'System Design & Scalability', score: 62, status: 'Intermediate', color: 'bg-violet-600' },
                { name: 'Core CS (OS, DBMS, Networks)', score: 71, status: 'Interview Ready', color: 'bg-emerald-600' },
                { name: 'Behavioral & Scenario Debriefs', score: 85, status: 'Exceptional', color: 'bg-amber-600' },
              ].map((skill) => (
                <div key={skill.name} className="rounded-xl border border-slate-200 p-4 bg-white">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2">
                    <span>{skill.name}</span>
                    <span className="font-mono tabular-nums">{skill.score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.score}%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Status: <span className="font-semibold text-slate-700">{skill.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStepIndex(5)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700"
              >
                <span>Missed a Day Recovery Handler</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Missed a Day/Task Recovery Handler */}
        {activeStepIndex === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase text-indigo-600">Step 6</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Missed a Day / Task Recovery Handler</h2>
              <p className="text-xs text-slate-500">
                Zero guilt adaptive reshuffling. Real life happens (exams, sickness, events). Smart Intern fixes your schedule instead of letting you fall behind.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span>Detected Missed Session: Thursday (2 Pending Tasks)</span>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Rather than forcing you to stay up all night or abandon your streak, Planly will dynamically redistribute your sliding window practice and cache eviction notes into the upcoming weekend buffer periods.
              </p>

              {recoveryNotice && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs font-medium text-emerald-800 flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{recoveryNotice}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleRecoverMissedDay}
                  disabled={recoveryTriggered}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all ${
                    recoveryTriggered
                      ? 'bg-emerald-600 cursor-default'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  <RefreshCw className={`h-4 w-4 ${recoveryTriggered ? '' : 'animate-spin-slow'}`} />
                  <span>{recoveryTriggered ? 'Schedule Recovered & Smoothed' : 'Auto-Reshuffle Pending Tasks Now'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
