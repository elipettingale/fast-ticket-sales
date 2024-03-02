import { useState } from "react";
import styles from "./index.module.css";
import Event from "../Event";

export default function Events({ events, onSelect }: any) {
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter((event: EventType) => {
    let name = event.name.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  return (
    <div>
      <input
        className={styles.Search}
        type="text"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
      <div className="mt-8">
        {filteredEvents.map((event: EventType) => (
          <Event
            key={event._id}
            event={event}
            onClick={() => onSelect(event)}
          />
        ))}
      </div>
    </div>
  );
}
