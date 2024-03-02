import { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import styles from "./index.module.css";
import server from "../../lib/server";
import { formData } from "../../lib/helpers";

export default function Login({ send }: any) {
  const [error, setError] = useState<string>("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    setError("");

    let data = formData(event.target);

    server
      .post("/session", data)
      .then(({ data }) => {
        if (data.error) {
          return send(data.error);
        }

        return send("LOGIN", data);
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          setError(
            "Your membership number or password was incorrect, please try again."
          );
        }
      });
  };

  return (
    <div className={styles.Wrapper}>
      {error && <p className="error mb-4 text-sm text-red">{error}</p>}

      <form onSubmit={onSubmit} className={styles.Form}>
        <InputField label="Membership Number" type="text" name="reference" />
        <InputField label="Password" type="password" name="password" />
        <Button>Login</Button>
      </form>
    </div>
  );
}
