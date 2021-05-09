import React, { useContext,useState,useEffect } from 'react'; 
import "./Overview.css";
import MainHeader from '../../shared/components/Navigation/MainHeader';
import env from "react-dotenv";
import Card from './components/Card/Card';
import WeeksVegetables from './components/WeeksVegetables/WeeksVegetables';
import CardAddForm from'./components/Card_Vege/CardAddForm';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
const Overview = ()=>{

    const [NbSubscriptions,SetNbSubscriptions] = useState(0)
    const [NbVegetables,SetNbVegetables] = useState(0)
    const [NbRecipes,SetNbRecipes] = useState(0)
    const [Nbmembers,SetNbmembers] = useState(0)
    const [Vegetablesoftheweek,SetVegetablesoftheweek] = useState([])
    const [overviewLoading,SetoverviewLoading] = useState(true)
    const [showForm, SetshowForm] = useState(false)
    const auth = useContext(AuthContext)
    const {isLoading, sendRequest} = useHttpClient();
    const body = {"count": true}
    const handleAddVegetables = () =>{ 
        SetshowForm(!showForm);
    }
    useEffect(()=>  {
        const fetchInfo = async () => {
            try {
                
                const response = await sendRequest(
                    "" + env.apiURL + "/api/user/admin/getinfo",
                "GET", 
                null, 
                {"Content-Type" : "application/json", Authorization: "Bearer " + auth.token}
                );
                SetNbSubscriptions(response.Informations.NumberSubscriptions)
                SetNbVegetables(response.Informations.NumberVegetables)
                SetNbmembers(response.Informations.NumberUsers) 
                SetNbRecipes(response.Informations.NumberRecipes)
            } catch (err) {
                console.log(err)
            }
        }
        fetchInfo();
    },[sendRequest, auth]);

    return (
    <div className="overview">
        <section className="overview__header">
            <MainHeader>
                <h1>Overview</h1>
            </MainHeader>
        </section>
        {!isLoading && <section className="overviewcard">
            <Card title="Subscriptions" content={NbSubscriptions}/>
            <Card title="Members" content={Nbmembers}/>
            <Card title="Vegetables" content={NbVegetables}/>
            <Card title="Recipes" content={NbRecipes}/>
        </section>}
        <section className="overview-weeks_vegetables">
            <WeeksVegetables showForm={showForm} myClick={handleAddVegetables}/>
        </section>
        <section className="overview-task">
        </section>
        {showForm && 
            <CardAddForm text="ADD A VEGETABLE" closePopup={handleAddVegetables}/>
        }
    </div>)
    
}

export default Overview;
