import styles from "./styles.module.scss";
import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "primary" | "default";
}

const Button = (props: Props) => {
  const { theme, className = "", children, ...restProps } = props;
  return (
    <button
      className={cx(styles.button, {
        [styles[className]]: !!className,
        [styles.primary]: theme === "primary",
        [styles.default]: theme === "default",
      })}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
