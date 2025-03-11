import { createStandaloneToast } from "@chakra-ui/toast";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import categoriasService from "services/categorias";
import {
  adicionarTodasACategorias,
  carregarCategorias,
} from "store/reducers/categorias";
const { toast } = createStandaloneToast();
function* observarCategorias() {
  toast({
    title: "Carregando",
    description: "Carregando categorias",
    status: "loading",
    duration: 500,
    isClosable: true,
  });
  try { 
    delay(1000);
    const categorias = yield call(categoriasService.buscar);
    yield put(adicionarTodasACategorias(categorias));

    toast({
      title: "Sucesso",
      description: "Categorias carregadas",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro ao carregar categorias",
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  }
}

export function* categoriasSaga() {
  const tarefas = yield takeLatest(carregarCategorias, observarCategorias);
  yield takeLatest(adicionarTodasACategorias, () => tarefas.cancel());
}