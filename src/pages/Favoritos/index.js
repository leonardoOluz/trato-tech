import Header from "components/Header";
import Itens from "components/Itens";
import { useSelector } from "react-redux";
import styles from "./Favoritos.module.scss";

export default function Favoritos() {
  const favoritos = useSelector((state) => {
    return state.itens.filter((item) => item.favorito === true);
  });
  return (
    <div>
      <Header
        titulo="Favoritos"
        descricao="Veja abaixo tudo que você salvou para ver depois!"
      />
      <div className={styles.favoritos}>
        {favoritos.length === 0 && (
          <span className={styles["favoritos-vazio"]}>
            Nenhum item favoritado
          </span>
        )}

        {favoritos.map((item) => (
          <Itens key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
