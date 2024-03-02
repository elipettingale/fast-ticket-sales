import ButtonLink from "../../components/ButtonLink";

export default function PaymentFailed() {
  return (
    <div>
      <p className="text-xl mb-2">Sorry.</p>
      <p>We weren't able to take payment.</p>
      <p>Please check that you have a valid card and try again.</p>
      <ButtonLink className="my-6" href="/">
        Back to Login
      </ButtonLink>
    </div>
  );
}
