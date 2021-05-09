import { useReducer } from "react";

export const inputReducer = (state:any, action:any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    case "CHANGEARRAY":
      console.log(state.value)
      let value = state.value;
      value[state.index] = action.value; 
      return {
        ...state,
        value: value,
        isValid: true,
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

export const useInput = (initialValue: any, initialFormValidity: boolean, index: number) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    index: index || 0,
    value: initialValue,
    isTouched: false,
    isValid: initialFormValidity || false,
  });
  const changeHandler = (event:any) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
    });
  };
  const changeArrayHandler = (event:any) => {
    dispatch({
      type: "CHANGEARRAY",
      value: event.target.value,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return [inputState, changeHandler, touchHandler, changeArrayHandler];
};
