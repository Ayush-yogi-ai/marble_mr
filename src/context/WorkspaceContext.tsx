import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Theme, 
  UserProfile, 
  TaskItem, 
  ExpenseItem, 
  NoteItem, 
  PushNotification,
  DashboardStats 
} from '../types';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface WorkspaceContextProps {
  user: UserProfile | null;
  theme: Theme;
  isOnline: boolean;
  isSyncing: boolean;
  tasks: TaskItem[];
  expenses: ExpenseItem[];
  notes: NoteItem[];
  notifications: PushNotification[];
  toasts: ToastItem[];
  
  // Auth Functions
  login: (email: string, fullName?: string) => Promise<boolean>;
  register: (fullName: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (fullName: string, company?: string, role?: string) => void;
  
  // Tasks Functions
  addTask: (title: string, priority: TaskItem['priority'], dueDate: string, category: string, description?: string) => void;
  toggleTaskStatus: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskItem['status']) => void;
  deleteTask: (id: string) => void;
  
  // Finance Functions
  addExpense: (title: string, amount: number, type: ExpenseItem['type'], category: string, date: string) => void;
  deleteExpense: (id: string) => void;
  
  // Notes Functions
  addNote: (title: string, content: string, category: string) => void;
  updateNote: (id: string, title: string, content: string, category: string) => void;
  deleteNote: (id: string) => void;
  
  // Notifications Functions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  triggerPushNotification: (title: string, message: string, type: PushNotification['type']) => void;
  
  // Toast Functions
  addToast: (message: string, type: ToastItem['type']) => void;
  dismissToast: (id: string) => void;
  
  // Utility Functions
  setTheme: (theme: Theme) => void;
  toggleOnlineStatus: () => void;
  forceSyncData: () => Promise<void>;
  resetDatabase: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

const INITIAL_USER: UserProfile = {
  email: 'curator@aureliusmarbles.com',
  fullName: 'Aurelius Vance',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
  role: 'Master Stone Curator',
  company: 'Aurelius Marble Atelier',
};

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 't-1',
    title: 'Inspect arriving Calacatta Viola block #309',
    description: 'Verify deep cabernet burgundy veining against polished milky white dolomite base.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-06-16',
    createdAt: '2026-06-14',
    category: 'Quarry Imports',
    synced: true
  },
  {
    id: 't-2',
    title: 'Review Nero Marquina bath panel carvings',
    description: 'Decompress waterjet path vectors to avoid micro-fissure expansion on corner joins.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-06-18',
    createdAt: '2026-06-14',
    category: 'Bespoke Studio',
    synced: true
  },
  {
    id: 't-3',
    title: 'Publish Carrara Gold slab catalog online',
    description: 'Upload high-resolution book-matched photos for digital showroom clients.',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-06-12',
    createdAt: '2026-06-10',
    category: 'Showroom Catalog',
    synced: true
  }
];

const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'f-1', title: 'Apuan Alps Quarry Batch Purchase', amount: 9500, type: 'expense', category: 'Raw Materials', date: '2026-06-10', synced: true },
  { id: 'f-2', title: 'Carrara Gold Bookmatch Sequence Sale', amount: 18500, type: 'income', category: 'Sales', date: '2026-06-12', synced: true },
  { id: 'f-3', title: 'Diamond Gangsaw Blade Dressing', amount: 480, type: 'expense', category: 'Equip Maintenance', date: '2026-06-14', synced: true },
  { id: 'f-4', title: 'Bespoke Viola Marble Kitchen Top Consignment', amount: 14200, type: 'income', category: 'Bespoke Sales', date: '2026-06-14', synced: true },
  { id: 'f-5', title: 'Maritime Sea Freight (Sarzana Port to NY Port)', amount: 2850, type: 'expense', category: 'Logistics', date: '2026-06-14', synced: true }
];

