import { all } from "redux-saga/effects";
import { categoriasSaga } from "./categorias";
import { carrinhoSaga } from "./carrinho";

export default function* rootSaga() {
  yield all([categoriasSaga(), carrinhoSaga()]);
  // code after all-effect
}
