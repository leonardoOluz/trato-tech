import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
const initialState = [];
const {toast} = createStandaloneToast();

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
          duration: 1500,
          isClosable: false,
        });
        console.log("Busca de categorias concluida");
        return payload;
      })
      .addCase(buscarCategorias.pending, (state, { payload }) => {
        toast({
          title: "Categorias",
          description: "Carregando categorias",
          status: "loading",
          duration: 2000,
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
      });
  },
});
export default categoriasSlice.reducer;
