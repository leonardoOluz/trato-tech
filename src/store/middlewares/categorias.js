import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import {
  adicionarTodasACategorias,
  adicionarUmaCategoria,
  carregarCategorias,
  carregarUmaCategoria,
} from "store/reducers/categorias";
import criarTarefas from "./utils/criarTarefas";

export const categoriaslistener = createListenerMiddleware();

categoriaslistener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const response = await criarTarefas({
      fork,
      dispatch,
      action: adicionarTodasACategorias,
      busca: categoriasService.buscar,
      textoCarregando: "Carregando categorias",
      textoSucesso: "Categorias carregadas",
      textoErro: "Erro ao carregar categorias",
    });
    if (response.status === "ok") {
      unsubscribe();
    }
  },
});

categoriaslistener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const { categorias } = getState();
    const nomeCategoria = action.payload;

    const categoriaEncontrada = categorias.some(
      (categoria) => categoria.id === nomeCategoria
    );

    if (categorias.length === 5) {
      unsubscribe();
      return;
    }
    if (categoriaEncontrada) {
      return;
    }

    const response = await criarTarefas({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
      textoCarregando: `Carregando categoria ${nomeCategoria}`,
      textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso! `,
      textoErro: `Erro na busca de categoria ${nomeCategoria}`,
    });

    if (response.status === "ok") {
      unsubscribe();
    }
  },
});
