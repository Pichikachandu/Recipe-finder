import { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto transition-all duration-300">
      <div className={`relative rounded-lg transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary/30 shadow-md' : 'shadow-sm'
      }`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-muted-foreground/70 transition-colors duration-200" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-10 py-3.5 text-base border-0 bg-card text-foreground placeholder-muted-foreground/60 focus:ring-0 rounded-lg transition-all duration-300 border border-border focus:border-primary/50"
          placeholder="Search by ingredient (e.g., chicken, pasta, tofu)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search recipes by ingredient"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground/70 hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
            type="button"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Try: chicken, beef, pasta, salad, or any ingredient you like!
      </p>
    </div>
  );
};

export default SearchBar;
