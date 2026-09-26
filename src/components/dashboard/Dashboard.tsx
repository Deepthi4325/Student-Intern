import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Zap,
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Cloud,
  Layers,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleCommunityPosts, sampleTopics } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  const { user, openTopic, setCurrentRoute, activeTopic, t } = useApp();

  // Live countdown timer for Problem of the Day (HH:MM:SS)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPad = (n: number) => n.toString().padStart(2, '0');

  // Interactive Mini Calendar state
  const [selectedDay, setSelectedDay] = useState<number>(26); // today is 26th
  const daysInMonth = 30; // September has 30 days
  const startDayOffset = 2; // Tuesday start

  // Milestones on specific days
  const milestones: { [key: number]: string } = {
    4: 'DSA Mock Test',
    11: 'Two Pointers Sprint',
    18: 'Kafka Architecture Review',
    26: 'Sliding Window + UI Design Session (Today)',
    28: 'System Design Mock Interview',
  };

  const currentDateFormatted = new Date(2026, 8, 26).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const featuredExperience = sampleCommunityPosts.find((p) => p.category === 'Interview Experience') || sampleCommunityPosts[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>{currentDateFormatted}</span>
              <span>·</span>
              <span className="text-emerald-400 font-mono">{user.level} Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.welcomeBack}, {user.name.split(' ')[0]}!
            </h1>
            <p className="max-w-xl text-xs sm:text-sm text-indigo-100/80">
              You are on a <span className="font-bold text-amber-400 font-mono">{user.streakDays}-day streak</span> targeting {user.targetRole}. Today's focus is locking down Sliding Window edge cases.
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-xs font-medium text-indigo-200 mb-1.5">
                <span>Placement Readiness Milestone</span>
                <span className="font-mono tabular-nums font-bold">68%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-indigo-950/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500"
                  style={{ width: '68%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => openTopic('topic-sliding-window')}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-indigo-900 shadow-md transition-all hover:bg-indigo-50 hover:shadow-lg focus:outline-none"
            >
              <span>{t.continueLearning} →</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setCurrentRoute('mypath')}
              className="flex items-center justify-center gap-2 rounded-xl border border-indigo-400/40 bg-indigo-900/60 px-4 py-3 text-xs font-semibold text-white hover:bg-indigo-900"
            >
              <span>View Sprint</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow backdrop */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Stat 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{t.coursesInProgress}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {user.coursesInProgress}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="font-semibold text-indigo-600">Active</span> · 9 modules left
          </div>
        </div>

        {/* Stat 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{t.lessonsCompleted}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {user.lessonsCompleted}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">+6 this week</span> · Mastered
          </div>
        </div>

        {/* Stat 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{t.improvementRate}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            +{user.improvementRate}%
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            vs. last 30-day baseline test
          </div>
        </div>

        {/* Stat 4 */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{t.xpEarned}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {user.xp.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
            <Flame className="h-3 w-3 text-amber-500" />
            <span>Top 5% this month</span>
          </div>
        </div>
      </div>

      {/* Explore Popular Topics Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{t.explorePopularTopics}</h2>
            <p className="text-xs text-slate-500">
              Curated master sheets mapped to major tech placement roadmaps
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('prephub')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View all 18 sheets →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* DSA */}
          <div
            onClick={() => openTopic('topic-sliding-window')}
            className="group cursor-pointer rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">6 Sheets</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Data Structures & Algorithms
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Arrays, Sliding Window, Trees, Graphs, DP & Greedy Patterns.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-indigo-600 font-semibold">
              <span>Open Sheet</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* LLD / System Design */}
          <div
            onClick={() => openTopic('topic-distributed-caching')}
            className="group cursor-pointer rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">2 Sheets</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              System Design & LLD
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Distributed Caching, Sharding, Microservices & OOP Patterns.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-violet-600 font-semibold">
              <span>Open Sheet</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Cloud & DevOps */}
          <div
            onClick={() => setCurrentRoute('courses')}
            className="group cursor-pointer rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Cloud className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">2 Sheets</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
              Cloud & DevOps
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Docker, Kubernetes, AWS Lambdas & CI/CD Pipelines.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-sky-600 font-semibold">
              <span>Open Sheet</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* DBMS */}
          <div
            onClick={() => openTopic('topic-database-indexing')}
            className="group cursor-pointer rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-500 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Database className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400">6 Sheets</span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              DBMS & Core Subjects
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              SQL Optimization, B-Trees, OS Deadlocks & TCP Handshakes.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
              <span>Open Sheet</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Split Panel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Interview Experiences Preview Snippet */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Interview Experiences & Debriefs
              </h2>
              <p className="text-xs text-slate-500">
                Fresh breakdowns from students who just cleared technical interviews
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('community')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Explore Feed →
            </button>
          </div>

          {/* Featured Post Card */}
          <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={featuredExperience.author.avatar}
                alt={featuredExperience.author.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {featuredExperience.author.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {featuredExperience.author.role} · {featuredExperience.author.companyOrCollege}
                </div>
              </div>
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug">
              {featuredExperience.title}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
              {featuredExperience.content}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <ThumbsUp className="h-3.5 w-3.5 text-indigo-600" />
                  <span className="font-mono tabular-nums">{featuredExperience.upvotes}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="font-mono tabular-nums">{featuredExperience.commentsCount}</span>
                </span>
              </div>
              <button
                onClick={() => setCurrentRoute('community')}
                className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Read Full Experience</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Problem of the Day + Interactive Mini Calendar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Right-Top: Problem of the Day */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900">{t.problemOfTheDay}</span>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-800">
                +20 XP Reward
              </span>
            </div>

            <div className="rounded-lg bg-slate-900 p-3.5 text-white">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Resets in:</span>
                <div className="flex items-center gap-1 font-mono text-amber-400 font-bold tabular-nums">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {formatPad(timeLeft.hours)}:{formatPad(timeLeft.minutes)}:{formatPad(timeLeft.seconds)}
                  </span>
                </div>
              </div>
              <div className="text-xs font-bold text-white">
                Minimum Window Substring (LeetCode #76)
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Hard · Sliding Window Invariant Pattern
              </div>
            </div>

            <button
              onClick={() => openTopic('topic-sliding-window')}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-center text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              {t.solveProblem} →
            </button>
          </div>

          {/* Right-Bottom: Interactive Mini Calendar */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">Study Calendar</span>
              </div>
              <span className="text-xs font-medium text-slate-500">September 2026</span>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
              {/* Blank offset days */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="h-7 w-7" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday = dayNum === 26;
                const isSelected = selectedDay === dayNum;
                const hasMilestone = Boolean(milestones[dayNum]);

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : isToday
                        ? 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-300'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {hasMilestone && (
                      <span
                        className={`absolute bottom-0.5 h-1 w-1 rounded-full ${
                          isSelected ? 'bg-amber-300' : 'bg-indigo-600'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected day milestone details */}
            <div className="rounded-lg bg-slate-50 p-2.5 text-xs">
              <div className="font-semibold text-slate-900 text-[11px]">
                September {selectedDay}, 2026
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                {milestones[selectedDay] ? (
                  <span className="font-medium text-indigo-700">
                    🎯 {milestones[selectedDay]}
                  </span>
                ) : (
                  <span>Regular revision: Practice 2 intermediate topics.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
