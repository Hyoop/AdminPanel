import React from 'react';
import Button from './components/Button'
import './CardAdd.css';

const cardadd = (props) => (

    <div className="main__CardAdd">
        <div className="main__Button">
        <Button onClick={props.myClick} type="button" >Add Vegetables !</Button>
        </div>
    </div>
)


export default cardadd;