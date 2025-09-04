import { useState, useEffect, useCallback, useMemo } from 'react';
import { FiSearch, FiClock, FiMeh, FiFilter, FiCheck } from 'react-icons/fi';
import { searchRecipes } from '../lib/api';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import RecipeFilters from '../components/RecipeFilters';
import IngredientManager from '../components/IngredientManager';
import IngredientSuggestions from '../components/IngredientSuggestions';
import { useIngredients } from '../context/IngredientsContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [],
    maxTime: null,
    cuisines: [],
    useMyIngredients: false
  });
  
  const { ingredients } = useIngredients();

  const fetchRecipes = useCallback(async (ingredient) => {
    try {
      setLoading(true);
      setIsSearching(true);
      setError(null);
      const data = await searchRecipes(ingredient);
      setTimeout(() => {
        setRecipes(data || []);
        setLoading(false);
        setIsSearching(false);
      }, 500); // Smooth transition
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError('Failed to load recipes. Please try again.');
      setRecipes([]);
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchRecipes(searchTerm);
    }
  }, [searchTerm, fetchRecipes]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => 
      JSON.stringify(prevFilters) === JSON.stringify(newFilters) 
        ? prevFilters 
        : newFilters
    );
  }, []);

  // Add mock data for cooking time, difficulty, and ingredients for demo purposes
  const recipesWithMetadata = useMemo(() => {
    // Sample ingredients for mock recipes
    const sampleIngredients = [
      'chicken', 'beef', 'pork', 'fish', 'shrimp', 'tofu', 'eggs', 'milk', 'cheese',
      'tomatoes', 'onions', 'garlic', 'potatoes', 'carrots', 'broccoli', 'spinach', 'mushrooms',
      'rice', 'pasta', 'bread', 'flour', 'sugar', 'salt', 'pepper', 'olive oil', 'butter',
      'lemon', 'lime', 'chili', 'basil', 'oregano', 'thyme', 'cinnamon', 'paprika'
    ];

    return recipes.map(recipe => {
      // Generate 3-8 random ingredients for each recipe
      const recipeIngredients = [];
      const numIngredients = Math.floor(Math.random() * 6) + 3; // 3-8 ingredients
      
      for (let i = 0; i < numIngredients; i++) {
        const randomIndex = Math.floor(Math.random() * sampleIngredients.length);
        const ingredient = sampleIngredients[randomIndex];
        if (!recipeIngredients.includes(ingredient)) {
          recipeIngredients.push(ingredient);
        }
      }

      return {
        ...recipe,
        // Mock cooking time between 15-90 minutes
        cookingTime: Math.floor(Math.random() * 75) + 15,
        // Mock difficulty (Easy: 40%, Medium: 40%, Hard: 20%)
        difficulty: ['Easy', 'Medium', 'Hard', 'Medium', 'Easy'][Math.floor(Math.random() * 5)],
        // Mock cuisine from a list
        cuisine: ['Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'American', 'Mediterranean', 'Thai'][Math.floor(Math.random() * 8)],
        // Add ingredients
        ingredients: recipeIngredients,
        // Calculate match score (will be used for sorting)
        matchScore: 0
      };
    });
  }, [recipes]);

  // Calculate match score based on available ingredients
  const calculateMatchScore = (recipe, userIngredients) => {
    if (userIngredients.length === 0) return 0;
    
    const recipeIngredientSet = new Set(recipe.ingredients.map(i => i.toLowerCase()));
    const userIngredientSet = new Set(userIngredients.map(i => i.toLowerCase()));
    
    // Count how many ingredients the user has that are in the recipe
    let matchCount = 0;
    userIngredientSet.forEach(ingredient => {
      if (recipeIngredientSet.has(ingredient)) {
        matchCount++;
      }
    });
    
    // Return the percentage of recipe ingredients the user has
    return recipeIngredientSet.size > 0 ? (matchCount / recipeIngredientSet.size) * 100 : 0;
  };

  // Apply filters to recipes
  const filteredRecipes = useMemo(() => {
    let result = [...recipesWithMetadata];
    
    // Calculate match scores if using my ingredients
    if (filters.useMyIngredients && ingredients.length > 0) {
      result = result.map(recipe => ({
        ...recipe,
        matchScore: calculateMatchScore(recipe, ingredients)
      }));
      
      // Filter out recipes with no matching ingredients
      result = result.filter(recipe => recipe.matchScore > 0);
      
      // Sort by match score (highest first)
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      // Reset match scores
      result = result.map(recipe => ({
        ...recipe,
        matchScore: 0
      }));
    }
    
    // Apply other filters
    result = result.filter(recipe => {
      // Filter by cooking time
      if (filters.maxTime && recipe.cookingTime > filters.maxTime) {
        return false;
      }
      
      // Filter by difficulty
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty.toLowerCase())) {
        return false;
      }
      
      // Filter by cuisine
      if (filters.cuisines.length > 0 && !filters.cuisines.includes(recipe.cuisine.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    return result;
  }, [recipesWithMetadata, filters, ingredients]);

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20 px-2">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <span className="text-5xl sm:text-6xl lg:text-7xl mr-3 lg:mr-4">🥗</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Recipe<span className="font-light text-foreground/90">Radar</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-2 leading-relaxed">
            Discover and create delicious meals with what you already have. Start by searching for an ingredient!
          </p>
        </div>

        {/* Search Bar */}
        <div className={`transition-all duration-500 transform max-w-4xl mx-auto px-1 ${isSearching ? 'scale-95 opacity-90' : 'scale-100'}`}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="mt-6 lg:mt-8">
          <div className="bg-card/50 rounded-xl p-4 sm:p-6 border border-border/30">
            <IngredientManager />
          </div>
          
          {/* Smart Suggestions - Moved below the IngredientManager */}
          <div className="mt-6">
            <div className="bg-card/50 rounded-xl p-4 sm:p-6 border border-border/30">
              <IngredientSuggestions />
            </div>
          </div>
        </div>

        {/* Filters */}
        {!loading && recipes.length > 0 && (
          <div className="relative mt-8 sm:mt-10 lg:mt-12 px-1 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-foreground flex items-center">
                  <FiFilter className="mr-2 text-primary" />
                  Filters
                  {Object.values(filters).flat().length > 0 && (
                    <span className="ml-2 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      {Object.values(filters).flat().length}
                    </span>
                  )}
                </h2>
              
              {ingredients.length > 0 && (
                <button
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    useMyIngredients: !prev.useMyIngredients
                  }))}
                  className={`flex items-center text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-colors ${
                    filters.useMyIngredients
                      ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      : 'bg-accent/30 hover:bg-accent/40 text-foreground/80'
                  }`}
                >
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mr-2 sm:mr-3 ${
                    filters.useMyIngredients ? 'bg-green-500 text-white' : 'border-2 border-foreground/30'
                  }`}>
                    {filters.useMyIngredients && <FiCheck size={16} className="sm:scale-110" />}
                  </div>
                  <span className="font-medium">Use my ingredients</span>
                  {filters.useMyIngredients && (
                    <span className="ml-2 sm:ml-3 bg-green-500/20 text-green-600 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full">
                      {ingredients.length} {ingredients.length === 1 ? 'ingredient' : 'ingredients'}
                    </span>
                  )}
                </button>
              )}
            </div>
            
            <RecipeFilters 
              onFilterChange={(newFilters) => handleFilterChange({ ...newFilters, useMyIngredients: filters.useMyIngredients })} 
              initialFilters={filters}
            />
          </div>
        )}

        {/* Results Count */}
        {!loading && recipes.length > 0 && (
          <div className="mb-6 sm:mb-8 text-sm sm:text-base text-foreground/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 max-w-6xl mx-auto">
            <div className="flex items-center">
              <FiClock className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">
                Showing <span className="text-foreground font-semibold">{filteredRecipes.length}</span> of {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
                {filters.maxTime && (
                  <span className="text-foreground/70"> (≤ {filters.maxTime} min)</span>
                )}
                {filters.useMyIngredients && ingredients.length > 0 && (
                  <span className="ml-2 sm:ml-3 text-green-500 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full text-sm">
                    Sorted by ingredient match
                  </span>
                )}
              </span>
            </div>
            {filteredRecipes.length === 0 && (
              <div className="text-amber-500 flex items-center">
                <FiMeh className="mr-1.5" />
                No recipes match your filters
              </div>
            )}
          </div>
        )}

        {/* Recipe Grid */}
        <div className={`transition-opacity duration-300 mt-4 sm:mt-6 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="max-w-7xl mx-auto">
            <RecipeGrid 
              recipes={filteredRecipes} 
              loading={loading} 
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
