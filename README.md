# 🍽️ Recipe Radar - Your Personal Recipe Assistant

> **Live Demo:** [https://recipe-finder-eta-ecru.vercel.app/](https://recipe-finder-eta-ecru.vercel.app/)

Tired of staring at your pantry, wondering what to cook? Recipe Radar is here to help! This web app helps you discover delicious recipes based on the ingredients you already have. Whether you're a seasoned chef or a kitchen newbie, our intuitive interface makes meal planning a breeze.

## Why Recipe Radar?
- 🎯 **Smart Search**: Find recipes using ingredients you already have
- ⚡ **Lightning Fast**: Get recipe suggestions in seconds
- 📱 **Mobile-Friendly**: Works perfectly on any device
- 🌓 **Dark Mode**: Easy on the eyes, day or night
- 💡 **Smart Suggestions**: Get inspired with ingredient recommendations

## 🗂️ Quick Navigation
- [✨ Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📱 How to Use](#-how-to-use)
- [💡 Tips & Tricks](#-tips--tricks)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## ✨ Key Features

### 🍳 For Home Cooks
- **Smart Ingredient Search**: Type what you have, and we'll find recipes that match
- **Quick Filters**: Sort by cooking time, difficulty, or dietary preferences
- **Save Favorites**: Keep track of your go-to recipes
- **Pantry Management**: Build a digital pantry of your ingredients
- **Step-by-Step Guides**: Easy-to-follow cooking instructions

### 📱 For Food Lovers
- **Beautiful Recipe Cards**: Appetizing images and key details at a glance
- **Interactive Cooking Mode**: Timer included for each step
- **Shopping List**: Automatically generated from selected recipes
- **Offline Access**: Save recipes to view later, even without internet

### Enhanced Features
- 🎯 Smart ingredient suggestions with intuitive UI
- ⏱️ Interactive cooking mode with step-by-step timers and progress tracking
- 🛒 Dynamic shopping list generation from selected recipes
- 📊 Comprehensive nutritional information display
- 🔄 Real-time UI updates with smooth transitions
- 📱 Optimized for all screen sizes with responsive layouts
- 🔍 Advanced search with multiple filter combinations
- 🖼️ Lazy-loaded images with blur-up placeholders
- 📝 Step-by-step cooking instructions with timers
- 🔄 Seamless navigation with animated page transitions

### Recent Improvements
- 🆕 Redesigned Ingredient Manager with better UX
- 🎨 Enhanced Recipe Filters with collapsible sections
- 📱 Improved mobile experience with touch-friendly controls
- 🚀 Performance optimizations for faster loading
- ♿ Better accessibility with ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - For building interactive UIs
- **Vite** - Blazing fast development server
- **Tailwind CSS** - For beautiful, responsive designs
- **React Router** - Smooth page navigation
- **Framer Motion** - Delightful animations

### Data & State
- **React Query** - Smart data fetching and caching
- **Context API** - Global state management
- **LocalStorage** - Save your preferences and favorites

### Developer Experience
- **ESLint & Prettier** - Clean, consistent code
- **Husky** - Git hooks made easy
- **Vercel** - Seamless deployment

### State Management & Performance
- 🏗️ React Context API (Global State)
- 🔄 useReducer (Complex State Logic)
- 💾 LocalStorage (Data Persistence)
- ⚡ useMemo/useCallback (Performance Optimization)
- 🔄 React.lazy & Suspense (Code Splitting)
- 📊 Performance Monitoring (Lighthouse)
- 🚀 Optimized Build Configuration
- 🛠️ Custom Hooks for Reusable Logic

### APIs
- 🍽️ TheMealDB API
- 🌐 RESTful Architecture
- 🕒 Caching Strategy

## 🚀 Getting Started

### Try It Out
Just visit [Recipe Radar](https://recipe-finder-eta-ecru.vercel.app/) and start exploring! No installation needed.

### Local Development
Want to contribute or run it locally? Here's how:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   cd recipe-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** to `http://localhost:5173`

### Building for Production
```bash
npm run build  # Creates optimized production build
npm run preview  # Preview the production build locally
```

## 💡 Tips & Tricks

### Getting the Most Out of Recipe Radar

1. **Smart Searching**
   - Try searching with multiple ingredients (e.g., "chicken, rice, tomatoes")
   - Use the pantry feature to save your common ingredients
   
2. **Meal Planning**
   - Save recipes to your favorites for quick access
   - Generate a shopping list from multiple recipes
   
3. **Keyboard Shortcuts**
   - Press `/` to focus the search bar
   - Use arrow keys to navigate search results
   - Press `Esc` to close modals

### Need Help?
Found a bug or have a feature request? [Open an issue](https://github.com/yourusername/recipe-finder/issues) on GitHub!

## 🛠 Error Handling & Problem Solving

### Common Issues & Solutions

#### 1. API Rate Limiting
- Implemented exponential backoff
- Cached responses
- User-friendly error messages

#### 2. Network Issues
- Offline support
- Service worker caching
- Retry mechanism

#### 3. Form Validation
- Real-time feedback
- Clear error messages
- Input sanitization

## 📋 Submission Requirements

### Level 1 (50%) - AI Collaboration
- [ ] Share ChatGPT conversation link
- [ ] Document problem-solving approach
- [ ] Include all prompts used
- [ ] Show iterations and improvements

### Level 2 (30%) - Working Application
- [ ] Deploy on Vercel/Netlify
- [ ] Test all core features
- [ ] Ensure mobile responsiveness
- [ ] Verify all links work

### Level 3 (20%) - Code Quality
- [ ] Clean, well-commented code
- [ ] Proper folder structure
- [ ] Comprehensive README
- [ ] Setup instructions
- [ ] Environment variables documentation

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Prompt Guide

Check out the [PROMPT_GUIDE.md](PROMPT_GUIDE.md) for effective prompts to use with ChatGPT when working on this project. The guide includes:
- Development prompts for new features
- UI/UX improvement suggestions
- Testing and quality assurance
- Deployment and performance optimization
- Best practices for AI collaboration

## 🤝 Contributing

We'd love your help making Recipe Radar even better! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

A big thank you to:
- [TheMealDB](https://www.themealdb.com/) for the incredible recipe API
- The amazing open-source communities behind React, Vite, and Tailwind CSS
- Everyone who has contributed with feedback and suggestions

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── lib/           # API and utility functions
└── assets/        # Static assets
```

## API Reference

This project uses [TheMealDB API](https://www.themealdb.com/api.php) for recipe data.

### Endpoints Used

- Search by ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
- Get recipe details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
