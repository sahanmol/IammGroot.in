import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import api from '../utils/api.js';
import ArticleCard from '../components/ArticleCard.jsx';
import { CardSkeleton } from '../components/Loader.jsx';
import SponsoredBadge from '../components/SponsoredBadge.jsx';

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Spotlight and Hero article states
  const [heroArticle, setHeroArticle] = useState(null);
  const [spotlightArticle, setSpotlightArticle] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('all');

  const fetchHomeContent = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch spotlight (latest sponsored article)
      const spotlightRes = await api.get('/articles?category=sponsored&limit=1');
      if (spotlightRes.data.articles && spotlightRes.data.articles.length > 0) {
        setSpotlightArticle(spotlightRes.data.articles[0]);
      } else {
        // Fallback: search for any sponsored article
        const fallbackSpotlight = await api.get('/articles?limit=20');
        const found = fallbackSpotlight.data.articles.find(a => a.isSponsored);
        if (found) setSpotlightArticle(found);
      }

      // 2. Fetch main grid articles (includes pagination and category filter)
      const gridRes = await api.get(`/articles?category=${category}&page=${page}&limit=6`);
      const list = gridRes.data.articles || [];
      setArticles(list);
      setTotalPages(gridRes.data.totalPages || 1);

      // 3. Set the latest non-sponsored article as the hero if on page 1 and category is 'all'
      if (page === 1 && category === 'all' && list.length > 0) {
        // Find first non-sponsored post for Hero
        const nonSponsored = list.find(a => !a.isSponsored);
        if (nonSponsored) {
          setHeroArticle(nonSponsored);
        }
      }
    } catch (err) {
      console.error('Failed to load homepage content:', err);
      setError('Could not connect to the database. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeContent();
  }, [category, page]);

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setPage(1); // reset to page 1 on category change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'tech-news', label: 'Tech News' },
    { id: 'startups', label: 'Startups & VC' },
    { id: 'coding', label: 'Coding' },
    { id: 'ai', label: 'AI & Data' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>TechSpotlight | Latest Tech News & Sponsored Startup Insights</title>
        <meta name="description" content="Read daily updates on startup news, engineering codebases, artificial intelligence breakthroughs, and Sunday Sponsored Spotlights featuring rising tech companies." />
      </Helmet>

      {/* Database Error Banner */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-8 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-400">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* 1. Hero Section (Latest Non-sponsored Post) */}
      {!loading && heroArticle && page === 1 && category === 'all' && (
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-brand-darkBorder bg-slate-100 dark:bg-slate-900/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Hero Image */}
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[450px]">
                <img
                  src={heroArticle.coverImage.startsWith('/uploads') ? `http://localhost:5000${heroArticle.coverImage}` : heroArticle.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200'}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hero Content */}
              <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-10 bg-white dark:bg-brand-darkCard">
                <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="bg-brand-primary/10 text-brand-primary dark:text-indigo-400 px-2 py-0.5 rounded-md">
                    Featured
                  </span>
                  <span>
                    {new Date(heroArticle.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4 hover:text-brand-primary transition-colors">
                  <Link to={`/article/${heroArticle.slug}`}>{heroArticle.title}</Link>
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                  {heroArticle.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs">
                    <span className="block font-bold text-slate-900 dark:text-white">{heroArticle.author?.name || 'Staff Writer'}</span>
                    <span className="text-slate-500">{heroArticle.readTime} min read</span>
                  </div>
                  <Link
                    to={`/article/${heroArticle.slug}`}
                    className="flex items-center gap-1 text-sm font-bold text-brand-primary hover:text-brand-primaryHover dark:text-indigo-400 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Sponsored Spotlight Section (Prominent Amber Spotlight) */}
      {!loading && spotlightArticle && (
        <section className="mb-12">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-amber-500/[0.04] dark:bg-amber-500/[0.02] border border-amber-500/20 shadow-md">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-20 pointer-events-none">
              <Sparkles size={120} className="text-amber-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Spotlight Cover */}
              <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
                <img
                  src={spotlightArticle.coverImage.startsWith('/uploads') ? `http://localhost:5000${spotlightArticle.coverImage}` : spotlightArticle.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'}
                  alt={spotlightArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Spotlight details */}
              <div className="flex-grow">
                <div className="mb-3">
                  <SponsoredBadge sponsorName={spotlightArticle.sponsorName} />
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  <Link to={`/article/${spotlightArticle.slug}`}>{spotlightArticle.title}</Link>
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-2 mb-4 line-clamp-3">
                  {spotlightArticle.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    By {spotlightArticle.author?.name || 'Staff Editor'}
                  </span>
                  <span>•</span>
                  <span>{spotlightArticle.readTime} min spotlight read</span>
                  <Link
                    to={`/article/${spotlightArticle.slug}`}
                    className="ml-auto flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <span>Analyze spotlight</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Feeds & Categorization */}
      <section className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-brand-darkBorder pb-4 mb-8 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-brand-primary" />
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Latest Stories
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-lg font-bold tracking-wide transition-all whitespace-nowrap ${
                  category === cat.id
                    ? 'bg-brand-primary text-white shadow-md shadow-indigo-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid / Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-brand-darkBorder bg-slate-50/50 dark:bg-slate-900/10">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              No articles found in this category. Check back later!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <ArticleCard key={art._id} article={art} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkCard text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold px-4">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkCard text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
