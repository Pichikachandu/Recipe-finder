import { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX, FiCheck, FiShoppingBag } from 'react-icons/fi';
import { useIngredients } from '../context/IngredientsContext';

const IngredientManager = () => {
  const { ingredients, addIngredient, removeIngredient, clearIngredients } = useIngredients();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addIngredient(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient(e);
    } else if (e.key === 'Escape') {
      setInputValue('');
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  return (
    <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/20 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center w-full sm:w-auto">
          <div className="relative p-2.5 rounded-xl bg-primary/10 text-primary">
            <FiShoppingBag className="w-5 h-5" />
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              {ingredients.length}
            </div>
          </div>
          <h2 className="ml-3 text-lg font-semibold text-foreground">
            My Pantry
            <span className="block text-xs text-muted-foreground font-normal mt-0.5">
              {ingredients.length === 0 ? 'Add ingredients to find recipes' : `${ingredients.length} items added`}
            </span>
          </h2>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
          {ingredients.length > 0 && (
            <button
              onClick={clearIngredients}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors flex items-center font-medium"
            >
              <FiX className="mr-1.5" /> Clear All
            </button>
          )}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) {
                setTimeout(() => inputRef.current?.focus(), 100);
              }
            }}
            className="text-xs bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 px-4 py-1.5 rounded-lg font-medium flex items-center transition-all shadow-sm hover:shadow-md"
          >
            <FiPlus className="mr-1.5" />
            {isExpanded ? 'Cancel' : 'Add Ingredients'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <form onSubmit={handleAddIngredient} className="mt-3 mb-2">
          <div className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type an ingredient and press Enter..."
                className="w-full pl-4 pr-24 py-3 text-sm bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all shadow-sm"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-accent/30"
                >
                  <FiX size={16} />
                </button>
              )}
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
                  inputValue.trim()
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Press Enter or click Add to include ingredients
            </p>
          </div>
        </form>
      )}

      {ingredients.length > 0 ? (
        <>
          <div className="mt-4 border-t border-border/20 pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Ingredients</h3>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto py-1 pr-2 -mx-1">
              {ingredients.map((ingredient, index) => (
                <div
                  key={`${ingredient}-${index}`}
                  className="group relative flex items-center bg-accent/10 hover:bg-accent/20 text-foreground/90 text-sm pl-3 pr-7 py-2 rounded-xl border border-border/20 hover:border-border/30 transition-all"
                >
                  <span className="truncate max-w-[140px] sm:max-w-[180px]">{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(index)}
                    className="absolute right-1.5 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/30 transition-colors"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <FiX size={14} className="opacity-70 group-hover:opacity-100" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/10 text-center">
            <button
              onClick={clearIngredients}
              className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium inline-flex items-center opacity-70 hover:opacity-100 transition-opacity"
            >
              <FiX size={14} className="mr-1" /> Clear all ingredients
            </button>
          </div>
        </>
      ) : !isExpanded ? (
        <div className="mt-4 p-6 text-center bg-accent/5 rounded-xl border border-dashed border-border/30">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/5 flex items-center justify-center text-primary/60">
            <FiShoppingBag size={24} />
          </div>
          <h3 className="font-medium text-foreground/90 mb-1">Your pantry is empty</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Add ingredients to discover recipes you can make with what you have
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default IngredientManager;
