import Header from "components/Header";
import styles from "./Carrinho.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Itens from "components/Itens";
import { resetarCarrinho } from "store/reducers/carrinho";
import Botao from "components/Botao";
import { useNavigate } from "react-router-dom";
export default function Carrinho() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carrinho, total } = useSelector((state) => {
    let total = 0;
    const regex = new RegExp(state.busca, "i");

    const carrinhoReducer = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
      total += item.preco * itemNoCarrinho.quantidade;

      if (item.titulo.match(regex)) {
        itens.push({
          ...item,
          quantidade: itemNoCarrinho.quantidade,
        });
      }

      return itens;
    }, []);

    return {
      carrinho: carrinhoReducer,
      total,
    };
  });
  const finalizarCompra = () => {
    dispatch(resetarCarrinho());
    navigate("/");
  };
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
        <Botao onClick={finalizarCompra}>Finalizar compra</Botao>
      </div>
    </div>
  );
}
