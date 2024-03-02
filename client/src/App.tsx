import { useMachine } from "@xstate/react";
import Login from "./pages/Login";
import Logos from "./components/Logos";
import SelectEvents from "./pages/SelectEvents";
import machine from "./lib/machine";
import EnterDetails from "./pages/EnterDetails";
import Payment from "./pages/Payment";
import Complete from "./pages/Complete";
import { useEffect } from "react";
import { timeRemaining, getSalesStatus } from "./lib/helpers";
import Timeout from "./pages/Timeout";
import ExpiredMember from "./pages/ExpiredMember";
import UnderAgeMember from "./pages/UnderAgeMember";
import MemberReachedLimit from "./pages/MemberReachedLimit";
import PaymentFailed from "./pages/PaymentFailed";
import PreOpen from "./pages/PreOpen";
import Closed from "./pages/Closed";
import Button from "./components/Button";

function getPage(state: any) {
  if (window.location.search === "?complete=true") {
    return Complete;
  }

  if (window.location.search === "?complete=false") {
    return PaymentFailed;
  }
  
  if (getSalesStatus() === 'pre-open') {
    return PreOpen;
  }

  if (getSalesStatus() === 'closed') {
    return Closed;
  }
  
  if (state.matches("timeout")) {
    return Timeout;
  }

  if (state.matches("expired_member")) {
    return ExpiredMember;
  }

  if (state.matches("under_age_member")) {
    return UnderAgeMember;
  }

  if (state.matches("member_reached_limit")) {
    return MemberReachedLimit;
  }

  if (state.matches("login")) {
    return Login;
  }

  if (state.matches("select_events")) {
    return SelectEvents;
  }

  if (state.matches("enter_details")) {
    return EnterDetails;
  }

  if (state.matches("payment")) {
    return Payment;
  }

  return null;
}

function App() {
  const [state, send] = useMachine(machine);

  let Page = getPage(state);

  useEffect(() => {
    let interval = setInterval(() => {
      if (state.context.timer_ends === null) {
        return;
      }

      let remaining = timeRemaining(state.context.timer_ends);

      if (remaining === 0) {
        send("TIMEOUT");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.context.timer_ends]);

  return (
    <>
      <header className="flex justify-between items-start">
        <Logos />
        {!state.matches("login") && (
          <Button onClick={() => send("LOGOUT")}>Logout</Button>
        )}
      </header>
      {Page && <Page state={state} send={send} />}
    </>
  );
}

export default App;
