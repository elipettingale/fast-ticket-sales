import styles from "./index.module.css";

export default function InputField({ label, ...rest }: any) {
  return (
    <label className={styles.Wrapper}>
      <span>{label}</span>
      <input {...rest} />
    </label>
  );
}
