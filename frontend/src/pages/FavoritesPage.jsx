import { useFavoritesStore } from '../stores/favoritesStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const navigate = useNavigate();

  const lines = favorites.filter(f => f.type === 'line');
  const stops = favorites.filter(f => f.type === 'stop');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-4xl font-bold mb-8">⭐ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No favorites yet</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Explore Lines
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {lines.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Favorite Lines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lines.map((favorite) => (
                  <motion.div
                    key={favorite.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg flex justify-between items-center"
                  >
                    <button
                      onClick={() => navigate(`/lines/${favorite.itemId}`)}
                      className="flex-1 text-left"
                    >
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">{favorite.name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{favorite.destination}</div>
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {stops.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Favorite Stops</h2>
              <div className="space-y-3">
                {stops.map((favorite) => (
                  <motion.div
                    key={favorite.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg flex justify-between items-center"
                  >
                    <button
                      onClick={() => navigate(`/stops/${favorite.itemId}`)}
                      className="flex-1 text-left"
                    >
                      <div className="font-semibold">{favorite.name}</div>
                    </button>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default FavoritesPage;
