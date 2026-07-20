import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Calendar, User } from 'lucide-react';
import { SponsoredBadge } from './SponsoredBadge.jsx';

export const ArticleCard = ({ article }) => {
  // Resolve image source. Local uploads must point to backend server port.
  const getCoverImage = () => {
    if (!article.coverImage) {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'; // standard backup coding photo
    }
    if (article.coverImage.startsWith('/uploads')) {
      const backendUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';
      return `${backendUrl}${article.coverImage}`;
    }
    return article.coverImage;
  };

  const categoryLabels = {
    'tech-news': 'Tech News',
    'startups': 'Startups',
    'coding': 'Coding',
    'ai': 'Artificial Intelligence',
    'sponsored': 'Sponsored Spotlight',
  };

  const categoryStyles = {
    'tech-news': 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
    'startups': 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
    'coding': 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
    'ai': 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
    'sponsored': 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
  };

  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className={`group flex flex-col h-full rounded-2xl overflow-hidden border bg-white dark:bg-brand-darkCard transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      article.isSponsored 
        ? 'border-amber-400/40 dark:border-amber-500/20 ring-1 ring-amber-500/5 shadow-md shadow-amber-500/5' 
        : 'border-slate-200 dark:border-brand-darkBorder shadow-sm'
    }`}>
      {/* Cover Image Container */}
      <Link 
        to={`/article/${article.slug}`} 
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900/50"
      >
        <img
          src={getCoverImage()}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {article.isSponsored && (
          <div className="absolute top-3 left-3 z-10">
            <SponsoredBadge sponsorName="" className="shadow-lg backdrop-blur-md bg-amber-500/90 text-white border-none py-1 px-2.5 text-[10px]" />
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-5">
        {/* Post Metadata Row */}
        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
          {!article.isSponsored && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${categoryStyles[article.category]}`}>
              {categoryLabels[article.category] || article.category}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-indigo-400 transition-colors">
          <Link to={`/article/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt Summary */}
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        {/* Footer Details */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
            <User size={12} className="text-brand-primary" />
            {article.author?.name || 'Staff Writer'}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Reading time">
              <Clock size={12} />
              {article.readTime}m
            </span>
            <span className="flex items-center gap-1" title="Views">
              <Eye size={12} />
              {article.views || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
