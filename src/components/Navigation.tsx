import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Wallet, 
  FileText, 
  Bell, 
  Settings, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  LogOut,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  Eye
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onChangeTab }) => {
  const { 
    user, 
    logout, 
    theme, 
    setTheme,
    isOnline, 
    isSyncing, 
    toggleOnlineStatus, 
    forceSyncData,
    notifications 
  } = useWorkspace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'overview', name: 'Showroom Index', icon: LayoutDashboard },
    { id: 'tasks', name: 'Atelier Orders', icon: CheckSquare },
    { id: 'finance', name: 'Sales & Capital', icon: Wallet },
    { id: 'notes', name: 'Curator Bible', icon: FileText },
    { id: 'notifications', name: 'Atelier Feed', icon: Bell, badge: unreadCount },
    { id: 'settings', name: 'Atelier Custom', icon: Settings },
  ];

  const handleNavClick = (tabId: string) => {
    onChangeTab(tabId);
    setMobileMenuOpen(false);
  };

  // Border/Text styles dependent on active theme
  const getThemeStyles = () => {
    if (theme === 'contrast') {
      return {
        aside: 'bg-white border-r-2 border-black text-black',
        activeBtn: 'bg-black text-white font-bold border-2 border-black',
        inactiveBtn: 'text-black hover:bg-zinc-100 border border-transparent',
        tag: 'border-2 border-black bg-white text-black'
      };
    }
    if (theme === 'light') {
      return {
        aside: 'bg-[#FAF7F2] border-r border-[#EBE3D5] text-zinc-800',
        activeBtn: 'bg-[#C59B27]/10 text-[#A47D15] font-semibold border-l-2 border-[#C59B27]',
        inactiveBtn: 'text-zinc-600 hover:text-zinc-900 hover:bg-[#F2ECE1]/50',
        tag: 'bg-[#F2ECE1] text-[#9A7512] font-medium border border-[#E3D3B8]'
      };
    }
    // Dark Premium Obsidian & Warm Copper default
    return {
      aside: 'bg-gradient-to-b from-zinc-950 via-[#0A0A0B] to-zinc-950 border-r border-zinc-800/80 text-zinc-300',
      activeBtn: 'bg-gradient-to-r from-orange-500/10 to-transparent text-orange-400 font-medium border-l-2 border-orange-500',
      inactiveBtn: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50',
      tag: 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
    };
  };

  const navStyles = getThemeStyles();

  return (
    <>
      {/* Universal Desktop Navigation Sidebar */}
      <aside id="desktop-sidebar" className={`hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 p-6 z-30 transition-all ${navStyles.aside}`}>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-200/10 dark:border-zinc-800/60">
          <div className="flex items-center justify-center p-2 rounded-lg bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27]">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-base tracking-widest font-bold text-zinc-950 dark:text-zinc-50 contrast:text-black">
              AURELIUS
            </h1>
            <p className="font-mono text-[9px] tracking-wider text-[#A47D15] dark:text-[#C59B27]/80 font-semibold -mt-0.5">
              STONE ATELIER
            </p>
          </div>
        </div>

        {/* Sync & Operations Control Widget */}
        <div className="mb-6 p-3 rounded-lg border border-zinc-200/20 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
              Engine &amp; Theme
            </span>
            <div className="flex items-center gap-1.5">
              <button
                id="theme-quick-cycle-btn"
                onClick={() => {
                  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'contrast' : 'light';
                  setTheme(nextTheme);
                }}
                className="text-zinc-400 hover:text-[#C59B27] dark:hover:text-[#C59B27] p-1 rounded transition-all cursor-pointer"
                title={`${theme === 'light' ? 'Switch to Dark Theme' : theme === 'dark' ? 'Switch to Contrast Theme' : 'Switch to Light Theme'}`}
              >
                {theme === 'light' ? <Sun size={13} /> : theme === 'dark' ? <Moon size={13} /> : <Eye size={13} />}
              </button>
              <button
                id="sync-btn"
                onClick={forceSyncData}
                disabled={!isOnline || isSyncing}
                className={`text-zinc-400 hover:text-orange-500 dark:hover:text-amber-400 p-1 rounded transition-all cursor-pointer ${isSyncing ? 'animate-spin text-orange-500' : ''} ${!isOnline ? 'opacity-30 cursor-not-allowed' : ''}`}
                title="Force Database Cloud Reconciliation"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              id="connectivity-toggle-btn"
              onClick={toggleOnlineStatus}
              className="flex items-center gap-2 text-xs font-medium cursor-pointer text-zinc-800 dark:text-zinc-200 hover:opacity-85 text-left w-full justify-between"
            >
              <span className="flex items-center gap-1.5">
                {isOnline ? (
                  <Wifi size={14} className="text-emerald-500" />
                ) : (
                  <WifiOff size={14} className="text-amber-500 animate-pulse" />
                )}
                {isOnline ? 'Cloud Synced' : 'Offline Stash'}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase ${
                isOnline ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Menu Links */}
        <nav id="sidebar-menu-nav" className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                id={`sidebar-nav-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full p-2.5 rounded-lg text-xs tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive ? navStyles.activeBtn : navStyles.inactiveBtn
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? 'text-orange-500 dark:text-orange-400' : 'text-zinc-400 dark:text-zinc-500'} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Account Session Info */}
        <div id="sidebar-user-footer" className="mt-auto pt-4 border-t border-zinc-200/10 dark:border-zinc-800/60">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200/20"
                />
                <div className="overflow-hidden">
                  <h4 className="font-semibold text-xs tracking-tight truncate text-zinc-900 dark:text-zinc-50 font-sans">
                    {user.fullName}
                  </h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate font-mono">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                id="sidebar-logout"
                onClick={logout}
                className="flex items-center justify-center gap-2 w-full py-2 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 text-rose-500 hover:text-rose-600 rounded-lg text-xs font-medium border border-transparent hover:border-rose-500/15 transition-all cursor-pointer"
              >
                <LogOut size={14} />
                <span>Terminate Session</span>
              </button>
            </div>
          ) : (
            <p className="text-center font-mono text-[10px] text-zinc-500">Unauthenticated mode</p>
          )}
        </div>
      </aside>

      {/* Responsive Compact Header for Mobile Devices */}
      <header id="mobile-top-bar" className={`md:hidden fixed top-0 left-0 w-full h-16 px-4 flex items-center justify-between border-b z-30 transition-all ${
        theme === 'contrast' ? 'bg-white border-black text-black' : 
        theme === 'light' ? 'bg-[#FAF7F2] border-[#EBE3D5] text-zinc-800' : 'bg-zinc-950 border-zinc-850 text-zinc-100'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27]">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="font-display text-xs tracking-wider font-bold">
              AURELIUS
            </h1>
            <p className="font-mono text-[8px] tracking-wider text-[#A47D15] dark:text-[#C59B27]/80 -mt-0.5">
              ATELIER
            </p>
          </div>
        </div>

        {/* Sync and Menu icons */}
        <div className="flex items-center gap-2">
          {isSyncing && (
            <RefreshCw size={13} className="animate-spin text-orange-500" />
          )}
          <button
            id="mobile-quick-theme-btn"
            onClick={() => {
              const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'contrast' : 'light';
              setTheme(nextTheme);
            }}
            aria-label="Toggle visual theme skin"
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/20 cursor-pointer text-zinc-400"
            title="Cycles visual showroom skins"
          >
            {theme === 'light' ? <Sun size={14} /> : theme === 'dark' ? <Moon size={14} /> : <Eye size={14} />}
          </button>
          <button
            id="mobile-connectivity-status"
            onClick={toggleOnlineStatus}
            aria-label="Toggle connectivity status"
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/20 cursor-pointer"
          >
            {isOnline ? (
              <Wifi size={14} className="text-emerald-500" />
            ) : (
              <WifiOff size={14} className="text-amber-500 animate-pulse" />
            )}
          </button>
          
          <button
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay"
          className="fixed inset-0 top-16 bg-black/60 z-30 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            id="mobile-drawer-box"
            className={`w-4/5 max-w-xs h-[calc(100vh-4rem)] p-6 flex flex-col justify-between transition-transform duration-300 transform translate-x-0 ${
              theme === 'contrast' ? 'bg-white border-r-2 border-black text-black' :
              theme === 'light' ? 'bg-[#FAF7F2] border-r border-[#EBE3D5] text-zinc-800' : 'bg-[#0E0E10] text-zinc-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <nav id="mobile-menu-links" className="space-y-2">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-xs font-medium cursor-pointer ${
                      isActive ? navStyles.activeBtn : navStyles.inactiveBtn
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div id="mobile-drawer-footer" className="pt-4 border-t border-zinc-200/10 dark:border-zinc-800/60">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-50">{user.fullName}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    id="mobile-logout"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 text-rose-500 font-medium rounded-lg text-xs border border-rose-500/10 transition-all cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Terminate Session</span>
                  </button>
                </div>
              ) : (
                <p className="text-center font-mono text-[10px] text-zinc-500">Unauthenticated mode</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
