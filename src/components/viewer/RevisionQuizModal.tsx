import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../../types';
import { useApp } from '../../context/AppContext';

interface RevisionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  topicTitle: string;
}

export const RevisionQuizModal: React.FC<RevisionQuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  topicTitle,
}) => {
  const { addXp } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen || !questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      addXp(30);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore in case of headless
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
              <Zap className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Revision Quiz · Immediate Feedback
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!quizFinished ? (
          <>
            {/* Question Progress */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-900 truncate max-w-[260px]">
                {topicTitle}
              </span>
              <span className="font-mono tabular-nums font-bold text-indigo-600">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50/70 text-rose-900';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 opacity-60 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition-all ${optionStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation box after submit */}
              {isAnswerSubmitted && (
                <div
                  className={`rounded-xl p-3.5 text-xs leading-relaxed ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-rose-600" />
                        <span>Incorrect. Notice the invariant:</span>
                      </>
                    )}
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </div>

            {/* Bottom button */}
            <div className="flex justify-end pt-2">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className={`rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all ${
                    selectedOption === null
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                >
                  <span>{isLast ? 'View Results' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Finished Quiz Summary */
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Sparkles className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Topic Revision Complete!
            </h3>

            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              You scored <strong className="text-indigo-600 font-mono font-bold">{score} / {questions.length}</strong> correct and earned <strong className="text-amber-600 font-mono">+30 XP</strong> toward your placement rank.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Quiz</span>
              </button>

              <a
                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                  `🎯 Just mastered "${topicTitle}" on Smart Intern with a score of ${score}/${questions.length}! 🚀 Building strong software engineering foundations. Check it out: https://smartintern.app #SmartIntern #Engineering #Learning`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white hover:bg-[#004182] transition-colors"
                title="Post milestone on LinkedIn"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                </svg>
                <span>Post on LinkedIn</span>
              </a>

              <button
                onClick={onClose}
                className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
