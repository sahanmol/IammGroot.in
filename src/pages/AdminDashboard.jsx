import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit2, Trash2, Globe, Eye, FileText, CheckCircle2, UserPlus, EyeOff, Loader2, Sparkles, Mail } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';

export const AdminDashboard = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Articles & Subscribers State
  const [articles, setArticles] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [authors, setAuthors] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Inline Author form states
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [authorSuccessMsg, setAuthorSuccessMsg] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Fetch articles (admin view enables draft viewing)
      const articlesRes = await api.get('/articles?adminView=true&limit=100');
      setArticles(articlesRes.data.articles || []);

      // Fetch newsletter subscribers
      const subscribersRes = await api.get('/newsletter');
      setSubscribers(subscribersRes.data.subscribers || []);

      // Fetch authors
      const authorsRes = await api.get('/articles/meta/authors');
      setAuthors(authorsRes.data.authors || []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load dashboard data. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin');
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, navigate]);

  // Toggle Draft / Published status
  const handleToggleStatus = async (articleId, currentStatus) => {
    setActionLoading(true);
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await api.put(`/articles/${articleId}`, { status: newStatus });
      setArticles(prev =>
        prev.map(art => (art._id === articleId ? { ...art, status: newStatus } : art))
      );
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to toggle status.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('Are you sure you want to delete this article? This action is permanent.')) {
      return;
    }
    setActionLoading(true);
    try {
      await api.delete(`/articles/${articleId}`);
      setArticles(prev => prev.filter(art => art._id !== articleId));
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to delete article.');
    } finally {
      setActionLoading(false);
    }
  };

  // Add Author
  const handleAddAuthor = async (e) => {
    e.preventDefault();
    if (!authorName) return;
    setActionLoading(true);
    setAuthorSuccessMsg('');
    try {
      const res = await api.post('/articles/meta/authors', {
        name: authorName,
        bio: authorBio,
        avatar: authorAvatar,
      });
      if (res.data.success) {
        setAuthors(prev => [...prev, res.data.author]);
        setAuthorSuccessMsg('Author added successfully!');
        setAuthorName('');
        setAuthorBio('');
        setAuthorAvatar('');
        setTimeout(() => {
          setShowAuthorForm(false);
          setAuthorSuccessMsg('');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create author profile.');
    } finally {
      setActionLoading(false);
    }
  };

  // Calculate Statistics
  const totalViews = articles.reduce((sum, art) => sum + (art.views || 0), 0);
  const totalPublished = articles.filter(art => art.status === 'published').length;
  const totalDrafts = articles.filter(art => art.status === 'draft').length;

  if (authLoading || loading) {
    return <Loader className="py-24" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>Admin Dashboard | TechSpotlight</title>
      </Helmet>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Editorial Desk
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, {user?.name}. Manage stories, review subscriber metrics, and write updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAuthorForm(!showAuthorForm)}
            className="flex items-center gap-1.5 text-xs border border-slate-200 dark:border-brand-darkBorder hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            <UserPlus size={16} />
            <span>Add Author</span>
          </button>

          <Link
            to="/admin/editor"
            className="flex items-center gap-1.5 text-xs bg-brand-primary hover:bg-brand-primaryHover text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Plus size={16} />
            <span>Create Story</span>
          </Link>
        </div>
      </div>

      {/* Author Dialog overlay */}
      {showAuthorForm && (
        <div className="mb-8 p-6 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkCard/50 animate-slide-up">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Create Writer Profile
          </h3>
          {authorSuccessMsg && (
            <div className="p-3 mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 text-xs font-semibold">
              {authorSuccessMsg}
            </div>
          )}
          <form onSubmit={handleAddAuthor} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                  Name (Required)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-semibold">
                  Bio (Optional)
                </label>
                <input
                  type="text"
                  value={authorBio}
                  onChange={(e) => setAuthorBio(e.target.value)}
                  placeholder="Staff columnist..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAuthorForm(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="flex items-center justify-center gap-1.5 text-xs bg-brand-primary hover:bg-brand-primaryHover text-white font-bold px-5 py-2 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {actionLoading && <Loader2 size={12} className="animate-spin" />}
                <span>Add Author</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Errors */}
      {errorMsg && (
        <div className="p-4 mb-8 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard">
          <FileText className="text-brand-primary mb-2" size={20} />
          <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Posts</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{articles.length}</span>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard">
          <CheckCircle2 className="text-emerald-500 mb-2" size={20} />
          <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Published</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{totalPublished}</span>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard">
          <EyeOff className="text-slate-400 mb-2" size={20} />
          <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Drafts</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{totalDrafts}</span>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard">
          <Eye className="text-brand-primary mb-2" size={20} />
          <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Page Views</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{totalViews}</span>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard col-span-2 md:col-span-1">
          <Mail className="text-brand-sponsored mb-2" size={20} />
          <span className="block text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Subscribers</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{subscribers.length}</span>
        </div>
      </div>

      {/* Main Articles Table */}
      <div className="border border-slate-200 dark:border-brand-darkBorder rounded-2xl overflow-hidden bg-white dark:bg-brand-darkCard shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Manage Stories
          </h2>
          <span className="text-xs text-slate-500">
            Click status pill to publish/unpublish.
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-sm">
            No articles exist. Create one to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Author</th>
                  <th className="px-6 py-3.5">Views</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {articles.map((art) => {
                  const isPub = art.status === 'published';
                  return (
                    <tr 
                      key={art._id}
                      className="hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white max-w-sm truncate">
                        <Link to={`/article/${art.slug}`} className="hover:underline">
                          {art.title}
                        </Link>
                        {art.isSponsored && (
                          <span className="ml-2 inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded">
                            Ad
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold capitalize text-slate-500">
                        {art.category.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                        {art.author?.name || 'Staff Editor'}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {art.views || 0}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(art._id, art.status)}
                          disabled={actionLoading}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border cursor-pointer select-none transition-all ${
                            isPub
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
                              : 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                          }`}
                        >
                          {art.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link
                            to={`/admin/editor?edit=${art._id}`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit Post"
                          >
                            <Edit2 size={14} />
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(art._id)}
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/25 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
