import ButtonLink from "../../components/ButtonLink";

export default function UnderAgeMember({}: any) {
  return (
    <div>
      <p className="text-2xl mb-4">Sorry.</p>
      <p className="mb-1">You must be 16 or over to enter a competition.</p>
      <ButtonLink className="my-6" href="/">
        Back to Login
      </ButtonLink>
    </div>
  );
}
