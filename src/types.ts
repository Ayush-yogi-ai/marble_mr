export type Theme = 'light' | 'dark' | 'contrast';

export interface UserProfile {
  email: string;
  fullName: string;
  avatar: string;
  role: string;
  company?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  category: string;
  synced: boolean;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  synced: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
  synced: boolean;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  balance: number;
  notesCount: number;
}
