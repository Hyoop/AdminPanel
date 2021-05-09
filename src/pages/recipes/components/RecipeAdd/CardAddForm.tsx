import React, { useState, useContext, useEffect, useRef } from "react";
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
  const [indexPreparations, setIndexPreparations] = useState(0);

  const [preparations, setPreparations] = useState<number[]>([]);
  const isFirstRun = useRef(true);

  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    preparations: {
      value: [""],
      isValid: true,
    },
    ingredients: {
      value: "",
      isValid: false,
    },
    ustensils: {
      value: [""],
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

  const onClickAddPreparations = () => {
    
    setIndexPreparations(indexPreparations + 1)
    
  }

  useEffect(()=> {
    if(isFirstRun.current){
      isFirstRun.current =false;
      return
    }
    let indexvalue = indexPreparations;
    setPreparations(prep => [...prep, indexvalue])
  },[indexPreparations] )


  const SubmitHandler = async (event: any) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    for(let i = 0; i<formState.inputs.preparations.value.length; i++){
      formData.append("preparations[]", formState.inputs.preparations.value[i]);
    }
    formData.append("ingredients[]", JSON.stringify({name: formState.inputs.ingredients.value, quantity: 200, unit: "g"}));
    for(let i = 0; i< formState.inputs.ustensils.value.length; i++){
      formData.append(`ustensils[]`, formState.inputs.ustensils.value[i]);
    }
    formData.append("total_time", formState.inputs.total_time.value);
    formData.append("preparation_time", formState.inputs.preparation_time.value);
    formData.append("baking_time", formState.inputs.baking_time.value);
    formData.append("difficulty", formState.inputs.difficulty.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("oftheweek", formState.inputs.oftheweek.value);
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
          type="text"
          placeholder="title"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} errorText=""/>
        
        <Input
          id="preparations"
          label={`Preparation : \n Step ${1}`}
          type="text"
          placeholder="First step"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid preparations"
          onInput={inputHandler}
          valuetype="array"
          initialValue={formState.inputs.preparations.value}
          index={0}
        />
        {preparations.map((i) => (<Input
          id="preparations"
          label={`Step ${i+1}`}
          type="text"
          placeholder="First step"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid preparations"
          onInput={inputHandler}
          valuetype="array"
          initialValue={formState.inputs.preparations.value}
          index={i}
        />))}

        <Button type="button" onClick={onClickAddPreparations}>+</Button>

        <Input
          id="ingredients"
          label="ingredients"
          type="text"
          placeholder="false"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ingredients"
          onInput={inputHandler}
        />
        <Input
          id="ustensils"
          label="ustensils"
          type="text"
          placeholder="ustensils name"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid ustensils"
          onInput={inputHandler}
          valuetype="array"
          initialValue={formState.inputs.ustensils.value}
          index={0}
        />
        <Input
          id="total_time"
          label="total_time"
          type="text"
          placeholder="0 min"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid total time"
          onInput={inputHandler}
        />
        <Input
          id="preparation_time"
          label="preparation_time"
          type="text"
          placeholder="0 min"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid preparation time"
          onInput={inputHandler}
        />

        <Input
          id="baking_time"
          label="baking_time"
          type="text"
          placeholder="0 min"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid baking time"
          onInput={inputHandler}
        />
        <Input
          id="difficulty"
          label="difficulty"
          type="number"
          placeholder="0"
          element = "input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid difficulty"
          onInput={inputHandler}
        />
        <Input
          id="oftheweek"
          label="oftheweek"
          type="text"
          placeholder="false"
          element = "input"
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
