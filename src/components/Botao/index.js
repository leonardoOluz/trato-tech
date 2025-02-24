import classNames from "classnames";
import styles from "./Botao.module.scss";
export default function Botao({ children, type = "button", onClick, anuciar }) {
  return (
    <button
      className={classNames(styles.botao, {
        [styles["botao-anunciar"]]: anuciar,
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
