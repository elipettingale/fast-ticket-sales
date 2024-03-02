import styles from "./index.module.css";

export default function FormRow({ children, ...rest }: any) {
  return (
    <div className={styles.Row} {...rest}>
      {children}
    </div>
  );
}
