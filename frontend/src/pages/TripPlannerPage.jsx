import { useState } from 'react';
import { tripPlannerService, busStopsService } from '../services/api';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function TripPlannerPage() {
  const navigate = useNavigate();
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [stopSuggestions, setStopSuggestions] = useState(null);
  const [searchingFor, setSearchingFor] = useState(null);
  const [tripResults, setTripResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStopSearch = async (query, type) => {
    if (!query.trim()) return;
    
    setSearchingFor(type);
    try {
      const response = await busStopsService.search(query);
      setStopSuggestions(response.data || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const selectStop = (stop, type) => {
    if (type === 'from') {
      setFromStop(stop.name);
    } else {
      setToStop(stop.name);
    }
    setStopSuggestions(null);
    setSearchingFor(null);
  };

  const handlePlanTrip = async (e) => {
    e.preventDefault();
    if (!fromStop || !toStop) return;

    setLoading(true);
    try {
      const result = await tripPlannerService.planTrip(fromStop, toStop, new Date().toISOString());
      setTripResults(result.data);
    } catch (error) {
      console.error('Trip planning error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8">🗺️ Trip Planner</h1>

      <form onSubmit={handlePlanTrip} className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">From</label>
            <input
              type="text"
              value={fromStop}
              onChange={(e) => {
                setFromStop(e.target.value);
                handleStopSearch(e.target.value, 'from');
              }}
              placeholder="Search starting stop..."
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {stopSuggestions && searchingFor === 'from' && (
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {stopSuggestions.map((stop) => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => selectStop(stop, 'from')}
                    className="w-full text-left p-2 bg-slate-50 dark:bg-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-600"
                  >
                    {stop.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">To</label>
            <input
              type="text"
              value={toStop}
              onChange={(e) => {
                setToStop(e.target.value);
                handleStopSearch(e.target.value, 'to');
              }}
              placeholder="Search destination stop..."
              className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {stopSuggestions && searchingFor === 'to' && (
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {stopSuggestions.map((stop) => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => selectStop(stop, 'to')}
                    className="w-full text-left p-2 bg-slate-50 dark:bg-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-600"
                  >
                    {stop.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
          >
            <FiSearch /> {loading ? 'Planning...' : 'Plan Trip'}
          </button>
        </div>
      </form>

      {tripResults && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Suggested Routes</h2>
          {tripResults.routes?.map((route) => (
            <motion.div
              key={route.id}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-blue-600"
            >
              <div className="grid grid-cols-4 gap-4 items-center">
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Departure</div>
                  <div className="text-xl font-bold">{route.departure}</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">Line {route.line}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{route.stops} stops</div>
                </div>
                <div className="text-center">
                  <FiArrowRight className="mx-auto mb-1" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">{route.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Arrival</div>
                  <div className="text-xl font-bold">{route.arrival}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      )}
    </motion.div>
  );
}

export default TripPlannerPage;
