
import env from "react-dotenv";
import "./CardVegetables.css";

const cardvegetables = (props: {
  name: string,
  image: any
}) => (
  <div className="main__cardvegetables" style={{backgroundImage: `url(${env.apiURL}/${props.image})`}}>
      <h1 className="main__cardName"> {props.name}</h1>
  </div>
);

export default cardvegetables;
