import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './stores/themeStore';
import { useI18n } from './hooks/useI18n';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LineDetailsPage from './pages/LineDetailsPage';
import StopDetailsPage from './pages/StopDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import TripPlannerPage from './pages/TripPlannerPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/lines/:id" element={<LineDetailsPage />} />
          <Route path="/stops/:id" element={<StopDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
