import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coins, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertCircle,
  ShoppingBag,
  Heart,
  Calculator,
  Maximize2,
  Sliders,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface LuxuryProduct {
  id: string;
  name: string;
  category: 'Table Tops' | 'Luxury Basins' | 'Inlay Plates & Accent Decor' | 'Monolithic Furniture';
  subType: string;
  origin: string;
  priceUSD: number;
  availablePieces: number;
  imageUrl: string;
  specifications: {
    baseStone: string;
    gemstonesUsed: string;
    workDuration: string;
    weight: string;
    dimensions: string[];
    techniques: string[];
  };
  desc: string;
  artisanalCode: string;
  mineralComponent: string;
}

const LUX_PRODUCTS: LuxuryProduct[] = [
  {
    id: 'prod-1',
    name: 'Teatro Pietra Dura Inlay Floral Dining Table Top',
    category: 'Table Tops',
    subType: 'Aurelian Imperial Medallion Dining Surface',
    origin: 'Makrana Quarries, Rajasthan, India',
    priceUSD: 3600,
    availablePieces: 3,
    imageUrl: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=600&auto=format&fit=crop',
    specifications: {
      baseStone: '99% Pure Calcium Carbonate Makrana Albeta White Marble',
      gemstonesUsed: 'Malachite (Zaire), Lapis Lazuli (Badakhshan Afghanistan), Cornelian (Brazil), Turquoise (Nishapur)',
      workDuration: '320 Artisan Hours of Hand-Sawing & Inlaying',
      weight: '145 kg',
      dimensions: ['48 inches round', '60 inches octagonal', '72 inches rectangular'],
      techniques: ['Pietra Dura Italian Inlay', 'Hand-Chiseled Grooves', 'Grit-8000 Diamond Wax Buffing']
    },
    desc: 'Indulge in absolute grandeur. Spanning 320 hours of delicate craftsmanship, our artisans inlay hundreds of individually cut wafers of Lapis Lazuli and Zairean Malachite into a pristine Makrana White Marble block. Emits a timeless classic vibe, mimicking royal Mughal and Florentine court table designs.',
    artisanalCode: 'JBM-DT-109',
    mineralComponent: 'Premium Crystalline Dolomitic Aragonite'
  },
  {
    id: 'prod-2',
    name: 'Nero Marquina Scalloped Monolithic Basin',
    category: 'Luxury Basins',
    subType: 'Deep Slate Carbonaceous Washbasin',
    origin: 'Markina-Xemein, Basque Country, Spain',
    priceUSD: 1450,
    availablePieces: 5,
    imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b69763?q=80&w=600&auto=format&fit=crop',
    specifications: {
      baseStone: 'High-density Obsidian Marble with Crystal Sparite Matrix',
      gemstonesUsed: 'Premium Mother of Pearl highlights (optional border inlay)',
      workDuration: '140 Artisan Hours of Radial Rotary Hand Carving',
      weight: '42 kg',
      dimensions: ['16" x 16" x 6" circular bowl', '20" x 15" x 5.5" oval scalloped'],
      techniques: ['Rotary Core Drilling', 'Fluted Radial Hand Scalloping', 'Hydrophobic Fluorinated Seal Coat']
    },
    desc: 'Sovereign poise for modern architectural powder rooms. Carved from a single selected block of deep Nero Marquina marble, this sink is shaped with delicate exterior scalloped ridges and polished internally to a mirror shine, showcasing lightning-white calcite spar paths.',
    artisanalCode: 'JBM-BS-402',
    mineralComponent: 'Carbonaceous Micrite Limestone'
  },
  {
    id: 'prod-3',
    name: 'Emerald Aurora Serpentine Inlay Coffee Table',
    category: 'Table Tops',
    subType: 'Striae Botanical Cocktail Centerpiece',
    origin: 'Châtillon, Aosta Valley, Italy',
    priceUSD: 2400,
    availablePieces: 4,
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop',
    specifications: {
      baseStone: 'Verde Alpi Deep Serpentinery Marble',
      gemstonesUsed: 'White Magnesite, Gilded Brass Filigree Inlays, Tiger Eye',
      workDuration: '210 Artisan Hours of Micro-Bevel Interlocking',
      weight: '85 kg',
      dimensions: ['36 inches round', '42 inches octagon', '48 inches oval'],
      techniques: ['Acid-etched Deep Green Patina', 'Brass Filament Solder Fusion', 'Silk Matte Polish']
    },
    desc: 'An evocative cocktail table portraying deep Alpine flora. Striated serpentine waves run alongside brass filament lines hand-soldered into micro-channels. Ideal for high-end boutique waiting galleries and mid-century modern private parlors.',
    artisanalCode: 'JBM-CT-704',
    mineralComponent: 'Serpentine Antigorite & Magnesite'
  },
  {
    id: 'prod-4',
    name: 'Carrara Gold Gilded Florentine Wall Plate & Clock',
    category: 'Inlay Plates & Accent Decor',
    subType: 'Aurelian Sundial Crystalline Horologe',
    origin: 'Fantiscritti Quarry, Carrara, Italy',
    priceUSD: 690,
    availablePieces: 12,
    imageUrl: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=600&auto=format&fit=crop',
    specifications: {
      baseStone: '99% Pure Calcite Carrara Uniform White Marble',
      gemstonesUsed: 'Paua Shell, Jasper, Black Onyx, 24K Gold Foil Borders',
      workDuration: '75 Artisan Hours of Lapidary Precision Cutwork',
      weight: '8.5 kg',
      dimensions: ['14 inches diameter', '18 inches diameter'],
      techniques: ['Lapidary Insetting', 'Direct Gold Leafing', 'Micro-drill Core Center Mount']
    },
    desc: 'A stunning decorative timepiece or wall charger. Featuring intricate Arabic or floral concentric rings chiseled and filled with brilliant Paua shell and gold foil. Powered by high-precision silent quartz movements imported from Germany.',
    artisanalCode: 'JBM-CK-211',
    mineralComponent: 'Pure Crystalline Calcite carbonate'
  },
  {
    id: 'prod-5',
    name: 'Calacatta Viola Fluted Pedestal Side Table / Plinth',
    category: 'Monolithic Furniture',
    subType: 'Cabernet Brecciated Hexagonal Plinth',
    origin: 'Apuan Alps, Carrara, Italy',
    priceUSD: 1950,
    availablePieces: 6,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    specifications: {
      baseStone: 'Calacatta Viola Cabernet Breccia Aragonite',
      gemstonesUsed: 'Solid block, zero additives',
      workDuration: '180 Artisan Hours of Flute Grinding & Structural Assembly',
      weight: '68 kg',
      dimensions: ['14" x 14" x 18" Hexagonal Plinth', '16" x 16" x 22" Square Fluted'],
      techniques: ['Mitred Apron Assembly', 'Water-jet Sectioning', 'Polished Honed Saffron Protection']
    },
    desc: 'Bold sculptural architecture. Deep burgundy and wine-brecciated matrices swirl dramatically over a milky-white limestone base. Shaped with vertical classic Greek fluted columns to serve as high-contrast side tables or art sculpture presentation plinths.',
    artisanalCode: 'JBM-PT-503',
    mineralComponent: 'Clastic Brecciated Dolomite'
  }
];

