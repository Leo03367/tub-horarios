import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const busLinesService = {
  getAll: (page = 1, limit = 20) => api.get(`/lines?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/lines/${id}`),
  search: (query) => api.get(`/lines/search/${query}`),
  getSchedule: (id) => api.get(`/lines/${id}/schedule`),
  getNextDepartures: (id) => api.get(`/lines/${id}/next-departures`),
  getStops: (id) => api.get(`/lines/${id}/stops`)
};

export const busStopsService = {
  getAll: (page = 1, limit = 20) => api.get(`/stops?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/stops/${id}`),
  search: (query) => api.get(`/stops/search/${query}`),
  getNearestStops: (lat, lng, radius = 500) => api.get(`/stops/nearest?lat=${lat}&lng=${lng}&radius=${radius}`),
  getSchedule: (id) => api.get(`/stops/${id}/schedule`),
  getLines: (id) => api.get(`/stops/${id}/lines`)
};

export const favoritesService = {
  getAll: () => api.get('/favorites'),
  add: (type, itemId, name) => api.post('/favorites', { type, itemId, name }),
  remove: (id) => api.delete(`/favorites/${id}`),
  check: (type, itemId) => api.get(`/favorites/check/${type}/${itemId}`)
};

export const tripPlannerService = {
  planTrip: (fromStopId, toStopId, departureTime) => api.post('/trip-planner', { fromStopId, toStopId, departureTime }),
  getTripDetails: (tripId) => api.get(`/trip-planner/${tripId}`)
};

export const settingsService = {
  getSettings: () => api.get('/settings'),
  updateSettings: (settings) => api.put('/settings', settings),
  getAppConfig: () => api.get('/settings/config')
};

export default api;
