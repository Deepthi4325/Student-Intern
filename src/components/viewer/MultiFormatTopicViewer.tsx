import React, { useState } from 'react';
import {
  FileText,
  Play,
  Pause,
  Headphones,
  Layers,
  Sparkles,
  Cpu,
  CheckCircle2,
  Clock,
  Code2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  BookOpen,
  ArrowRight,
  Tag,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ContentFormat, ProficiencyLevel } from '../../types';
import { FlashcardsModal } from './FlashcardsModal';
import { RevisionQuizModal } from './RevisionQuizModal';

export const MultiFormatTopicViewer: React.FC = () => {
  const {
    activeTopic,
    user,
    updateUserLevel,
    selectedFormat,
    setSelectedFormat,
    showFlashcardsModal,
    setShowFlashcardsModal,
    showQuizModal,
    setShowQuizModal,
    completeTopicAndTriggerReview,
    setCurrentRoute,
  } = useApp();

  // Active level framing toggle (defaults to user.level, can be temporarily previewed)
  const [activeFramingLevel, setActiveFramingLevel] = useState<ProficiencyLevel>(user.level);

  // Video player simulator states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [activeTimestampIndex, setActiveTimestampIndex] = useState(0);

  // Audio player simulator states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [audioProgress, setAudioProgress] = useState(25); // 25%

  // Diagram step-by-step state
  const [diagramStepIndex, setDiagramStepIndex] = useState(0);

  // Interactive Sandbox state (Sliding Window Simulator)
  const [interactiveLeft, setInteractiveLeft] = useState(0);
  const [interactiveRight, setInteractiveRight] = useState(2);
  const [copiedCode, setCopiedCode] = useState(false);

  const formats: { id: ContentFormat; label: string; icon: any }[] = [
    { id: 'text', label: 'Text / Editorial', icon: FileText },
    { id: 'video', label: 'Video Player', icon: Play },
    { id: 'audio', label: 'Audio Byte', icon: Headphones },
    { id: 'diagram', label: 'Visual Diagram', icon: Layers },
    { id: 'comic', label: 'Illustrated Comic', icon: Sparkles },
    { id: 'interactive', label: 'Interactive Sandbox', icon: Cpu },
  ];

  const currentLevelData = activeTopic.levelFraming[activeFramingLevel];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeTopic.textNotes.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleMarkComplete = () => {
    completeTopicAndTriggerReview(activeTopic.id);
  };

  const handleFinishFlashcards = () => {
    setShowFlashcardsModal(false);
    setShowQuizModal(true);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Topic Header & Breadcrumb */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => setCurrentRoute('courses')}
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-semibold transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Courses</span>
            </button>
            <span className="text-slate-300">/</span>
            <span>{activeTopic.subject}</span>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600">{activeTopic.sheetName}</span>
          </div>

          <button
            onClick={() => setCurrentRoute('prephub')}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
          >
            All Sheets
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTopic.title}
          </h1>

          <button
            onClick={handleMarkComplete}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors self-start sm:self-auto shrink-0"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Mark Complete & Review (+30 XP)</span>
          </button>
        </div>

        {/* Metadata & Tag row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{activeTopic.estimatedMinutes} mins est.</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-semibold text-slate-700">Difficulty: {activeTopic.difficulty}</span>
          <span className="text-slate-300">·</span>
          <div className="flex flex-wrap gap-1">
            {activeTopic.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Adaptive Leveling Framing Card */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
              AI
            </span>
            <span className="text-xs font-bold text-slate-900">
              Adaptive Leveling Framing: {activeFramingLevel}
            </span>
          </div>

          {/* Level Switcher (allows previewing how framing adapts) */}
          <div className="flex rounded-lg bg-indigo-100/70 p-0.5 text-[11px] font-semibold">
            {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveFramingLevel(lvl)}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  activeFramingLevel === lvl
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {currentLevelData.summary}
          </p>
          <div className="text-xs text-indigo-800 bg-indigo-100/60 rounded-lg p-2.5 border border-indigo-200/50">
            <strong>Key Focus Tip:</strong> {currentLevelData.focusTip}
          </div>
        </div>
      </div>

      {/* Multi-Format Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-200/70 p-1.5 text-xs font-bold">
        {formats.map((fmt) => {
          const Icon = fmt.icon;
          const isActive = selectedFormat === fmt.id;
          return (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>{fmt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Format 1: Text / Editorial Notes */}
      {selectedFormat === 'text' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Problem Essence & Intuition</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeTopic.textNotes.introduction}
            </p>
          </div>

          {/* Key Concepts */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Core Algorithmic Principles
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {activeTopic.textNotes.keyConcepts.map((c, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{c.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Production Code Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Production Implementation ({activeTopic.textNotes.codeSnippet.language})
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                {copiedCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-emerald-400 overflow-x-auto shadow-inner">
              <pre>{activeTopic.textNotes.codeSnippet.code}</pre>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <div>
                Time Complexity: <strong className="text-slate-800">{activeTopic.textNotes.codeSnippet.complexity.time}</strong>
              </div>
              <span className="text-slate-300">·</span>
              <div>
                Space Complexity: <strong className="text-slate-800">{activeTopic.textNotes.codeSnippet.complexity.space}</strong>
              </div>
            </div>
          </div>

          {/* Edge Cases */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">Critical Edge Cases to Test:</h4>
            <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">
              {activeTopic.textNotes.edgeCases.map((ec, i) => (
                <li key={i}>{ec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Format 2: Video Player */}
      {selectedFormat === 'video' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          {/* Custom Video Player Interface */}
          <div className="relative aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden shadow-2xl flex flex-col justify-between p-4 text-white">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">{activeTopic.videoData.title}</span>
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white">
                1080p HD
              </span>
            </div>

            {/* Video Center Animation / Play button */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/90 text-white shadow-xl hover:bg-indigo-500 hover:scale-105 transition-all"
              >
                {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current ml-1" />}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div className="space-y-2 bg-slate-900/80 p-3 rounded-xl backdrop-blur-md">
              <div className="h-1.5 w-full rounded-full bg-slate-700 cursor-pointer overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: isVideoPlaying ? '48%' : '20%' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                    {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                  </button>
                  <span className="font-mono tabular-nums text-slate-400">
                    {isVideoPlaying ? '04:12' : '01:45'} / {activeTopic.videoData.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setVideoSpeed(spd)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        videoSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Chapter Timestamps */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Chapter Markers
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {activeTopic.videoData.timestamps.map((ts, idx) => (
                <div
                  key={ts.time}
                  onClick={() => setActiveTimestampIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs transition-all ${
                    activeTimestampIndex === idx
                      ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-950'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{ts.label}</span>
                  <span className="font-mono text-[11px] text-indigo-600 font-bold">{ts.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Instructor: <strong>{activeTopic.videoData.instructor}</strong> · {activeTopic.videoData.summary}
          </div>
        </div>
      )}

      {/* Format 3: Audio Player (PrepCast) */}
      {selectedFormat === 'audio' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <Headphones className="h-4 w-4" />
                <span>Smart Intern PrepCast Audio Byte</span>
              </div>
              <span className="font-mono text-xs text-slate-400">{activeTopic.audioData.duration}</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {activeTopic.audioData.title}
            </h3>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center gap-1 h-12 py-2">
              {Array.from({ length: 36 }).map((_, i) => {
                const height = Math.sin(i * 0.4) * 16 + 20;
                const isPlayed = i < (audioProgress / 100) * 36;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all ${
                      isPlayed ? 'bg-indigo-400' : 'bg-slate-700'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
                >
                  {isAudioPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                </button>
                <span className="text-xs font-mono text-slate-300">
                  {isAudioPlaying ? '02:15' : '00:45'} / {activeTopic.audioData.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {[1.0, 1.25, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setAudioSpeed(spd)}
                    className={`rounded px-2 py-1 text-xs font-mono font-bold ${
                      audioSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transcript Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Audio Key Insights & Mental Models
            </h4>
            <div className="space-y-2">
              {activeTopic.audioData.transcriptSummary.map((line, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Format 4: Diagrams / Visual Infographics */}
      {selectedFormat === 'diagram' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Step-by-Step State Flow Diagram
              </h2>
              <p className="text-xs text-slate-500">
                Inspect pointer progression and internal invariant checks.
              </p>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDiagramStepIndex(Math.max(0, diagramStepIndex - 1))}
                disabled={diagramStepIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs font-bold text-slate-700">
                Step {diagramStepIndex + 1} / {activeTopic.diagramData.steps.length}
              </span>
              <button
                onClick={() =>
                  setDiagramStepIndex(
                    Math.min(activeTopic.diagramData.steps.length - 1, diagramStepIndex + 1)
                  )
                }
                disabled={diagramStepIndex === activeTopic.diagramData.steps.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Current Step Description Callout */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
            <div className="text-xs font-bold text-indigo-900">
              {activeTopic.diagramData.steps[diagramStepIndex].title}
            </div>
            <p className="text-xs text-indigo-800 mt-1">
              {activeTopic.diagramData.steps[diagramStepIndex].description}
            </p>
          </div>

          {/* Visual Node Graph */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {activeTopic.diagramData.nodes.map((node, i) => {
                const isStepHighlight =
                  i <= diagramStepIndex;
                return (
                  <div
                    key={node.id}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-all ${
                      isStepHighlight
                        ? 'border-indigo-600 bg-white shadow-md shadow-indigo-100 scale-105'
                        : 'border-slate-200 bg-white/60 opacity-60'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{node.label}</div>
                    {node.subtext && (
                      <div className="text-[10px] font-mono text-indigo-600 font-semibold mt-1">
                        {node.subtext}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Format 5: Comics / Story-Driven Explanation */}
      {selectedFormat === 'comic' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Story Analogy & Visual Comic
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {activeTopic.comicData.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {activeTopic.comicData.themeStory}
            </p>
          </div>

          {/* Comic Illustrated Hero Asset */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-slate-900 shadow-md">
            <img
              src="/src/assets/images/comic_concept_story_1790427210951.jpg"
              alt="Comic Concept Explanation"
              referrerPolicy="no-referrer"
              className="w-full object-cover max-h-80"
            />
          </div>

          {/* Story Panels */}
          <div className="grid gap-4 sm:grid-cols-2">
            {activeTopic.comicData.panels.map((p) => (
              <div
                key={p.panelNumber}
                className="rounded-2xl border-2 border-slate-800 bg-amber-50/20 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                    Panel #{p.panelNumber}
                  </span>
                  <span className="font-bold text-slate-800">{p.character}</span>
                </div>

                <div className="rounded-xl border border-slate-300 bg-white p-3 text-xs italic text-slate-800 shadow-inner">
                  {p.dialogue}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.narrative}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Format 6: Interactive Sandbox */}
      {selectedFormat === 'interactive' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {activeTopic.interactiveData.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {activeTopic.interactiveData.description}
            </p>
          </div>

          {/* Array Interactive Stepper */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <div>
                Target Constraint: <strong className="text-indigo-700 font-mono">Sum &le; {activeTopic.interactiveData.targetValue || 14}</strong>
              </div>
              <div>
                Current Window: <strong className="text-indigo-700 font-mono">[{interactiveLeft} ... {interactiveRight}]</strong>
              </div>
            </div>

            {/* Visual Array Blocks */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {activeTopic.interactiveData.initialArray.map((val, idx) => {
                const inWindow = idx >= interactiveLeft && idx <= interactiveRight;
                const isLeft = idx === interactiveLeft;
                const isRight = idx === interactiveRight;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-base font-bold transition-all ${
                        inWindow
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {val}
                    </div>

                    <div className="mt-1 flex flex-col items-center text-[10px] font-mono font-bold">
                      <span className="text-slate-400">[{idx}]</span>
                      {isLeft && <span className="text-emerald-600">Left (L)</span>}
                      {isRight && <span className="text-amber-600">Right (R)</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setInteractiveLeft((prev) => Math.min(prev + 1, interactiveRight))}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Contract Left (L++)
              </button>

              <button
                onClick={() =>
                  setInteractiveRight((prev) =>
                    Math.min(activeTopic.interactiveData.initialArray.length - 1, prev + 1)
                  )
                }
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Expand Right (R++)
              </button>

              <button
                onClick={() => {
                  setInteractiveLeft(0);
                  setInteractiveRight(1);
                }}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                title="Reset Pointers"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Triggered Flashcards & Revision Quiz Modals */}
      <FlashcardsModal
        isOpen={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        flashcards={activeTopic.flashcards}
        onFinishFlashcards={handleFinishFlashcards}
        topicTitle={activeTopic.title}
      />

      <RevisionQuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        questions={activeTopic.quiz}
        topicTitle={activeTopic.title}
      />
    </div>
  );
};
