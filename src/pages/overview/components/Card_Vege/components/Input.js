import React, { useReducer, useEffect } from 'react';
import {validate} from '../../../../../shared/utils/validators.js'
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,  // copy old value in this new object
                value: action.val,
                isValid: validate(action.val, action.validators) 
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};


const Input = props => {
    const [currentState, dispatch] = useReducer(inputReducer, {
        value: '', 
        isTouched: false,
        isValid: false}); //2nd argument : initial state
    
    const { id, onInput} = props;
    const { value, isValid} = currentState;

    useEffect(()=> {
        onInput(id,value, isValid)
    },[id, value, isValid, onInput]);
    
        
    
    const changeHandler = event =>{
        dispatch({
        type: 'CHANGE', 
        val: event.target.value, 
        validators: props.validators});
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    return(
    <div className="input">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input 
            id={props.id}
            type={props.type}
            name={props.name}
            value={currentState.value}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
        />
        {!currentState.isValid && currentState.isTouched && <p>{props.errorText}</p>}
    </div>)
}

export default Input; 