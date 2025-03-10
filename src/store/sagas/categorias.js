import { takeEvery } from "redux-saga/effects";
import { buscarCategorias } from "store/reducers/categorias";
function* observarCategorias() {
  yield console.log("Observando categorias");
};

export function* categoriasSaga() {
  yield takeEvery(buscarCategorias, observarCategorias)
};