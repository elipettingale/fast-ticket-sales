import styles from "./index.module.css";

export default function Button({ children, ...rest }: any) {
  return (
    <button className={styles.Button} {...rest}>
      {children}
    </button>
  );
}
