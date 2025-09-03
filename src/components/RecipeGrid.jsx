import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const RecipeGrid = ({ recipes, loading, error }) => {
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't load the recipes. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
      >
        {Array(8).fill().map((_, index) => (
          <motion.div key={index} variants={item}>
            <SkeletonCard />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4 max-w-md mx-auto"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-6 shadow-lg">
          <span className="text-5xl" role="img" aria-label="Cooking pan">
            🍳
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">No Recipes Found</h3>
        <p className="text-muted-foreground mb-6 text-lg">
          We couldn't find any recipes matching your search
        </p>
        <div className="bg-accent/50 rounded-xl p-4 border border-border">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-primary">💡</span>
            <span>Try different keywords or check back later</span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
    >
      {recipes.map((recipe) => (
        <motion.div key={recipe.idMeal} variants={item}>
          <RecipeCard recipe={recipe} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RecipeGrid;
