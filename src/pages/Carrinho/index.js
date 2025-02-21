import Header from "components/Header";
import styles from "./Carrinho.module.scss";
import { useSelector } from "react-redux";
import Itens from "components/Itens";
export default function Carrinho() {
  const carrinho = useSelector((state) => {
    const carrinhoReducer = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
      itens.push({
        ...item,
        quantidade: itemNoCarrinho.quantidade,
      });
      return itens;
    }, []);
    return carrinhoReducer;
  });
  
  return (
    <div>
      <Header
        titulo="Carrinho de compras"
        descricao="Confira produtos que você adicionou ao carrinho"
      />
      <div className={styles.carrinho}>
        {carrinho.map((item) => (
          <Itens key={item.id} {...item} carrinho/>
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong>R$ {(0.0).toFixed(2)}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
