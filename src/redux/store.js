import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campers/slice";

const store = configureStore({
  reducer: {
    items: campersReducer,
  },
});

export default store;
