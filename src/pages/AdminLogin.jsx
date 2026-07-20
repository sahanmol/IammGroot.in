import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { KeyRound, Mail, User, ShieldAlert, Loader2, Sparkles, Terminal } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

export const AdminLogin = () => {
  const { user, login, register, setupRequired, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI states
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/admin/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (setupRequired && !name) return;

    setFormLoading(true);
    setErrorMsg('');

    try {
      if (setupRequired) {
        // Setup initial admin
        const res = await register(name, email, password);
        if (res && !res.success) {
          setErrorMsg(res.message || 'Setup registration failed.');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        // Regular login
        const res = await login(email, password);
        if (res && !res.success) {
          setErrorMsg(res.message || 'Invalid email or password.');
        } else {
          navigate('/admin/dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected connection error occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 size={36} className="animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 animate-fade-in">
      <Helmet>
        <title>
          {setupRequired ? 'Setup Administrator Account' : 'Admin Login'} | TechSpotlight
        </title>
      </Helmet>

      <div className="border border-slate-200 dark:border-brand-darkBorder rounded-3xl bg-white dark:bg-brand-darkCard p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-brand-primary/10 text-brand-primary p-3 rounded-2xl mb-4">
            {setupRequired ? <Sparkles size={24} /> : <KeyRound size={24} />}
          </div>
          
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {setupRequired ? 'Initialize Platform' : 'Admin Portal'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {setupRequired
              ? 'Configure your master credentials to initialize TechSpotlight.'
              : 'Sign in to write stories, manage subscribers, and edit spotlights.'}
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600 text-xs font-semibold animate-fade-in">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {setupRequired && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                  required
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@techspotlight.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                required
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-brand-darkBorder bg-slate-50 dark:bg-brand-darkBg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                required
              />
              <KeyRound size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={formLoading}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 mt-6 text-sm"
          >
            {formLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {setupRequired ? 'Setup & Launch console' : 'Login to dashboard'}
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        {setupRequired && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px] text-center text-slate-400 leading-normal">
            Note: Admin registration is locked after this initial run to secure your configuration.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
