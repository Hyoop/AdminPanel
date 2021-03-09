import React from "react";
import env from "react-dotenv";
import "./Recipe.css";

const recipe = (props: { title: String,
  image: any }) => (
  <div className="recipe">
    <div className="recipe__buttons">
      
      <span className="recipe__like-btn"></span>
    </div>
    <div className="recipe__image">
      <img src={`${env.apiURL}/${props.image}`  } width="100" />     
    </div>
    <div className="recipe__info">
      <div className="recipe__text">
        <h1>{props.title}</h1>
      </div>
    </div>
  </div>
);

export default recipe;
