import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllRecipes, getAllDiets, postRecipe } from "../../redux/actions";
import validations from "./validations";
import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);

  const [error, setError] = useState({});

  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: [{ number: 1, step: "" }],
    image: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getAllDiets());
    dispatch(getAllRecipes());
  }, [dispatch]);

  const handleSelect = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      setForm({
        ...form,
        diets: [...form.diets, value],
      });

      setError(
        validations(
          {
            ...form,
            diets: [...form.diets, value],
          },
          recipes
        )
      );
    } else if (!checked) {
      setForm({
        ...form,
        diets: form.diets.filter((diet) => diet !== value),
      });

      setError(
        validations(
          {
            ...form,
            diets: form.diets.filter((diet) => diet !== value),
          },
          recipes
        )
      );
    }
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "steps") {
      const stepNumber = parseInt(event.target.getAttribute("data-step"), 10);
      const updatedSteps = form.steps.map((step) =>
        step.number === stepNumber ? { ...step, step: value } : step
      );

      setForm((prevForm) => ({
        ...prevForm,
        [property]: updatedSteps,
      }));

      // Check if the last step is not empty before adding a new step
      const lastStep = updatedSteps[updatedSteps.length - 1];
      if (stepNumber === form.steps.length && lastStep.step.trim() !== "") {
        setForm((prevForm) => ({
          ...prevForm,
          steps: [...updatedSteps, { number: lastStep.number + 1, step: "" }],
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [property]: value,
      }));
    }

    setError(
      validations(
        {
          ...form,
          [property]: value,
        },
        recipes
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validations(form, recipes));
    if (Object.entries(error).length === 0 && form.name.length) {
      dispatch(postRecipe(form));
      alert("Recipe created successfully!");
      history.push("/home");
    } else {
      alert("Error processing form: ", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create Your Recipe!</h1>
        </div>

        <div>
          <label className={styles.formLabel}>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            name="name"
            onChange={(event) => handleChange(event)}
            required
            className={styles.formInput}
          />
          {error.name ? (
            <span className={styles.formError}>*{error.name}</span>
          ) : undefined}
        </div>

        <div>
          <label className={styles.formLabel}>Summary:</label>
          <textarea
            type="text"
            placeholder="Summary"
            value={form.summary}
            name="summary"
            onChange={(event) => handleChange(event)}
            required
            className={styles.formTextarea}
          />
          {error.summary ? (
            <span className={styles.formError}>*{error.summary}</span>
          ) : undefined}
        </div>

        <div>
          <label className={styles.formLabel}>Health Score:</label>
          <input
            type="number"
            placeholder="Health Score"
            value={form.healthScore}
            name="healthScore"
            onChange={(event) => handleChange(event)}
            maxLength="3"
            required
            className={styles.formInput}
          />
          {error.healthScore ? (
            <span className={styles.formError}>*{error.healthScore}</span>
          ) : undefined}
        </div>

        <div>
          <label className={styles.formLabel}>Step-by-step instructions:</label>
          {form.steps.map((step) => (
            <div key={step.number}>
              <label>{`Step ${step.number}:`}</label>
              <textarea
                type="text"
                value={step.step}
                name="steps"
                onChange={(event) => handleChange(event)}
                required
                className={styles.formTextarea}
                data-step={step.number}
              />
            </div>
          ))}
          {error.steps ? (
            <span className={styles.formError}>*{error.steps}</span>
          ) : undefined}
        </div>

        <div>
          <label className={styles.formLabel}>Image:</label>
          <input
            type="text"
            placeholder="URL Image"
            value={form.image}
            name="image"
            onChange={(event) => handleChange(event)}
            className={styles.formInput}
          />
          {error.image ? (
            <span className={styles.formError}>*{error.image}</span>
          ) : undefined}
        </div>

        <div>
          <h4 className={styles.formLabel}>Choose diets:</h4>
          {error.diets ? (
            <span className={styles.formError}>*{error.diets}</span>
          ) : undefined}
          <div className={styles.formCheckboxContainer}>
            {diets.slice(0, 6).map((diet) => (
              <label key={diet.name} htmlFor={diet.name}>
                <input
                  type="checkbox"
                  id={diet.name}
                  value={diet.name}
                  onChange={(event) => handleSelect(event)}
                  required
                />
                {diet.name[0].toUpperCase() + diet.name.slice(1)}
              </label>
            ))}
            <br />
            {diets.slice(6, 11).map((diet) => (
              <label key={diet.name} htmlFor={diet.name}>
                <input
                  type="checkbox"
                  id={diet.name}
                  value={diet.name}
                  onChange={(event) => handleSelect(event)}
                  required
                />
                {diet.name[0].toUpperCase() + diet.name.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formButtonContainer}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.formButton}
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
