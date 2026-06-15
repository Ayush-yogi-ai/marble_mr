import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Radio, 
  Sparkles,
  Volume2,
  VolumeX,
  BellRing
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearAllNotifications, 
    triggerPushNotification,
    theme 
  } = useWorkspace();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  // Categories list
  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return !n.read;
  });

  // Predefined Alerts for users to simulate pushed telemetry
  const simAlerts = [
    {
      title: 'Structural Firewall Update',
      desc: 'Security tokens verified. High priority client-side hashing activated.',
      type: 'success' as const
    },
    {
      title: 'Fiscal Allocation Audit Required',
      desc: 'Outflows represent more than 23% of quarterly capital limits.',
      type: 'warning' as const
    },
    {
      title: 'Database Sync Timeout',
      desc: 'Simulated connection dropped. Stashing all subsequent values in local storage.',
      type: 'alert' as const
    },
    {
      title: 'Vance Design Lab Invite',
      desc: 'Aurelius Vance shared an archived design specifications log with you.',
      type: 'info' as const
    }
  ];

  const handleTriggerSimulatedToast = (title: string, desc: string, type: 'info' | 'success' | 'warning' | 'alert') => {
    triggerPushNotification(title, desc, type);
    // Beep sound if enabled
    if (soundEnabled && typeof AudioContext !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        switch (type) {
          case 'success':
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
            break;
          case 'warning':
            oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
            break;
          case 'alert':
            oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
            break;
          default:
            oscillator.frequency.setValueAtTime(587, audioCtx.currentTime); // D5
        }
        
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.12);
      } catch {
        // Safe skip if blocked by user interaction standards
      }
    }
  };

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black',
        alertBox: 'bg-white border-2 border-black p-4',
        btnActive: 'bg-black text-white font-bold',
        btnInactive: 'border border-black text-black hover:bg-zinc-100',
        notifRead: 'bg-zinc-100 text-zinc-500 border border-zinc-300',
        notifUnread: 'bg-white text-black border-2 border-black font-semibold'
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm',
        alertBox: 'bg-[#FAF7F2] border border-[#EBE3D5] p-5 rounded-xl',
        btnActive: 'bg-[#C59B27] text-white font-semibold',
        btnInactive: 'text-zinc-650 hover:bg-[#F2ECE1]/50 border border-[#EBE3D5]',
        notifRead: 'bg-zinc-50/50 text-zinc-500 border border-zinc-200/60',
        notifUnread: 'bg-white text-zinc-805 border border-[#E3D3B8] font-semibold'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md',
      alertBox: 'bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl backdrop-blur-sm',
      btnActive: 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold',
      btnInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-zinc-850',
      notifRead: 'bg-zinc-900/10 text-zinc-400 border border-zinc-900/80',
      notifUnread: 'bg-orange-500/5 text-zinc-50 border border-orange-500/15'
    };
  };

  const nStyles = getThemeText();

  return (
    <div id="notification-vault-screen" className="space-y-6 animate-fade-in">
      
      {/* Header controls bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Alert Vault
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Simulate and monitor critical real-time updates and push security telemetry logs.
          </p>
        </div>

        {/* Global actions on alerts */}
        <div className="flex items-center gap-3">
          <button
            id="notif-mute-btn"
            onClick={() => {
              setSoundEnabled(prev => !prev);
              triggerPushNotification(
                soundEnabled ? 'Simulated Audio Muted' : 'Simulated Audio Enabled',
                'Audio alert context updated.',
                'info'
              );
            }}
            className={`p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              theme === 'contrast' ? 'border-black text-black' :
              theme === 'light' ? 'border-[#EBE3D5] text-zinc-650 hover:bg-[#F2ECE1]/40' :
              'border-zinc-800 text-zinc-400 hover:bg-zinc-900'
            }`}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          <button
            id="notif-mark-all-read"
            onClick={markAllNotificationsRead}
            disabled={unreadCount === 0}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              theme === 'contrast' ? 'border-black text-black bg-white hover:bg-zinc-100' :
              theme === 'light' ? 'border-[#C59B27] bg-[#FAF7F2] text-[#9A7512] hover:bg-[#F2ECE1]' :
              'border-zinc-800 text-zinc-450 hover:text-[#fff] hover:bg-zinc-900'
            } ${unreadCount === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <CheckCheck size={14} />
            <span>Read All</span>
          </button>

          <button
            id="notif-clear-all"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-transparent text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer ${
              notifications.length === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <Trash2 size={14} />
            <span>Clear Vault</span>
          </button>
        </div>
      </div>

      {/* Grid: Simulator triggers vs Actual notifications stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Dynamic simulator trigger cockpit */}
        <div id="alert-simulation-cockpit" className={`p-6 rounded-xl ${nStyles.card} space-y-4`}>
          <div className="border-b border-zinc-200/10 dark:border-zinc-800/60 pb-3">
            <h3 className="font-serif text-sm font-semibold flex items-center gap-2">
              <Radio size={16} className="text-orange-500 animate-pulse" />
              <span>Simulate Real-Time Telemetry</span>
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-1">
              Trigger instant critical status logs to prove persistent push notifications.
            </p>
          </div>

          <div className="space-y-3">
            {simAlerts.map((alert, idx) => (
              <button
                id={`trigger-sim-alert-${idx}`}
                key={idx}
                type="button"
                onClick={() => handleTriggerSimulatedToast(alert.title, alert.desc, alert.type)}
                className={`w-full p-4 rounded-xl text-left border text-xs font-medium cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  theme === 'contrast' ? 'bg-white border-black hover:bg-zinc-50' :
                  theme === 'light' ? 'bg-[#FAF7F2] hover:bg-[#F2ECE1]/50 border-[#EBE3D5]' :
                  'bg-zinc-950/60 hover:bg-zinc-900/60 border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-zinc-905 dark:text-zinc-100">{alert.title}</span>
                  <span className={`text-[8px] font-mono px-2 py-0.2 rounded uppercase ${
                    alert.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                    alert.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                    alert.type === 'alert' ? 'bg-rose-500/10 text-rose-500 font-bold' : 'bg-sky-500/10 text-sky-500'
                  }`}>
                    {alert.type}
                  </span>
                </div>
                <p className="text-zinc-400 dark:text-zinc-500 leading-normal text-[11px] font-sans">
                  {alert.desc}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <div className={`p-4 ${nStyles.alertBox} border rounded-lg text-[11px] leading-relaxed font-sans text-zinc-500`}>
              <p className="font-serif text-zinc-900 dark:text-zinc-50 font-bold mb-1">Push Protocol Rules</p>
              Push notifications utilize immediate browser notification bindings. Stash logs safely when entering low signal limits, and dispatch alerts to queue entries once connection returns.
            </div>
          </div>
        </div>

        {/* Live Logs vault display column */}
        <div id="alerts-log-feed-col" className={`lg:col-span-2 p-6 rounded-xl ${nStyles.card}`}>
          
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200/10 dark:border-zinc-850 mb-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <button
                id="filter-notif-all"
                onClick={() => setActiveTab('all')}
                className={`cursor-pointer pb-1.5 border-b-2 transition-all ${
                  activeTab === 'all' ? 'border-orange-500 text-zinc-900 dark:text-zinc-50 font-bold' : 'border-transparent text-zinc-400'
                }`}
              >
                All Logs ({notifications.length})
              </button>

              <button
                id="filter-notif-unread"
                onClick={() => setActiveTab('unread')}
                className={`cursor-pointer pb-1.5 border-b-2 transition-all ${
                  activeTab === 'unread' ? 'border-orange-500 text-zinc-900 dark:text-zinc-50 font-bold' : 'border-transparent text-zinc-400'
                }`}
              >
                Unread Messages ({unreadCount})
              </button>
            </div>
          </div>

          {/* Scrolling Feed layout */}
          {filteredNotifs.length === 0 ? (
            <div id="notif-empty-state" className="text-center py-24 flex flex-col justify-center items-center">
              <BellRing size={28} className="text-zinc-500 mb-2 animate-bounce" />
              <p className="text-xs text-zinc-500 font-sans">No notifications registered in trace.</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-1">Use the simulator panel on the left to push events.</p>
            </div>
          ) : (
            <div id="notif-feed-container" className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {filteredNotifs.map((notif) => {
                let IndicatorIcon = Info;
                let colorClass = 'text-sky-500';
                
                switch (notif.type) {
                  case 'success':
                    IndicatorIcon = CheckCircle2;
                    colorClass = 'text-emerald-500';
                    break;
                  case 'warning':
                    IndicatorIcon = AlertTriangle;
                    colorClass = 'text-amber-500';
                    break;
                  case 'alert':
                    IndicatorIcon = AlertTriangle;
                    colorClass = 'text-rose-500';
                    break;
                  default:
                    IndicatorIcon = Info;
                    colorClass = 'text-sky-500';
                }

                return (
                  <div
                    id={`notif-card-${notif.id}`}
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-4 rounded-xl flex items-start gap-3.5 transition-all outline-none cursor-pointer text-xs ${
                      notif.read ? nStyles.notifRead : nStyles.notifUnread
                    }`}
                  >
                    <div className={`mt-0.5 shrink-0 ${colorClass}`}>
                      <IndicatorIcon size={16} />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                          {notif.title}
                        </h4>
                        <span className="text-[9px] font-mono text-zinc-450 select-none">
                          {new Date(notif.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <p className="text-zinc-500 dark:text-zinc-400 font-sans leading-normal text-[11px]">
                        {notif.message}
                      </p>
                      
                      {!notif.read && (
                        <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-orange-500">
                          Unread Trace
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
