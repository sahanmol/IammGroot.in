import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Eye, Calendar, Share2, Twitter, Linkedin, Link2, ChevronLeft, User } from 'lucide-react';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';
import SponsoredBadge from '../components/SponsoredBadge.jsx';
import ArticleCard from '../components/ArticleCard.jsx';

export const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/articles/${slug}`);
        setArticle(res.data.article);
        setRelated(res.data.relatedArticles || []);
      } catch (err) {
        console.error('Failed to load article detail:', err);
        setError(err.response?.data?.message || 'Article not found. It may have been deleted or draft status was toggled.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const getCoverImage = () => {
    if (!article.coverImage) {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200';
    }
    if (article.coverImage.startsWith('/uploads')) {
      const backendUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';
      return `${backendUrl}${article.coverImage}`;
    }
    return article.coverImage;
  };

  const formattedDate = article?.publishDate
    ? new Date(article.publishDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const shareOnTwitter = () => {
    const text = `Read "${article.title}" on TechSpotlight`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedin = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <Loader className="py-24" />;
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{error || 'The requested article could not be located.'}</p>
        <Link to="/" className="inline-flex items-center gap-1 bg-brand-primary text-white font-bold px-4 py-2.5 rounded-xl text-sm">
          <ChevronLeft size={16} />
          <span>Back to Feed</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>{article.title} | TechSpotlight</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={getCoverImage()} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary font-bold tracking-wide uppercase mb-6 transition-colors">
        <ChevronLeft size={14} />
        Back to Stories
      </Link>

      {/* Main Post Content */}
      <article>
        {/* Category / Spotlight Header */}
        <div className="mb-4">
          {article.isSponsored ? (
            <SponsoredBadge sponsorName={article.sponsorName} className="py-2 px-4 text-xs font-extrabold" />
          ) : (
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-indigo-400 bg-brand-primary/10 px-2.5 py-1 rounded-md">
              {article.category.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
          {article.title}
        </h1>

        {/* Excerpt Banner */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-8 italic border-l-4 border-slate-300 dark:border-slate-800 pl-4">
          {article.excerpt}
        </p>

        {/* Metadata Details Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 dark:border-brand-darkBorder/80 py-4 mb-8 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
              <User size={14} className="text-brand-primary" />
              {article.author?.name || 'Staff Writer'}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1" title="Reading estimation">
              <Clock size={13} />
              {article.readTime} min read
            </span>
            <span className="flex items-center gap-1" title="Total view count">
              <Eye size={13} />
              {article.views} views
            </span>

            {/* Sharing utilities */}
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
              <button
                onClick={shareOnTwitter}
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share on Twitter"
              >
                <Twitter size={14} />
              </button>
              <button
                onClick={shareOnLinkedin}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin size={14} />
              </button>
              <button
                onClick={copyLinkToClipboard}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${copied ? 'text-emerald-500 hover:text-emerald-500' : ''}`}
                title="Copy Link to Clipboard"
              >
                <Link2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Big Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200 dark:border-slate-800 aspect-[16/9]">
          <img
            src={getCoverImage()}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* HTML Content Body */}
        <div 
          className="prose-content max-w-none text-slate-800 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Author Profile Bio card */}
      {article.author && (
        <section className="mt-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkCard/40">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-white">
              <img
                src={article.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                About {article.author.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {article.author.bio || 'TechSpotlight senior editor and columnist specializing in technology, startups, and code review.'}
              </p>
              {/* Author socials */}
              {article.author.socialLinks && (
                <div className="flex gap-3 mt-3 text-slate-400">
                  {article.author.socialLinks.twitter && (
                    <a href={article.author.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-xs hover:text-brand-primary">Twitter</a>
                  )}
                  {article.author.socialLinks.github && (
                    <a href={article.author.socialLinks.github} target="_blank" rel="noreferrer" className="text-xs hover:text-brand-primary">GitHub</a>
                  )}
                  {article.author.socialLinks.linkedin && (
                    <a href={article.author.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-xs hover:text-brand-primary">LinkedIn</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles side-grid */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
            Related Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((art) => (
              <ArticleCard key={art._id} article={art} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticlePage;
