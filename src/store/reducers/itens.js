import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";
// import { createStandaloneToast } from "@chakra-ui/toast";
// const { toast } = createStandaloneToast();

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
    buscarItensCategoria: (state, { payload }) => {
      state.push(...payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarItens.fulfilled, (state, { payload }) => {
        // toast({
        //   title: "Itens",
        //   description: "Itens carregados com sucesso",
        //   status: "success",
        //   duration: 1000,
        //   isClosable: false,
        // });
        const novoItens = payload.filter((item) => {
          return !state.some((itemExistente) => itemExistente.id === item.id);
        });

        state.push(...novoItens);
      })
      .addCase(buscarItens.pending, (state, { payload }) => {
        // toast({
        //   title: "Itens",
        //   description: "Carregando Itens",
        //   status: "loading",
        //   duration: 500,
        //   isClosable: false,
        // });
      })
      .addCase(buscarItens.rejected, (state, { payload }) => {
        // toast({
        //   title: "Itens",
        //   description: "Erro ao carregar Itens",
        //   status: "error",
        //   duration: 2500,
        //   isClosable: false,
        // });
      });
  },
});

export const {
  mudarFavorito,
  adicionarItem,
  mudarItem,
  deletarItem,
  buscarItensCategoria,
} = itensSlice.actions;

export default itensSlice.reducer;
