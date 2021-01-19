import React, {useCallback, useReducer} from 'react';
import Input from './components/Input';
import { VALIDATOR_REQUIRE } from '../../../../shared/utils/validators'
import './CardAddForm.css';
import ImageUpload from './components/ImageUpload';
import Button from './components/Button';
import { useHttpClient } from '../../../../shared/hooks/http-hook';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }

            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state;
    }


};

const CardAddForm = (props) => {
    const { sendRequest } = useHttpClient();
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            VegetableName: {
                value:'',
                isValid: false,
            },
            quantity: {
                value:'',
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
            oftheweek: {
                value:"false",
                isValid: false,
            }
        },
        isValid: false
    });

    let end = false;

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
    }, [dispatch]);
    
    const vegetableSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        const formData = new FormData();
        formData.append('name', formState.inputs.VegetableName.value);
        formData.append('quantity', formState.inputs.quantity.value);
        formData.append('oftheweek', formState.inputs.oftheweek.value === 'true' ? true : false);
        formData.append('image', formState.inputs.image.value);
        sendRequest(
            'http://ec2-15-237-49-138.eu-west-3.compute.amazonaws.com:8080/panier/',
            'POST',
            formData
        );
        end = true;
    }

    return (
    <div className='popup'>
        <form className='popup_inner' onSubmit={vegetableSubmitHandler}>
            <h1>{props.text}</h1>
            <div className="popup_center"><Button  onClick={props.closePopup}>close me</Button>
            </div>
            <Input id="VegetableName"
            label="New Vegetable name"
            type="VegetableName"
            name="VegetableName"
            placeholder="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            onInput={inputHandler}
            />
            <ImageUpload center id="image" onInput={inputHandler}/>
            <Input id="quantity"
            label="quantity"
            type="quantity"
            name="quantity"
            placeholder="100g"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid quantity"
            onInput={inputHandler}
            />
            <Input id="oftheweek"
            label="oftheweek"
            type="oftheweek"
            name="oftheweek"
            placeholder="false"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid boolean"
            onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>ADD VEGETABLE</Button>
        </form>
    </div>
    )
};
export default CardAddForm;