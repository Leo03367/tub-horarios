import { useEffect, useState } from 'react';
import { busLinesService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { FiClock, FiMapPin } from 'react-icons/fi';

function HomePage() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const response = await busLinesService.getAll(1, 10);
        setLines(response.data || []);
      } catch (error) {
        console.error('Error fetching lines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLines();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Search Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">🚌 TUB Horários</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Find bus schedules in Braga</p>
        <SearchBar />
      </div>

      {/* Popular Lines */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Popular Lines</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lines.map((line) => (
              <motion.button
                key={line.id}
                onClick={() => navigate(`/lines/${line.id}`)}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-2">{line.number}</div>
                <div className="font-semibold text-left mb-2">{line.destination}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 text-left flex items-center gap-2">
                  <FiClock size={16} />
                  Next: {line.weekdaySchedules[0]}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}

export default HomePage;
