import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyProgress: React.FC = () => {
  const { user } = useApp();

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 3.0, completed: 4 },
    { day: 'Wed', hours: 1.5, completed: 2 },
    { day: 'Thu', hours: 0.5, completed: 1 }, // partially missed
    { day: 'Fri', hours: 3.5, completed: 5 },
    { day: 'Sat', hours: 4.0, completed: 6 },
    { day: 'Sun (Today)', hours: 2.0, completed: 3 },
  ];

  const maxHours = 4.0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          My Learning Progress & Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Detailed telemetry on solve speeds, concept retention, and weekly study cadence.
        </p>
      </div>

      {/* Primary Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Overall Readiness</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            68%
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">
            +14% in last 14 days
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Learning Streak</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {user.streakDays} Days
          </div>
          <div className="mt-1 text-[11px] text-amber-600 font-semibold">
            Personal Best Record
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Quiz Accuracy</span>
            <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            91.4%
          </div>
          <div className="mt-1 text-[11px] text-indigo-600 font-semibold">
            42 of 46 questions correct
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Study Hours</span>
            <Clock className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            58.5h
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            This Month
          </div>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Weekly Study Hours Velocity</h2>
            <p className="text-xs text-slate-500">Daily logged deep work time across the current sprint</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600">
            Total: 17.0 Hours (Goal: 15h)
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="grid grid-cols-7 gap-3 pt-6 pb-2 items-end h-48 border-b border-slate-100">
          {weeklyActivity.map((day) => {
            const heightPercent = Math.round((day.hours / maxHours) * 100);
            return (
              <div key={day.day} className="flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-mono text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.hours}h
                </div>
                <div
                  className="w-full max-w-[40px] rounded-t-lg bg-indigo-600 transition-all duration-300 group-hover:bg-indigo-500"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[11px] font-medium text-slate-600 mt-2 truncate w-full text-center">
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">DSA Subject Masteries</h2>
          <div className="space-y-3">
            {[
              { name: 'Two Pointers & Sliding Window', level: 94, state: 'Mastered' },
              { name: 'Trees & Graph Traversal (BFS/DFS)', level: 82, state: 'Strong' },
              { name: 'Dynamic Programming & Memoization', level: 65, state: 'Needs Revision' },
              { name: 'Heaps & Priority Queues', level: 88, state: 'Strong' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                  <span>{item.name}</span>
                  <span className="font-mono tabular-nums">{item.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-600" style={{ width: `${item.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">System Design & Core CS</h2>
          <div className="space-y-3">
            {[
              { name: 'Distributed Caching (Redis/Memcached)', level: 85, state: 'Strong' },
              { name: 'Database Indexing & B-Trees', level: 78, state: 'Strong' },
              { name: 'Operating System Concurrency & Locks', level: 60, state: 'In Progress' },
              { name: 'TCP/IP & Network Protocols', level: 75, state: 'Strong' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                  <span>{item.name}</span>
                  <span className="font-mono tabular-nums">{item.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-violet-600" style={{ width: `${item.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
