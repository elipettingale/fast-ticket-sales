import ButtonLink from "../../components/ButtonLink";

export default function MemberReachedLimit({}: any) {
  return (
    <div>
      <p className="text-2xl mb-4">Sorry.</p>
      <p className="mb-1">
        You have purchased the maximum number of tickets in this round of sales.
      </p>
      <p>
        Please return at midday on <strong>Monday 5th February</strong> when all remaining tickets will be available to purchase in Round 2 with no limits.
      </p>
      <ButtonLink className="my-6" href="/">
        Back to Login
      </ButtonLink>
    </div>
  );
}
