import React from 'react';
import { Sparkles } from 'lucide-react';

export const SponsoredBadge = ({ sponsorName, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 ${className}`}>
      <Sparkles size={12} className="animate-pulse" />
      <span>
        Sponsored Spotlight {sponsorName ? `| In Partnership with ${sponsorName}` : ''}
      </span>
    </div>
  );
};

export default SponsoredBadge;
