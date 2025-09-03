import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiClock, 
  FiYoutube, 
  FiExternalLink,
  FiPlay,
  FiX
} from 'react-icons/fi';
import { getRecipeDetails } from '../lib/api';
import ErrorState from '../components/ErrorState';
import { motion } from 'framer-motion';
import CookingMode from '../components/CookingMode';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookingMode, setCookingMode] = useState(false);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetails(id);
        if (data) {
          setRecipe(data);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe?.strInstructions) {
      const parsed = recipe.strInstructions
        .split(/(?<=\d+\.|\n\d+\)|\n-|\n•|\n\*|\n~|\n\u2022|\n\u25E6|\n\u25A0|\n\u25A1|\n\u25CB|\n\u25CF|\n\n)/)
        .filter(step => step.trim() !== '' && !/^\s*[\d.)\-•*~\u2022\u25E6\u25A0\u25A1\u25CB\u25CF]\s*$/.test(step))
        .map(step => ({
          text: step.replace(/^[\s\d.)\-•*~\u2022\u25E6\u25A0\u25A1\u25CB\u25CF]+\s*/, '').trim(),
          timer: Math.min(Math.ceil(step.split(' ').length / 10) * 30, 600) // 30s per 10 words, max 10 minutes
        }));
      setInstructions(parsed);
    }
  }, [recipe]);

  // Toggle cooking mode
  const toggleCookingMode = () => {
    setCookingMode(!cookingMode);
  };
  
  // Handle step change from CookingMode
  const handleStepChange = (stepIndex) => {
    // This is called when the step changes in CookingMode
  };

  // Extract ingredients with measures
  const ingredients = [];
  if (recipe) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient?.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-10 w-40 bg-accent/30 rounded-lg mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-foreground">{recipe?.strMeal}</h1>
              
              <div className="flex items-center space-x-4 text-muted-foreground">
                {recipe?.strArea && (
                  <span className="px-3 py-1 bg-accent/30 rounded-full text-sm">
                    {recipe.strArea} Cuisine
                  </span>
                )}
                {recipe?.strCategory && (
                  <span className="px-3 py-1 bg-accent/30 rounded-full text-sm">
                    {recipe.strCategory}
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none text-foreground/90">
                <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                <div className="space-y-4">
                  {instructions.map((step, index) => (
                    <p key={index} className="leading-relaxed">
                      <span className="font-medium text-primary">{index + 1}.</span> {step.text}
                      {step.timer > 0 && (
                        <span className="ml-2 text-xs bg-accent/20 text-muted-foreground px-2 py-0.5 rounded-full">
                          ⏱️ {Math.floor(step.timer / 60)}:{(step.timer % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <ErrorState 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <ErrorState 
          message="Recipe not found" 
          onRetry={() => navigate('/')}
        />
      </div>
    );
  }

  const hasDetails = recipe?.strInstructions || (recipe.ingredients && recipe.ingredients.length > 0);

  return (
    <div className="w-full min-h-screen flex flex-col overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <motion.div 
            className="relative group"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-foreground/90 hover:text-foreground hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/10 backdrop-blur-sm"
            >
              <FiArrowLeft className="mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Recipes</span>
            </button>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <button
              onClick={toggleCookingMode}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                cookingMode 
                  ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 text-red-600 hover:from-red-500/15 hover:to-red-600/15 border border-red-500/20 hover:border-red-500/30' 
                  : 'bg-gradient-to-br from-primary/10 to-primary/20 text-primary hover:from-primary/15 hover:to-primary/25 border border-primary/20 hover:border-primary/30'
              } shadow-sm hover:shadow-md hover:shadow-primary/10 group`}
            >
              {cookingMode ? (
                <>
                  <FiX className="mr-2 group-hover:scale-110 transition-transform" />
                  <span>Exit Cooking Mode</span>
                </>
              ) : (
                <>
                  <FiPlay className="mr-2 group-hover:scale-110 transition-transform" />
                  <span>Start Cooking Mode</span>
                </>
              )}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </button>
          </motion.div>
        </div>

        {cookingMode ? (
          <CookingMode 
            instructions={instructions}
            onExit={toggleCookingMode}
            onStepChange={handleStepChange}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recipe Image */}
            <div className="relative group">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg bg-card">
                <img
                  src={recipe.strMealThumb || 'https://via.placeholder.com/800x600?text=No+Image'}
                  alt={recipe.strMeal}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {recipe.strYoutube && (
                <motion.div
                  className="absolute -bottom-2 -right-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center px-5 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-br from-red-600 to-red-800 rounded-full group-hover:from-red-700 group-hover:to-red-900 group-hover:shadow-lg group-hover:shadow-red-500/30"
                  >
                    <span className="relative flex items-center">
                      <FiYoutube className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Watch Recipe</span>
                    </span>
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-0 group-hover:opacity-20 animate-pulse"></span>
                    </span>
                    <span className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-0 rounded-full border-2 border-white/30"></span>
                      <span className="absolute inset-2 rounded-full border-2 border-white/20"></span>
                    </span>
                  </a>
                  <span className="absolute -z-10 -inset-4 bg-red-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.div>
              )}
            </div>

            {/* Recipe Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{recipe.strMeal}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full flex items-center">
                    <FiClock className="mr-1.5 w-3.5 h-3.5" />
                    {recipe.strCategory}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {recipe.strArea} Cuisine
                  </span>
                  {recipe.strTags && recipe.strTags.split(',').map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <span className="w-2 h-5 bg-primary rounded-full mr-2"></span>
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-foreground/90">
                        <span className="font-medium">{item.measure}</span> {item.ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!cookingMode && (
          <div className="mt-6 sm:mt-12 bg-card/50 border border-border/50 rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <span className="w-2.5 h-7 bg-primary rounded-full mr-3"></span>
              Cooking Instructions
            </h2>
            <div className="space-y-6">
              {instructions.map((step, i) => (
                <div key={i} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center mr-4 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-foreground/90 leading-relaxed">
                    {step.text}
                    {step.timer > 0 && (
                      <span className="ml-2 text-xs bg-accent/20 text-muted-foreground px-2 py-0.5 rounded-full">
                        ⏱️ {Math.floor(step.timer / 60)}:{(step.timer % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        {recipe.strSource && (
          <motion.div
            className="mt-12 text-center group"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <p className="text-sm text-muted-foreground mb-3">Recipe originally from:</p>
            <a 
              href={recipe.strSource} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/30 text-primary font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:bg-primary/20"
            >
              <span className="flex items-center">
                View Original Recipe
                <FiExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping-slow"></span>
              </span>
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RecipeDetail;
