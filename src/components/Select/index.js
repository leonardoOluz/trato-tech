import { forwardRef } from "react";
import styles from "./Select.module.scss";

function Select({ value, onChange, children, ...outrasProps }, ref) {
  return (
    <select
      ref={ref}
      value={value}
      onChange={onChange}
      {...outrasProps}
      className={styles.select}
    >
      {children}
    </select>
  );
}

export default forwardRef(Select);
