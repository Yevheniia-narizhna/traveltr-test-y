import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCampersById } from "./operations";

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
    oneCamper: null,
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
      })
      .addCase(fetchCampersById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampersById.fulfilled, (state, action) => {
        state.oneCamper = action.payload;
        state.loading = false;
      })
      .addCase(fetchCampersById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
