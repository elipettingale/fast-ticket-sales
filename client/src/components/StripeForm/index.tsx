import { useState } from "react";
import Button from "../Button";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const API_URL = import.meta.env.VITE_API_URL;

export default function StripeForm({ send }: any) {
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: API_URL + "/payment/complete",
      },
    });

    console.log("result", result);

    if (result.error) {
      setError(result.error.message as string);
    }
  };

  return (
    <div>
      {error && <p className="text-xl mb-6 text-red font-bold">{error}</p>}
      <form onSubmit={handleOnSubmit}>
        <PaymentElement />
        <div className="flex justify-between mt-12">
          <Button type="button" onClick={() => send("BACK")}>
            Back
          </Button>
          <Button disabled={!stripe}>Pay & Complete</Button>
        </div>
      </form>
    </div>
  );
}
