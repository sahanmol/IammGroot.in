import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Globe, Rss } from 'lucide-react';
import NewsletterForm from './NewsletterForm.jsx';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg/30 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              TECH<span className="text-brand-primary">SPOTLIGHT</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Your daily source for tech and startup news. Providing developer hacks from Monday to Saturday, and our exclusive deep-dive case studies in the Sunday Sponsored Spotlight.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="http://localhost:5000/sitemap.xml" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors" title="XML Sitemap">
                <Rss size={18} />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-col gap-3 md:pl-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/category/tech-news" className="hover:text-brand-primary transition-colors">Tech News</Link>
              </li>
              <li>
                <Link to="/category/startups" className="hover:text-brand-primary transition-colors">Startups &amp; VC</Link>
              </li>
              <li>
                <Link to="/category/coding" className="hover:text-brand-primary transition-colors">Coding &amp; Hacks</Link>
              </li>
              <li>
                <Link to="/category/ai" className="hover:text-brand-primary transition-colors">Artificial Intelligence</Link>
              </li>
              <li>
                <Link to="/category/sponsored" className="hover:text-brand-primary transition-colors">Sponsored Spotlights</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Subscribe to get daily stories delivered straight to your inbox.
            </p>
            <NewsletterForm className="mt-1" />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 dark:border-brand-darkBorder/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>&copy; {currentYear} TechSpotlight. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:underline hover:text-slate-600 dark:hover:text-slate-300">Admin Login</Link>
            <a href="/sitemap.xml" className="hover:underline hover:text-slate-600 dark:hover:text-slate-300" target="_blank">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
