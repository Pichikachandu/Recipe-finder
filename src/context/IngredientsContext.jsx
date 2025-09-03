import { createContext, useContext, useState, useEffect } from 'react';

const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState(() => {
    // Load saved ingredients from localStorage if they exist
    const savedIngredients = typeof window !== 'undefined' ? localStorage.getItem('userIngredients') : null;
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  });

  // Save ingredients to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userIngredients', JSON.stringify(ingredients));
    }
  }, [ingredients]);

  const addIngredient = (ingredient) => {
    if (!ingredient.trim()) return;
    
    const formattedIngredient = ingredient.trim().toLowerCase();
    
    // Check if ingredient already exists (case insensitive)
    if (!ingredients.some(i => i.toLowerCase() === formattedIngredient)) {
      setIngredients(prev => [...prev, ingredient.trim()]);
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(prev => 
      prev.filter(ingredient => ingredient !== ingredientToRemove)
    );
  };

  const clearIngredients = () => {
    setIngredients([]);
  };

  const hasIngredient = (ingredientToCheck) => {
    return ingredients.some(
      ingredient => ingredient.toLowerCase() === ingredientToCheck.toLowerCase()
    );
  };

  return (
    <IngredientsContext.Provider 
      value={{
        ingredients,
        addIngredient,
        removeIngredient,
        clearIngredients,
        hasIngredient,
        ingredientsCount: ingredients.length
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (context === undefined) {
    throw new Error('useIngredients must be used within an IngredientsProvider');
  }
  return context;
};

export default IngredientsContext;
