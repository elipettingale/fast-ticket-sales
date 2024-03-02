import Countdown from "../../components/Countdown";
import InputField from "../../components/InputField";
import FormRow from "../../components/FormRow";
import { formData, formDataAsJson } from "../../lib/helpers";
import DOBField from "../../components/DOBFIeld";
import Button from "../../components/Button";
import { useState } from "react";
import server from "../../lib/server";

export default function EnterDetails({ state, send }: any) {
  const [termsAgreed, setTermsAgreed] = useState(false);

  const member = state.context.member;

  const onSubmit = (event: any) => {
    event.preventDefault();

    let details = formData(event.target);
    let memberDetails = formDataAsJson(event.target);

    send("UPDATE_DETAILS", { member: memberDetails });

    server
      .post("/entry", {
        entry: state.context.entry,
        details: details,
      })
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          send("CONTINUE", data);
        }
      });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Countdown timerEnds={state.context.timer_ends} />
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mb-10">
            <p className="text-xl text-green-600 font-bold mb-4">
              Your Details
            </p>
            <FormRow>
              <InputField
                label="First Name"
                type="text"
                name="first_name"
                defaultValue={member.first_name}
                required
              />
              <InputField
                label="Last Name"
                type="text"
                name="last_name"
                defaultValue={member.last_name}
                required
              />
            </FormRow>
            <FormRow>
              <InputField
                label="Email"
                type="email"
                name="email"
                defaultValue={member.email}
                required
              />
              <InputField
                label="Contact Number"
                type="text"
                name="contact_number"
                defaultValue={member.contact_number}
              />
            </FormRow>
            <FormRow>
              <DOBField
                name="date_of_birth"
                defaultValue={member.date_of_birth}
                required
              />
              <InputField
                label="Disability"
                type="text"
                name="disability"
                defaultValue={member.disability}
              />
            </FormRow>
            <FormRow>
              <InputField
                label="License Number"
                type="text"
                name="licence_number"
                defaultValue={member.licence_number}
                required
              />
            </FormRow>
          </div>
          <div className="mb-10">
            <p className="text-xl text-green-600 font-bold mb-4">
              Your Address
            </p>
            <FormRow>
              <InputField
                label="Line 1"
                type="text"
                name="address[line_1]"
                defaultValue={member.address.line_1}
              />
            </FormRow>
            <FormRow>
              <InputField
                label="Line 2"
                type="text"
                name="address[line_2]"
                defaultValue={member.address.line_2}
              />
              <InputField
                label="Town"
                type="text"
                name="address[town]"
                defaultValue={member.address.town}
              />
            </FormRow>
            <FormRow>
              <InputField
                label="County"
                type="text"
                name="address[county]"
                defaultValue={member.address.county}
              />
              <InputField
                label="Postcode"
                type="text"
                name="address[postcode]"
                defaultValue={member.address.postcode}
              />
            </FormRow>
          </div>

          <div>
            <label className="cursor-pointer mb-1">
              <input
                type="checkbox"
                className="scale-[1.3]"
                checked={termsAgreed}
                onChange={(event) => setTermsAgreed(event.target.checked)}
              />
              <span className="ml-2">
                I hereby agree to the competition events terms
                and conditions
              </span>
            </label>

            <p className="mt-2">
              View our Competitions Terms and Conditions{" "}
              <a
                className="text-orange font-bold"
                href="https://xxx.com/competitions-terms-conditions/"
                target="_blank"
              >
                here
              </a>
              .
            </p>
          </div>

          <div className="flex justify-between mt-12">
            <Button onClick={() => send("BACK")}>Back</Button>
            <Button disabled={!termsAgreed}>Continue</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
