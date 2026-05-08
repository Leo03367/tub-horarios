import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busLinesService } from '../services/api';
import { useFavoritesStore } from '../stores/favoritesStore';
import { FiArrowLeft, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

function LineDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [line, setLine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState([]);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    const fetchLine = async () => {
      try {
        const lineData = await busLinesService.getById(id);
        setLine(lineData.data);
        
        const stopsData = await busLinesService.getStops(id);
        setStops(stopsData.data || []);
      } catch (error) {
        console.error('Error fetching line:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLine();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite(id)) {
      const fav = favorites.find(f => f.itemId === id);
      removeFavorite(fav.id);
    } else {
      addFavorite({
        id: `fav_${id}`,
        type: 'line',
        itemId: id,
        name: line.number,
        destination: line.destination
      });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!line) return <div className="p-8 text-center">Line not found</div>;

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

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-6xl font-bold mb-2">{line.number}</div>
            <div className="text-xl">{line.destination}</div>
          </div>
          <button
            onClick={handleToggleFavorite}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <FiStar size={24} fill={isFavorite(id) ? 'white' : 'none'} />
          </button>
        </div>
      </div>

      {/* Schedule Section */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-3">Weekday</h3>
            <div className="space-y-2">
              {line.weekdaySchedules?.slice(0, 5).map((time, i) => (
                <div key={i} className="text-sm">{time}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Saturday</h3>
            <div className="space-y-2">
              {line.saturdaySchedules?.slice(0, 5).map((time, i) => (
                <div key={i} className="text-sm">{time}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Sunday</h3>
            <div className="space-y-2">
              {line.sundaySchedules?.slice(0, 5).map((time, i) => (
                <div key={i} className="text-sm">{time}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stops Section */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Stops</h2>
        <div className="space-y-2">
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              onClick={() => navigate(`/stops/${stop.id}`)}
              className="w-full text-left p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition flex items-center gap-3"
            >
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                {stop.order}
              </div>
              <div>
                <div className="font-semibold">{stop.name}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default LineDetailsPage;
