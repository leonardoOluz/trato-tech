import styles from "./Header.module.scss";
import TituloComImagem from "./TituloComImagem";
import TituloSemImagem from "./TituloSemImagem";

export default function Header({ titulo, descricao, className = "", imagem, nomeCategoria, children }) {
  return (
    <header className={styles.header}>
      {titulo && !imagem && (
        <TituloSemImagem titulo={titulo} descricao={descricao} />
      )}
      {titulo && imagem && (
        <TituloComImagem
          className={className}
          descricao={descricao}
          imagem={imagem}
          titulo={titulo}
          >
          {children}
          </TituloComImagem>
      )}
    </header>
  );
}
