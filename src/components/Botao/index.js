import classNames from "classnames";
import styles from "./Botao.module.scss";
export default function Botao({
  disabled,
  children,
  type = "button",
  onClick,
  anuciar,
}) {
  return (
    <button
      className={classNames(styles.botao, {
        [styles["botao-anunciar"]]: anuciar,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
