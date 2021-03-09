import React from "react";
import Button from "../../../../shared/components/formElements/Button";
import "./CardAdd.css";

const cardadd = (props:{
  myClick: () => void
}) => (
  <div className="recipeCardAdd">
        <Button onClick={props.myClick}>
        Add Recipes !
      </Button>
  </div>
);

export default cardadd;
