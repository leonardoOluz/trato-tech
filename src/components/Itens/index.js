import styles from "./Itens.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { mudarFavorito } from "store/reducers/itens";
const iconProps = {
  size: 24,
  color: "#041833",
};
export default function Itens(props) {
  const { titulo, descricao, foto, favorito, preco, id } = props;
  const dispatch = useDispatch();
  const resolverFavorito = () => {
    dispatch(mudarFavorito(id));
  };

  return (
    <div className={styles.item}>
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
              color={false ? "#1875E8" : iconProps.color}
              className={styles["item-acao"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
