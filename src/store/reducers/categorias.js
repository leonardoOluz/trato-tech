import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
const initialState = [];

export const carregarCategorias = createAction("categorias/carregarCategorias");
export const carregarUmaCategoria = createAction(
  "categorias/carregarUmaCategoria"
);

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    adicionarTodasACategorias: (state, { payload }) => {
      return payload;
    },
    adicionarUmaCategoria: (state, { payload }) => {
      state.push(payload);
    },
  },
});
export const { adicionarTodasACategorias, adicionarUmaCategoria } =
  categoriasSlice.actions;
export default categoriasSlice.reducer;
