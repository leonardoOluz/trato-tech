import { createSlice } from "@reduxjs/toolkit";
// import automotivoThumb from "assets/categorias/thumbnail/automotivo.png";
// import eletronicosThumb from "assets/categorias/thumbnail/eletronicos.png";
// import escritorioThumb from "assets/categorias/thumbnail/escritorio.png";
// import jogosThumb from "assets/categorias/thumbnail/jogos.png";
// import somThumb from "assets/categorias/thumbnail/som.png";
// import automotivoHeader from "assets/categorias/header/automotivo.png";
// import eletronicosHeader from "assets/categorias/header/eletronicos.png";
// import escritorioHeader from "assets/categorias/header/escritorio.png";
// import jogosHeader from "assets/categorias/header/jogos.png";
// import somHeader from "assets/categorias/header/som.png";

const initialState = [];

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    adicionarCategorias: (state, { payload }) => {
      state.push(...payload);
    },
  },
});
export const { adicionarCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;
