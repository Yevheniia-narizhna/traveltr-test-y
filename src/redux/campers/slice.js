import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    filters: {
      location: "",
      features: {
        AC: true,
        bathroom: true,
        kitchen: false,
        TV: true,
        transmission: "",
      },
      form: "",
    },
    campers: [],
    loading: false,
  },
  reducers: {
    //
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      if (name === "form") {
        state.filters.form = value;
      } else if (name === "location") {
        state.filters.location = value;
      } else if (name in state.filters) {
        state.filters[name] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.campers = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
