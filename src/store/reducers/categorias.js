import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import { resetarCarrinho } from "./carrinho";
const initialState = [];
const { toast } = createStandaloneToast();

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
  extraReducers: (builder) => {
    builder.addCase(resetarCarrinho.type, () => {
      toast({
        title: "Sucesso",
        description: "Compra finalizada com sucesso",
        status: "success",
        duration: 2500,
        isClosable: false,
      });
    });
  },
});
export const { adicionarTodasACategorias, adicionarUmaCategoria } = categoriasSlice.actions;
export default categoriasSlice.reducer;
