import { useState, useEffect } from 'react';
import { FiClock, FiFilter, FiX, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

const difficultyOptions = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const timeOptions = [
  { id: 'quick', name: 'Quick Meals', maxTime: 30 },
  { id: 'medium', name: 'Under 1 Hour', maxTime: 60 },
  { id: 'any', name: 'Any Time', maxTime: null },
];

const cuisineOptions = [
  { id: 'italian', name: 'Italian' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'indian', name: 'Indian' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'american', name: 'American' },
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'thai', name: 'Thai' },
];

const RecipeFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState('time');
  const [filters, setFilters] = useState({
    difficulty: initialFilters.difficulty || [],
    maxTime: initialFilters.maxTime || null,
    cuisines: initialFilters.cuisines || [],
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFilter = (type, value) => {
    if (type === 'maxTime') {
      setFilters(prev => ({
        ...prev,
        maxTime: prev.maxTime === value ? null : value
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(v => v !== value)
          : [...prev[type], value]
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      maxTime: null,
      cuisines: [],
    });
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const activeFilterCount = [
    filters.difficulty.length,
    filters.maxTime ? 1 : 0,
    filters.cuisines.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recipe Filters</h2>
          <p className="text-sm text-muted-foreground">Narrow down your recipe search</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-foreground/70 hover:text-foreground flex items-center px-3.5 py-1.5 rounded-lg bg-accent/30 hover:bg-accent/40 transition-colors"
            >
              <FiX className="mr-1.5" size={14} />
              Clear all ({activeFilterCount})
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isOpen 
                ? 'bg-primary/10 text-primary' 
                : 'bg-accent/20 hover:bg-accent/30 text-foreground'
            }`}
          >
            <FiFilter className="mr-2" size={16} />
            {isOpen ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-card/80 backdrop-blur-sm border border-border/20 rounded-xl p-5 sm:p-6 mb-6 animate-fadeIn shadow-sm">
          {/* Time Filter */}
          <div className="mb-6 last:mb-0">
            <button 
              onClick={() => toggleSection('time')}
              className="w-full flex justify-between items-center text-left mb-3 focus:outline-none"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3">
                  <FiClock size={18} />
                </div>
                <h3 className="text-base font-medium text-foreground">Cooking Time</h3>
                {filters.maxTime && (
                  <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                    {timeOptions.find(o => o.maxTime === filters.maxTime)?.name || 'Custom'}
                  </span>
                )}
              </div>
              {expandedSection === 'time' ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            
            {expandedSection === 'time' && (
              <div className="pl-11 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {timeOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleFilter('maxTime', option.maxTime)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        filters.maxTime === option.maxTime
                          ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md'
                          : 'bg-accent/10 hover:bg-accent/20 text-foreground border border-border/20'
                      }`}
                    >
                      {option.name}
                      {filters.maxTime === option.maxTime && <FiCheck size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6 last:mb-0 pt-4 border-t border-border/10">
            <button 
              onClick={() => toggleSection('difficulty')}
              className="w-full flex justify-between items-center text-left mb-3 focus:outline-none"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4m0 12v4M6 12H2m20 0h-4m2-7 2-2m-4 10 2 2M4 5l2-2m0 16 2 2m2-18-2 2m12 0-2-2m4 14-2 2m0-16-2 2"></path>
                  </svg>
                </div>
                <h3 className="text-base font-medium text-foreground">Difficulty Level</h3>
                {filters.difficulty.length > 0 && (
                  <span className="ml-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium px-2 py-0.5 rounded-full">
                    {filters.difficulty.length} selected
                  </span>
                )}
              </div>
              {expandedSection === 'difficulty' ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            
            {expandedSection === 'difficulty' && (
              <div className="pl-11 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {difficultyOptions.map(option => {
                    const isActive = filters.difficulty.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFilter('difficulty', option.id)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                            : 'bg-accent/10 hover:bg-accent/20 text-foreground border border-border/20'
                        }`}
                      >
                        {option.name}
                        {isActive && <FiCheck size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Cuisine Filter */}
          <div className="pt-4 border-t border-border/10">
            <button 
              onClick={() => toggleSection('cuisine')}
              className="w-full flex justify-between items-center text-left mb-3 focus:outline-none"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11v3c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-3M12 22c0-3.9-3.1-7-7-7v0c-1.1 0-2 .9-2 2v5h9z"></path>
                    <path d="M12 22h9v-5c0-1.1-.9-2-2-2v0c-3.9 0-7 3.1-7 7z"></path>
                    <path d="M12 22c0-3.9 3.1-7 7-7v0c1.1 0 2 .9 2 2v5h-9z"></path>
                    <path d="M3 11V8c0-1.1.9-2 2-2v0c3.9 0 7 3.1 7 7v0"></path>
                    <path d="M12 13v0c0-3.9-3.1-7-7-7v0c-1.1 0-2 .9-2 2v3h9z"></path>
                  </svg>
                </div>
                <h3 className="text-base font-medium text-foreground">Cuisine</h3>
                {filters.cuisines.length > 0 && (
                  <span className="ml-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium px-2 py-0.5 rounded-full">
                    {filters.cuisines.length} selected
                  </span>
                )}
              </div>
              {expandedSection === 'cuisine' ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            
            {expandedSection === 'cuisine' && (
              <div className="pl-11 mt-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cuisineOptions.map(option => {
                    const isActive = filters.cuisines.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleFilter('cuisines', option.id)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                            : 'bg-accent/10 hover:bg-accent/20 text-foreground border border-border/20'
                        }`}
                      >
                        {option.name}
                        {isActive && <FiCheck size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
