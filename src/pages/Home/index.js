import Header from "components/Header";
import styles from "./Home.module.scss";
import relogio from "assets/relogio.png";
export default function Home() {
  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre, venda, anuncie, troque diversos tipos de produtos e serviços da área de tecnologia!"
        className={styles.header}
        imagem={relogio}
      />
    </div>
  );
}
