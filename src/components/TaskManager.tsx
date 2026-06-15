import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { TaskItem } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Calendar, 
  Tag, 
  AlertCircle, 
  CloudCheck, 
  CloudOff,
  SlidersHorizontal,
  X
} from 'lucide-react';

export const TaskManager: React.FC = () => {
  const { 
    tasks, 
    addTask, 
    toggleTaskStatus, 
    deleteTask, 
    theme, 
    isOnline, 
    isSyncing 
  } = useWorkspace();

  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskItem['priority']>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask(title, priority, dueDate, category, description);
    
    // Reset Form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    setShowAddForm(false);
  };

  // Filter computations
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = 
      filter === 'all' || 
      (filter === 'todo' && task.status === 'todo') ||
      (filter === 'in-progress' && task.status === 'in-progress') ||
      (filter === 'completed' && task.status === 'completed');
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesStatus && matchesPriority;
  });

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black',
        form: 'bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        input: 'border-2 border-black rounded-none h-10 text-black',
        btnActive: 'bg-black text-white font-bold',
        btnInactive: 'border border-black text-black hover:bg-zinc-100',
        prioHigh: 'bg-black text-white border-2 border-black font-bold uppercase',
        prioMed: 'bg-zinc-200 text-black border border-black font-bold',
        prioLow: 'bg-white text-zinc-600 border border-zinc-400',
        badgeSynced: 'bg-black text-white font-mono font-bold',
        badgeOffline: 'bg-white text-black border-2 border-dashed border-black font-mono font-bold'
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm hover:shadow-md transition-shadow',
        form: 'bg-[#FAF7F2] border border-[#E2D2B8] p-6 rounded-xl shadow-lg',
        input: 'border border-[#E2D2B8] bg-white text-zinc-800 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]/40 rounded-lg h-10',
        btnActive: 'bg-[#C59B27] text-white font-semibold shadow-sm',
        btnInactive: 'text-zinc-600 hover:bg-[#F2ECE1]/50 border border-[#EBE3D5]',
        prioHigh: 'bg-rose-50 text-rose-800 border border-rose-200 font-medium',
        prioMed: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
        prioLow: 'bg-zinc-50 text-zinc-600 border border-zinc-200 font-medium',
        badgeSynced: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px]',
        badgeOffline: 'bg-amber-50 text-amber-800 border border-dashed border-amber-300 font-mono text-[10px]'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md',
      form: 'bg-zinc-950/90 border border-zinc-900 p-6 rounded-xl shadow-2xl backdrop-blur-md',
      input: 'border border-zinc-800 bg-zinc-900/50 text-zinc-100 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 rounded-lg h-10',
      btnActive: 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold',
      btnInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-zinc-850',
      prioHigh: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono uppercase',
      prioMed: 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono uppercase',
      prioLow: 'bg-zinc-500/10 text-zinc-400 border border-zinc-700/20 font-mono uppercase',
      badgeSynced: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px]',
      badgeOffline: 'bg-amber-500/10 text-amber-400 border border-dashed border-amber-500/20 font-mono text-[9px]'
    };
  };

  const tStyles = getThemeText();

  return (
    <div id="task-manager-ledger" className="space-y-6 animate-fade-in">
      
      {/* Header operations bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Atelier Commissions
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Track custom stonework layout tasks, block splitting sequences, and special client carvings.
          </p>
        </div>

        <button
          id="toggle-add-task-form"
          onClick={() => setShowAddForm(prev => !prev)}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900' :
            theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
            'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md shadow-orange-500/5'
          }`}
        >
          {showAddForm ? <X size={14} /> : <Plus size={14} />}
          <span>{showAddForm ? 'Cancel Operation' : 'Log Stone Commission'}</span>
        </button>
      </div>

      {/* Slide-out Form Overlay / Inline Panel */}
      {showAddForm && (
        <div id="add-task-form-panel" className={`mb-6 ${tStyles.form}`}>
          <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Plus size={16} className="text-[#C59B27]" />
            <span>Studio Commission Specifications</span>
          </h3>
          <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Commission Title *
              </label>
              <input
                id="task-title-input"
                type="text"
                required
                placeholder="e.g. Fit Nero Marquina sequence to salon threshold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${tStyles.input}`}
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Atelier Category
              </label>
              <input
                id="task-category-input"
                type="text"
                placeholder="e.g. Bespoke Studio, Quarry Imports"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${tStyles.input}`}
              />
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Processing Procedures &amp; Notes
              </label>
              <textarea
                id="task-desc-input"
                placeholder="Specify target diamond grit profiles, alignment matrices, or shipping crates..."
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`block w-full p-3 text-xs outline-none resize-none ${tStyles.input} h-auto`}
              />
            </div>

            {/* Priority Select */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Priority Ranking
              </label>
              <select
                id="task-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskItem['priority'])}
                className={`block w-full px-3 text-xs outline-none bg-neutral-100/50 dark:bg-zinc-900 border ${tStyles.input}`}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Maturity Date
              </label>
              <input
                id="task-due-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${tStyles.input}`}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-2">
              <button
                id="task-submit-btn"
                type="submit"
                className={`w-full py-2.5 text-xs font-semibold rounded-lg uppercase tracking-wider cursor-pointer ${
                  theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900 border-2 border-black' :
                  theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
                  'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                Log Operational Goal
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Ledger filter menus */}
      <div className="flex flex-col gap-4 p-4 rounded-xl border border-zinc-200/10 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-mono text-[10px] uppercase font-semibold mr-1.5 flex items-center gap-1">
            <SlidersHorizontal size={12} /> Status:
          </span>
          {(['all', 'todo', 'in-progress', 'completed'] as const).map((st) => (
            <button
              id={`filter-task-${st}`}
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                filter === st ? tStyles.btnActive : tStyles.btnInactive
              }`}
            >
              {st.charAt(0).toUpperCase() + st.slice(1)}
            </button>
          ))}
        </div>

        {/* Priority filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-mono text-[10px] uppercase font-semibold mr-1.5">Priority:</span>
          {(['all', 'low', 'medium', 'high'] as const).map((pri) => (
            <button
              id={`filter-priority-${pri}`}
              key={pri}
              onClick={() => setPriorityFilter(pri)}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                priorityFilter === pri ? tStyles.btnActive : tStyles.btnInactive
              }`}
            >
              {pri.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      {/* Task List Ledger Display */}
      {filteredTasks.length === 0 ? (
        <div id="tasks-empty-state" className="text-center py-12 rounded-xl border border-dashed border-zinc-200/20 dark:border-zinc-805 bg-[#FAF7F2]/10 dark:bg-zinc-950/10">
          <AlertCircle size={32} className="mx-auto text-zinc-500 mb-3" />
          <h3 className="font-serif text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            No matching objectives found
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Adjust your active status filters or log a brand new corporate goal.
          </p>
        </div>
      ) : (
        <div id="tasks-ledger-rows" className="space-y-4">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            
            return (
              <div
                id={`task-card-${task.id}`}
                key={task.id}
                className={`p-5 rounded-xl transition-all ${tStyles.card} flex flex-col md:flex-row md:items-start md:justify-between gap-4`}
              >
                
                {/* Checkbox and info block */}
                <div className="flex items-start gap-4">
                  <button
                    id={`task-toggle-${task.id}`}
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mt-1 text-zinc-400 hover:text-orange-500 transition-colors shrink-0 cursor-pointer"
                    aria-label={`Toggle objective completion`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-orange-500" />
                    ) : (
                      <Circle size={18} />
                    )}
                  </button>

                  <div className="space-y-1.5">
                    <h4 className={`text-xs sm:text-sm font-semibold tracking-tight font-sans transition-all ${
                      isCompleted ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                    }`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className={`text-[11px] font-sans leading-relaxed ${
                        isCompleted ? 'text-zinc-400/80 dark:text-zinc-500/80' : 'text-zinc-500 dark:text-zinc-400'
                      }`}>
                        {task.description}
                      </p>
                    )}

                    {/* Metadata Badges line */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {task.category && (
                        <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                          <Tag size={11} /> {task.category}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                          <Calendar size={11} /> {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Badges operations layout */}
                <div className="flex items-center justify-between md:justify-end md:flex-col items-end gap-3.5 font-mono">
                  
                  {/* Priority, sync badges */}
                  <div className="flex items-center gap-2">
                    {/* Sync Indicator */}
                    {task.synced ? (
                      <span id={`task-synced-badge-${task.id}`} className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${tStyles.badgeSynced}`}>
                        <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                        <span>Cloud Synced</span>
                      </span>
                    ) : (
                      <span id={`task-offline-badge-${task.id}`} className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${tStyles.badgeOffline} animate-pulse`}>
                        <CloudOff size={11} className="text-amber-500 shrink-0" />
                        <span>Client-Side Stash</span>
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      task.priority === 'high' ? tStyles.prioHigh :
                      task.priority === 'medium' ? tStyles.prioMed : tStyles.prioLow
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Detach option */}
                  <button
                    id={`task-delete-${task.id}`}
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 hover:bg-rose-500/10 hover:text-rose-600 rounded transition-colors text-zinc-400 cursor-pointer"
                    title="Remove objective"
                  >
                    <Trash2 size={13} />
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
