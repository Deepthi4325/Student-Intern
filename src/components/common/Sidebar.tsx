import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Users,
  GraduationCap,
  CheckSquare,
  Award,
  BarChart3,
  Trophy,
  Briefcase,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  User,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  LogOut,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    sidebarCollapsed,
    setSidebarCollapsed,
    user,
    setShowProfileModal,
    notifications,
    logoutUser,
    t,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Collapsible accordion sections for the sidebar
  const [prepExpanded, setPrepExpanded] = useState(true);
  const [exploreExpanded, setExploreExpanded] = useState(true);
  const [recommendationsExpanded, setRecommendationsExpanded] = useState(true);

  const pendingNotif = notifications.find((n) => n.unread) || notifications[0];

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
  };

  const navItemClass = (route: AppRoute) => {
    const isActive = currentRoute === route;
    return `group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
      isActive
        ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <div
          onClick={() => setSidebarCollapsed(true)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-all duration-200 ease-in-out lg:static ${
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-68'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex cursor-pointer items-center gap-2.5 overflow-hidden"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-100 font-bold text-base">
              SI
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  {t.smartIntern}
                </span>
                <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">
                  Adaptive Learning
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:flex"
            aria-label="Collapse sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Section: PREP */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <button
                onClick={() => setPrepExpanded(!prepExpanded)}
                className="flex w-full items-center justify-between px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.prep}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${prepExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {(prepExpanded || sidebarCollapsed) && (
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={navItemClass('dashboard')}
                  title={t.dashboard}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.dashboard}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('prephub')}
                  className={navItemClass('prephub')}
                  title={t.prephub}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.prephub}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('mypath')}
                  className={navItemClass('mypath')}
                  title="Planly – Personalized Study Planner"
                >
                  <Compass className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between text-left truncate">
                      <span className="truncate">{t.mypath}</span>
                      <span className="ml-1 text-[9px] font-semibold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                        AI
                      </span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('community')}
                  className={navItemClass('community')}
                  title={t.community}
                >
                  <Users className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.community}</span>}
                </button>
              </div>
            )}
          </div>

          {/* Section: EXPLORE */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <button
                onClick={() => setExploreExpanded(!exploreExpanded)}
                className="flex w-full items-center justify-between px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.explore}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${exploreExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {(exploreExpanded || sidebarCollapsed) && (
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('courses')}
                  className={navItemClass('courses')}
                  title={t.myCourses}
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.myCourses}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('assignments')}
                  className={navItemClass('assignments')}
                  title={t.assignments}
                >
                  <CheckSquare className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.assignments}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('certificates')}
                  className={navItemClass('certificates')}
                  title={t.certificates}
                >
                  <Award className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.certificates}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('progress')}
                  className={navItemClass('progress')}
                  title={t.myProgress}
                >
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.myProgress}</span>}
                </button>
              </div>
            )}
          </div>

          {/* Section: RECOMMENDATIONS */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <button
                onClick={() => setRecommendationsExpanded(!recommendationsExpanded)}
                className="flex w-full items-center justify-between px-3 py-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.opportunities}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${recommendationsExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {(recommendationsExpanded || sidebarCollapsed) && (
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('hackathons')}
                  className={navItemClass('hackathons')}
                  title={t.hackathons}
                >
                  <Trophy className="h-4 w-4 shrink-0 text-amber-500" />
                  {!sidebarCollapsed && <span>{t.hackathons}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('internships')}
                  className={navItemClass('internships')}
                  title={t.internships}
                >
                  <Briefcase className="h-4 w-4 shrink-0 text-sky-500" />
                  {!sidebarCollapsed && <span>{t.internships}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('jobs')}
                  className={navItemClass('jobs')}
                  title={t.jobs}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" />
                  {!sidebarCollapsed && <span>{t.jobs}</span>}
                </button>
              </div>
            )}
          </div>

          {/* Bottom Widget: Pending Opportunity / Topic Notification (desktop expanded only) */}
          {!sidebarCollapsed && pendingNotif && (
            <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-purple-50/50 p-3 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Next Deadline</span>
              </div>
              <p className="text-xs font-medium text-slate-800 line-clamp-1">
                {pendingNotif.title}
              </p>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                {pendingNotif.description}
              </p>
              <button
                onClick={() => {
                  if (pendingNotif.targetRoute) setCurrentRoute(pendingNotif.targetRoute);
                }}
                className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <span>View Opportunity</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Footer: User Profile with Working Dropdown */}
        <div className="relative border-t border-slate-200 p-3">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-slate-100"
            aria-label="Account Settings Menu"
          >
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-cover"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">{user.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{user.targetRole}</div>
              </div>
            )}
            {!sidebarCollapsed && <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute bottom-16 left-3 right-3 z-50 rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
              <div className="border-b border-slate-100 px-3 pb-2 mb-1">
                <div className="text-xs font-semibold text-slate-900">{user.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                    {user.level} Track
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {user.xp} XP
                  </span>
                </div>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                >
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.profileAndGoals}</span>
                </button>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                >
                  <Bell className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.notifications}</span>
                </button>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                >
                  <Settings className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.accountAndSecurity}</span>
                </button>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.troubleshooting}</span>
                </button>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setShowProfileModal(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                >
                  <Sun className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.themeAndDisplay}</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logoutUser();
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
