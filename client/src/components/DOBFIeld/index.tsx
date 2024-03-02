import { useRef } from "react";
import styles from "./index.module.css";
import { isOverFifteen } from "../../lib/helpers";

export default function DOBField({ name, defaultValue, required }: any) {
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const dr = useRef<any>(null);
  const mr = useRef<any>(null);
  const yr = useRef<any>(null);

  const checkAge = () => {
    if (!dr.current || !mr.current || !yr.current) {
      return;
    }

    if (!isOverFifteen(dr.current.value, mr.current.value, yr.current.value)) {
      alert("You must be 16 or over to enter a competition.");
    }
  };

  return (
    <div className={styles.Wrapper}>
      <label>Date of Birth</label>
      <div className={styles.Selects}>
        <select
          className={styles.Select}
          name={`${name}[day]`}
          defaultValue={defaultValue?.day ?? null}
          required={required}
          ref={dr}
          onChange={checkAge}
        >
          <option></option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          className={styles.Select}
          name={`${name}[month]`}
          defaultValue={defaultValue?.month ?? null}
          required={required}
          ref={mr}
          onChange={checkAge}
        >
          <option></option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className={styles.Select}
          name={`${name}[year]`}
          defaultValue={defaultValue?.year ?? null}
          required={required}
          ref={yr}
          onChange={checkAge}
        >
          <option></option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
