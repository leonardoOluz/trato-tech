import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const buscaSlice = createSlice({
  name: "busca",
  initialState,
  reducers: {
    setbusca: (state, action) => action.payload,
    resetarBusca: () => initialState
  },
});

export const { setbusca, resetarBusca } = buscaSlice.actions;

export default buscaSlice.reducer;