import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiStar, FiMap, FiSettings } from 'react-icons/fi';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/trip-planner', icon: FiMap, label: 'Planner' },
    { path: '/favorites', icon: FiStar, label: 'Favorites' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:static bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="flex justify-around md:hidden">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              location.pathname === path
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
