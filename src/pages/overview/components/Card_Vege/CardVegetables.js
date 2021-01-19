import React from 'react';

import './CardVegetables.css';
import Button from "../Button/Button"
const cardvegetables = props => (

    <div className="main__cardvegetables">
        <div class="main__card_flex-column">
            <div className="main__cardName"> {props.name}</div>
            <div className="main__cardIMG">
                <img  src={`http://ec2-15-237-49-138.eu-west-3.compute.amazonaws.com:8080/${props.image}`}/>
            </div>
        </div>
        <div class="main__card_flex-row">
            
        </div>
    </div>
);

export default cardvegetables;