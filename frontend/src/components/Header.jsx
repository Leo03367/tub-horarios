import { useThemeStore } from '../stores/themeStore';
import { useI18n } from '../hooks/useI18n';
import { MoonIcon, SunIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-slate-800 shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-blue-600"
        >
          🚌 TUB
        </button>
        
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            aria-label="Settings"
          >
            <FaCog className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
