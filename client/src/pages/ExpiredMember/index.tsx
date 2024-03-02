import ButtonLink from "../../components/ButtonLink";

export default function ExpiredMember({}: any) {
  return (
    <div>
      <p className="text-2xl mb-4">Sorry but your membership is not active.</p>
      <p className="mb-1">
        You must be an active member to enter a competition.
      </p>
      <p className="mb-8">
        If you want to enter a competition please renew your membership on the main website. You will not be able to purchase
        tickets today, but you will have the opportunity to purchase tickets
        during <strong>Round 2</strong> of sales if you renew your membership
        before then.
      </p>
      <ButtonLink
        className="my-6"
        href="https://xxx.com/members/login/"
      >
        Renew Membership
      </ButtonLink>
    </div>
  );
}
