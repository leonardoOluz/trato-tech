import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState: [],
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    adicionarItem: (state, { payload }) => {
      state.push({
        ...payload,
        id: uuid(),
        favorito: false,
      });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarItens.fulfilled, (state, { payload }) => {
        console.log('Busca de itens concluida');
        return payload;
      })
      .addCase(buscarItens.pending, (state, { payload }) => {
        console.log("Busca de itens pendente");
      })
      .addCase(buscarItens.rejected, (state, { payload }) => {
        console.log("Busca de itens rejeitadas");
      });
  },
});

export const { mudarFavorito, adicionarItem, mudarItem, deletarItem } =
  itensSlice.actions;

export default itensSlice.reducer;
