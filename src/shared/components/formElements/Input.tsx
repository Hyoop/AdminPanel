import React, { useEffect } from "react";

import "./Input.css";
import { useInput } from "../../hooks/input-hook";

const Input = (props: {
  initialValue? : any,
  initialValidity? : boolean,
  id? : string,
  label? : string,
  type: string,
  element? : string,
  placeholder : string,
  rows? : number,
  errorText?: string,
  validators?: any,
  valuetype?: string,
  index?: number,
  onInput: (id: any, value:any, isValid: boolean) => void
}) => {
  const [inputState, changeHandler, touchHandler, changeArrayHandler] = useInput(
    props.initialValue,
    props.initialValidity? true : false,
    props.index? props.index: 0
  );
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const element = props.element === "input" && props.valuetype === "array"? (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeArrayHandler}
      onBlur={touchHandler}
      value={inputState.value[props.index || 0]}
    />)
  
  : props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />) 
    :  (
    
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
