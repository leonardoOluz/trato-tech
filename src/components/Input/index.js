import { forwardRef } from "react";
import styles from "./Input.module.scss";

function Input({ value, onChange, type, ...restProps }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      {...restProps}
      className={styles.input}
    />
  );
}

export default forwardRef(Input);
