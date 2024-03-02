import { BEM } from "../../lib/helpers";
import styles from "./index.module.css";

export default function Event({ event, ...rest }: any) {
  const renderStatus = () => {
    if (event.status === "SOLD_OUT") {
      return <p className={styles.Status}>Sold Out</p>;
    }

    if (event.status === "ALREADY_PURCHASED") {
      return <p className={styles.Status}>Already Purchased</p>;
    }

    if (event.remaining) {
      return (
        <p className={styles.TicketsRemaining}>
          Less than <strong>{event.remaining} tickets</strong> remaining
        </p>
      );
    }

    return null;
  };

  return (
    <div
      className={BEM(styles, "Event", {
        hasStatus: event.status,
      })}
      {...rest}
    >
      <div>
        <p className={styles.Title}>{event.name}</p>
        <p className={styles.Date}>{event.date}</p>
        <p className={styles.Price}>£{event.price / 100}</p>
      </div>
      <div>{renderStatus()}</div>
    </div>
  );
}
