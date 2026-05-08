import { useState } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { useI18n } from '../hooks/useI18n';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const { language, changeLanguage } = useI18n();
  const [notifications, setNotifications] = useState(true);
  const [shareLocation, setShareLocation] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-4xl font-bold mb-8">⚙️ Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </section>

        {/* Language Settings */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Language</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Language</label>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span>Enable notifications</span>
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Privacy</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={shareLocation}
                onChange={(e) => setShareLocation(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span>Share location for nearby stops</span>
            </label>
          </div>
        </section>

        {/* About */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span>2026.05.08</span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
