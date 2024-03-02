import styles from "./index.module.css";

export default function Logos() {
  return (
    <div className="flex gap-8">
      <img src="/src/assets/logo-1.svg" className={styles.Logo} alt="Logo 1" />
      <img src="/src/assets/logo-2.svg" className={styles.Logo} alt="Logo 2" />
    </div>
  );
}
