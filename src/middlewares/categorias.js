import { createListenerMiddleware } from "@reduxjs/toolkit";
import { buscarCategorias } from "store/reducers/categorias";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: buscarCategorias.pending,
  effect: async (action) => {
    console.log("Busca de categorias pendente", action);
  },
});
