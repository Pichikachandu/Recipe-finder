import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { FiHeart, FiClock, FiArrowLeft } from 'react-icons/fi';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <FiHeart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">No Favorites Yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Save your favorite recipes to find them easily later. Click the heart icon on any recipe to add it here.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Your Favorites</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((recipe) => (
            <div 
              key={recipe.idMeal}
              className="group relative bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border/20 hover:border-transparent"
            >
              <Link to={`/recipe/${recipe.idMeal}`} className="block">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              </Link>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <Link to={`/recipe/${recipe.idMeal}`} className="block">
                    <h3 className="font-bold text-lg text-foreground line-clamp-1">
                      {recipe.strMeal}
                    </h3>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <FiClock className="mr-1.5 w-3.5 h-3.5" />
                      {Math.floor(Math.random() * 45) + 15} min
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromFavorites(recipe.idMeal);
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors p-1 -mt-1 -mr-1"
                    aria-label="Remove from favorites"
                  >
                    <FiHeart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
