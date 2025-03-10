import styles from "./Navbar.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import classNames from "classnames";
import { RiShoppingCart2Line, RiShoppingCartFill } from "react-icons/ri";
import Busca from "components/Busca";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
const iconeProps = {
  color: "white",
  size: 24,
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate("/")} />
      <div className={styles.links}>
        <div>
          <Link
            to="/"
            className={classNames(styles.link, {
              [styles.selected]: location.pathname === "/",
            })}
          >
            Página inicial
          </Link>
        </div>
      </div>
      <div className={styles.busca}>
        <Busca />
      </div>
      <div className={styles.icones}>
        <Link to="/favoritos">
          {location.pathname === "/favoritos" ? (
            <FaRegStar {...iconeProps} />
          ) : (
            <FaRegStar {...iconeProps} color="#6BD1FF" />
          )}
        </Link>
        <Link to="/carrinho">
          {location.pathname === "/carrinho" ? (
            <RiShoppingCartFill {...iconeProps} />
          ) : (
            <RiShoppingCart2Line {...iconeProps} color="#6BD1FF" />
          )}
        </Link>
      </div>
    </nav>
  );
}
