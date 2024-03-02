import ButtonLink from "../../components/ButtonLink";

export default function Timeout({}: any) {
  return (
    <div>
      <p className="text-xl mb-2">Sorry but your time ran out.</p>
      <p>Any tickets you added to your basket have now been re-released.</p>
      <p className="mb-6">
        If you wish to continue your purchase you will need to start again by
        logging in.
      </p>
      <ButtonLink className="my-6" href="/">
        Back to Login
      </ButtonLink>
    </div>
  );
}
