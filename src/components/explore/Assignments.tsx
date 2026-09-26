import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssignmentItem } from '../../types';

export const Assignments: React.FC = () => {
  const { assignments, submitAssignment } = useApp();

  const [activeModalAsg, setActiveModalAsg] = useState<AssignmentItem | null>(null);
  const [submissionCode, setSubmissionCode] = useState('');
  const [submittedFile, setSubmittedFile] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAsg) return;
    submitAssignment(activeModalAsg.id);
    setActiveModalAsg(null);
    setSubmissionCode('');
    setSubmittedFile(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Assignments & Submission Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Peer-reviewed coding challenges and design system audits for course grading.
        </p>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isGraded = asg.status === 'Graded';

          return (
            <div
              key={asg.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition-all gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isPending
                        ? 'bg-amber-100 text-amber-800'
                        : isGraded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {asg.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">·</span>
                  <span className="text-xs font-semibold text-indigo-600">{asg.courseTitle}</span>
                </div>

                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {asg.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {asg.instructions}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Due: {asg.deadline}</span>
                  </span>
                  {asg.score && (
                    <span className="font-bold text-emerald-600 font-mono">
                      Graded Score: {asg.score}
                    </span>
                  )}
                </div>
              </div>

              <div>
                {isPending ? (
                  <button
                    onClick={() => setActiveModalAsg(asg)}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Submit Work</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Submitted for Review</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {activeModalAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveModalAsg(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">
                Assignment Submission
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeModalAsg.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Attach your GitHub repository link, solution file, or code walkthrough.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub URL / Production Deploy Link
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/repo-name"
                  required
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Design Notes / Architecture Decisions
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly state your lock contention trade-off or time complexity analysis..."
                  value={submissionCode}
                  onChange={(e) => setSubmissionCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center bg-slate-50">
                <Upload className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                <div className="text-xs font-semibold text-slate-700">
                  {submittedFile || 'Drag and drop ZIP / PDF file or click to browse'}
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSubmittedFile(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-2 inline-block cursor-pointer rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Browse Files
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalAsg(null)}
                  className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Submit Assignment (+50 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
