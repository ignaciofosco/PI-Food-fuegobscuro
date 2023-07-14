import React from "react";
import style from "./RecipeCard.module.css";

const RecipeCard = (props) => {
  const capitalizedDiets = props.diets.map((diet) => {
    if (typeof diet === "string") {
      return diet.charAt(0).toUpperCase() + diet.slice(1);
    }

    if (typeof diet === "object" && diet.name) {
      return diet.name.charAt(0).toUpperCase() + diet.name.slice(1);
    }

    return diet;
  });

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <img src={props.image} alt={props.name} className={style.cardImage} />
        <h2>{props.name}</h2>
        <p><u><strong>Diets:</strong></u> {capitalizedDiets.join(", ")}</p>
      </div>
    </div>
  );
};

export default RecipeCard;

// // import React from 'react';
// // import { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom'

// import style from "./RecipeCard.module.css";

// const RecipeCard = (props) => {
//     const capitalizedDiets = props.diets.map((diet) => {
//         if (typeof diet === 'string') {
//             return diet.charAt(0).toUpperCase() + diet.slice(1);
//         }

//         if (typeof diet === 'object' && diet.name) {
//             return diet.name.charAt(0).toUpperCase() + diet.name.slice(1);
//         }
        
//         return diet;
//     });

//     return (
//         <div className={style.detail}>
//             <p>Id: {props.id}</p>
//             <p>Name: {props.name}</p>
//             <p>Health Score: {props.healthScore}</p>
//             <p>Image: {props.image}</p>
//             <p>Diets: {capitalizedDiets.join(", ")}</p>
//         </div>
//     )

// };

// export default RecipeCard;