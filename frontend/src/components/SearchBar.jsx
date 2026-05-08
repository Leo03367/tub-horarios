import { useState } from 'react';
import { busLinesService, busStopsService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const lineResults = await busLinesService.search(query);
      const stopResults = await busStopsService.search(query);
      
      setResults({
        lines: lineResults.data || [],
        stops: stopResults.data || []
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search lines or stops..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiSearch /> Search
          </button>
        </div>
      </form>

      {results && (
        <div className="mt-4 space-y-4">
          {results.lines.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Lines</h3>
              <div className="space-y-2">
                {results.lines.map((line) => (
                  <button
                    key={line.id}
                    onClick={() => navigate(`/lines/${line.id}`)}
                    className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                  >
                    <div className="font-semibold">{line.number}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{line.destination}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.stops.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Stops</h3>
              <div className="space-y-2">
                {results.stops.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => navigate(`/stops/${stop.id}`)}
                    className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                  >
                    <div className="font-semibold">{stop.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stop.city}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
