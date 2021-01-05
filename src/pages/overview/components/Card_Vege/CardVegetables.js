import React from 'react';

import './CardVegetables.css';
import Button from "../Button/Button"
const cardvegetables = props => (

    <div className="main__cardvegetables">
        <div class="main__card_flex-column">
            <div className="main__cardName"> {props.name}</div>
            <div className="main__cardIMG">
                <img  src={`http://localhost:8080/${props.image}`}/>
            </div>
        </div>
        <div class="main__card_flex-row">
            <Button />
        </div>
        
    </div>
);

export default cardvegetables;