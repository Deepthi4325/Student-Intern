import React, { useState } from 'react';
import {
  X,
  User,
  Bell,
  Shield,
  HelpCircle,
  Sun,
  Moon,
  LogOut,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProficiencyLevel } from '../../types';

export const ProfileModal: React.FC = () => {
  const {
    showProfileModal,
    setShowProfileModal,
    user,
    setUser,
    updateUserLevel,
    logoutUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'account' | 'troubleshooting' | 'theme'>('profile');

  // Form states
  const [name, setName] = useState(user.name);
  const [targetRole, setTargetRole] = useState(user.targetRole);
  const [weeklyHours, setWeeklyHours] = useState(user.weeklyHoursGoal);
  const [notifOpportunities, setNotifOpportunities] = useState(true);
  const [notifStreak, setNotifStreak] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);
  const [diagnosticStatus, setDiagnosticStatus] = useState<string | null>(null);

  if (!showProfileModal) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      targetRole,
      weeklyHoursGoal: weeklyHours,
    }));
    setShowProfileModal(false);
  };

  const runDiagnostics = () => {
    setDiagnosticStatus('Testing connectivity...');
    setTimeout(() => {
      setDiagnosticStatus('All systems operational: Audio synthesizers ready, Cache storage valid (0.8MB used), WebSocket mock nominal.');
    }, 600);
  };

  const handleLevelChange = (lvl: ProficiencyLevel) => {
    updateUserLevel(lvl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="relative flex h-[580px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900">User Settings & Preferences</span>
          </div>
          <button
            onClick={() => setShowProfileModal(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body: Left Tab Nav + Right Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="w-48 border-r border-slate-200 bg-slate-50/60 p-3 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile & Level</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'account'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Account & Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'troubleshooting'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Troubleshooting</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'theme'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Theme</span>
            </button>

            <div className="pt-8">
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  logoutUser();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panes */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
                  <p className="text-xs text-slate-500">
                    Adjust your profile details and adaptive difficulty track anytime.
                  </p>
                </div>

                {/* Adaptive Level Switcher */}
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-900">
                      Adaptive Proficiency Level
                    </label>
                    <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      Current: {user.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mb-3">
                    Changing this updates technical depth across all lesson notes, visual diagrams, and code complexity.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleLevelChange(lvl)}
                        className={`flex flex-col items-center justify-center rounded-lg border p-2.5 text-xs font-semibold transition-all ${
                          user.level === lvl
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{lvl}</span>
                        <span className="text-[10px] font-normal opacity-80 mt-0.5">
                          {lvl === 'Beginner' ? 'Intuition first' : lvl === 'Intermediate' ? 'Standard SDE' : 'Staff / Scale'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Role / Dream Job
                    </label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Weekly Study Hours Goal: {weeklyHours} hours
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
                  <p className="text-xs text-slate-500">
                    Stay alerted to upcoming hackathon deadlines and streak warnings.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Opportunity Deadlines</div>
                      <div className="text-[11px] text-slate-500">Alert me 48 hours before internship & hackathon closing dates</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifOpportunities}
                      onChange={(e) => setNotifOpportunities(e.target.checked)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Streak Safeguard</div>
                      <div className="text-[11px] text-slate-500">Remind me at 8:00 PM if Problem of the Day is still unsolved</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifStreak}
                      onChange={(e) => setNotifStreak(e.target.checked)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Community Replies</div>
                      <div className="text-[11px] text-slate-500">Notify when someone responds to your interview experiences</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifCommunity}
                      onChange={(e) => setNotifCommunity(e.target.checked)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Account & Subscription</h3>
                  <p className="text-xs text-slate-500">
                    Manage student tier credentials and authentication methods.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Smart Intern Student Edition</div>
                      <div className="text-[11px] text-slate-500">Campus License · Active until graduation 2026</div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Includes unlimited Multi-Format Topic Viewers, Planly AI Study Planner, and verified Certificate Generation.
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Connected Accounts</div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-xs text-slate-800">Google OAuth (alex.chen@university.edu)</span>
                    <span className="text-[11px] font-semibold text-indigo-600">Connected</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'troubleshooting' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Diagnostics & Troubleshooting</h3>
                  <p className="text-xs text-slate-500">
                    Self-test media playback, clear cache, or reset local progress simulator.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={runDiagnostics}
                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900">Run Engine Self-Test</div>
                      <div className="text-[11px] text-slate-500">Tests visualizer canvas, speech player & storage</div>
                    </div>
                    <RotateCcw className="h-4 w-4 text-slate-400" />
                  </button>

                  {diagnosticStatus && (
                    <div className="rounded-lg bg-slate-900 p-3 text-[11px] font-mono text-emerald-400">
                      {diagnosticStatus}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      localStorage.removeItem('smart_intern_user');
                      window.location.reload();
                    }}
                    className="flex w-full items-center justify-between rounded-lg border border-rose-200 p-3 text-left text-rose-700 hover:bg-rose-50"
                  >
                    <div>
                      <div className="text-xs font-semibold">Reset Local Storage & Seed State</div>
                      <div className="text-[11px] text-rose-500">Restore fresh demo state</div>
                    </div>
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Theme & Visual Experience</h3>
                  <p className="text-xs text-slate-500">
                    Select your preferred interface display.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setUser((prev) => ({ ...prev, theme: 'light' }))}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      user.theme === 'light'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Sun className="h-5 w-5 text-amber-500 mb-2" />
                    <div className="text-xs font-bold text-slate-900">Light Modern</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Crisp slate-50 canvas with high contrast readability.
                    </div>
                  </div>

                  <div
                    onClick={() => setUser((prev) => ({ ...prev, theme: 'dark' }))}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      user.theme === 'dark'
                        ? 'border-indigo-600 bg-slate-900 text-white ring-2 ring-indigo-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Moon className="h-5 w-5 text-indigo-400 mb-2" />
                    <div className="text-xs font-bold">Midnight Slate</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Dark mode designed for late-night interview prep sessions.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
