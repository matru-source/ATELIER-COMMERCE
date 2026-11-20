import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SearchContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const DEFAULT_POPULAR_SEARCHES = ['Cashmere Wrap', 'Bouclé Coat', 'Travertine Vessel', 'Saddle Leather', 'Silk Slip', 'Chelsea Boot'];

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_recent_searches');
      return saved ? JSON.parse(saved) : DEFAULT_POPULAR_SEARCHES.slice(0, 4);
    } catch {
      return DEFAULT_POPULAR_SEARCHES.slice(0, 4);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('atelier_recent_searches', JSON.stringify(recentSearches));
    } catch (e) {
      console.error('Failed to save searches:', e);
    }
  }, [recentSearches]);

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 8);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
