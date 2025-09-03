import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import { IngredientsProvider } from './context/IngredientsContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      return (
        localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Update dark mode class on state change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <IngredientsProvider>
        <div className={`min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
          <div className="flex-1 flex flex-col">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-1 overflow-y-auto">
              <div className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipe/:id" element={<RecipeDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </IngredientsProvider>
    </FavoritesProvider>
  );
}

export default App;
