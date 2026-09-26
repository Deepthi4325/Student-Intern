import React, { useState } from 'react';
import {
  X,
  RotateCw,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
} from 'lucide-react';
import { Flashcard } from '../../types';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
  onFinishFlashcards: () => void;
  topicTitle: string;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  flashcards,
  onFinishFlashcards,
  topicTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  if (!isOpen || !flashcards || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];
  const isLast = currentIndex === flashcards.length - 1;

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = (mastered: boolean) => {
    if (mastered) setMasteredCount((prev) => prev + 1);
    setIsFlipped(false);
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishFlashcards();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
              ⚡
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Auto-Triggered Revision Flashcards
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress & Topic */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-900 truncate max-w-[260px]">
            {topicTitle}
          </span>
          <span className="font-mono tabular-nums font-bold text-indigo-600">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
        </div>

        {/* 3D Flip Flashcard */}
        <div
          onClick={handleFlip}
          className="group relative h-64 w-full cursor-pointer rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-6 shadow-md transition-all hover:border-indigo-400 hover:shadow-lg flex flex-col justify-between"
        >
          {/* Card Tag */}
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase tracking-wider">
              {isFlipped ? 'Answer & Core Proof' : 'Prompt / Invariant'}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
              <RotateCw className="h-3 w-3" />
              <span>Click to {isFlipped ? 'see question' : 'reveal answer'}</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="my-auto py-2">
            {!isFlipped ? (
              <div className="text-center">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentCard.question}
                </p>
                {currentCard.tip && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-800 border border-amber-200/60">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                    <span>Tip: {currentCard.tip}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <div className="text-base sm:text-lg font-extrabold text-indigo-950">
                  {currentCard.answer}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {currentCard.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Flip Indicator */}
          <div className="text-center text-[11px] text-slate-400">
            {isFlipped ? 'Tap anywhere to flip back' : 'Tap anywhere to flip'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => handleNext(false)}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Review Again Later
          </button>

          <button
            onClick={() => handleNext(true)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isLast ? 'Complete & Start Quiz' : 'Mastered Concept'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
