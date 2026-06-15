import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { ExpenseItem } from '../types';
import { 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Calendar, 
  Tag, 
  Coins,
  AlertCircle,
  CloudOff,
  CloudCheck,
  X
} from 'lucide-react';

export const FinanceTracker: React.FC = () => {
  const { 
    expenses, 
    addExpense, 
    deleteExpense, 
    theme, 
    isOnline 
  } = useWorkspace();

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    addExpense(title, parsedAmount, type, category, date);
    
    // Reset Form
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setShowAddForm(false);
  };

  // Computations
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const filteredItems = expenses.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  // Calculate categorical spends
  const categoryTotals = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black',
        form: 'bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        input: 'border-2 border-black rounded-none h-11 text-black',
        btnActive: 'bg-black text-white font-bold',
        btnInactive: 'border border-black text-black hover:bg-zinc-100',
        badgeSynced: 'bg-black text-white font-mono font-bold',
        badgeOffline: 'bg-white border-2 border-dashed border-black font-mono text-black font-bold'
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm hover:shadow-md transition-shadow',
        form: 'bg-[#FAF7F2] border border-[#E2D2B8] p-6 rounded-xl shadow-lg',
        input: 'border border-[#E2D2B8] bg-white text-zinc-800 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]/40 rounded-lg h-11',
        btnActive: 'bg-[#C59B27] text-white font-semibold',
        btnInactive: 'text-zinc-600 hover:bg-[#F2ECE1]/50 border border-[#EBE3D5]',
        badgeSynced: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px]',
        badgeOffline: 'bg-amber-50 text-amber-800 border border-dashed border-amber-300 font-mono text-[10px]'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md',
      form: 'bg-zinc-950/90 border border-zinc-900 p-6 rounded-xl shadow-2xl backdrop-blur-md',
      input: 'border border-zinc-800 bg-zinc-900/50 text-zinc-100 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 rounded-lg h-11',
      btnActive: 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold',
      btnInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-zinc-850',
      badgeSynced: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px]',
      badgeOffline: 'bg-amber-500/10 text-amber-400 border border-dashed border-amber-500/20 font-mono text-[9px]'
    };
  };

  const fStyles = getThemeText();

  return (
    <div id="finance-ledger-screen" className="space-y-6 animate-fade-in">
      
      {/* Header operations area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Sourcing &amp; Sales Capital Ledger
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Reconcile imported raw block purchases, logistics, customized interior design commissions, and gallery sales.
          </p>
        </div>

        <button
          id="toggle-add-finance-form"
          onClick={() => setShowAddForm(prev => !prev)}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900' :
            theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
            'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md shadow-orange-500/5'
          }`}
        >
          {showAddForm ? <X size={14} /> : <Plus size={14} />}
          <span>{showAddForm ? 'Cancel Operation' : 'Log Transaction'}</span>
        </button>
      </div>

      {/* KPI summaries ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Net Reserves */}
        <div id="fin-kpi-balance" className={`p-5 rounded-xl ${fStyles.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Total Reserves</span>
            <h3 className={`text-2xl font-serif font-bold ${balance >= 0 ? 'text-zinc-900 dark:text-zinc-50' : 'text-rose-500'}`}>
              ${balance.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-900/60 rounded-full text-zinc-500">
            <Wallet size={16} />
          </div>
        </div>

        {/* Total Inflow */}
        <div id="fin-kpi-inflow" className={`p-5 rounded-xl ${fStyles.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Operational Inflow</span>
            <h3 className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
              +${totalIncome.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Total Outflow */}
        <div id="fin-kpi-outflow" className={`p-5 rounded-xl ${fStyles.card} flex items-center justify-between`}>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Sourcing Expenditures</span>
            <h3 className="text-2xl font-serif font-bold text-rose-500">
              -${totalExpense.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-full text-rose-500">
            <ArrowDownRight size={16} />
          </div>
        </div>

      </div>

      {/* Transaction Details Insert Form */}
      {showAddForm && (
        <div id="add-transaction-form-panel" className={fStyles.form}>
          <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Coins size={16} className="text-[#C59B27]" />
            <span>Record Stone Order Transaction Specs</span>
          </h3>

          <form onSubmit={handleCreateTransaction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Transaction Descriptor *
              </label>
              <input
                id="fin-title-input"
                type="text"
                required
                placeholder="e.g. Apuan Alps Calacatta Block purchase, Bespoke Viola counter sales"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${fStyles.input}`}
              />
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Monetary Value (USD) *
              </label>
              <input
                id="fin-amount-input"
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${fStyles.input}`}
              />
            </div>

            {/* Type Toggle Select */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Pipeline Type
              </label>
              <select
                id="fin-type-select"
                value={type}
                onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                className={`block w-full px-3 text-xs outline-none bg-[#FAF6EF] dark:bg-zinc-900 border ${fStyles.input}`}
              >
                <option value="expense">Outflow (Spend/Expense)</option>
                <option value="income">Inflow (Earnings/Income)</option>
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Ledger Category
              </label>
              <input
                id="fin-category-input"
                type="text"
                placeholder="e.g. Raw Materials, Bespoke Sales, Logistics, Equip Maintenance"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${fStyles.input}`}
              />
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Filing Date
              </label>
              <input
                id="fin-date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`block w-full px-3.5 text-xs outline-none ${fStyles.input}`}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-2">
              <button
                id="fin-submit-btn"
                type="submit"
                className={`w-full py-2.5 text-xs font-semibold rounded-lg uppercase tracking-wider cursor-pointer ${
                  theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900 border-2 border-black' :
                  theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
                  'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                File Transaction Record
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main Section: Transaction log vs Categorical stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Logs column (2 columns wide) */}
        <div className={`lg:col-span-2 p-6 rounded-xl ${fStyles.card}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-zinc-200/5 dark:border-zinc-800/40">
            <h4 className="font-serif text-sm font-semibold">
              Live Balance Logs
            </h4>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {(['all', 'income', 'expense'] as const).map((typeBtn) => (
                <button
                  id={`filter-fin-${typeBtn}`}
                  key={typeBtn}
                  onClick={() => setFilterType(typeBtn)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    filterType === typeBtn ? fStyles.btnActive : fStyles.btnInactive
                  }`}
                >
                  {typeBtn.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Table display list */}
          {filteredItems.length === 0 ? (
            <div id="fin-empty-state" className="text-center py-12">
              <AlertCircle size={24} className="mx-auto text-zinc-500 mb-2" />
              <p className="text-xs text-zinc-500">No transactions recorded for this selected metric.</p>
            </div>
          ) : (
            <div id="fin-logs-container" className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {filteredItems.map((item) => {
                const isIncome = item.type === 'income';
                return (
                  <div
                    id={`fin-row-${item.id}`}
                    key={item.id}
                    className="flex justify-between items-center p-3 rounded-xl border border-zinc-200/10 dark:border-zinc-900/50 bg-[#FAF7F2]/5 dark:bg-zinc-900/10 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-200">{item.title}</p>
                      
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                        <Tag size={10} />
                        <span>{item.category}</span>
                        <span>•</span>
                        <Calendar size={10} />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Sync check */}
                      {item.synced ? (
                        <span id={`fin-synced-badge-${item.id}`} className="text-[10px] text-emerald-500" title="Synced with secure cloud cache.">
                          <CloudCheck size={14} className="hidden" />
                        </span>
                      ) : (
                        <span id={`fin-offline-badge-${item.id}`} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-dashed border-amber-500/20 text-[8px] font-mono font-bold animate-pulse">
                          Offline Stash
                        </span>
                      )}

                      <span className={`font-mono font-bold whitespace-nowrap text-sm ${isIncome ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isIncome ? '+' : '-'}${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>

                      <button
                        id={`fin-delete-${item.id}`}
                        onClick={() => deleteExpense(item.id)}
                        className="p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded text-zinc-400 cursor-pointer"
                        title="Remove historical log entry"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Categories breakdown display widget */}
        <div className={`p-6 rounded-xl flex flex-col justify-between ${fStyles.card}`}>
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold">
              Corporate Cost Centers
            </h4>
            <p className="text-xs text-zinc-500 font-sans">
              Aggregated expenditures sorted by active structural departments.
            </p>

            <div id="cost-centers-breakdown" className="space-y-3.5 pt-2">
              {Object.keys(categoryTotals).length === 0 ? (
                <div className="text-center py-6 text-zinc-400 font-sans text-xs">
                  Zero cost centers reported. Log spending records to populate breakdown.
                </div>
              ) : (
                Object.entries(categoryTotals).map(([cat, val]) => {
                  const numVal = val as number;
                  const percent = Math.min((numVal / (totalExpense || 1)) * 100, 100);
                  return (
                    <div id={`category-progress-${cat}`} key={cat} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{cat}</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-50">${val.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            theme === 'contrast' ? 'bg-black' : 'bg-red-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200/10 dark:border-zinc-800/60 p-3.5 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-900 rounded-lg">
            <h5 className="font-serif text-xs font-semibold text-zinc-900 dark:text-zinc-50">Operational Insight</h5>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans mt-1">
              Currently compiling categorical expense allocations in memory. Use this ledger matrix to configure future fiscal scopes.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
