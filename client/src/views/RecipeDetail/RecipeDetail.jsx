import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { getRecipeById } from '../../redux/actions';
import styles from './RecipeDetail.module.css'
import iconHeart from "../../utils/icons/health-score.svg"

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeById);

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  if (Object.keys(recipe).length === 0) {
    return <div>Loading...</div>;
  }
  
  const removeHtmlTags = (text) => {
    return text.replace(/<[^>]*>/g, '');
  }

  const summaryCleaned = removeHtmlTags(recipe.summary);
  
  let stepsFormat;

  if (typeof recipe.steps === "string") {
    stepsFormat = <p>{recipe.steps}</p>;
  } else if (Array.isArray(recipe.steps)) {
    stepsFormat = recipe.steps.map((step, index) => (
      <p key={index}>{index + 1}- {step.step}</p>
    ));
  } else {
    stepsFormat = <p>No steps available.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{recipe.name}</h1>

      <img src={recipe.image} alt={recipe.name} />

      <div className={styles.summary}>
        <h2>Summary: </h2>
        <p>{summaryCleaned}</p>
      </div>

      <div className={styles.healthScore}>
        <img src={iconHeart} alt="heart" className={styles.icon} />
        <h2>Health Score:</h2>
        <p>{recipe.healthScore}</p>
      </div>

      {/* <h2>Diets:</h2>
      <div className={styles.diets}>
        {recipe.diets?.map((diet) => (
          <li key={diet}>{diet[0].toUpperCase() + diet.slice(1)}</li>
        ))}
      </div> */}

      <h2>Diets:</h2>
      <div className={styles.diets}>
        {recipe.diets?.map((diet) => {
          const capitalizedDiet =
            typeof diet === "string"
              ? diet.charAt(0).toUpperCase() + diet.slice(1)
              : typeof diet === "object" && diet.name
              ? diet.name.charAt(0).toUpperCase() + diet.name.slice(1)
              : diet;

          return <li key={diet}>{capitalizedDiet}</li>;
        })}
      </div>

      <section className={styles.instructionSteps}>
        <h2>Instruction steps:</h2>
        {stepsFormat && stepsFormat.length > 0 ? (
          <div>{stepsFormat}</div>
        ) : (
          <p>No steps available.</p>
        )}
      </section>
    </div>
  );

};

export default RecipeDetail;