import Countdown from "../../components/Countdown";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "../../components/StripeForm";
import { displayPrice, getPrice } from "../../lib/helpers";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Payment({ state, send }: any) {
  const price = getPrice(state.context);

  return (
    <div>
      <div className="flex justify-end mb-8">
        <Countdown timerEnds={state.context.timer_ends} />
      </div>
      <div className=" text-right mb-8">
        {state.context.basket.map((event: EventType) => (
          <p key={event._id}>{event.name}</p>
        ))}
        <p className="mt-4 font-bold text-2xl">{displayPrice(price)}</p>
      </div>
      <div>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: state.context.intent }}
        >
          <StripeForm send={send} />
        </Elements>
      </div>
    </div>
  );
}
