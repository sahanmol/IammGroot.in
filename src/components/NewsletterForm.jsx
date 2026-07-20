import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../utils/api.js';

export const NewsletterForm = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setState('loading');
    setMsg('');

    try {
      const res = await api.post('/newsletter', { email });
      if (res.data.success) {
        setState('success');
        setMsg(res.data.message);
        setEmail('');
      }
    } catch (err) {
      setState('error');
      setMsg(err.response?.data?.message || 'An error occurred. Please check the email format.');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {state === 'success' ? (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 animate-fade-in">
          <CheckCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Success!</h4>
            <p className="text-xs mt-1 leading-relaxed opacity-90">{msg}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-indigo-500/50 transition-all text-sm"
              required
              disabled={state === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all active:scale-95 disabled:opacity-50"
          >
            {state === 'loading' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>Subscribe</span>
                <Send size={14} />
              </>
            )}
          </button>
        </form>
      )}

      {state === 'error' && (
        <div className="flex items-start gap-3 p-4 mt-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 dark:text-rose-400 animate-fade-in">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Error</h4>
            <p className="text-xs mt-1 leading-relaxed opacity-90">{msg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
