import { createStandaloneToast } from "@chakra-ui/toast";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import {
  adicionarTodasACategorias,
  carregarCategorias,
} from "store/reducers/categorias";

export const listener = createListenerMiddleware();
const { toast } = createStandaloneToast();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    toast({
      title: "Categorias",
      description: "Carregando categorias",
      status: "loading",
      duration: 500,
      isClosable: true,
    });
    const tarefa = fork(async (api) => {
      await api.delay(1000);
      return await categoriasService.buscar();
    });
    const response = await tarefa.result;
    if (response.status === "ok") {
      toast({
        title: "Categorias",
        description: "Categorias carregadas com sucesso",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch(adicionarTodasACategorias(response.value));
      unsubscribe();
    }
    if (response.status === "rejected") {
      toast({
        title: "Categorias",
        description: "Erro ao carregar categorias",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  },
});
