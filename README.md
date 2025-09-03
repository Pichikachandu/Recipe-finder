# Recipe Finder - Aganitha Take-Home Exercise 🍳

A comprehensive recipe discovery and management application built with React, Vite, and Tailwind CSS. This project demonstrates modern web development practices, AI-assisted problem-solving, and responsive design principles.

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [ChatGPT Prompts](#-chatgpt-prompts)
- [Error Handling](#-error-handling--problem-solving)
- [Submission Requirements](#-submission-requirements)
- [Getting Started](#-getting-started)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [AI Collaboration](#-ai-collaboration)

## 🌟 Features

### Core Features
- 🔍 Ingredient-based recipe search with debouncing
- 🕒 Time-based filtering
- 🥗 Dietary preference filters
- 🏠 Pantry integration with local storage
- 📅 Meal planning functionality
- ❤️ Favorite recipes with persistence
- 📱 Fully responsive design (mobile-first approach)
- 🌓 Dark/Light mode with system preference detection
- ⚡ PWA support for offline access
- 🎨 Modern UI with smooth animations

### Advanced Features
- 🎯 Smart ingredient suggestions
- ⏱️ Interactive cooking mode with step-by-step timers
- 🛒 Dynamic shopping list generation
- 📊 Comprehensive nutritional information
- 🔄 Real-time UI updates
- 📱 Full offline support with service workers
- 🔍 Optimized search performance
- 🖼️ Lazy-loaded images for better performance
- 📝 Detailed recipe instructions with timers
- 🔄 Seamless navigation with smooth transitions

## 🛠 Tech Stack

### Frontend
- ⚛️ React 18 with Hooks
- ⚡ Vite (Ultra-fast Build Tool)
- 🎨 Tailwind CSS (Utility-first CSS Framework)
- 🔄 React Router v6 (Client-side Routing)
- 🎭 Framer Motion (Smooth Animations)
- 📦 Axios (Promise-based HTTP Client)
- 📱 React Icons (Comprehensive Icon Library)
- 🔍 React Query (Data Fetching & Caching)
- 📝 React Hook Form (Form Management)
- 🌐 React Intersection Observer (Lazy Loading)

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

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   cd recipe-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

## 🤖 AI Collaboration

### Key Prompts Used

#### 1. Project Architecture
```
Help me design a scalable React application structure for a recipe finder with these features:
- Ingredient-based search
- Meal planning
- Dietary filters
- Pantry management
- Responsive design
```

#### 2. Component Development
```
Create a responsive RecipeCard component with:
- Image loading states
- Save to favorites
- Cooking time
- Difficulty level
- Hover/focus states
- Accessibility features
```

#### 3. API Integration
```
Implement error handling for TheMealDB API with:
- Loading states
- Error boundaries
- Retry mechanism
- Fallback UI
- Data transformation
```

#### 4. State Management
```
Design state management for:
- Recipe search results
- User preferences
- Favorites
- Shopping list
- Offline support
```

#### 5. Performance Optimization
```
Optimize the app with:
- Code splitting
- Image optimization
- Memoization
- Lazy loading
- Bundle analysis
```

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

## 🙏 Acknowledgments
- TheMealDB for the recipe API
- React and Vite teams
- Tailwind CSS community

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
