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
    <div className="mb-8 bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center w-full sm:w-auto">
          <h2 className="text-base sm:text-lg font-semibold text-foreground flex items-center">
            <FiShoppingBag className="mr-2 text-primary flex-shrink-0" />
            My Pantry
            {ingredients.length > 0 && (
              <span className="ml-2 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {ingredients.length}
              </span>
            )}
          </h2>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-end">
          {ingredients.length > 0 && (
            <button
              onClick={clearIngredients}
              className="text-xs px-3 py-1.5 rounded-lg bg-accent/50 hover:bg-accent text-foreground/80 hover:text-foreground transition-colors flex items-center"
            >
              <FiX className="mr-1" /> Clear All
            </button>
          )}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) {
                setTimeout(() => inputRef.current?.focus(), 100);
              }
            }}
            className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-full font-medium flex items-center transition-colors"
          >
            {isExpanded ? (
              <>
                <FiX className="mr-1" /> Cancel
              </>
            ) : (
              <>
                <FiPlus className="mr-1" /> Add Ingredients
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <form onSubmit={handleAddIngredient} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add ingredients..."
              className="w-full px-4 py-2.5 sm:py-2 pr-10 text-sm bg-background/80 border border-border/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all backdrop-blur-sm"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 sm:py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5 font-medium text-sm"
          >
            <FiPlus size={16} />
            <span>Add</span>
          </button>
        </form>
      )}

      {ingredients.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto py-1 -mx-1 px-1">
          {ingredients.map((ingredient, index) => (
            <div
              key={`${ingredient}-${index}`}
              className="flex items-center bg-accent/20 text-foreground/90 text-sm px-3 py-1.5 rounded-full border border-border/30 hover:bg-accent/30 transition-colors"
            >
              <span className="mr-1 truncate max-w-[120px] sm:max-w-none">{ingredient}</span>
              <button
                onClick={() => removeIngredient(index)}
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                aria-label={`Remove ${ingredient}`}
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <FiShoppingBag className="mx-auto text-3xl mb-2 opacity-30" />
          <p>Your pantry is empty. Add ingredients to find matching recipes!</p>
        </div>
      )}
    </div>
  );
};

export default IngredientManager;
