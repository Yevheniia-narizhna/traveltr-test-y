import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: loadFavoritesFromLocalStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const newFavorites = [...state.list, action.payload];
      if (state.list.length === newFavorites.length) return; // Якщо список не змінився, не оновлюємо
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      state.list = newFavorites;
    },
    removeFromFavorites: (state, action) => {
      const newFavorites = state.list.filter(
        (camper) => camper.id !== action.payload
      );
      if (state.list.length === newFavorites.length) return;
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      state.list = newFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
