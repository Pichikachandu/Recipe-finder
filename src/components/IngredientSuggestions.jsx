import { useState, useEffect } from 'react';
import { FiZap, FiClock, FiPlus } from 'react-icons/fi';
import { useIngredients } from '../context/IngredientsContext';

// Mock data for ingredient suggestions
const INGREDIENT_SUGGESTIONS = {
  chicken: [
    { name: 'Chicken Curry', time: 45, difficulty: 'Medium', cuisine: 'Indian', match: 85 },
    { name: 'Chicken Stir Fry', time: 25, difficulty: 'Easy', cuisine: 'Chinese', match: 90 },
    { name: 'Chicken Parmesan', time: 40, difficulty: 'Medium', cuisine: 'Italian', match: 75 },
  ],
  beef: [
    { name: 'Beef Tacos', time: 30, difficulty: 'Easy', cuisine: 'Mexican', match: 80 },
    { name: 'Beef Stir Fry', time: 25, difficulty: 'Easy', cuisine: 'Chinese', match: 85 },
    { name: 'Beef Stew', time: 120, difficulty: 'Medium', cuisine: 'American', match: 75 },
  ],
  rice: [
    { name: 'Fried Rice', time: 20, difficulty: 'Easy', cuisine: 'Chinese', match: 95 },
    { name: 'Chicken Biryani', time: 60, difficulty: 'Hard', cuisine: 'Indian', match: 80 },
    { name: 'Vegetable Pulao', time: 35, difficulty: 'Medium', cuisine: 'Indian', match: 90 },
  ],
  // Add more ingredients and their suggestions as needed
};

// Common ingredients that often go well together
const COMMON_PAIRINGS = {
  chicken: ['garlic', 'onion', 'lemon', 'thyme', 'rosemary', 'paprika', 'potatoes', 'carrots'],
  beef: ['garlic', 'onion', 'thyme', 'mushrooms', 'potatoes', 'carrots', 'red wine', 'tomatoes'],
  fish: ['lemon', 'dill', 'garlic', 'butter', 'white wine', 'asparagus', 'potatoes'],
  pasta: ['tomato', 'garlic', 'basil', 'cheese', 'olive oil', 'mushrooms', 'spinach'],
  // Add more pairings as needed
};

const IngredientSuggestions = () => {
  const { ingredients } = useIngredients();
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [additionalIngredients, setAdditionalIngredients] = useState([]);

  useEffect(() => {
    if (ingredients.length === 0) {
      setSuggestedRecipes([]);
      setAdditionalIngredients([]);
      return;
    }

    // Find recipe suggestions based on available ingredients
    const suggestions = [];
    const usedIngredients = new Set();
    
    // First, find exact matches
    ingredients.forEach(ingredient => {
      const normalizedIngredient = ingredient.toLowerCase();
      if (INGREDIENT_SUGGESTIONS[normalizedIngredient]) {
        INGREDIENT_SUGGESTIONS[normalizedIngredient].forEach(recipe => {
          if (!suggestions.some(s => s.name === recipe.name)) {
            suggestions.push(recipe);
          }
        });
        usedIngredients.add(normalizedIngredient);
      }
    });

    // Then find common pairings
    const newAdditionalIngredients = [];
    ingredients.forEach(ingredient => {
      const normalizedIngredient = ingredient.toLowerCase();
      if (COMMON_PAIRINGS[normalizedIngredient]) {
        COMMON_PAIRINGS[normalizedIngredient].forEach(pairing => {
          if (!ingredients.includes(pairing) && !newAdditionalIngredients.includes(pairing)) {
            newAdditionalIngredients.push(pairing);
          }
        });
      }
    });

    setSuggestedRecipes(suggestions.slice(0, 3)); // Show top 3 suggestions
    setAdditionalIngredients(newAdditionalIngredients.slice(0, 5)); // Show top 5 additional ingredients
  }, [ingredients]);

  if (ingredients.length === 0 || (suggestedRecipes.length === 0 && additionalIngredients.length === 0)) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/30 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-4">
        <FiZap className="text-amber-500 mr-2" size={20} />
        <h3 className="text-lg font-semibold text-foreground">Smart Suggestions</h3>
      </div>
      
      {suggestedRecipes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground/80 mb-3">Recipes you can make</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedRecipes.map((recipe, index) => (
              <div 
                key={index}
                className="bg-background/80 border border-border/30 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-foreground">{recipe.name}</h5>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                    {recipe.match}% match
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground space-x-3">
                  <span className="flex items-center">
                    <FiClock className="mr-1" size={12} />
                    {recipe.time} min
                  </span>
                  <span className={`${
                    recipe.difficulty === 'Easy' ? 'text-green-500' : 
                    recipe.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-foreground/60">{recipe.cuisine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {additionalIngredients.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground/80 mb-3">Enhance your recipes with</h4>
          <div className="flex flex-wrap gap-2">
            {additionalIngredients.map((ingredient, index) => (
              <button
                key={index}
                className="flex items-center px-3 py-1.5 text-sm bg-background border border-border/30 rounded-full hover:bg-primary/10 hover:border-primary/30 transition-colors"
                onClick={() => {
                  // This would typically add the ingredient to the user's list
                  // For now, we'll just log it
                  console.log(`Add ${ingredient} to my ingredients`);
                }}
              >
                <FiPlus className="mr-1" size={14} />
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSuggestions;
