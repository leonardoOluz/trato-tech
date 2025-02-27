import styles from "./Itens.module.scss";
import { MdDeleteOutline } from "react-icons/md";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { FaCartPlus, FaCheck, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deletarItemCarrinho,
  mudarCarrinho,
  mudarQuantidade,
} from "store/reducers/carrinho";
import { mudarFavorito, mudarItem } from "store/reducers/itens";
import classNames from "classnames";
import { useState } from "react";
import Input from "components/Input";

const iconProps = {
  size: 24,
  color: "#041833",
};

const quantidadeProps = {
  size: 32,
  color: "#1875E8",
};

const deleteProps = {
  size: 24,
  color: "#041833",
};
export default function Itens(props) {
  const { titulo, descricao, foto, favorito, preco, id, carrinho, quantidade } =
    props;
  const dispatch = useDispatch();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(titulo);
  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((item) => item.id === id)
  );
  const resolverFavorito = () => {
    dispatch(mudarFavorito(id));
  };
  const resolverCarrinho = () => {
    dispatch(mudarCarrinho(id));
  };
  const componenteFavorito = favorito ? (
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
  );
  const componeteModoedicao = modoEdicao ? (
    <FaEdit
      {...iconProps}
      className={styles["item-acao"]}
      onClick={() => {
        setModoEdicao(false);
        dispatch(
          mudarItem({
            id,
            item: { titulo: novoTitulo },
          })
        );
      }}
    />
  ) : (
    <FaCheck
      {...iconProps}
      className={styles["item-acao"]}
      onClick={() => setModoEdicao(true)}
    />
  );

  return (
    <div
      className={classNames(styles.item, { [styles.itemNoCarrinho]: carrinho })}
    >
      {carrinho && (
        <div
          className={`${styles["itemNoCarrinho-delete"]} ${styles["itemNoCarrinho-delete-mobile"]}`}
        >
          <MdDeleteOutline
            {...deleteProps}
            onClick={() => dispatch(deletarItemCarrinho(id))}
          />
        </div>
      )}
      <div className={styles["item-imagem"]}>
        <img alt={titulo} src={foto} />
      </div>

      <div className={styles["item-descricao"]}>
        {carrinho && (
          <div
            className={`${styles["itemNoCarrinho-delete"]} ${styles["itemNoCarrinho-delete-desktop"]}`}
          >
            <MdDeleteOutline
              {...deleteProps}
              onClick={() => dispatch(deletarItemCarrinho(id))}
            />
          </div>
        )}
        <div className={styles["item-titulo"]}>
          {modoEdicao ? (
            <Input
              type="text"
              value={novoTitulo}
              onChange={(evento) => setNovoTitulo(evento.target.value)}
            />
          ) : (
            <h2>{titulo}</h2>
          )}
          <p>{descricao}</p>
        </div>
        <div
          className={classNames(styles["item-info"], {
            [styles["itemNoCarrinho-info"]]: carrinho,
          })}
        >
          <div className={styles["item-preco"]}>R$ {preco.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {carrinho ? (
              <div className={styles["itemNoCarrinho-quantidade"]}>
                Quantidade:
                <AiFillMinusCircle
                  {...quantidadeProps}
                  onClick={() => {
                    if (quantidade > 1) {
                      dispatch(mudarQuantidade({ id, quantidade: -1 }));
                    }
                  }}
                />
                <span>{String(quantidade || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  {...quantidadeProps}
                  onClick={() =>
                    dispatch(mudarQuantidade({ id, quantidade: +1 }))
                  }
                />
              </div>
            ) : (
              <>
                {componenteFavorito}
                <FaCartPlus
                  {...iconProps}
                  color={estaNoCarrinho ? "#1875E8" : iconProps.color}
                  className={styles["item-acao"]}
                  onClick={resolverCarrinho}
                />
                {componeteModoedicao}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
