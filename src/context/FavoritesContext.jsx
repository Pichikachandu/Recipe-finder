import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial load
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recipe-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      // Check if recipe is already in favorites
      if (!prev.some(item => item.idMeal === recipe.idMeal)) {
        return [...prev, recipe];
      }
      return prev;
    });
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(prev => prev.filter(recipe => recipe.idMeal !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some(recipe => recipe.idMeal === recipeId);
  };

  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
