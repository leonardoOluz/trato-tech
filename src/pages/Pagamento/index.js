import Header from "components/Header";
import styles from "./Pagamento.module.scss";
import Select from "components/Select";
import Botao from "components/Botao";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { carregarPagamento } from "store/reducers/carrinho";

function Pagamento() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(carregarPagamento());
  },[dispatch])
  return (
    <div className={styles.container}>
      <Header titulo="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          Olá usuário! Escolha a forma de pagamento: 
        </p>
        <Select placeholder="Forma de pagamento" alt="Forma de pagamento">
          <option value="-"> Forma de pagamento </option>
        </Select>
        <div className={styles.content}>
          <p> Total com taxas: R$ 0.00 </p>
          <div className={styles.finalizar}>
            <Botao> Finalizar compra </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;
