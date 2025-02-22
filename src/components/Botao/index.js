import styles from "./Botao.module.scss";
export default function Botao({ children, type = "button", onClick }) {
  return (
    <button className={styles.botao} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
