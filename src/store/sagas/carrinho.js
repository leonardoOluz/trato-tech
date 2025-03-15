import { createStandaloneToast } from "@chakra-ui/toast";
import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import bandeirasService from "services/bandeiras";
import cartoesService from "services/cartoes";
import usuariosService from "services/usuarios";
import {
  carregarPagamento,
  deletarItemCarrinho,
  finalizarCompra,
  mudarCarrinho,
  mudarQuantidade,
  mudarTotal,
  resetarCarrinho,
} from "store/reducers/carrinho";
import { adicionarUsuario } from "store/reducers/usuario";
const { toast } = createStandaloneToast();
const usuarioLogado = 2;

function* carregarPagamentoSaga() {
  try {
    const [usuario, cartoes] = yield all([
      call(usuariosService.buscarPorId, usuarioLogado),
      call(cartoesService.buscarPorIdUsuario, usuarioLogado),
    ]);
    const bandeirasIds = cartoes.map((cartao) => cartao.bandeiraId);
    const bandeiras = yield call(bandeirasService.buscarPorId, bandeirasIds);
    const cartoesComBandeiras = cartoes.map((cartao) => {
      const bandeiraDoCartao = bandeiras.find(
        (bandeira) => cartao.bandeiraId === bandeira.id
      );
      return {
        ...cartao,
        taxa: bandeiraDoCartao.taxa,
        bandeira: bandeiraDoCartao.nome,
      };
    });
    yield put(adicionarUsuario({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch (error) {}
}
function* calcularTotal() {
  yield delay(500);
  const state = yield select();
  const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
    const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
    return total + item.preco * itemNoCarrinho.quantidade;
  }, 0);

  yield put(mudarTotal(total));
}
function* finalizarCompraSaga({ payload }) {
  const { totalCalculado, formaDePagamento } = payload;
  if (totalCalculado > formaDePagamento.saldo) {
    return yield toast({
      title: "Erro",
      description: "Saldo insuficiente",
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  } else {
    yield toast({
      title: "Sucesso",
      description: "Compra finalizada com sucesso",
      status: "success",
      duration: 2500,
      isClosable: false,
    });
    return yield put(resetarCarrinho());
  }
}
export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery(
    [mudarQuantidade, mudarCarrinho, deletarItemCarrinho],
    calcularTotal
  );
  yield takeLatest(finalizarCompra, finalizarCompraSaga);
}
