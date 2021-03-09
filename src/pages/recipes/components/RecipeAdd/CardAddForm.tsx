import React, { useContext } from "react";
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
    title: {
      value: "",
      isValid: false,
    },
    preparations: {
      value: "",
      isValid: false,
    },
    ingredients: {
      value: "",
      isValid: false,
    },
    ustensils: {
      value: "",
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
    total_time: {
      value: null,
      isValid: false,
    },

    preparation_time: {
      value: null,
      isValid: false,
    },
    baking_time: {
      value: null,
      isValid: false,
    },

    difficulty: {
      value: null,
      isValid: false,
    },
    rate: {
      value: 0,
      isValid: true,
    },
    oftheweek: {
      value: "false",
      isValid: false,
    }, 
  },false);

  const SubmitHandler = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    /*for (let i=0; i< formState.inputs.preparations.length; i++){
    formData.append("preparations[]", formState.inputs.preparations[i].value);
    }
    for (let i=0; i< formState.inputs.ingredients.length; i++){
      formData.append("ingredients[]", formState.inputs.ingredients[i].value);
    }
    for (let i=0; i< formState.inputs.ustensils.length; i++){
      formData.append("ustensils[]", formState.inputs.ustensils[i].value);
    }*/
    formData.append("preparations[]", formState.inputs.preparations.value);
    
    formData.append("ingredients[]", JSON.stringify({name: formState.inputs.ingredients.value, quantity: 200, unit: "g"}));
    formData.append(`ustensils[]`, formState.inputs.ustensils.value);
    formData.append("total_time", formState.inputs.total_time.value);
    formData.append("preparation_time", formState.inputs.preparation_time.value);
    formData.append("baking_time", formState.inputs.baking_time.value);
    formData.append("difficulty", formState.inputs.difficulty.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("oftheweek", formState.inputs.oftheweek.value);
    console.log(formData);
    await sendRequest("" + env.apiURL + "/api/recipe/", "POST", formData, {Authorization: "Bearer " + auth.token});
    props.closePopup();
  };

  return (
    <div className="popup">
      <form className="popup_inner" onSubmit={SubmitHandler}>
        <h1>{props.text}</h1>
        <div className="popup_center">
          <Button onClick={props.closePopup}>close me</Button>
        </div>
        <Input
          id="title"
          label="title"
          type="title"
          placeholder="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} errorText="Please enter a valid image"/>
        <Input
          id="preparations"
          label="preparations"
          type="preparations"
          placeholder="100g"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid preparations"
          onInput={inputHandler}
        />
        <Input
          id="ingredients"
          label="ingredients"
          type="ingredients"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ingredients"
          onInput={inputHandler}
        />
        <Input
          id="ustensils"
          label="ustensils"
          type="ustensils"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ustensils"
          onInput={inputHandler}
        />
        <Input
          id="total_time"
          label="total_time"
          type="total_time"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid total time"
          onInput={inputHandler}
        />
        <Input
          id="preparation_time"
          label="preparation_time"
          type="preparation_time"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid preparation time"
          onInput={inputHandler}
        />

        <Input
          id="baking_time"
          label="baking_time"
          type="baking_time"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid baking time"
          onInput={inputHandler}
        />
        <Input
          id="difficulty"
          label="difficulty"
          type="difficulty"
          placeholder="false"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid difficulty"
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
            ADD RECIPE
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CardAddForm;
