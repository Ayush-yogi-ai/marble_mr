import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  Sun, 
  Moon, 
  Eye, 
  User, 
  Server, 
  Database, 
  Settings, 
  Trash2, 
  ArrowRight,
  Code2,
  DatabaseZap,
  HardDriveUpload,
  Lock,
  Sparkles
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    user, 
    updateProfile, 
    theme, 
    setTheme, 
    resetDatabase,
    isOnline,
    forceSyncData
  } = useWorkspace();

  // Profile Form States
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [role, setRole] = useState(user?.role || '');
  const [company, setCompany] = useState(user?.company || '');

  // Reset Confirmation state
  const [confirmReset, setConfirmReset] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(fullName, company, role);
  };

  const handleDbReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetDatabase();
    setConfirmReset(false);
  };

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black',
        form: 'bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        input: 'border-2 border-black rounded-none h-11 text-black p-2.5',
        btnActive: 'bg-black text-white font-bold',
        btnInactive: 'border border-black text-black hover:bg-zinc-100',
        prioHigh: 'bg-black text-white text-xs border-2 border-black',
        badge: 'border-2 border-black select-none',
        resetBtn: 'bg-black text-white border-2 border-black font-bold hover:bg-zinc-900',
        badgeSynced: 'bg-emerald-100 border border-emerald-450 text-emerald-800 font-bold',
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm',
        form: 'bg-[#FAF7F2] border border-[#E2D2B8] p-6 rounded-xl shadow-lg',
        input: 'border border-[#E2D2B8] bg-white text-zinc-850 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]/40 rounded-lg h-11 p-3.5',
        btnActive: 'bg-[#C59B27] text-white font-semibold',
        btnInactive: 'text-zinc-650 hover:bg-[#F2ECE1]/50 border border-[#EBE3D5]',
        prioHigh: 'bg-amber-50 text-[#9A7512] border border-amber-200',
        badge: 'bg-[#F2ECE1] text-[#9A7512] border border-[#EBE3D5]',
        resetBtn: 'bg-red-50 hover:bg-red-100/50 text-red-700 border border-red-200 font-medium',
        badgeSynced: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md',
      form: 'bg-zinc-950/90 border border-zinc-900 p-6 rounded-xl shadow-2xl backdrop-blur-md',
      input: 'border border-zinc-800 bg-zinc-900/50 text-zinc-100 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 rounded-lg h-11 p-3.5',
      btnActive: 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold',
      btnInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-zinc-850',
      prioHigh: 'bg-orange-500/10 text-orange-400 border border-orange-500/25',
      badge: 'bg-zinc-905/60 text-zinc-450 border border-zinc-900',
      resetBtn: 'bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/20 font-medium',
      badgeSynced: 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/20'
    };
  };

  const sStyles = getThemeText();

  return (
    <div id="settings-view-screen" className="space-y-6 animate-fade-in">
      
      {/* Header operations area */}
      <div className="flex justify-between items-center pb-1">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Atelier Settings &amp; Presets
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Configure visual showroom skins, curator identity characteristics, and cloud database persistence logs.
          </p>
        </div>
      </div>

      {/* Grid: Left Column Settings vs Right Column Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Configuration Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Theme Option selection card */}
          <div id="theme-selection-card" className={`p-6 rounded-xl ${sStyles.card} space-y-4`}>
            <div className="border-b border-zinc-200/5 dark:border-zinc-850 pb-2.5">
              <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                <Settings size={15} className="text-[#C59B27] animate-spin" style={{ animationDuration: '6s' }} />
                <span>Showroom Display Skins</span>
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1">
                Select visual colorways calibrated to align with premium marble and granite textures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Option 1: Elegant Light Chalk */}
              <button
                id="theme-select-light"
                type="button"
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl text-left border cursor-pointer transition-all flex flex-col justify-between ${
                  theme === 'light' 
                    ? 'border-[#C59B27] bg-[#FAF7F2] shadow-md shadow-[#C59B27]/5' 
                    : 'border-zinc-200 dark:border-zinc-900 hover:border-[#C59B27]/40 dark:hover:border-zinc-800'
                }`}
              >
                <Sun size={18} className="text-[#C59B27] mb-6" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900">Carrara &amp; Gold</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Polished Italian base, elegant gold trim lines.</p>
                </div>
              </button>

              {/* Option 2: Obsidian Copper Dark */}
              <button
                id="theme-select-dark"
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl text-left border cursor-pointer transition-all flex flex-col justify-between ${
                  theme === 'dark' 
                    ? 'border-orange-500/40 bg-zinc-950/80 shadow-md shadow-orange-500/5' 
                    : 'border-zinc-200 dark:border-zinc-900 hover:border-orange-500/30'
                }`}
              >
                <Moon size={18} className="text-[#C59B27] mb-6" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-150 dark:text-zinc-50">Nero Arni</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Carbon granite slab with burnished calcite veins.</p>
                </div>
              </button>

              {/* Option 3: High Contrast Mode */}
              <button
                id="theme-select-contrast"
                type="button"
                onClick={() => setTheme('contrast')}
                className={`p-4 rounded-xl text-left border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  theme === 'contrast' 
                    ? 'border-black bg-white shadow-md' 
                    : 'border-zinc-200 dark:border-zinc-900 hover:border-black'
                }`}
              >
                <Eye size={18} className="text-black dark:text-zinc-500 mb-6" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900">High Legibility</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Absolute monochrome, large borders, pure blacks.</p>
                </div>
              </button>

            </div>
          </div>

          {/* Profile metadata update card */}
          <div id="profile-metadata-card" className={`p-6 rounded-xl ${sStyles.card}`}>
            <div className="border-b border-zinc-200/5 dark:border-zinc-850 pb-2.5 mb-5">
              <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                <User size={15} className="text-[#C59B27]" />
                <span>Curator Profile Characteristics</span>
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1">
                Edit workspace metadata characteristics and credentials stored in your local curator identity.
              </p>
            </div>

            <form onSubmit={handleProfileSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Legal Full Name
                </label>
                <input
                  id="profile-name-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`block w-full px-3.5 text-xs outline-none ${sStyles.input}`}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Organizational Division / Role
                </label>
                <input
                  id="profile-role-input"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`block w-full px-3.5 text-xs outline-none ${sStyles.input}`}
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Affiliated Company / Studio
                </label>
                <input
                  id="profile-company-input"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`block w-full px-3.5 text-xs outline-none ${sStyles.input}`}
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  id="profile-save-btn"
                  type="submit"
                  className={`px-6 py-2.5 text-xs font-semibold rounded-lg uppercase tracking-wider cursor-pointer ${
                    theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900 border-2 border-black' :
                    theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
                    'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
                  }`}
                >
                  Save Profile Configuration
                </button>
              </div>

            </form>
          </div>

          {/* System Control Sandbox */}
          <div id="system-sandbox-card" className={`p-6 rounded-xl ${sStyles.card} space-y-4`}>
            <div className="border-b border-zinc-200/5 dark:border-zinc-850 pb-2.5">
              <h3 className="font-display text-sm font-semibold flex items-center gap-2">
                <Server size={15} className="text-[#C59B27]" />
                <span>Atelier File Storage Sandbox</span>
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-1">
                Calibrate data indices, synchronize stashes, or wipe cached structures entirely.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              
              {/* Wipe Cache */}
              <button
                id="reset-db-btn"
                type="button"
                onClick={handleDbReset}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg uppercase cursor-pointer transition-all shrink-0 ${sStyles.resetBtn}`}
              >
                {confirmReset ? '🚨 Confirm full wipe!' : 'Filing Cache Wipe'}
              </button>

              <div className="text-xs text-zinc-450 leading-relaxed font-sans">
                {confirmReset ? (
                  <span className="text-red-500 font-bold animate-pulse">This operation is destructive and removes all offline-stashed documents, transactions and objectives.</span>
                ) : (
                  <span>Resets active storage state back to premium default blueprints. Useful for demonstrating the starting design profile.</span>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Guides (takes 1 column) */}
        <div className="space-y-6">
          
          {/* Cloud sync integration setup report */}
          <div id="cloud-integration-status" className={`p-6 rounded-xl ${sStyles.card} space-y-4`}>
            <div className="border-b border-zinc-200/5 dark:border-zinc-850 pb-2.5">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-400">
                Cloud Integration Blueprint
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1">
                Developer guidance report describing firestore.rules configuration for remote persistence.
              </p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed font-sans text-zinc-500">
              
              <div className="p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 gap-1.5 font-mono text-[10px]">
                <div id="g-indicator" className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                  <DatabaseZap size={13} />
                  <span>Firestore Ledger Blueprint</span>
                </div>
                Your local mutations map elegantly to Firebase. We stashed the rules schematic below for operations audits.
              </div>

              {/* Schematic view */}
              <div className="relative p-3 rounded-lg border border-orange-500/10 bg-zinc-950 font-mono text-[9px] text-[#A47D15] dark:text-orange-400/80 leading-normal">
                <div className="absolute top-2 right-2 text-zinc-650 flex items-center">
                  <Lock size={10} />
                </div>
                <p className="text-zinc-500">// firestore.rules</p>
                <p>rules_version = '2';</p>
                <p>service cloud.firestore {"{"}</p>
                <p className="pl-2">match /databases/{"{"}db{"}"}/documents {"{"}</p>
                <p className="pl-4">match /users/{"{"}userId{"}"} {"{"}</p>
                <p className="pl-6 text-zinc-400">allow read, write: if request.auth != null &amp;&amp; request.auth.uid == userId;</p>
                <p className="pl-4">{"}"}</p>
                <p className="pl-2">{"}"}</p>
                <p>{"}"}</p>
              </div>

              <ul className="space-y-2 text-[11px] list-disc pl-4">
                <li>Configure Firestore to enable low signal writes.</li>
                <li>Ensure document references matches User Session IDs.</li>
                <li>Sync st stash records systematically in batches once the engine recovers connection.</li>
              </ul>

            </div>

            <div className="pt-2">
              <div className="flex gap-2 text-[10px] font-mono text-zinc-400">
                <span>RECONCILIATION API</span>
                <span className="text-emerald-500">READY</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
