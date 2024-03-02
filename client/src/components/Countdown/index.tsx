import { useEffect, useState } from "react";
import { timeRemaining } from "../../lib/helpers";

export default function Countdown({ timerEnds }: any) {
  const [timer, setTimer] = useState(timeRemaining(timerEnds));

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(timeRemaining(timerEnds));
    }, 1000);

    return () => clearInterval(interval);
  });

  if (timer === 0) {
    return (
      <div className="text-right">
        <p className="text-4xl">0:00</p>
        <span className="text-sm">Sorry, time is up.</span>
      </div>
    );
  }

  const minutes = Math.floor(timer / 60000).toString();
  const seconds = Math.floor((timer % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  return (
    <div className="text-right">
      <p className="text-4xl">
        {minutes}:{seconds}
      </p>
      <span className="text-sm">Remaining to complete checkout.</span>
    </div>
  );
}
