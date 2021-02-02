import React from "react";
import Button from "../../../../shared/components/formElements/Button";
import "./CardAdd.css";

const cardadd = (props:{
  myClick: () => void
}) => (
  <div className="main__CardAdd">
    <div className="main__Button">
        <Button onClick={props.myClick}>
        Add Vegetables !
      </Button>
    </div>
  </div>
);

export default cardadd;
