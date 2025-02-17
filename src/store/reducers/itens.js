import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = [];

const itensSlice = createSlice({
  name: "itens",
  initialState,
});

export default itensSlice.reducer;
