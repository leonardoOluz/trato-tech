import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.some((item) => item.id === payload);
      if (!temItem)
        return [
          ...state,
          {
            id: payload,
            quantidade: 1,
          },
        ];
      return state.filter((item) => item.id !== payload);
    },
    mudarQuantidade: (state, { payload }) => {
      state = state.map((itemQuantidadeAtual) => {
        if (itemQuantidadeAtual.id === payload.id) {
          itemQuantidadeAtual.quantidade += payload.quantidade;
        }
        return itemQuantidadeAtual;
      });
    },
    resetarCarrinho: () => initialState,
    deletarItemCarrinho: (state, { payload }) =>
      state.filter((item) => item.id !== payload),
  },
});

export const {
  mudarCarrinho,
  mudarQuantidade,
  resetarCarrinho,
  deletarItemCarrinho,
} = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
