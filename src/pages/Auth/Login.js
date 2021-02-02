import React, { useContext } from "react";
import env from "react-dotenv";
import Auth from "./Auth";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Login = () => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "" + env.apiURL + "/api/user/admin/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(responseData._id, responseData.token);
    } catch (error) {}
  };

  return (
    <Auth>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          label="password"
          type="password"
          control="input"
          onInput={inputHandler}
        />
        <Button type="submit">Login</Button>
      </form>
    </Auth>
  );
};
export default Login;
