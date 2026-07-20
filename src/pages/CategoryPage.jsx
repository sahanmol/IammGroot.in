import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FolderOpen, ChevronLeft } from 'lucide-react';
import api from '../utils/api.js';
import ArticleCard from '../components/ArticleCard.jsx';
import { CardSkeleton } from '../components/Loader.jsx';

export const CategoryPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categoryLabels = {
    'tech-news': 'Tech News',
    'startups': 'Startups & Venture Capital',
    'coding': 'Software Engineering',
    'ai': 'Artificial Intelligence',
    'sponsored': 'Sponsored Spotlight',
  };

  const getPageTitle = () => {
    return `${categoryLabels[category] || 'Tech News'} Stories | TechSpotlight`;
  };

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/articles?category=${category}&page=${page}&limit=6`);
        setArticles(res.data.articles || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error('Failed to load category articles:', err);
        setError('Error loading stories for this feed. Please verify your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryArticles();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category, page]);

  useEffect(() => {
    setPage(1); // Reset page selection on category path change
  }, [category]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={`Explore TechSpotlight articles, tutorials, and press coverages within ${categoryLabels[category]}.`} />
      </Helmet>

      <Link 
        to="/" 
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary font-bold tracking-wide uppercase mb-6 transition-colors"
      >
        <ChevronLeft size={14} />
        Back to Stories
      </Link>

      {/* Header Banner */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-brand-darkBorder pb-4 mb-8">
        <FolderOpen size={22} className="text-brand-primary" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {categoryLabels[category] || 'Tech Updates'}
        </h1>
      </div>

      {error ? (
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 text-center text-sm font-medium">
          {error}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 dark:border-brand-darkBorder bg-slate-50/50 dark:bg-slate-900/10">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            There are no published stories in this category yet.
          </p>
        </div>
      ) : (
        <>
          {/* Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art._id} article={art} />
            ))}
          </div>

          {/* Pagination Panel */}
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
    </div>
  );
};

export default CategoryPage;
