import { useDispatch, useSelector } from "react-redux";
import styles from "./Busca.module.scss";
import { resetarBusca, setbusca } from "store/reducers/busca";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function Busca() {
  const dispatch = useDispatch();
  const busca = useSelector((state) => state.busca);
  const location = useLocation();

  useEffect(()=> {
    dispatch(resetarBusca());
  },[location.pathname, dispatch]);

  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="O que você procura?"
        value={busca}
        onChange={(e) => dispatch(setbusca(e.target.value))}
      />
    </div>
  );
}