export const DashboardOverview: React.FC = () => {
  const { 
    user, 
    tasks, 
    expenses, 
    notes, 
    theme, 
    isOnline, 
    isSyncing, 
    forceSyncData,
    addTask,
    addExpense,
    addToast,
    triggerPushNotification
  } = useWorkspace();

  // Showroom states
  const [activeProductId, setActiveProductId] = useState<string>('prod-1');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeDimension, setActiveDimension] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [withBrassInlay, setWithBrassInlay] = useState<boolean>(false);
  const [customBaseStone, setCustomBaseStone] = useState<string>('Original Quarry Source');
  const [polishFinish, setPolishFinish] = useState<string>('Honed Silk Matte');
  const [wishlisted, setWishlisted] = useState<string[]>([]);

  // Metrics calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  // Real financial aggregates from user ledger
  const rawIncome = expenses.filter(e => e.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const rawExpenses = expenses.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = rawIncome - rawExpenses;

  // Selected product object
  const activeProduct = LUX_PRODUCTS.find(p => p.id === activeProductId) || LUX_PRODUCTS[0];
  const currentDimension = activeDimension || activeProduct.specifications.dimensions[0];

  // Dynamic Size pricing factor
  const sizeIndex = activeProduct.specifications.dimensions.indexOf(currentDimension);
  const sizeMultiplier = sizeIndex === 1 ? 1.25 : sizeIndex === 2 ? 1.6 : 1.0;

  // Pricing engine
  const baseRate = activeProduct.priceUSD;
  const computedBaseCost = Math.round(baseRate * sizeMultiplier);
  const finishSurcharge = polishFinish === 'Atelier Mirror Gloss' ? 250 : polishFinish === 'Natural Antique Leathered' ? 400 : 0;
  const brassInlayCost = withBrassInlay ? 280 : 0;
  const transportCrateCost = 850;

  const unitProductPrice = computedBaseCost + finishSurcharge + brassInlayCost;
  const estGrandTotal = Math.round(unitProductPrice * quantity + transportCrateCost);

  // Dynamic dataset for Recharts
  const monthlyFlowData = [
    { name: 'Jan', income: 32000, expenses: 14000 },
    { name: 'Feb', income: 48000, expenses: 22000 },
    { name: 'Mar', income: 39000, expenses: 18500 },
    { name: 'Apr', income: 64000, expenses: 29000 },
    { name: 'May', income: 55000, expenses: 31000 },
    { name: 'Jun', income: rawIncome > 0 ? rawIncome : 85000, expenses: rawExpenses > 0 ? rawExpenses : 34000 },
  ];

  const offlineEditsCount = tasks.filter(t => !t.synced).length + 
                            expenses.filter(e => !e.synced).length + 
                            notes.filter(n => !n.synced).length;

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        accentText: 'text-black font-bold',
        subText: 'text-zinc-600',
        chartStroke: '#000000',
        chartFill: '#e4e4e7',
        gridColor: '#e4e4e7'
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm text-zinc-800',
        accentText: 'text-[#9A7512] font-semibold',
        subText: 'text-zinc-500',
        chartStroke: '#C59B27',
        chartFill: '#FAF6EF',
        gridColor: '#EBE3D5'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md text-zinc-200',
      accentText: 'text-[#C59B27] font-medium',
      subText: 'text-zinc-500',
      chartStroke: '#C59B27',
      chartFill: 'rgba(197, 155, 39, 0.05)',
      gridColor: '#1e1b18'
    };
  };

  const ovStyles = getThemeText();

  // Color mappings based on theme for rendering SVG charts
  const incomeColor = theme === 'contrast' ? '#000000' : '#C59B27';
  const expenseColor = theme === 'contrast' ? '#71717a' : '#78716c';

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setWishlisted(prev => {
      const prod = LUX_PRODUCTS.find(s => s.id === id);
      if (prev.includes(id)) {
        addToast(`Removed "${prod?.name}" from curation list.`, 'info');
        return prev.filter(x => x !== id);
      } else {
        addToast(`Added "${prod?.name}" to your exclusive curation portfolio.`, 'success');
        return [...prev, id];
      }
    });
  };

  // Submit reserve Order handler
  const handleReserveOrder = () => {
    // 1. Add as income in expenses list
    const saleTitle = `Bespoke Order: ${activeProduct.name} - ${currentDimension} (${quantity} Qty)`;
    const category = "Showroom Sales";
    const dateFormatted = new Date().toISOString().split('T')[0];
    addExpense(saleTitle, estGrandTotal, 'income', category, dateFormatted);

    // 2. Add as order processing task
    const taskTitle = `Artisanal Carving & Assembly: #${activeProduct.artisanalCode}`;
    const baseChoice = customBaseStone === 'Original Quarry Source' ? activeProduct.specifications.baseStone : customBaseStone;
    const taskDetails = `Custom assembly using base stone: ${baseChoice}. Applied Surface Treatment: ${polishFinish}. Size: ${currentDimension}. Gilded Brass Inlays: ${withBrassInlay ? 'Yes (Gilded Filigree)' : 'No'}. Quantity: ${quantity} pcs. Est Value: $${estGrandTotal.toLocaleString()}. Queued for shipping dispatch.`;
    addTask(taskTitle, 'high', dateFormatted, 'Processing Orders', taskDetails);

    // 3. Trigger Notification
    triggerPushNotification(
      "Artisanal Masterpiece Commissioned", 
      `Secured custom order ${activeProduct.artisanalCode} for $${estGrandTotal.toLocaleString()}. Atelier layout queued in Orders.`, 
      'success'
    );

    // 4. Toast
    addToast(`Successfully commissioned "${activeProduct.name}"! Sales registered in Capital Flow ledger.`, 'success');
  };

  return (
    <div id="dashboard-overview" className="space-y-8 animate-fade-in">
      {/* Top Banner Accent */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl tracking-tight font-semibold text-zinc-900 dark:text-zinc-50">
            Atelier Showroom &amp; Stocks
          </h2>
          <p className="text-xs font-sans text-zinc-500 dark:text-zinc-400 mt-1">
            Welcome back, <span className="font-semibold text-zinc-950 dark:text-zinc-200">{user?.fullName || 'Operator'}</span>. Review marble block queues, raw imports, and bespoke carvings.
          </p>
        </div>
        
        {/* Offline sync feedback toolbar */}
        <div className="flex items-center gap-3">
          {offlineEditsCount > 0 && (
            <div id="local-edits-pill" className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono">
              <AlertCircle size={14} className="animate-bounce" />
              <span>{offlineEditsCount} Pending Local Changes</span>
            </div>
          )}
          
          <button
            id="overview-sync-trigger"
            onClick={forceSyncData}
            disabled={!isOnline || isSyncing}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              theme === 'contrast' ? 'border-black bg-black text-white' :
              theme === 'light' ? 'border-[#C59B27] bg-[#FAF7F2] text-[#9A7512] hover:bg-[#F2ECE1]' :
              'border-orange-500/20 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'
            } ${(!isOnline || isSyncing) ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Reconciling...' : 'Forced Real-Time Sync'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Panel Grid */}
      <div id="kpi-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Tasks */}
        <div id="kpi-tasks" className={`p-6 rounded-xl relative overflow-hidden ${ovStyles.card}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500">
              Atelier Active Orders
            </span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#FAF6EF]' : 'bg-zinc-900/40'}`}>
              <CheckCircle2 size={16} className={ovStyles.accentText} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              {completedTasks}<span className="text-xs text-zinc-400 dark:text-zinc-500"> / {totalTasks}</span>
            </h3>
            <p className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500">
              {inProgressTasks} stone commissions listed
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${theme === 'contrast' ? 'bg-black' : 'bg-[#C59B27]'}`}
              style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Revenue */}
        <div id="kpi-revenue" className={`p-6 rounded-xl relative overflow-hidden ${ovStyles.card}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500">
              Sourcing &amp; Sales Inflow
            </span>
            <div className={`p-2 rounded-lg bg-emerald-500/10`}>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
              ${rawIncome.toLocaleString()}
            </h3>
            <p className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <span className="text-emerald-500 flex items-center"><ArrowUpRight size={12} /> Active Inflow</span>
              this cycle
            </p>
          </div>
        </div>

        {/* Metric 3: Expense Ledger */}
        <div id="kpi-expenses" className={`p-6 rounded-xl relative overflow-hidden ${ovStyles.card}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500">
              Operational Expenditures
            </span>
            <div className={`p-2 rounded-lg bg-rose-500/10`}>
              <TrendingDown size={16} className="text-rose-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-3xl font-semibold text-rose-600 dark:text-rose-400">
              ${rawExpenses.toLocaleString()}
            </h3>
            <p className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <span className="text-rose-500 flex items-center"><ArrowDownRight size={12} /> Sourcing &amp; Gear</span>
              total stashed
            </p>
          </div>
        </div>

        {/* Metric 4: Net Balance / Capital */}
        <div id="kpi-balance" className={`p-6 rounded-xl relative overflow-hidden ${ovStyles.card}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500">
              Retained Capital Reserves
            </span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#FAF6EF]' : 'bg-zinc-900/40'}`}>
              <Coins size={16} className="text-emerald-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className={`font-serif text-3xl font-semibold ${balance >= 0 ? 'text-zinc-900 dark:text-zinc-50' : 'text-rose-500'}`}>
              ${balance.toLocaleString()}
            </h3>
            <p className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500">
              Net value of stone reserves &amp; contracts
            </p>
          </div>
        </div>

      </div>

      {/* LUXURY SLAB SHOWROOM INDEX PORTFOLIO (High-End E-commerce Design) */}
      <div id="premium-showroom-container" className="space-y-6 animate-fade-in mt-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-3 border-b border-[#C59B27]/20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#A47D15] dark:text-[#C59B27]/90 font-bold bg-[#C59B27]/10 px-2 py-0.5 rounded">Atelier Catalog</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-[10px] font-mono text-zinc-400">Bespoke Inlay Art &amp; Marble Carver Works</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50 tracking-wide">
              Handcrafted Italian &amp; Indian Stone Curation
            </h3>
            <p className="text-xs text-zinc-500 max-w-2xl mt-0.5">
              Explore exquisite Pietra Dura table tops, monolithic fluted vessel basins, and hand-gilded clocks. Select an item to view materials, custom stones, and configure bespoke dimensions.
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <span>Portfolio Highlighted:</span>
            <span className="font-bold text-[#A47D15] bg-[#C59B27]/5 px-2 py-1 rounded border border-[#C59B27]/15">
              {wishlisted.length} Workpieces Stashed
            </span>
          </div>
        </div>

        {/* Category Filters bar */}
        <div className="flex flex-wrap gap-1.5 pb-2">
          {['All', 'Table Tops', 'Luxury Basins', 'Inlay Plates & Accent Decor', 'Monolithic Furniture'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                const available = cat === 'All' ? LUX_PRODUCTS : LUX_PRODUCTS.filter(p => p.category === cat);
                if (available.length > 0 && !available.some(p => p.id === activeProductId)) {
                  setActiveProductId(available[0].id);
                  setActiveDimension('');
                }
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 border ${
                categoryFilter === cat
                  ? 'bg-[#9A7512] border-[#9A7512] text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-805 text-zinc-600 dark:text-zinc-300 hover:border-[#C59B27]/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
              }`}
            >
              {cat === 'All' ? 'All Masterpieces' : cat}
            </button>
          ))}
        </div>

        {/* Product Roster Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {(categoryFilter === 'All' ? LUX_PRODUCTS : LUX_PRODUCTS.filter(p => p.category === categoryFilter)).map(prod => {
            const isActive = activeProductId === prod.id;
            const isFav = wishlisted.includes(prod.id);
            return (
              <div 
                key={prod.id}
                onClick={() => {
                  setActiveProductId(prod.id);
                  setActiveDimension('');
                }}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isActive 
                    ? 'border-[#C59B27] bg-[#FAF7F2] dark:bg-zinc-900/60 shadow-md ring-1 ring-[#C59B27]/30 scale-[1.01]' 
                    : 'border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-950/20 hover:border-[#C59B27]/30 hover:shadow-xs'
                }`}
              >
                {/* Image */}
                <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-505 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isFav 
                          ? 'bg-rose-500 text-white shadow-xs' 
                          : 'bg-black/30 hover:bg-black/55 text-white/90'
                      }`}
                    >
                      <Heart size={12} fill={isFav ? "white" : "none"} />
                    </button>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 bg-black/45 backdrop-blur-xs text-[9px] text-white px-1.5 py-0.5 rounded font-mono">
                    From ${prod.priceUSD.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 space-y-1 bg-stone-50/50 dark:bg-zinc-900/40 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider font-mono text-[#A47D15] dark:text-[#C59B27]/90 font-medium block">
                      {prod.category}
                    </span>
                    <h4 className="font-display font-bold text-xs text-zinc-950 dark:text-zinc-50 leading-tight line-clamp-1 mt-0.5" title={prod.name}>
                      {prod.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-auto border-t border-zinc-200/20">
                    <span className="text-[8px] font-mono text-zinc-400">
                      CODE: {prod.artisanalCode}
                    </span>
                    <span className="text-[8px] text-[#A47D15] font-semibold bg-[#C59B27]/10 px-1 py-0.2 rounded">
                      {prod.availablePieces} Left
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Sandbox View: Left (Slab Specs & Bookmatching) vs Right (Configurator Pricing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Specs & Gemstone Inlay Details (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-xl border border-[#E3D3B8] bg-white dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-150">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-900 pb-3">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#A47D15] font-bold">Provenance &amp; Gemstone Specs</span>
                  <h4 className="font-display text-lg font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-1.5">
                    {activeProduct.name}
                    {wishlisted.includes(activeProduct.id) && (
                      <span className="text-[10px] bg-rose-50 text-rose-600 dark:border-rose-950/40 dark:bg-rose-950/20 px-1.5 py-0.2 rounded font-sans font-medium border border-rose-100">Curation Favorite</span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-400 italic mt-0.5">{activeProduct.subType}</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-zinc-400">Artisanal Serial ID</div>
                  <div className="text-sm font-semibold text-[#A47D15]">{activeProduct.artisanalCode}</div>
                </div>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-2">
                {activeProduct.desc}
              </p>

              {/* Petrographic & Handmade Specifications list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono py-1">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-zinc-900/45 border border-[#FAF0DE] dark:border-zinc-850">
                  <div className="text-[9px] text-[#A47D15] dark:text-[#C59B27] font-semibold">ORIGIN QUARRY</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-200 mt-0.5 truncate" title={activeProduct.origin}>
                    {activeProduct.origin}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-zinc-900/45 border border-[#FAF0DE] dark:border-zinc-850">
                  <div className="text-[9px] text-[#A47D15] dark:text-[#C59B27] font-semibold">BASE MARBLE SYSTEM</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-200 mt-0.5 truncate" title={activeProduct.specifications.baseStone}>
                    {activeProduct.specifications.baseStone.split(' ').slice(0,3).join(' ')}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-zinc-900/45 border border-[#FAF0DE] dark:border-zinc-850">
                  <div className="text-[9px] text-[#A47D15] dark:text-[#C59B27] font-semibold">ARTISAN LABOR SPEED</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-200 mt-0.5 truncate" title={activeProduct.specifications.workDuration}>
                    {activeProduct.specifications.workDuration}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-zinc-900/45 border border-[#FAF0DE] dark:border-zinc-850 col-span-2">
                  <div className="text-[9px] text-[#A47D15] dark:text-[#C59B27] font-semibold">GEMSTONES LOADED</div>
                  <div className="font-bold text-zinc-800 dark:text-zinc-100 mt-0.5 truncate" title={activeProduct.specifications.gemstonesUsed}>
                    {activeProduct.specifications.gemstonesUsed}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FAF7F2] dark:bg-zinc-900/45 border border-[#FAF0DE] dark:border-zinc-850">
                  <div className="text-[9px] text-[#A47D15] dark:text-[#C59B27] font-semibold">EST UNIT WEIGHT</div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-200 mt-0.5">{activeProduct.specifications.weight}</div>
                </div>
              </div>

              {/* Lapidary craft techniques list */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-zinc-400">
                  Refined Lapidary Techniques Utilized
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.specifications.techniques.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900/60 px-2.5 py-1 rounded-md text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/40"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono bg-[#C59B27]/10 px-2.5 py-1 rounded-md text-[#9A7512] font-semibold border border-[#C59B27]/20">
                    {activeProduct.mineralComponent}
                  </span>
                </div>
              </div>

              {/* INTERACTIVE DRY LAY PATTERN VISUALIZER WITH DYNAMIC MATERIAL CONFIGURATION */}
              <div className="space-y-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">
                    Bespoke Visual Layout Simulator
                  </span>
                  
                  <span className="text-[9px] font-mono text-zinc-500 bg-[#FAF7F2] dark:bg-zinc-900 px-2.5 py-1 rounded border border-[#C59B27]/10">
                    Base: {customBaseStone === 'Original Quarry Source' ? 'Prism Native' : customBaseStone.split(' ')[0]}
                  </span>
                </div>

                {/* Dry Lay Visual Box - background tint changes dynamically */}
                <div 
                  className={`relative rounded-xl overflow-hidden shadow-inner h-64 sm:h-72 transition-all duration-500 p-2 border ${
                    customBaseStone === 'Nero Marquina Velvet Black' ? 'bg-zinc-900 border-zinc-805' :
                    customBaseStone === 'Verde Alpi Emerald' ? 'bg-emerald-950/90 border-emerald-900/60' :
                    customBaseStone === 'Calacatta Viola Cabernet' ? 'bg-rose-950/60 border-rose-900/40' :
                    'bg-zinc-100/40 border-stone-200 dark:bg-zinc-950/30'
                  }`}
                >
                  <div className="w-full h-full relative overflow-hidden rounded-lg">
                    {/* Raw texture under-layer */}
                    <img 
                      src={activeProduct.imageUrl} 
                      alt="Product Accent Texture" 
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        customBaseStone === 'Nero Marquina Velvet Black' ? 'grayscale invert brightness-50 opacity-40' :
                        customBaseStone === 'Verde Alpi Emerald' ? 'sepia-0 hue-rotate-60 brightness-75 opacity-60' :
                        customBaseStone === 'Calacatta Viola Cabernet' ? 'sepia saturate-150 hue-rotate-[320deg] brightness-90 opacity-60' :
                        'opacity-90'
                      }`}
                    />

                    {/* Interactive Gilded overlay vector */}
                    {withBrassInlay && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
                        <svg className="w-4/5 h-4/5 text-amber-400 opacity-80" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
                          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1.5" />
                          {/* Radial lines mirroring hand inlaying frames */}
                          <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                          <line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white/95 font-mono">
                    {withBrassInlay 
                      ? 'Atelier Layout: Hand-Fused Gilded Brass Filigree Active' 
                      : 'Atelier Layout: Pure Mineral Inlay Contour'}
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] text-[#C59B27] font-mono border border-[#C59B27]/30">
                    Joint Polish: 8000 Mesh Diamond Wax
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Configurator Estimator & Reservation Form (5 columns) */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-[#E3D3B8] bg-[#FAF7F2] dark:bg-zinc-900/20 text-zinc-800 dark:text-zinc-150 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#C59B27]/20 flex items-center gap-2">
                <Calculator size={18} className="text-[#C59B27]" />
                <div>
                  <h4 className="font-display font-bold text-sm tracking-wide text-zinc-950 dark:text-zinc-100">
                    Detail customizer &amp; valuer
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-sans mt-0.5">Configure sizes, materials, and gilded filigrees.</p>
                </div>
              </div>

              {/* Dimension size Selection */}
              <div className="space-y-1.5">
                <span className="block text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                  Bespoke Dimensions &amp; Outlines
                </span>
                <div className="space-y-1">
                  {activeProduct.specifications.dimensions.map((dimOption, i) => {
                    const isSel = currentDimension === dimOption;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveDimension(dimOption)}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold tracking-wide transition-all flex justify-between items-center cursor-pointer ${
                          isSel
                            ? 'border-[#C59B27] bg-[#C59B27]/10 text-[#A47D15]'
                            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 text-zinc-650 hover:border-zinc-300'
                        }`}
                      >
                        <span>{dimOption}</span>
                        <span className="text-[10px] uppercase font-mono text-zinc-400">
                          {i === 0 ? 'Standard' : i === 1 ? 'Medium (+25%)' : 'Grand (+60%)'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Base Stone Material Tint Customizer */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                  Base Stone Colorway tint
                </label>
                <select
                  id="customizer-base-stone-color"
                  value={customBaseStone}
                  onChange={(e) => setCustomBaseStone(e.target.value)}
                  className="block w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#C59B27]"
                >
                  <option value="Original Quarry Source">Original Material Selection (Default)</option>
                  <option value="Makrana Albeta White">Makrana Pristine White (Albeta Cut)</option>
                  <option value="Nero Marquina Velvet Black">Nero Marquina Obsidian Black</option>
                  <option value="Verde Alpi Emerald">Verde Alpi Serpentine Green</option>
                  <option value="Calacatta Viola Cabernet">Calacatta Viola Wine Cabernet</option>
                </select>
              </div>

              {/* Surface Treatment Selection */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                  Surface Buffing Degree
                </label>
                <select
                  id="showroom-finishing-polish"
                  value={polishFinish}
                  onChange={(e) => setPolishFinish(e.target.value)}
                  className="block w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#C59B27]"
                >
                  <option value="Honed Silk Matte">Honed Silk Matte (Satin Hand Buff - $0)</option>
                  <option value="Atelier Mirror Gloss">Atelier Mirror Gloss (Diamond Paste Compound - +$250)</option>
                  <option value="Natural Antique Leathered">Natural Antique Leathered (Acid Brushed Textured - +$400)</option>
                </select>
              </div>

              {/* Brass Inlay Checkbox */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-850 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-zinc-850 dark:text-zinc-150 flex items-center gap-1">
                    <Sparkles size={13} className="text-amber-500" />
                    Hand-Fused Brass Filigrees
                  </span>
                  <p className="text-[9px] text-zinc-450 leading-tight">Channels carved and soldered with 1.5mm premium brass filaments.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={withBrassInlay}
                  onChange={(e) => setWithBrassInlay(e.target.checked)}
                  className="h-4 w-4 text-[#C59B27] rounded border-stone-300 focus:ring-[#C59B27] cursor-pointer"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
                  Commission Quantity
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-7 w-7 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold hover:bg-zinc-100 flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-bold w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="h-7 w-7 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold hover:bg-zinc-100 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Valuation Breakdown list */}
              <div className="p-4 rounded-xl border border-[#E3D3B8] bg-white dark:bg-zinc-950/40 text-xs font-mono space-y-2 mt-4 shadow-xs">
                <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                  <span className="text-zinc-400">BASE WORKPIECE VALUE</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">${baseRate.toLocaleString()}</span>
                </div>
                {sizeMultiplier > 1 && (
                  <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                    <span className="text-zinc-400">SIZE MULTIPLIER INDEX</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">x{sizeMultiplier} (+${computedBaseCost - baseRate})</span>
                  </div>
                )}
                {finishSurcharge > 0 && (
                  <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                    <span className="text-zinc-400">SPECIAL BUFFING TREATMENT</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">+${finishSurcharge.toLocaleString()}</span>
                  </div>
                )}
                {withBrassInlay && (
                  <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                    <span className="text-zinc-400">METAL INLAY UPGRADE</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-bold">+${brassInlayCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                  <span className="text-zinc-400">UNIT SUB-TOTAL</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">${unitProductPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-dashed border-zinc-100 dark:border-zinc-900 text-[10px]">
                  <span className="text-zinc-400">LOGISTICS, SEAPORT CRATING</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">+${transportCrateCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between pt-1.5 text-zinc-950 dark:text-white font-serif font-semibold text-sm">
                  <span>EST VALUE ({quantity} pc):</span>
                  <span className="text-[#A47D15]">${estGrandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                id="showroom-purchase-submit-btn"
                onClick={handleReserveOrder}
                className="w-full flex items-center justify-center gap-2.5 bg-[#9A7512] hover:bg-[#83620D] text-white p-3.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#9A7512]/10 cursor-pointer animate-pulse"
              >
                <ShoppingBag size={15} />
                <span>Commission Custom Handcraft Piece</span>
              </button>
              
              <p className="text-[10px] text-center text-zinc-400 font-sans mt-3">
                Orders instantly register in the Atelier Ledger pipeline, automatically scheduling craftsman hours and syncing capital reserves.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main analytical displays Section - Chart + Connectivity Info */}
      <div id="charts-and-connectivity-view" className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Chart Card (takes up 2 columns) */}
        <div id="capital-trend-widget" className={`lg:col-span-2 p-6 rounded-xl ${ovStyles.card}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-display text-base tracking-tight font-semibold">
                Slab &amp; Block Value Pipeline
              </h4>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-sans mt-0.5">
                Aggregated sales transactions vs raw marble material sourcing expenditures.
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyFlowData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={incomeColor} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={incomeColor} stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={ovStyles.gridColor} />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#52525b' : '#a1a1aa'} />
                <YAxis stroke={theme === 'dark' ? '#52525b' : '#a1a1aa'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#f4f4f5' : '#09090b'
                  }}
                />
                <Legend iconSize={10} verticalAlign="top" height={36} />
                <Area 
                  type="monotone" 
                  name="Inflow (Revenue)"
                  dataKey="income" 
                  stroke={incomeColor} 
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  name="Outflow (Expenses)"
                  dataKey="expenses" 
                  stroke={expenseColor} 
                  fillOpacity={0} 
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connectivity health ledger (takes up 1 column) */}
        <div id="connectivity-status-card" className={`p-6 rounded-xl flex flex-col justify-between ${ovStyles.card}`}>
          <div className="space-y-4">
            <div className="border-b border-zinc-200/15 dark:border-zinc-800/60 pb-3">
              <h4 className="font-serif text-sm tracking-tight font-semibold uppercase font-mono text-[11px] text-zinc-400">
                Offline Core Status
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Real-time connection simulation showing stashed client metrics.
              </p>
            </div>

            {/* Current status display */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/40">
                <span className="text-xs font-medium">Reconciliation Gateway</span>
                <span className="flex items-center gap-1.5 text-xs">
                  {isOnline ? (
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold uppercase text-[10px]">
                      <Wifi size={12} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-500 font-semibold uppercase text-[10px] animate-pulse">
                      <WifiOff size={11} /> Deferred
                    </span>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/40">
                <span className="text-xs font-medium">Pending Sync Stack</span>
                <span className={`text-xs font-mono font-bold ${offlineEditsCount > 0 ? 'text-amber-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                  {offlineEditsCount} values
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/30 dark:border-zinc-800/40">
                <span className="text-xs font-medium">Local DB Health</span>
                <span className="text-xs text-emerald-500 font-semibold uppercase text-[10px]">
                  Optimal
                </span>
              </div>
            </div>

            {/* Simulated latency meter */}
            <div className="p-3.5 rounded-lg border border-pink-500/10 dark:border-amber-500/15 bg-neutral-100/20 dark:bg-zinc-950/40">
              <h5 className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-orange-400/80 mb-2 font-semibold">
                Offline-First Persistence Strategy
              </h5>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                When connectivity sinks below healthy thresholds, all records are safely queued in `localStorage`. Once connectivity returns, click "Forced Real-Time Sync" to bridge states.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200/10 dark:border-zinc-800/60 mt-4">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>DISK STORAGE</span>
              <span>1.2 KB / 5 MB</span>
            </div>
            <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-[#A47D15] dark:bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: '1.2%' }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Recents Log */}
      <div id="recent-logs-section" className={`p-6 rounded-xl ${ovStyles.card}`}>
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-200/15 dark:border-zinc-800/60">
          <h4 className="font-display text-sm tracking-tight font-semibold">
            Atelier Activity &amp; Live Sequence Feed
          </h4>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
            Chronological
          </span>
        </div>

        <div className="space-y-3.5">
          {tasks.slice(0, 2).map((task) => (
            <div key={task.id} className="flex justify-between items-start text-xs border-b border-zinc-200/5 dark:border-zinc-900 pb-3 last:border-none last:pb-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-bold block">Atelier Order Active</span>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200">{task.title}</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-[11px] truncate max-w-lg">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 font-mono text-[10px]">
                <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
                  task.status === 'completed' ? 'bg-[#9A7512]/15 text-[#9A7512] border border-[#9A7512]/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                  {task.status}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500 mt-0.5">{task.dueDate}</span>
              </div>
            </div>
          ))}

          {notes.slice(0, 1).map((note) => (
            <div key={note.id} className="flex justify-between items-start text-xs border-b border-zinc-200/5 dark:border-zinc-900 pb-3 last:border-none last:pb-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-mono text-[#A47D15] dark:text-orange-400 font-bold block">Material Curation Insight</span>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200">{note.title}</p>
                <p className="text-zinc-400 dark:text-zinc-500 text-[11px] truncate max-w-lg">{note.content}</p>
              </div>
              <div className="flex flex-col items-end gap-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-[#FAF6EF] dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {note.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
