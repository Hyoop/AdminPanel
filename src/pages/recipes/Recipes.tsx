import {useState, useEffect, useContext} from "react";
import "./Recipes.css";
import Recipe from "./components/Recipe";
import Paginator from "./components/Paginator";
import Loader from "../../shared/components/Loader/Loader";
import MainHeader from "../../shared/components/Navigation/MainHeader";
import CardAddForm from'./components/RecipeAdd/CardAddForm';
import CardAdd from'./components/RecipeAdd/CardAdd';
import { useHttpClient } from "../../shared/hooks/http-hook";
import env from "react-dotenv";
import { AuthContext } from "../../shared/context/auth-context";

const Recipes = ()=>{
    const auth = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const {isLoading, sendRequest} = useHttpClient();
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {

        const fetchRecipes = async () => {
          try {
            const responseData = await sendRequest(
              "" + env.apiURL + "/api/recipe/",
              "GET",
          null,
          {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + auth.token
          }
            );
            setRecipes(responseData.recipes);
          } catch (err) {}
        };
        fetchRecipes();
      }, [sendRequest, showForm]);

    const handleAddRecipe = () => { 
        setShowForm(!showForm);
    }

    return (
        <div className= "recipes">
        <section className="recipes__header">
          <MainHeader>
            <h1>Recipes</h1>
          </MainHeader>
        </section>
        <section className="recipes__feed">
          
          <CardAdd myClick={handleAddRecipe} />
          
          {isLoading && !showForm ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loader />
            </div>
          ): null}
          {recipes.length <= 0 && !isLoading ? (
            <p style={{ textAlign: "center" }}>No recipes found.</p>
          ) : null}
          {!isLoading && 
            <Paginator>
              {recipes.map((recipe:any) => (
                <Recipe key={recipe._id} title={recipe.title} image={recipe.imageUrl} /> 
              ))}
            </Paginator>
          }

          {showForm && <CardAddForm text="ADD A NEW RECIPE" closePopup={handleAddRecipe}/>}
        </section>
      </div>
    )


}

export default Recipes;
