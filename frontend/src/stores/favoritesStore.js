import { create } from 'zustand';

const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  addFavorite: (item) => {
    set((state) => {
      const newFavorites = [...state.favorites, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },
  removeFavorite: (id) => {
    set((state) => {
      const newFavorites = state.favorites.filter(f => f.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },
  isFavorite: (id) => {
    return JSON.parse(localStorage.getItem('favorites') || '[]').some(f => f.id === id);
  }
}));

export { useFavoritesStore };
