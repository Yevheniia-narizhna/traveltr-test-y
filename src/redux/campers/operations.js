import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const campersApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchCampers = createAsyncThunk(
  "fetchCampers",
  async (filters, thunkApi) => {
    try {
      const { data } = await campersApi.get("/campers", { params: filters });
      return data;
    } catch (error) {
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
