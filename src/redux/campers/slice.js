import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCampers, fetchCampersById } from "./operations";

const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    filters: {
      id: "",
      location: "",
      AC: false,
      bathroom: false,
      kitchen: false,
      TV: false,
      transmission: "",
      form: "",
      gas: false,
      microwave: false,
      water: false,
      engine: "petrol",
      refrigerator: false,
      radio: false,
    },
    campers: [],
    favorites: loadFavoritesFromLocalStorage(), // Список обраних кемперів
    oneCamper: null,
    total: 0,
    currentPage: 1,
    loading: false,
  },
  reducers: {
    //
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      console.log(`setFilter called: ${name} = ${value}`);
      if (name === "form") {
        state.filters.form = value;
      } else if (name === "location") {
        state.filters.location = value;
      } else if (name in state.filters) {
        state.filters[name] = value;
      }
      console.log("Updated filters:", state.filters);
    },
    resetCampers(state) {
      state.campers = [];
      state.currentPage = 1;
      state.total = 0;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Зберігаємо оновлений список
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (camper) => camper.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Оновлюємо LocalStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const newCampers = action.payload.items.filter(
          (camper) => !state.campers.some((c) => c.id === camper.id)
        );
        state.campers = [...state.campers, ...newCampers]; //  Додаємо тільки унікальні кемпери
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage; //  Оновлюємо на актуальну сторінку
      })
      .addCase(fetchCampersById.fulfilled, (state, action) => {
        state.oneCamper = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchCampers.pending, fetchCampersById.pending),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCampers.fulfilled,
          fetchCampersById.fulfilled,
          fetchCampers.rejected,
          fetchCampersById.rejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setFilter, resetCampers, addToFavorites, removeFromFavorites } =
  campersSlice.actions;
export const campersReducer = campersSlice.reducer;
