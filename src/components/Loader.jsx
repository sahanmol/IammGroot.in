import React from 'react';

/**
 * Standard spinner for full page actions or sections.
 */
export const Loader = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center min-h-[250px] ${className}`}>
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-brand-primary dark:border-t-indigo-500 animate-spin"></div>
      </div>
    </div>
  );
};

/**
 * Animated skeletal placeholder card for feed grids.
 */
export const CardSkeleton = () => {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard animate-pulse">
      {/* Cover Image Placeholder */}
      <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800"></div>

      {/* Content Area Placeholders */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        {/* Category & Date Row */}
        <div className="flex items-center gap-3">
          <div className="h-4 w-14 rounded-md bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Excerpt Paragraph */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Card Footer Divider Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-10 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="h-4 w-8 rounded bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