const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n-1',
    title: 'Dolomite vs Calcite Durability Guidelines',
    content: 'All Calacatta varieties are calcite-based and remain highly sensitive to mild food acids like citrus, wine, and vinegar. For high-intensity kitchen applications, recommend sealing the stone twice with a penetrating organosilicone coating or suggest a premium hard dolomite variation like Invisible Blue.',
    category: 'Curator Bible',
    updatedAt: '2026-06-15T01:30:00Z',
    synced: true
  },
  {
    id: 'n-2',
    title: 'Book-matching Slab Polishing Protocols',
    content: `1. Ensure consecutive slabs are cut from the same block and polished in reverse faces (Mirror A + Mirror B).\n2. Hand-hone the outer joints utilizing standard copper-oxide diamond compounds up to 3000 grit.\n3. Implement a micro-chamfer bevel of exactly 1.2mm on joints to mask minor structural settling.\n4. Apply moisture-barrier backing prior to dry-mounting on vertical steel framing lines.`,
    category: 'Technical Specs',
    updatedAt: '2026-06-14T20:15:00Z',
    synced: true
  }
];

const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'Port arrival: Carrara shipment cleared',
    message: 'Raw marble blocks #804 through #809 have completed customs check at SARZANA and are loaded on ocean courier.',
    timestamp: '2026-06-14T22:30:00Z',
    type: 'success',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Elegant Chalk light theme initialized',
    message: 'Active viewport aligned with Carrara Champagne, Alabaster, and Polished Gold color guidelines.',
    timestamp: '2026-06-14T22:45:00Z',
    type: 'info',
    read: true
  }
];

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence Loading
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('premium_saas_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('premium_saas_theme') as Theme) || 'light';
  });

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('premium_saas_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('premium_saas_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('premium_saas_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem('premium_saas_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Watchers to update LocalStorage
  useEffect(() => {
    localStorage.setItem('premium_saas_user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('premium_saas_theme', theme);
    // Apply contrast and theme styles directly to document body if needed
    const classList = document.documentElement.classList;
    classList.remove('light', 'dark', 'contrast');
    if (theme === 'dark') {
      classList.add('dark');
    } else if (theme === 'contrast') {
      classList.add('contrast');
    } else {
      classList.add('light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('premium_saas_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('premium_saas_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('premium_saas_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('premium_saas_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Management
  const addToast = (message: string, type: ToastItem['type']) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Connectivity Toggles
  const toggleOnlineStatus = () => {
    setIsOnline(prev => {
      const next = !prev;
      if (next) {
        addToast('Connection established. Synced to cloud engine.', 'success');
        triggerPushNotification('System Back Online', 'A steady connection is restored. Dynamic sync complete.', 'success');
        forceSyncData();
      } else {
        addToast('Entering Offline Mode. Workspace stashed locally.', 'warning');
        triggerPushNotification('Workspace Offline', 'Operational in offline ledger mode. Your edits will sync automatically next time you connect.', 'warning');
      }
      return next;
    });
  };

  const forceSyncData = async () => {
    if (!isOnline) {
      addToast('Cannot manually reconcile while offline.', 'error');
      return;
    }
    setIsSyncing(true);
    addToast('Reconciling offline ledger entries...', 'info');
    
    // Simulate premium syncing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set all items to synced
    setTasks(prev => prev.map(t => ({ ...t, synced: true })));
    setExpenses(prev => prev.map(e => ({ ...e, synced: true })));
    setNotes(prev => prev.map(n => ({ ...n, synced: true })));
    
    setIsSyncing(false);
    addToast('Synchronized with secure cloud successfully.', 'success');
  };

  // Auth Functions
  const login = async (email: string, fullName?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate microdelay
    const defaultName = email.split('@')[0];
    const uppercaseName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    
    setUser({
      email,
      fullName: fullName || `${uppercaseName} Vance`,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop`,
      role: 'Partner Designer',
      company: 'Corporate Studio'
    });
    addToast(`Signed in successfully as ${email}`, 'success');
    triggerPushNotification('Authentication Success', 'Your session secure token holds high authority permissions.', 'success');
    return true;
  };

  const register = async (fullName: string, email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      email,
      fullName,
      avatar: `https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256&auto=format&fit=crop`,
      role: 'New Architect',
      company: 'Digital Collective'
    });
    addToast(`Registered account for ${email}`, 'success');
    triggerPushNotification('Welcome to Workspace', 'Explore your brand new offline ledger and visual statistics.', 'info');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out of workspace.', 'info');
  };

  const updateProfile = (fullName: string, company?: string, role?: string) => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      fullName,
      company: company || prev.company,
      role: role || prev.role
    } : null);
    addToast('Profile metadata saved.', 'success');
  };

  // Tasks Actions
  const addTask = (title: string, priority: TaskItem['priority'], dueDate: string, category: string, description?: string) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: 'todo',
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      category: category || 'Default',
      synced: isOnline
    };
    setTasks(prev => [newTask, ...prev]);
    addToast('Added new task', 'success');
    if (!isOnline) {
      addToast('Stashed locally pending online sync.', 'info');
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus: TaskItem['status'] = t.status === 'completed' ? 'todo' : 'completed';
        return { ...t, status: nextStatus, synced: isOnline };
      }
      return t;
    }));
    addToast('Task status updated', 'success');
  };

  const updateTaskStatus = (id: string, status: TaskItem['status']) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status, synced: isOnline };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    addToast('Task deleted', 'info');
  };

  // Finance Actions
  const addExpense = (title: string, amount: number, type: ExpenseItem['type'], category: string, date: string) => {
    const newItem: ExpenseItem = {
      id: `fin-${Date.now()}`,
      title,
      amount,
      type,
      category: category || 'General',
      date: date || new Date().toISOString().split('T')[0],
      synced: isOnline
    };
    setExpenses(prev => [newItem, ...prev]);
    addToast(`${type === 'income' ? 'Received' : 'Logged'} $${amount.toLocaleString()}`, 'success');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    addToast('Ledger entry removed', 'info');
  };

  // Notes Actions
  const addNote = (title: string, content: string, category: string) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title,
      content,
      category: category || 'Ideation',
      updatedAt: new Date().toISOString(),
      synced: isOnline
    };
    setNotes(prev => [newNote, ...prev]);
    addToast('Saved note to offline stack', 'success');
  };

  const updateNote = (id: string, title: string, content: string, category: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id === id) {
        return {
          ...n,
          title,
          content,
          category,
          updatedAt: new Date().toISOString(),
          synced: isOnline
        };
      }
      return n;
    }));
    addToast('Note changes saved', 'success');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    addToast('Note moved to archive', 'info');
  };

  // Notifications Actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('Marked all notifications as read', 'info');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast('Cleared notification vault', 'info');
  };

  const triggerPushNotification = (title: string, message: string, type: PushNotification['type']) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    // Also push a visual browser-feeling toast inside our app
    addToast(`${title}: ${message.slice(0, 45)}${message.length > 45 ? '...' : ''}`, type === 'alert' ? 'error' : type);
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    addToast(`Theme adjusted: ${nextTheme === 'contrast' ? 'Accessibility High-Contrast' : nextTheme === 'dark' ? 'Premium Cobalt/Copper Dark' : 'Elegant Chalk/Ivory Light'}`, 'info');
  };

  const resetDatabase = () => {
    setUser(INITIAL_USER);
    setTasks(INITIAL_TASKS);
    setExpenses(INITIAL_EXPENSES);
    setNotes(INITIAL_NOTES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setThemeState('light');
    setIsOnline(true);
    addToast('Database reset to curated defaults.', 'success');
  };

  return (
    <WorkspaceContext.Provider value={{
      user,
      theme,
      isOnline,
      isSyncing,
      tasks,
      expenses,
      notes,
      notifications,
      toasts,
      
      login,
      register,
      logout,
      updateProfile,
      
      addTask,
      toggleTaskStatus,
      updateTaskStatus,
      deleteTask,
      
      addExpense,
      deleteExpense,
      
      addNote,
      updateNote,
      deleteNote,
      
      markNotificationRead,
      markAllNotificationsRead,
      clearAllNotifications,
      triggerPushNotification,
      
      addToast,
      dismissToast,
      
      setTheme,
      toggleOnlineStatus,
      forceSyncData,
      resetDatabase
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
