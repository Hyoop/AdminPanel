import React from "react";
import env from "react-dotenv";
import "./AddLegume.css";

const AddLegume = (props: { name: String, image: any}) => (
<article className="legume" style={{backgroundImage: `url(${env.apiURL}/${props.image})`}}>
<h1 className="legume__name">{props.name}</h1>
</article>)

export default AddLegume;

