import {useEffect} from "react";
import env from "react-dotenv";
import "./Legume.css";

const Legume = (props: { name: String, image: any}) => {
  
  useEffect(()=>{})

  return (
    <article className="legume" style={{backgroundImage: `url(${env.apiURL}/${props.image})`}}>
      <h1 className="legume__name">{props.name}</h1>
    </article>
  )
};

export default Legume;
