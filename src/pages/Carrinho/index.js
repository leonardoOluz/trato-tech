import Header from "components/Header";
import styles from "./Carrinho.module.scss";
import { useSelector } from "react-redux";
import Itens from "components/Itens";
import Botao from "components/Botao";
import { useNavigate } from "react-router-dom";
export default function Carrinho() {
  const navigate = useNavigate();

  const { carrinho, total } = useSelector((state) => {
    const regex = new RegExp(state.busca, "i");
    const carrinhoReducer = state.carrinho.data.reduce(
      (itens, itemNoCarrinho) => {
        const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
        if (item.titulo.match(regex)) {
          itens.push({
            ...item,
            quantidade: itemNoCarrinho.quantidade,
          });
        }
        return itens;
      },
      []
    );

    return {
      carrinho: carrinhoReducer,
      total: state.carrinho.total,
    };
  });
  return (
    <div>
      <Header
        titulo="Carrinho de compras"
        descricao="Confira produtos que você adicionou ao carrinho"
      />
      <div className={styles.carrinho}>
        {carrinho.map((item) => (
          <Itens key={item.id} {...item} carrinho />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>
        <Botao onClick={() => navigate("/pagamento")}>Finalizar compra</Botao>
      </div>
    </div>
  );
}
