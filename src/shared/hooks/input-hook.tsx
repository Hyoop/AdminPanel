import { useReducer } from "react";

export const inputReducer = (state:any, action:any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
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

export const useInput = (initialValue: any, initialFormValidity: boolean) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
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
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return [inputState, changeHandler, touchHandler];
};
