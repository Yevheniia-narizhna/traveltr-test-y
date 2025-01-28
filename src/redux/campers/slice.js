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
    items: [],
    loading: false,
  },
  reducers: {
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      if (name === "features") {
        const isSelected = state.filters.features.includes(value);
        state.filters.features = isSelected
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
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
