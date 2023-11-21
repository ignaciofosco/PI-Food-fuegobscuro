import style from "./RecipeCard.module.css";

const RecipeCard = (props) => {
  const capitalizedDiets = props.diets.map((diet) => {
    return diet.charAt(0).toUpperCase() + diet.slice(1);
  });

  return (
    <div className={style.card}>
      <div className={style.cardContent}>
        <img src={props.image} alt={props.name} className={style.cardImage} />
        <p>
          <strong>{props.name}</strong>
        </p>
        <div>
          <p>
            <strong>Diets: </strong>
            <div>{capitalizedDiets.join(", ")}</div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
