import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSun, FiMoon, FiMenu, FiHeart } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const { favoritesCount } = useFavorites();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { 
      name: 'Favorites', 
      path: '/favorites', 
      icon: (
        <div className="relative">
          <FiHeart className="w-5 h-5" />
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {favoritesCount > 9 ? '9+' : favoritesCount}
            </span>
          )}
        </div>
      )
    },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/30' 
          : 'bg-gradient-to-r from-background via-background/95 to-background/90 border-b border-border/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex flex-col group relative"
          >
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🥗</span>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Recipe<span className="font-light text-foreground/90">Radar</span>
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide -mt-1">
                  Find recipes with what you have
                </span>
              </div>
            </div>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                } group`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </span>
                <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark transition-all duration-300 ${
                  location.pathname === item.path ? 'w-4/5' : 'group-hover:w-4/5'
                }`}></span>
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="h-6 w-px bg-border mx-2"></div>
            <div className="relative">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-16 h-8 rounded-full bg-gradient-to-br from-muted to-muted/80 p-0.5 transition-all duration-300 hover:shadow-lg group overflow-hidden"
                aria-label="Toggle dark mode"
              >
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>
                <div className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center ${
                  darkMode 
                    ? 'translate-x-9 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600' 
                    : 'translate-x-0.5 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600'
                }`}>
                  {darkMode ? (
                    <FiSun className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  ) : (
                    <FiMoon className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  )}
                </div>
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle Button - Mobile - Using the same state as desktop */}
            <div className="relative">
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="relative w-14 h-8 rounded-full bg-gradient-to-br from-muted to-muted/80 p-0.5 transition-all duration-300 group"
                aria-label="Toggle dark mode"
              >
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>
                <div className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  darkMode 
                    ? 'translate-x-6 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600' 
                    : 'translate-x-0.5 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600'
                }`}>
                  {darkMode ? (
                    <FiSun className="w-3.5 h-3.5" />
                  ) : (
                    <FiMoon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
            
            {/* Hamburger Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative w-12 h-12 rounded-full flex flex-col items-center justify-center group transition-all duration-300 ${
                mobileMenuOpen 
                  ? 'bg-accent/50' 
                  : 'hover:bg-accent/30 active:bg-accent/50'
              }`}
              aria-label="Toggle menu"
            >
              <span className={`block w-7 h-0.5 bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : 'mb-2'}`}></span>
              <span className={`block w-7 h-0.5 bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 -translate-x-4' : 'opacity-100 mb-2'}`}></span>
              <span className={`block w-7 h-0.5 bg-foreground rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 animate-in fade-in-50 slide-in-from-top-2">
            <nav className="flex flex-col space-y-2 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border/20">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
