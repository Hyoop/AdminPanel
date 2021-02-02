import React from "react";
import env from "react-dotenv";
import "./CardVegetables.css";

const cardvegetables = (props: {
  name: string,
  image: any,
  alt: string
}) => (
  <div className="main__cardvegetables">
    <div className="main__card_flex-column">
      <div className="main__cardName"> {props.name}</div>
      <div className="main__cardIMG">
        <img src={`${env.apiURL}/${props.image}` } alt={props.alt}/>
      </div>
    </div>
    <div className="main__card_flex-row"></div>
  </div>
);

export default cardvegetables;
