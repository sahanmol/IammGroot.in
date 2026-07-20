import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Quote, Code, Link as LinkIcon, Save, Image as ImageIcon, Loader2, Sparkles 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';

export const AdminEditor = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  // Article form states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('tech-news');
  const [isSponsored, setIsSponsored] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('draft');
  const [publishDate, setPublishDate] = useState('');

  // Image states
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Authors metadata
  const [authors, setAuthors] = useState([]);

  // Editor states
  const [editorHtml, setEditorHtml] = useState('');
  const editorRef = useRef(null);

  // UI state
  const [pageLoading, setPageLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load article metadata (authors) and existing post if in edit mode
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin');
      return;
    }

    const loadData = async () => {
      setPageLoading(true);
      setErrorMsg('');
      try {
        // Fetch writers/authors
        const authorsRes = await api.get('/articles/meta/authors');
        setAuthors(authorsRes.data.authors || []);
        if (authorsRes.data.authors?.length > 0 && !author) {
          setAuthor(authorsRes.data.authors[0]._id);
        }

        // If edit mode, fetch article details
        if (editId) {
          const articleRes = await api.get(`/articles/meta/articles-by-id-internal-route/${editId}`).catch(async () => {
            // If internal route is missing, we list all articles and find the match
            const listRes = await api.get('/articles?adminView=true&limit=100');
            const found = listRes.data.articles.find(a => a._id === editId);
            if (!found) throw new Error('Article not found in database.');
            return { data: { article: found } };
          });

          const art = articleRes.data.article;
          setTitle(art.title);
          setExcerpt(art.excerpt);
          setCategory(art.category);
          setIsSponsored(art.isSponsored || false);
          setSponsorName(art.sponsorName || '');
          setAuthor(art.author?._id || art.author);
          setStatus(art.status);
          setEditorHtml(art.content);
          if (editorRef.current) {
            editorRef.current.innerHTML = art.content;
          }

          if (art.coverImage) {
            if (art.coverImage.startsWith('/uploads')) {
              const backendUrl = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';
              setImagePreview(`${backendUrl}${art.coverImage}`);
            } else {
              setImagePreview(art.coverImage);
              setImageUrl(art.coverImage);
            }
          }

          if (art.publishDate) {
            setPublishDate(new Date(art.publishDate).toISOString().split('T')[0]);
          }
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Failed to initialize editor. Please verify API server.');
      } finally {
        setPageLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, authLoading, editId, navigate]);

  // Handle Cover Image upload selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(''); // reset text url
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Editor rich command helper
  const execEditorCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  // Save/Submit Article
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !author) {
      setErrorMsg('Please enter a title, excerpt, and select an author.');
      return;
    }

    const contentText = editorRef.current ? editorRef.current.innerHTML : editorHtml;
    if (!contentText || contentText === '<br>' || contentText === '') {
      setErrorMsg('Article content body is required.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('excerpt', excerpt);
      formData.append('content', contentText);
      formData.append('category', category);
      formData.append('isSponsored', isSponsored);
      formData.append('sponsorName', isSponsored ? sponsorName : '');
      formData.append('author', author);
      formData.append('status', status);
      if (publishDate) {
        formData.append('publishDate', publishDate);
      }

      if (imageFile) {
        formData.append('coverImage', imageFile);
      } else if (imageUrl) {
        formData.append('coverImage', imageUrl);
      }

      let res;
      if (editId) {
        res = await api.put(`/articles/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/articles', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data.success) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to save article.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || pageLoading) {
    return <Loader className="py-24" />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <Helmet>
        <title>
          {editId ? 'Edit Article' : 'Create Article'} | TechSpotlight
        </title>
      </Helmet>

      {/* Back link */}
      <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-primary font-bold tracking-wide uppercase mb-6 transition-colors">
        <ChevronLeft size={14} />
        Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-brand-darkBorder pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {editId ? 'Modify Story' : 'Compose Story'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
            status === 'published' 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' 
              : 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
          }`}>
            {status}
          </span>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 text-xs bg-brand-primary hover:bg-brand-primaryHover text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>Save Article</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Writing Inputs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary text-base"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Excerpt Summary
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief, engaging summary of the article (1-2 sentences)"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkCard text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
              required
            />
          </div>

          {/* Custom Rich Text Editor */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Body Content
            </label>
            <div className="border border-slate-200 dark:border-brand-darkBorder rounded-xl overflow-hidden bg-white dark:bg-brand-darkCard shadow-sm">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-1 items-center p-2 border-b border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-slate-900/30">
                <button
                  type="button"
                  onClick={() => execEditorCommand('bold')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Bold"
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('italic')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Italic"
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('formatBlock', '<h1>')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  title="H1 heading"
                >
                  <Heading1 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('formatBlock', '<h2>')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  title="H2 heading"
                >
                  <Heading2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('insertUnorderedList')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Bullet list"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('insertOrderedList')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Numbered list"
                >
                  <ListOrdered size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('formatBlock', '<blockquote>')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Blockquote"
                >
                  <Quote size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => execEditorCommand('formatBlock', '<pre>')}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Code block"
                >
                  <Code size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter the link URL:');
                    if (url) execEditorCommand('createLink', url);
                  }}
                  className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  title="Insert hyperlink"
                >
                  <LinkIcon size={16} />
                </button>
              </div>

              {/* Editing Area */}
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                className="prose-content min-h-[300px] max-h-[500px] overflow-y-auto p-4 outline-none focus:ring-1 focus:ring-brand-primary/20 bg-white dark:bg-brand-darkCard"
                style={{ direction: 'ltr' }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              Select text and use the toolbar to format. Double check spacing.
            </p>
          </div>
        </div>

        {/* Right Side: Options & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-slate-200 dark:border-brand-darkBorder rounded-2xl bg-slate-50 dark:bg-brand-darkCard p-6 space-y-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Publishing Options
            </h3>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
              >
                <option value="tech-news">Tech News</option>
                <option value="startups">Startups</option>
                <option value="coding">Coding</option>
                <option value="ai">AI</option>
                <option value="sponsored">Sponsored Spotlight</option>
              </select>
            </div>

            {/* Author selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Author
              </label>
              {authors.length === 0 ? (
                <p className="text-xs text-rose-500">
                  No writers found. Create an author on the Dashboard first!
                </p>
              ) : (
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
                  required
                >
                  {authors.map((auth) => (
                    <option key={auth._id} value={auth._id}>
                      {auth.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Status selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Publishing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
              </select>
            </div>

            {/* Publish Date Override (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Publish Date (Optional)
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
              />
            </div>

            {/* Sponsored Content Toggle */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSponsored || category === 'sponsored'}
                  onChange={(e) => setIsSponsored(e.target.checked)}
                  disabled={category === 'sponsored'} // forced sponsored if category matches
                  className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary h-4 w-4"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Sponsored Content
                </span>
              </label>
            </div>

            {/* Sponsor Brand Name input */}
            {(isSponsored || category === 'sponsored') && (
              <div className="animate-slide-up">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Sponsor Brand Name
                </label>
                <input
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. Vercel, Supabase"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
                  required={isSponsored || category === 'sponsored'}
                />
              </div>
            )}
          </div>

          {/* Cover Image Settings Card */}
          <div className="border border-slate-200 dark:border-brand-darkBorder rounded-2xl bg-slate-50 dark:bg-brand-darkCard p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Cover Image
            </h3>

            {/* File Upload Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Upload File (Recommended)
              </label>
              <div className="relative border border-dashed border-slate-350 dark:border-slate-700 rounded-xl bg-white dark:bg-brand-darkBg p-3 hover:bg-slate-50/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center py-2 text-center text-slate-400">
                  <ImageIcon size={20} className="mb-1 text-slate-400" />
                  <span className="text-[10px] font-medium">Click to select photo</span>
                </div>
              </div>
            </div>

            {/* Text input URL option */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Or Paste Image Link
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                  setImageFile(null); // clear file choice
                }}
                placeholder="https://images.unsplash.com/photo..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white"
              />
            </div>

            {/* Preview pane */}
            {imagePreview && (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/10] bg-slate-100 dark:bg-slate-900 animate-fade-in">
                <img
                  src={imagePreview}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Submission button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 text-sm"
          >
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                <span>Save Article</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditor;
