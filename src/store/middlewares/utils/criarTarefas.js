import { createStandaloneToast } from "@chakra-ui/toast";
const { toast } = createStandaloneToast();
export default async function criarTarefas({
  dispatch,
  fork,
  action,
  busca,
  textoCarregando,
  textoSucesso,
  textoErro,
}) {
  toast({
    title: "Carregando",
    description: textoCarregando,
    status: "loading",
    duration: 500,
    isClosable: true,
  });
  const tarefa = fork(async (api) => {
    await api.delay(1000);
    return await busca();
  });
  const response = await tarefa.result;
  if (response.status === "ok") {
    toast({
      title: "Sucesso",
      description: textoSucesso,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    dispatch(action(response.value));
  }
  if (response.status === "rejected") {
    toast({
      title: "Erro",
      description: textoErro,
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  }
  return response;
}
