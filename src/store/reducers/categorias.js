import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import { resetarCarrinho } from "./carrinho";
const initialState = [];
const { toast } = createStandaloneToast();

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
        toast({
          title: "Categorias",
          description: "Categorias carregadas com sucesso",
          status: "success",
          duration: 1000,
          isClosable: false,
        });
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payload }) => {
        toast({
          title: "Categorias",
          description: "Carregando categorias",
          status: "loading",
          duration: 500,
          isClosable: false,
        });
        console.log("Busca de categorias pendente");
      })
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        toast({
          title: "Categorias",
          description: "Erro ao carregar categorias",
          status: "error",
          duration: 2500,
          isClosable: false,
        });
      })
      .addCase(resetarCarrinho.type, () => {
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
export default categoriasSlice.reducer;
