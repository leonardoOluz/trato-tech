import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
const initialState = [];

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        console.log("Busca de categorias concluida");
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payloadf }) => {
        console.log("Busca de categorias pendente");
      })
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        console.log("Busca de categorias rejeitadas");
      });
  },
});
export default categoriasSlice.reducer;
