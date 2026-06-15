import React, { useState } from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { Navigation } from './components/Navigation';
import { DashboardOverview } from './components/DashboardOverview';
import { AuthModule } from './components/AuthModule';
import { TaskManager } from './components/TaskManager';
import { FinanceTracker } from './components/FinanceTracker';
import { NotesLedger } from './components/NotesLedger';
import { NotificationCenter } from './components/NotificationCenter';
import { SettingsView } from './components/SettingsView';
import { ToastContainer } from './components/Toast';

const DashboardContent: React.FC = () => {
  const { user, theme } = useWorkspace();
  const [activeTab, setActiveTab] = useState('overview');

  // Unified background theme classes
  const getThemeBackground = () => {
    switch (theme) {
      case 'contrast':
        return 'bg-white text-black min-h-screen';
      case 'light':
        return 'bg-[#FAF6EF]/70 text-zinc-800 min-h-screen selection:bg-[#C59B27]/20';
      default:
        return 'bg-[#030303] text-zinc-150 min-h-screen selection:bg-orange-500/20';
    }
  };

  // Switch tabs
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'tasks':
        return <TaskManager />;
      case 'finance':
        return <FinanceTracker />;
      case 'notes':
        return <NotesLedger />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!user) {
    return (
      <main id="auth-unauthenticated-viewport" className={`flex items-center justify-center p-4 ${getThemeBackground()}`}>
        <AuthModule />
        <ToastContainer />
      </main>
    );
  }

  return (
    <div id="workspace-main-root" className={`relative transition-colors duration-300 ${getThemeBackground()}`}>
      
      {/* Sidebar and Mobile Header */}
      <Navigation currentTab={activeTab} onChangeTab={setActiveTab} />

      {/* Main scrolling viewport container */}
      <main 
        id="viewport-scroll-area" 
        className="h-screen overflow-y-auto pl-0 md:pl-64 pt-16 md:pt-0 transition-all duration-300"
      >
        <div id="view-inner-pad" className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-10">
          {renderActiveTab()}
        </div>
      </main>

      {/* Floating universal portals */}
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <WorkspaceProvider>
      <DashboardContent />
    </WorkspaceProvider>
  );
}
