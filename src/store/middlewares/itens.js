import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "store/reducers/categorias";
import criarTarefas from "./utils/criarTarefas";
import itensService from "services/itens";
import { buscarItensCategoria } from "store/reducers/itens";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    const { itens } = getState();

    if (itens.length >= 25) return unsubscribe();
    const nomeCategoria = action.payload;
    const itensCarregados = itens.some(
      (item) => item.categoria === nomeCategoria
    );

    if (itensCarregados) return;

    await criarTarefas({
      dispatch,
      fork,
      action: buscarItensCategoria,
      busca: () => itensService.buscarItensDaCategoria(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso! `,
      textoErro: `Erro na busca de itens da categoria ${nomeCategoria}`,
    });
  },
});
