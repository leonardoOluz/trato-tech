import Header from "components/Header";
import styles from "./Home.module.scss";
import relogio from "assets/relogio.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Botao from "components/Botao";

export default function Home() {
  const navigate = useNavigate();
  const categorias = useSelector((state) => state.categorias);

  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre, venda, anuncie, troque diversos tipos de produtos e serviços da área de tecnologia!"
        className={styles.header}
        imagem={relogio}
      >
        <Botao onClick={() => navigate("/anuncie")} anuciar>
          Quero anunciar
        </Botao>
      </Header>
      <div className={styles.categorias}>
        <div className={styles["categorias-title"]}>
          <h1>Categoria</h1>
        </div>
        <div className={styles["categorias-container"]}>
          {categorias.map((categoria, index) => (
            <div
              key={index}
              onClick={() => navigate(`/categoria/${categoria.id}`)}
            >
              <img src={categoria.thumbnail} alt={categoria.nome} />
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
