import React, { useState } from 'react';
import {
  Code2,
  Layers,
  Database,
  Server,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Users,
  Sparkles,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { prephubSheets } from '../../data/mockData';

export const Prephub: React.FC = () => {
  const { openTopic, user, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const categories = ['All', 'DSA', 'System Design', 'Core Subjects', 'Data Engineering'];

  const filteredSheets = prephubSheets.filter((sheet) => {
    const matchCategory = selectedCategory === 'All' || sheet.subjectCategory === selectedCategory;
    const matchQuery =
      sheet.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      sheet.description.toLowerCase().includes(filterQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Banner & Platform Metrics Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md">
        <div className="grid lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 text-white z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-900/60 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Placement Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.prephub} · Curated Subject Master Sheets
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Every major computer science concept mapped into structured study sheets. Each topic contains all 6 sensory formats calibrated to your <span className="text-amber-400 font-semibold">{user.level}</span> difficulty.
            </p>

            {/* Platform Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">48,200+</div>
                <div className="text-[11px] text-slate-400">Active This Month</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">120,000+</div>
                <div className="text-[11px] text-slate-400">Total Users</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-indigo-400 tabular-nums">18 Sheets</div>
                <div className="text-[11px] text-slate-400">Curated Subjects</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-full min-h-[220px] relative">
            <img
              src="/src/assets/images/prephub_banner_1790427193253.jpg"
              alt="Prephub Technical Master Sheets"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Segmented Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-200/60 text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search sheets or topics..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Subject Master Sheets Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredSheets.map((sheet) => {
          const progressPercent = Math.round((sheet.completedTopics / sheet.totalTopics) * 100);

          return (
            <div
              key={sheet.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                    {sheet.subjectCategory === 'DSA' && <Code2 className="h-6 w-6" />}
                    {sheet.subjectCategory === 'System Design' && <Layers className="h-6 w-6" />}
                    {sheet.subjectCategory === 'Core Subjects' && <Database className="h-6 w-6" />}
                    {sheet.subjectCategory === 'Data Engineering' && <Server className="h-6 w-6" />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-tight">
                      {sheet.title}
                    </h2>
                    <div className="text-xs font-semibold text-indigo-600">
                      {sheet.sheetCountLabel} · {sheet.totalTopics} Master Topics
                    </div>
                  </div>
                </div>

                <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-mono font-semibold text-slate-700">
                  {progressPercent}% Complete
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {sheet.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>{sheet.completedTopics} topics solved</span>
                  <span>{sheet.totalTopics - sheet.completedTopics} remaining</span>
                </div>
              </div>

              {/* Interactive Topics Preview Inside Sheet */}
              <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Featured Topic In This Sheet
                </div>
                {sheet.topics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => openTopic(t.id)}
                    className="flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-3 transition-colors hover:bg-indigo-50/80"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                        {t.difficulty[0]}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 hover:text-indigo-600">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {t.estimatedMinutes} mins · Multi-Format (6 formats)
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                      <span>Launch</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
