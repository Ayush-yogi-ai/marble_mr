import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Lock, Mail, User, Shield, Sparkles } from 'lucide-react';

export const AuthModule: React.FC = () => {
  const { login, register, theme, addToast } = useWorkspace();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (activeTab === 'signup' && !fullName)) {
      addToast('Please satisfy all mandatory entries.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      if (activeTab === 'signin') {
        await login(email);
      } else {
        await register(fullName, email);
      }
    } catch {
      addToast('An unexpected authorization error occurred.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Inject your email address first so we can route credentials.', 'warning');
      return;
    }
    addToast(`A dynamic reset token is transmitted to ${email}`, 'success');
  };

  // Border/Text styles dependent on active theme
  const getThemeStyles = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-4 border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
        input: 'border-2 border-black focus:ring-2 focus:ring-black rounded-none h-11 text-black',
        tabActive: 'bg-black text-white font-bold',
        tabBtn: 'border border-black text-black',
        submitBtn: 'bg-black hover:bg-zinc-900 text-white font-bold text-center border-2 border-black uppercase tracking-wider',
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-[#FAF7F2] border border-[#EBE3D5] text-zinc-800 shadow-xl',
        input: 'border border-[#E2D2B8] bg-white text-zinc-800 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]/40 h-11 rounded-lg',
        tabActive: 'bg-[#C59B27] text-white font-semibold shadow-sm',
        tabBtn: 'text-zinc-600 hover:text-zinc-900 bg-zinc-200/40',
        submitBtn: 'bg-[#C59B27] hover:bg-[#A47D15] text-white font-medium h-11 rounded-lg shadow-sm',
      };
    }
    // Default cobalt/copper dark theme
    return {
      card: 'bg-zinc-950/70 border border-zinc-900/60 backdrop-blur-xl text-zinc-100 shadow-2xl',
      input: 'border border-zinc-800 bg-zinc-900/50 text-zinc-100 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 h-11 rounded-lg',
      tabActive: 'bg-orange-500/15 border border-orange-500/30 text-orange-400 font-medium',
      tabBtn: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border border-transparent',
      submitBtn: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium h-11 rounded-lg shadow-lg shadow-orange-500/10',
    };
  };

  const aStyles = getThemeStyles();

  return (
    <div id="auth-container" className="flex items-center justify-center min-h-[80vh] px-4 animate-fade-in">
      <div id="auth-card" className={`w-full max-w-md p-8 ${aStyles.card}`}>
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 mb-4 animate-pulse">
            <Shield size={24} />
          </div>
          <h2 className="font-display text-2xl tracking-wide font-semibold text-zinc-900 dark:text-zinc-50 contrast:text-black">
            AURELIUS MARBLE ATELIER
          </h2>
          <p className="font-mono text-[9px] tracking-widest text-[#A47D15] dark:text-orange-400/80 uppercase font-bold mt-1">
            Bespoke Stone Stock Ledger &amp; Showroom
          </p>
        </div>

        {/* Tab options split */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-zinc-100/50 dark:bg-zinc-900/40 rounded-lg">
          <button
            id="tab-signin-btn"
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'signin' ? aStyles.tabActive : aStyles.tabBtn
            }`}
          >
            Access Token
          </button>
          <button
            id="tab-signup-btn"
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'signup' ? aStyles.tabActive : aStyles.tabBtn
            }`}
          >
            Deploy Account
          </button>
        </div>

        {/* Form elements selection */}
        <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="block text-[10px] font-mono tracking-wider font-semibold text-zinc-400 uppercase">
                Legal Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User size={15} />
                </div>
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  placeholder="e.g. Aurelius Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`block w-full pl-10 pr-3.5 text-xs transition-colors outline-none ${aStyles.input}`}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] font-mono tracking-wider font-semibold text-zinc-400 uppercase">
              Electronic Mail Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail size={15} />
              </div>
              <input
                id="auth-email-input"
                type="email"
                required
                placeholder="curator@aureliusmarbles.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full pl-10 pr-3.5 text-xs transition-colors outline-none ${aStyles.input}`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono tracking-wider font-semibold text-zinc-400 uppercase">
                Secure Key / Password
              </label>
              {activeTab === 'signin' && (
                <button
                  id="forgot-password-trigger"
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[10px] font-mono text-[#A47D15] dark:text-orange-400/80 hover:underline hover:opacity-85 cursor-pointer"
                >
                  Forgot Key?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock size={15} />
              </div>
              <input
                id="auth-password-input"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-3.5 text-xs transition-colors outline-none ${aStyles.input}`}
              />
            </div>
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center text-xs tracking-wider uppercase font-semibold transition-all mt-6 cursor-pointer ${aStyles.submitBtn} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-zinc-100 border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Identity...</span>
              </span>
            ) : (
              <span>{activeTab === 'signin' ? 'Verify Secret Token' : 'Register Operator'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-200/10 dark:border-zinc-800/60 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <Sparkles size={11} className="text-orange-500" />
          <span>Offline state retains all secure stashed operations</span>
        </div>

      </div>
    </div>
  );
};
