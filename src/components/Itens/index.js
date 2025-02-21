import styles from "./Itens.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { mudarCarrinho } from "store/reducers/carrinho";
import { mudarFavorito } from "store/reducers/itens";
import classNames from "classnames";

const iconProps = {
  size: 24,
  color: "#041833",
};
export default function Itens(props) {
  const { titulo, descricao, foto, favorito, preco, id, carrinho } = props;
  const dispatch = useDispatch();

  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((item) => item.id === id)
  );

  const resolverFavorito = () => {
    dispatch(mudarFavorito(id));
  };

  const resolverCarrinho = () => {
    dispatch(mudarCarrinho(id));
  };

  return (
    <div
      className={classNames(styles.item, { [styles.itemNoCarrinho]: carrinho, })}
    >
      <div className={styles["item-imagem"]}>
        <img alt={titulo} src={foto} />
      </div>
      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                {...iconProps}
                color="#ff0000"
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            ) : (
              <AiOutlineHeart
                {...iconProps}
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            )}
            <FaCartPlus
              {...iconProps}
              color={estaNoCarrinho ? "#1875E8" : iconProps.color}
              className={styles["item-acao"]}
              onClick={resolverCarrinho}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
