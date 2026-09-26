import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleCourses } from '../../data/mockData';
import { CourseItem } from '../../types';

export const MyCourses: React.FC = () => {
  const { openTopic, t } = useApp();

  const [mainFilter, setMainFilter] = useState<'All Courses' | 'Development' | 'Design' | 'Data Science'>('All Courses');
  const [subFilter, setSubFilter] = useState<string>('All');
  const [previewCourse, setPreviewCourse] = useState<CourseItem | null>(null);

  const mainCategories = ['All Courses', 'Development', 'Design', 'Data Science'] as const;

  const subCategoriesMap: { [key: string]: string[] } = {
    Development: [
      'All',
      'Web Development',
      'Front-end',
      'Back-end',
      'Java',
      'Python',
      'DevOps & Cloud',
      'Cybersecurity',
    ],
    Design: ['All', 'UI/UX', 'Graphic', 'Visual Design', 'Product Design'],
    'Data Science': ['All', 'Data Analytics', 'Deep Learning', 'Generative AI', 'NLP'],
  };

  const handleMainFilterChange = (cat: typeof mainFilter) => {
    setMainFilter(cat);
    setSubFilter('All');
  };

  const filteredCourses = sampleCourses.filter((course) => {
    if (mainFilter !== 'All Courses' && course.category !== mainFilter) {
      return false;
    }
    if (subFilter !== 'All' && course.subCategory !== subFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header - concise, minimal matter */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.myCourses}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pick up where you left and discover your next skill.
        </p>
      </div>

      {/* Main Filter Pills */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleMainFilterChange(cat)}
              className={`rounded-xl px-3.5 py-1.5 transition-all text-xs ${
                mainFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-Filters Pills */}
        {mainFilter !== 'All Courses' && subCategoriesMap[mainFilter] && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Track:
            </span>
            {subCategoriesMap[mainFilter].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubFilter(sub)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  subFilter === sub
                    ? 'bg-indigo-100 text-indigo-800 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Minimal & Scannable Course Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-900">
              <img
                src={course.image}
                alt={course.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                {course.subCategory}
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-bold text-slate-900 backdrop-blur-xs shadow-xs">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Concise Course Info */}
            <div className="flex flex-1 flex-col p-4 space-y-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  By {course.instructor}
                </p>
              </div>

              {/* Progress Bar & Module Count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span className="text-indigo-600">{course.progressPercentage}% done</span>
                  <span className="text-slate-400">
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Action Button - Direct, Fast */}
              <div className="mt-auto pt-1">
                <button
                  onClick={() => openTopic(course.nextTopicId || 'topic-sliding-window')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
