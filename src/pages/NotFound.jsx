import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center animate-fade-in">
      <Helmet>
        <title>404 Page Not Found | TechSpotlight</title>
      </Helmet>
      
      <div className="flex justify-center mb-6 text-slate-300 dark:text-slate-700">
        <Compass size={80} className="animate-spin [animation-duration:10s]" />
      </div>
      
      <h1 className="text-6xl font-extrabold text-brand-primary mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
        The link you followed may be broken, or the article may have been retracted by our editors.
      </p>
      
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold px-5 py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
      >
        <Home size={16} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFound;
