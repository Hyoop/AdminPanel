import { useContext } from "react";
import env from "react-dotenv";
import Input from "../../../../shared/components/formElements/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";
import "./CardAddForm.css";
import ImageUpload from "../../../../shared/components/formElements/ImageUpload";
import Button from "../../../../shared/components/formElements/Button";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

import { useForm } from "../../../../shared/hooks/form-hook";
import { AuthContext } from "../../../../shared/context/auth-context";

const CardAddForm = (props : {
  text: string,
  closePopup: () => void
}) => {
  const auth = useContext(AuthContext)
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm({
    VegetableName: {
      value: "",
      isValid: false,
    },
    quantity: {
      value: "",
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
    oftheweek: {
      value: "false",
      isValid: false,
    }, 
  },false);

  const vegetableSubmitHandler = async (event: any) => {
    event.preventDefault();
    console.log(formState.inputs);
    const formData = new FormData();
    formData.append("name", formState.inputs.VegetableName.value);
    formData.append("quantity", formState.inputs.quantity.value);
    formData.append("oftheweek", formState.inputs.oftheweek.value);
    formData.append("image", formState.inputs.image.value);
    await sendRequest("" + env.apiURL + "/api/panier/", "POST", formData, {Authorization: 'Bearer ' + auth.token});
    props.closePopup();
  };

  return (
    <div className="popup">
      <form className="popup_inner" onSubmit={vegetableSubmitHandler}>
        <h1>{props.text}</h1>
        <div className="popup_center">
          <Button onClick={props.closePopup}>close me</Button>
        </div>
        <Input
          id="VegetableName"
          label="New Vegetable name"
          type="VegetableName"
          placeholder="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} errorText="Please enter a valid image"/>
        <Input
          id="quantity"
          label="quantity"
          type="quantity"
          placeholder="100g"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid quantity"
          onInput={inputHandler}
        />
        <Input
          id="oftheweek"
          label="oftheweek"
          type="oftheweek"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid boolean"
          onInput={inputHandler}
        />
        <div className="popup_center">
          <Button type="submit" disabled={!formState.isValid}>
            ADD VEGETABLE
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CardAddForm;
