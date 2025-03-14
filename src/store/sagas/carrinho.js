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
  mudarCarrinho,
  mudarQuantidade,
  mudarTotal,
} from "store/reducers/carrinho";
import { adicionarUsuario } from "store/reducers/usuario";
const usuarioLogado = 1;

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
    yield console.log({ ...usuario, cartoes: cartoesComBandeiras });
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

export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho, deletarItemCarrinho], calcularTotal);
}
