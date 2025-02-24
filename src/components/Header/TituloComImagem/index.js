import Botao from "components/Botao";
import styles from "./TituloComImagem.module.scss";
import { useNavigate } from "react-router-dom";
export default function TituloComImagem({
  titulo,
  descricao,
  imagem,
  className,
}) {
  const navegar = useNavigate();
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles["header-texto"]}>
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
        <Botao onClick={() => navegar("/anuncie")} anuciar>
          Quero anunciar
        </Botao>
      </div>
      <div className={styles["header-imagem"]}>
        <img alt={titulo} src={imagem} />
      </div>
    </div>
  );
}
