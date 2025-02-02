import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/slice";
import { favoritesReducer } from "./favorites/slice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
});

export default store;
