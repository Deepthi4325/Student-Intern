import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Flame,
  Zap,
  Globe,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleTopics } from '../../data/mockData';
import { LanguageCode } from '../../i18n/translations';

export const Header: React.FC = () => {
  const {
    user,
    currentRoute,
    setCurrentRoute,
    notifications,
    markNotificationRead,
    searchQuery,
    setSearchQuery,
    setShowProfileModal,
    setSidebarCollapsed,
    openTopic,
    currentLang,
    setLanguage,
    t,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' },
  ];

  const currentLangMeta = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const matchingTopics = searchQuery.trim()
    ? sampleTopics.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md transition-all lg:px-6">
      {/* Left: Mobile hamburger & breadcrumb/title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-medium">
          <span className="text-slate-400">Smart Intern</span>
          <span className="text-slate-300">/</span>
          <span className="capitalize text-slate-900 font-semibold">
            {currentRoute === 'mypath' ? 'Planly Study Planner' : currentRoute.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div ref={searchRef} className="relative mx-4 flex-1 max-w-md">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/80 pl-9 pr-8 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Popup */}
        {isSearchFocused && searchQuery.trim() && (
          <div className="absolute top-11 left-0 right-0 z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Topic Matches ({matchingTopics.length})
            </div>
            {matchingTopics.length > 0 ? (
              <div className="space-y-1">
                {matchingTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      openTopic(topic.id);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="flex w-full items-start gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-indigo-50/70"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-indigo-600 font-semibold text-xs">
                      {topic.difficulty[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {topic.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {topic.subject} · {topic.sheetName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-slate-500">
                No matching topics found for "{searchQuery}". Try searching "Sliding Window" or "Redis".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Streak, XP, Notifications, Language, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Counter */}
        <div
          title={`${user.streakDays}-Day Learning Streak!`}
          className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60"
        >
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-mono tabular-nums">{user.streakDays}d</span>
        </div>

        {/* XP Counter */}
        <div
          title={`${user.xp} XP Earned`}
          className="hidden sm:flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200/60"
        >
          <Zap className="h-3.5 w-3.5 fill-indigo-600 text-indigo-600" />
          <span className="font-mono tabular-nums">{user.xp.toLocaleString()} XP</span>
        </div>

        {/* Language Selector */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setShowLangMenu((prev) => !prev)}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-xs focus-visible:outline-none"
            aria-label="Select language"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-xs">{currentLangMeta.flag}</span>
            <span className="hidden sm:inline font-semibold">{currentLangMeta.label.split(' ')[0]}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    currentLang === lang.code
                      ? 'bg-indigo-50 font-bold text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {currentLang === lang.code && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[11px] font-medium text-indigo-600">
                  {unreadCount} unread
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1 space-y-1">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      if (notif.targetRoute) {
                        setCurrentRoute(notif.targetRoute);
                      }
                      setShowNotifications(false);
                    }}
                    className={`cursor-pointer rounded-lg p-2.5 transition-colors ${
                      notif.unread ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="text-xs font-medium text-slate-900">{notif.title}</div>
                      <span className="shrink-0 text-[10px] text-slate-400">{notif.timeAgo}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                      {notif.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Level Chip */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="User Profile Menu"
        >
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full border border-slate-200 object-cover"
          />
          <div className="hidden text-left xl:block">
            <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
              {user.name}
            </div>
            <div className="text-[11px] font-medium text-indigo-600 leading-tight">
              {user.level} Level
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
