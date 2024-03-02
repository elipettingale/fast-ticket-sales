import ButtonLink from "../../components/ButtonLink";

export default function Complete() {
  return (
    <div>
      <p className="text-xl mb-4">Thank you for your purchase.</p>
      <div className="copy">
        <p>Tickets will be issued within 48 hours of purchase.</p>
        <p>After this time, you will be able to check and/or cancel your ticket(s) within your dashboard at <a href="https://xxx.com/members/login/">https://xxx.com/members/login/</a>.</p>
        <p>If you have not received your ticket after the 48 hours has passed, please contact <a href="mailto:competitions@xxx.com">competitions@xxx.com</a>.</p>
      </div>
      <ButtonLink className="my-6" href="/">
        Back to Login
      </ButtonLink>
    </div>
  );
}
