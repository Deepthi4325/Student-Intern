import React, { useState } from 'react';
import {
  Trophy,
  Briefcase,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportunityItem } from '../../types';

interface OpportunitiesListProps {
  initialType?: 'all' | 'hackathon' | 'internship' | 'job';
}

export const OpportunitiesList: React.FC<OpportunitiesListProps> = ({ initialType = 'all' }) => {
  const { opportunities, applyOpportunity } = useApp();

  const [activeType, setActiveType] = useState<'all' | 'hackathon' | 'internship' | 'job'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);
  const [appliedModalSuccess, setAppliedModalSuccess] = useState(false);

  const filteredOpportunities = opportunities.filter((opp) => {
    if (activeType !== 'all' && opp.type !== activeType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleApplyClick = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setAppliedModalSuccess(false);
  };

  const handleConfirmApplication = () => {
    if (selectedOpportunity) {
      applyOpportunity(selectedOpportunity.id);
      setAppliedModalSuccess(true);
      setTimeout(() => {
        setSelectedOpportunity(null);
        setAppliedModalSuccess(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Opportunities & Placement Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified campus hackathons, 2026 summer internships, and graduate SDE job postings.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search roles, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Unstop-style Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'all', label: 'All Opportunities', count: opportunities.length },
          { id: 'hackathon', label: 'Hackathons', count: opportunities.filter((o) => o.type === 'hackathon').length },
          { id: 'internship', label: 'Internships', count: opportunities.filter((o) => o.type === 'internship').length },
          { id: 'job', label: 'Jobs', count: opportunities.filter((o) => o.type === 'job').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveType(tab.id as any)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 transition-all ${
              activeType === tab.id
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeType === tab.id ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opp) => {
          const isApplied = Boolean(opp.isApplied);

          return (
            <div
              key={opp.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-4"
            >
              {/* Top Row: Logo & Type Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-xl font-bold shadow-xs">
                    {opp.logo}
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {opp.organization}
                    </h2>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {opp.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Badges / Location / Mode */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{opp.location}</span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                  {opp.mode}
                </span>
              </div>

              {/* Stipend / Prize & Eligibility */}
              <div className="rounded-xl bg-slate-50 p-3 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-indigo-700">{opp.stipendOrSalary}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  Eligibility: {opp.eligibility}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {opp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-indigo-50/70 px-2 py-0.5 text-[10px] font-medium text-indigo-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer: Countdown & Apply Button */}
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span className="font-mono tabular-nums text-slate-700 font-semibold">
                    {opp.daysLeft}d left
                  </span>
                </div>

                {isApplied ? (
                  <button
                    disabled
                    className="flex items-center gap-1 rounded-xl bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Applied</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyClick(opp)}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>

            {appliedModalSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-500">
                  Your Smart Intern profile and verified certificates were forwarded to {selectedOpportunity.organization}.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600">
                    Direct One-Click Application
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedOpportunity.title}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {selectedOpportunity.organization} · {selectedOpportunity.stipendOrSalary}
                  </div>
                </div>

                <div className="rounded-xl bg-indigo-50/60 p-3 text-xs text-slate-700 space-y-2">
                  <div className="font-semibold text-indigo-900">Application Package Included:</div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                    <li>Smart Intern Verified Problem Solving Score (68%)</li>
                    <li>DSA Placement Certificate (SMART-INTERN-2026-DSA)</li>
                    <li>Target Role: Software Development Engineer (SDE-1)</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedOpportunity(null)}
                    className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmApplication}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                  >
                    Confirm & Send Application
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
