import Header from "components/Header";
import styles from "./Pagamento.module.scss";
import Select from "components/Select";
import Botao from "components/Botao";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carregarPagamento, finalizarCompra } from "store/reducers/carrinho";
import { useNavigate } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/toast";
const {toast} = createStandaloneToast();
function Pagamento() {
  const [formaDePagamento, setFormaDePagamento] = useState("-");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario);
  const total = useSelector((state) => state.carrinho.total);
  const totalCalculado =
    formaDePagamento === "-" ? total : total * formaDePagamento.taxa;
  function pegarFormaPagamento(evento) {
    if (evento.target.value === "-") return setFormaDePagamento("-");
    setFormaDePagamento(
      usuario.cartoes.find((cartao) => cartao.id === evento.target.value)
    );
  }

  function finalizar() {
    if (totalCalculado > formaDePagamento.saldo) {
      toast({
        title: "Erro",
        description: "Saldo insuficiente",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    dispatch(finalizarCompra({ totalCalculado, formaDePagamento }));
    navigate("/");
  }

  useEffect(() => {
    dispatch(carregarPagamento());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Header titulo="Pagamento" />
      <div className={styles.dados}>
        <p className={styles.forma}>
          Olá {usuario.nome}! Escolha a forma de pagamento:
        </p>
        <Select
          value={formaDePagamento.id}
          onChange={pegarFormaPagamento}
          placeholder="Forma de pagamento"
          alt="Forma de pagamento"
        >
          <option value="-"> Forma de pagamento </option>
          {usuario.cartoes?.map((cartao) => (
            <option value={cartao.id} key={cartao.id}>
              {cartao.nome}
            </option>
          ))}
        </Select>
        <div className={styles.content}>
          {formaDePagamento !== "-" && (
            <>
              <p>
                A forma de pagamento {formaDePagamento.nome} tem taxa de{" "}
                {formaDePagamento.taxa}X
              </p>
              <p>
                O saldo deste cartão é de R$ {formaDePagamento.saldo.toFixed(2)}
              </p>
            </>
          )}
          <p> Total com taxas: R$ {totalCalculado.toFixed(2)} </p>
          <div className={styles.finalizar}>
            <Botao
              onClick={finalizar}
              disabled={formaDePagamento === "-" || totalCalculado === 0}
            >
              {" "}
              Finalizar compra{" "}
            </Botao>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagamento;
