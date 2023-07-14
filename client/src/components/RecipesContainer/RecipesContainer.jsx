// // import { useSelector } from "react-redux";
// import RecipeCard from "../RecipeCard/RecipeCard";
// import style from "./RecipesContainer.module.css";
// import { Link } from "react-router-dom";

// const RecipesContainer = ({ currentRecipes }) => {

//     return (
//         <div className={style.container}>
//           {currentRecipes.map((recipe) => {
//             return (
//               <div key={recipe.id} className={style.card}>
//                 <Link to={`/recipes/${recipe.id}`} className={style.link}>
//                 <RecipeCard
//                   id={recipe.id}
//                   name={recipe.name}
//                   healthScore={recipe.healthScore}
//                   image={recipe.image}
//                   diets={recipe.diets}
//                 />
//               </Link>
//               </div>
//             );
//           })}
//         </div>      
//     )
// };
    
// export default RecipesContainer;

// import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import style from "./RecipesContainer.module.css";
import { Link } from "react-router-dom";

const RecipesContainer = ({ currentRecipes }) => {
  const numRecipes = currentRecipes.length;
  const recipesPerRow = 3; // Number of recipes to display in each row

  const renderCards = () => {
    const numRows = Math.ceil(numRecipes / recipesPerRow);
    const totalCards = numRows * recipesPerRow;

    // Calculate the number of placeholder cards needed
    const numPlaceholders = totalCards - numRecipes;

    const cards = [];

    // Render the actual cards
    currentRecipes.forEach((recipe, index) => {
      const isLastCard = index === numRecipes - 1;

      cards.push(
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

      // Add placeholder cards if needed
      if (isLastCard && numPlaceholders > 0) {
        for (let i = 0; i < numPlaceholders; i++) {
          cards.push(
            <div key={`placeholder-${i}`} className={`${style.card} ${style.placeholder}`} />
          );
        }
      }
    });

    return cards;
  };

  return <div className={style.container}>{renderCards()}</div>;
};

export default RecipesContainer;