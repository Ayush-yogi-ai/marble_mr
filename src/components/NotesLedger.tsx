import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { NoteItem } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  Search, 
  Tag, 
  Clock, 
  CheckCircle,
  CloudOff,
  CloudCheck,
  Eye,
  X 
} from 'lucide-react';

export const NotesLedger: React.FC = () => {
  const { 
    notes, 
    addNote, 
    updateNote, 
    deleteNote, 
    theme, 
    isOnline 
  } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewNote, setViewNote] = useState<NoteItem | null>(notes[0] || null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Start creating new note
  const handleStartCreate = () => {
    setTitle('');
    setContent('');
    setCategory('Ideation');
    setIsEditing(true);
    setViewNote(null);
  };

  // Start editing existing note
  const handleStartEdit = (note: NoteItem) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setIsEditing(true);
    setViewNote(note);
  };

  // Save changes
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (viewNote && viewNote.id) {
      // Editing existing
      updateNote(viewNote.id, title, content, category);
      setViewNote({
        ...viewNote,
        title,
        content,
        category,
        updatedAt: new Date().toISOString(),
        synced: isOnline
      });
    } else {
      // Creating brand new
      addNote(title, content, category);
      // Automatically pull recently stashed note as active view note
      const nextId = `note-${Date.now()}`; // approximate
      setViewNote({
        id: nextId,
        title,
        content,
        category,
        updatedAt: new Date().toISOString(),
        synced: isOnline
      });
    }
    setIsEditing(false);
  };

  // Unique categories calculation
  const categories = ['all', ...Array.from(new Set(notes.map(n => n.category)))];

  // Filtering computations
  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getThemeText = () => {
    if (theme === 'contrast') {
      return {
        card: 'bg-white border-2 border-black text-black',
        form: 'bg-white border-2 border-black text-black',
        input: 'border-2 border-black rounded-none h-10 text-black p-2.5',
        btnActive: 'bg-black text-white font-bold',
        btnInactive: 'border border-black text-black hover:bg-zinc-105',
        badgeSynced: 'bg-black text-white font-mono font-bold',
        badgeOffline: 'bg-white border border-dashed border-black font-semibold'
      };
    }
    if (theme === 'light') {
      return {
        card: 'bg-white border border-[#E3D3B8] shadow-sm',
        form: 'bg-[#FAF7F2] border border-[#EBE3D5] rounded-xl',
        input: 'border border-[#E2D2B8] bg-white text-zinc-800 focus:border-[#C59B27] focus:ring-1 focus:ring-[#C59B27]/40 rounded-lg h-10 p-3',
        btnActive: 'bg-[#C59B27] text-white font-semibold',
        btnInactive: 'text-zinc-650 hover:bg-[#F2ECE1]/50 border border-[#EBE3D5]',
        badgeSynced: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[9px]',
        badgeOffline: 'bg-amber-50 text-amber-800 border border-dashed border-amber-300 font-mono text-[9px]'
      };
    }
    return {
      card: 'bg-zinc-950/80 border border-zinc-900/60 shadow-xl backdrop-blur-md',
      form: 'bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl',
      input: 'border border-zinc-800 bg-zinc-900/50 text-zinc-100 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20 rounded-lg h-10 p-3',
      btnActive: 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-semibold',
      btnInactive: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-zinc-850',
      badgeSynced: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[8px]',
      badgeOffline: 'bg-amber-500/10 text-amber-400 border border-dashed border-amber-500/20 font-mono text-[8px]'
    };
  };

  const nStyles = getThemeText();

  // Highlight paragraph matches for search query
  const formatContent = (txt: string) => {
    return txt.split('\n').map((para, i) => (
      <p key={i} className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm mb-4 font-sans max-w-2xl">
        {para}
      </p>
    ));
  };

  return (
    <div id="notes-ledger-screen" className="space-y-6 animate-fade-in">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Curator Curation Bible
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Document raw stone chemical vulnerabilities, diamond sawing speeds, edge profiles, and sealant codes.
          </p>
        </div>

        <button
          id="toggle-add-note-action"
          onClick={handleStartCreate}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900' :
            theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
            'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md shadow-orange-500/5'
          }`}
        >
          <Plus size={14} />
          <span>Log Curation Guide</span>
        </button>
      </div>

      {/* Main Double Column split: side index vs main content reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Index List Column */}
        <div id="notes-index-col" className="space-y-4">
          
          {/* Search ledger */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 mr-1">
              <Search size={14} />
            </div>
            <input
              id="notes-search-input"
              type="text"
              placeholder="Query Curation bible indexes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full pl-9 pr-3 outline-none text-xs ${nStyles.input}`}
            />
          </div>

          {/* Category Quick Tags Filter bar */}
          <div className="flex flex-wrap gap-1 pb-1">
            {categories.map((cat) => (
              <button
                id={`notes-cat-filter-${cat}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-mono tracking-wider font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat ? nStyles.btnActive : nStyles.btnInactive
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scrolling Entries Stack */}
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <p className="text-zinc-500 text-xs text-center py-8 font-sans">Zero curation entries registered.</p>
            ) : (
              filteredNotes.map((note) => {
                const isActive = viewNote?.id === note.id;
                return (
                  <div
                    id={`note-card-selector-${note.id}`}
                    key={note.id}
                    onClick={() => {
                      setViewNote(note);
                      setIsEditing(false);
                    }}
                    className={`p-4 rounded-xl cursor-pointer text-left transition-all ${nStyles.card} ${
                      isActive 
                        ? (theme === 'contrast' ? 'border-l-8 border-l-black border-2 border-black' : theme === 'light' ? 'border-[#C59B27] bg-[#F2ECE1]/30' : 'border-orange-500/40 bg-orange-500/5') 
                        : 'hover:opacity-95'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 truncate flex-1">
                        {note.title}
                      </h4>
                      {/* Offline feedback icon */}
                      {!note.synced && (
                        <span id={`note-offline-indicator-${note.id}`} className="text-amber-500 animate-pulse" title="Saved locally in offline cache.">
                          <CloudOff size={11} />
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mb-2">
                      {note.content}
                    </p>

                    <div className="flex items-center justify-between text-[8px] font-mono font-bold text-zinc-400">
                      <span className="uppercase text-[#A47D15] dark:text-orange-400/80">{note.category}</span>
                      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Reader & Editor Pane Column */}
        <div id="notes-reader-col" className="lg:col-span-2">
          {isEditing ? (
            
            /* EDIT & CREATE FORM */
            <form onSubmit={handleSave} className={`p-6 ${nStyles.form} space-y-4`}>
              <div className="flex justify-between items-center pb-3 border-b border-zinc-200/5 dark:border-zinc-900 border-dashed">
                <h3 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <FileText size={16} className="text-[#C59B27]" />
                  <span>{viewNote ? 'Modify Curator Entry' : 'Publish Curator Entry'}</span>
                </h3>
                <button
                  id="cancel-edit-note"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                  aria-label="Cancel note edit"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Title Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Guide Title *
                </label>
                <input
                  id="note-title-input"
                  type="text"
                  required
                  placeholder="e.g. Acid susceptibility of calcite stones..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`block w-full outline-none text-xs font-serif text-sm font-semibold ${nStyles.input}`}
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Atelier Categorization
                </label>
                <input
                  id="note-category-input"
                  type="text"
                  placeholder="e.g. Curator Bible, Technical Specs"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`block w-full outline-none text-xs ${nStyles.input}`}
                />
              </div>

              {/* Content text */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Guideline specifications *
                </label>
                <textarea
                  id="note-content-input"
                  required
                  placeholder="Write chemical composition rules, polishing stages, edge details, or moisture backing specs..."
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`block w-full outline-none text-xs p-3 leading-relaxed resize-none ${nStyles.input} h-auto font-sans`}
                />
              </div>

              {/* Save trigger */}
              <div className="pt-2 flex gap-3">
                <button
                  id="note-save-btn"
                  type="submit"
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider cursor-pointer ${
                    theme === 'contrast' ? 'bg-black text-white hover:bg-zinc-900 border-2 border-black' :
                    theme === 'light' ? 'bg-[#9A7512] hover:bg-[#83620D] text-white' :
                    'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  Confirm curation write
                </button>
                <button
                  id="note-discard-btn"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors border cursor-pointer ${
                    theme === 'contrast' ? 'border-black text-zinc-600 hover:bg-zinc-50' :
                    theme === 'light' ? 'border-[#EBE3D5] text-zinc-650 hover:bg-zinc-200/20' :
                    'border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  Discard
                </button>
              </div>

            </form>
          ) : viewNote ? (
            
            /* VIEW READING PANEL */
            <div id="notes-view-panel" className={`p-6 sm:p-8 ${nStyles.card} space-y-6 h-full flex flex-col justify-between min-h-[460px]`}>
              
              <div className="space-y-4">
                
                {/* Header info */}
                <div className="flex justify-between items-start gap-4 pb-4 border-b border-zinc-200/10 dark:border-zinc-900">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#A47D15] dark:text-orange-400/80 font-bold block">
                      {viewNote.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                      {viewNote.title}
                    </h3>
                    <p className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 select-none">
                      <Clock size={11} /> Last updated: {new Date(viewNote.updatedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions line */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      id="edit-note-btn"
                      onClick={() => handleStartEdit(viewNote)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-neutral-100 dark:hover:bg-zinc-900 rounded transition-all cursor-pointer"
                      title="Edit Curator entry"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      id="delete-note-btn"
                      onClick={() => {
                        deleteNote(viewNote.id);
                        setViewNote(notes.filter(n => n.id !== viewNote.id)[0] || null);
                      }}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/5 rounded transition-all cursor-pointer"
                      title="Destroy entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Body Content display */}
                <div id="note-body-content" className="pt-3">
                  {formatContent(viewNote.content)}
                </div>

              </div>

              {/* Sync status footer indicator */}
              <div className="pt-4 border-t border-zinc-200/5 dark:border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Local Cache Active
                </span>

                {viewNote.synced ? (
                  <span id="note-synced-status" className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle className="inline" size={11} /> Cloud Synchronized
                  </span>
                ) : (
                  <span id="note-offline-status" className="flex items-center gap-1 text-amber-500 animate-pulse font-semibold">
                    Pending Offline Sync Queue
                  </span>
                )}
              </div>

            </div>
          ) : (
            
            /* CHIP EMPTY CHOOSE STATE */
            <div id="notes-empty-panel" className="text-center py-20 rounded-xl border border-dashed border-zinc-200/20 dark:border-zinc-806 bg-[#FAF7F2]/15 dark:bg-zinc-950/10 h-full flex flex-col justify-center items-center">
              <FileText size={40} className="text-zinc-500 mb-3" />
              <h3 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Zero curators highlighted
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Log a new technical curation specification or select an active sidebar item to begin reviewing details.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
