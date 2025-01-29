import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    filters: {
      location: "",
      features: [],
      form: "",
    },
    campers: [],
    loading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      const { name, value } = action.payload;

      if (name === "features") {
        state.filters.features = state.filters.features.includes(value)
          ? state.filters.features.filter((feature) => feature !== value)
          : [...state.filters.features, value];
      } else {
        state.filters[name] = value; // location, form
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.campers = action.payload.items;
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
