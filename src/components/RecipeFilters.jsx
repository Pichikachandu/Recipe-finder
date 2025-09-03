import { useState, useEffect } from 'react';
import { FiClock, FiFilter, FiX } from 'react-icons/fi';

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
  const [filters, setFilters] = useState({
    difficulty: initialFilters.difficulty || [],
    maxTime: initialFilters.maxTime || null,
    cuisines: initialFilters.cuisines || [],
  });

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center space-x-3">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary/80 flex items-center"
            >
              <FiX className="mr-1" size={16} />
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-4 py-2 rounded-full border border-border bg-card text-foreground hover:bg-accent/50 transition-colors text-sm font-medium"
          >
            <FiFilter className="mr-2" size={16} />
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-card border border-border/50 rounded-xl p-6 mb-6 animate-fadeIn">
          {/* Time Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground/80 mb-3 flex items-center">
              <FiClock className="mr-2 text-primary" size={16} />
              Cooking Time
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleFilter('maxTime', option.maxTime)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.maxTime === option.maxTime
                      ? 'bg-primary text-white'
                      : 'bg-accent/30 text-foreground hover:bg-accent/50'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground/80 mb-3">
              Difficulty Level
            </h3>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleFilter('difficulty', option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.difficulty.includes(option.id)
                      ? 'bg-primary text-white'
                      : 'bg-accent/30 text-foreground hover:bg-accent/50'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine Filter */}
          <div>
            <h3 className="text-sm font-medium text-foreground/80 mb-3">
              Cuisine
            </h3>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleFilter('cuisines', option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.cuisines.includes(option.id)
                      ? 'bg-primary text-white'
                      : 'bg-accent/30 text-foreground hover:bg-accent/50'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
