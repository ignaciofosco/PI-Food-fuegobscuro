import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesContainer.module.css";
import { Link } from "react-router-dom";

const RecipesContainer = ({ currentRecipes }) => {
  return (
    <div className={style.container}>
      {currentRecipes.map((recipe) => {
        return (
          <div key={recipe.id} className={style.card}>
            <Link to={`/recipes/${recipe.id}`} className={style.link}>
              <RecipeCard
                id={recipe.id}
                name={recipe.name}
                healthScore={recipe.healthScore}
                image={recipe.image}
                diets={recipe.diets}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RecipesContainer;
