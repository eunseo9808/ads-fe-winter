import styles from "./styles.module.scss";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import cx from "classnames";

const Input = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { className = "" } = props;
    return (
      <input
        ref={ref}
        className={cx(styles.input, {
          [styles[className]]: !!className,
        })}
        {...props}
      />
    );
  }
);

export default Input;
