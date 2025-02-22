import Header from "components/Header";
import styles from "./Categoria.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Itens from "components/Itens";

export default function Categoria() {
  const { nomeCategoria } = useParams();

  const { categoria, itens } = useSelector((state) => {
    const regex = new RegExp(state.busca, "i");
    return {
      categoria: state.categorias.find(
        (categoria) => categoria.id === nomeCategoria
      ),
      itens: state.itens.filter(
        (item) => item.categoria === nomeCategoria && item.titulo.match(regex)
      ),
    };
  });
  
  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      />
      <div className={styles.itens}>
        {itens?.map((item) => (
          <Itens key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
