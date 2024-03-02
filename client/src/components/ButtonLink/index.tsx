import styles from "./index.module.css";

export default function ButtonLink({
  href,
  className,
  children,
  ...rest
}: any) {
  return (
    <a href={href} className={`${styles.ButtonLink} ${className}`} {...rest}>
      {children}
    </a>
  );
}
