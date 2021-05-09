import {useState, useEffect, useContext} from "react";
import "./Vegetables.css";
import Legume from "./components/Legume";
import Paginator from "./components/Paginator";
import Loader from "../../shared/components/Loader/Loader";
import MainHeader from "../../shared/components/Navigation/MainHeader";

import { useHttpClient } from "../../shared/hooks/http-hook";
import env from "react-dotenv";
import { AuthContext } from "../../shared/context/auth-context";
const Vegetables = ()=>{
    const auth = useContext(AuthContext);
    const [vegetables, setVegetables] = useState([]);
    const {isLoading, sendRequest} = useHttpClient();

    useEffect(() => {

        const fetchVegetables = async () => {
          try {
            const responseData = await sendRequest(
              "" + env.apiURL + "/api/panier/",
              "GET",
          null,
          {
            "Accept": 'application/json',
            "Content-Type" : "application/json",
            "credentials": "same-origin",
            "Authorization": "Bearer " + auth.token
          }
            );
            setVegetables(responseData.vegetables);
          } catch (err) {}
        };
        fetchVegetables();
      }, [sendRequest]);
    

    return (
        <div className= "vegetables">

        <section className="vegetables__header">
          <MainHeader>
            <h1>Vegetables</h1>
          </MainHeader>
        </section>

        <section className="feedvege">
          {isLoading && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loader />
            </div>
          )}

          {vegetables.length <= 0 && !isLoading ? (
            <p style={{ textAlign: "center" }}>No vegetables found.</p>
          ) : null}

          {!isLoading && (
            <Paginator>
              {vegetables.map((legume:any) => (
                <Legume key={legume._id} name={legume.name} image={legume.imageUrl}/> // add id={legume._id} 
              ))}</Paginator>
          )}
          
        </section>
      </div>
    )


}

export default Vegetables;
