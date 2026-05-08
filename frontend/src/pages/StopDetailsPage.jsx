import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busStopsService } from '../services/api';
import { useFavoritesStore } from '../stores/favoritesStore';
import { FiArrowLeft, FiStar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

function StopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stop, setStop] = useState(null);
  const [lines, setLines] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    const fetchStop = async () => {
      try {
        const stopData = await busStopsService.getById(id);
        setStop(stopData.data);
        
        const linesData = await busStopsService.getLines(id);
        setLines(linesData.data || []);
        
        const scheduleData = await busStopsService.getSchedule(id);
        setSchedule(scheduleData.data);
      } catch (error) {
        console.error('Error fetching stop:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStop();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite(id)) {
      const fav = favorites.find(f => f.itemId === id);
      removeFavorite(fav.id);
    } else {
      addFavorite({
        id: `fav_${id}`,
        type: 'stop',
        itemId: id,
        name: stop.name
      });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!stop) return <div className="p-8 text-center">Stop not found</div>;

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

      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FiMapPin size={24} />
              <span className="text-2xl font-semibold bg-white/20 px-3 py-1 rounded">{stop.code}</span>
            </div>
            <div className="text-4xl font-bold">{stop.name}</div>
            <div className="text-lg mt-2">{stop.city}</div>
          </div>
          <button
            onClick={handleToggleFavorite}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <FiStar size={24} fill={isFavorite(id) ? 'white' : 'none'} />
          </button>
        </div>
      </div>

      {/* Lines Section */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Lines serving this stop</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {lines.map((lineNum) => (
            <button
              key={lineNum}
              onClick={() => navigate(`/lines/${lineNum}`)}
              className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition text-center font-bold text-lg"
            >
              {lineNum}
            </button>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      {schedule && (
        <section className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Next Departures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(schedule.schedules).map(([lineId, times]) => (
              <div key={lineId} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold mb-2">Line {lineId}</h3>
                <div className="space-y-1">
                  {times.slice(0, 4).map((time, i) => (
                    <div key={i} className="text-sm text-slate-600 dark:text-slate-400">{time}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default StopDetailsPage;
