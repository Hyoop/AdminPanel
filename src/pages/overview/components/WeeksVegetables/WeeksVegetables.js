import React, { useEffect, useState} from 'react';
import './WeeksVegetables.css';
import CardVegetables from'../Card_Vege/CardVegetables';
import CardAdd from'../Card_Vege/CardAdd';
import { useHttpClient } from '../../../../shared/hooks/http-hook';

const WeeksVegetables = (props) => {
    const [vegetables, setvegetables] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchVegetables = async() => {
            try {
                const responseData = await sendRequest(
                    'http://ec2-15-237-49-138.eu-west-3.compute.amazonaws.com:8080/panier/week'
                );
                setvegetables(responseData.vegetables);
            } catch (err) {}
        };
        fetchVegetables();
    },[sendRequest]);


        return(
            <div className="weeks">
                <div className="">
                    <h1 className="weeks__header__title">Week's vegetables</h1>
                    <h3 className="weeks__header__date">as of 25 May 2019, 09:41 PM</h3>
                </div>
                <div className="weeks__vegetables">
                {vegetables.length <= 0 && !isLoading ? (
                    <p >No vegetables found.</p>) : null}
                {!isLoading && vegetables.map(vegetable =>
                    <CardVegetables key={vegetable._id} name={vegetable.name} image={vegetable.imageUrl}/>
                )}
                    <CardAdd myClick={props.myClick}/>
                </div>
                    
                
            </div>
        )

}

export default WeeksVegetables;