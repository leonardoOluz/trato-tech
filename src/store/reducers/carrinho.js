import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], total: 0 };

export const carregarPagamento = createAction("carrinho/carregarPagamento");

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.data.some((item) => item.id === payload);
      if (!temItem) {
        return {
          total: state.total,
          data: [
            ...state.data,
            {
              id: payload,
              quantidade: 1,
            },
          ],
        };
      }
      return {
        total: state.total,
        data: state.data.filter((item) => item.id !== payload),
      };
    },
    mudarQuantidade: (state, { payload }) => {
      state.data = state.data.map((itemQuantidadeAtual) => {
        if (itemQuantidadeAtual.id === payload.id) {
          itemQuantidadeAtual.quantidade += payload.quantidade;
        }

        return itemQuantidadeAtual;
      });
    },
    resetarCarrinho: () => initialState,
    deletarItemCarrinho: (state, { payload }) => {
      return {
        total: state.total,
        data: state.data.filter((item) => item.id !== payload),
      };
    },
    mudarTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const {
  mudarCarrinho,
  mudarQuantidade,
  resetarCarrinho,
  deletarItemCarrinho,
  mudarTotal,
} = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
