import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const campersApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchCampers = createAsyncThunk(
  "fetchCampers",
  async (_, { getState }, thunkApi) => {
    try {
      const { filters } = getState().campers;
      console.log("Current filters before request:", filters);
      const params = {
        ...(filters.location && { location: filters.location }),
        ...(filters.form && { form: filters.form }),
        ...Object.entries(filters.features).reduce((acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        }, {}),
      };
      console.log("Final request params:", params);
      const { data } = await campersApi.get("/campers", { params });
      console.log("Fetched campers:", data.items);
      return data.items;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch campers"
      );
    }
  }
);

export const fetchCampersById = createAsyncThunk(
  "fetchCampersById",
  async (id, thunkApi) => {
    try {
      const { data } = await campersApi.get(`/campers/${id}`);
      return data.id;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch camper details"
      );
    }
  }
);
