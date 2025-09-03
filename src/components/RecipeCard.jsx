import { Link } from 'react-router-dom';
import { FiClock, FiStar, FiZap, FiHeart } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { useState, useEffect } from 'react';

const RecipeCard = ({ recipe }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Generate random rating for demo
  const rating = (Math.random() * 1 + 4).toFixed(1);
  const isPopular = Math.random() > 0.8;
  
  // Get cooking time and difficulty from recipe data
  const cookingTime = recipe.cookingTime || 30; // Default to 30 minutes if not provided
  const difficulty = recipe.difficulty || 'Medium'; // Default to Medium if not provided
  
  // Check if recipe is in favorites on mount and when recipe changes
  useEffect(() => {
    setIsFavorited(isFavorite(recipe.idMeal));
  }, [recipe.idMeal, isFavorite]);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorited) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
    
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="group relative bg-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border/20 hover:border-transparent hover:-translate-y-1.5 hover:shadow-primary/10 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end space-y-2">
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isFavorited 
              ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
              : 'bg-background/80 text-foreground/70 hover:bg-background/100 hover:text-red-500'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart 
            className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} 
          />
        </button>
        
        {isPopular && (
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
            <FiZap className="mr-1.5 animate-pulse" size={12} />
            Popular
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] rounded-t-2xl">
        {/* Image with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-0" />
        <img
          src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-10">
          {recipe.cuisine && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-background/90 text-foreground shadow-md">
              {recipe.cuisine}
            </span>
          )}
        </div>
        
        {/* Bottom Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-background/90 text-amber-500 text-sm font-bold shadow-md">
              <FiClock className="mr-1 text-primary" size={14} />
              {cookingTime} min
            </span>
            
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-background/90 shadow-md ${
              difficulty === 'Easy' ? 'text-green-500' : 
              difficulty === 'Medium' ? 'text-amber-500' : 
              'text-red-500'
            }`}>
              {difficulty}
            </span>
          </div>
          
          {/* Ingredient Match Badge */}
          {recipe.matchScore > 0 && (
            <div className="relative group">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 text-sm font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                {Math.round(recipe.matchScore)}% Match
              </div>
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 bg-background border border-border shadow-lg rounded-lg p-3 text-sm z-20">
                <div className="font-medium mb-2">Ingredient Match</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.round(recipe.matchScore)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This recipe uses {Math.round(recipe.matchScore)}% of your available ingredients
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 relative flex-1 flex flex-col">
        {/* Subtle pattern overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.03)_0%,transparent_70%)]" />
        
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 relative z-10">
          <Link to={`/recipe/${recipe.idMeal}`} className="hover:underline decoration-2 underline-offset-4 decoration-primary/50">
            {recipe.strMeal}
          </Link>
        </h3>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2 relative z-10 flex-1">
          {recipe.strInstructions?.substring(0, 100) || 'Delicious recipe with amazing flavors that will delight your taste buds.'}...
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-4 relative z-10">
          {recipe.strCategory && (
            <span className="px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="px-3 py-1.5 text-xs font-bold bg-secondary/10 text-secondary-foreground rounded-full border border-border/30 hover:bg-secondary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              {recipe.strArea}
            </span>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-border/10 relative z-10">
          <Link 
            to={`/recipe/${recipe.idMeal}`} 
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 group-hover:tracking-wide"
          >
            View Full Recipe
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
