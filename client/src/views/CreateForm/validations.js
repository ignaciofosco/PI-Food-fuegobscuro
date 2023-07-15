const validations = (
  { name, summary, healthScore, steps, image, diets },
  recipes,
) => {
  const errors = {};

  const RegExpression = /^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/;
  const nameSearch = (name) => recipes.filter((recipe) => recipe.name === name);

  // NAME
  if (!name) {
    errors.name = "A name is required";
  } else if (nameSearch(name).length > 0) {
    errors.name = "A recipe with that name already exists";
  } else if (name.length > 50) {
    errors.name = "The name can't be longer than 50 characters";
  }

  // SUMMARY
  else if (!summary) {
    errors.summary = "A summary is required";
  } else if (summary.length > 1000) {
    errors.summary = "The summary can't be longer than 1000 characters";
  }

  // HEALTH SCORE
  else if (!healthScore) {
    errors.healthScore = "A health score is required";
  } else if (healthScore <= 0) {
    errors.healthScore = "Health score can't be less than or equal to 0";
  } else if (healthScore > 100) {
    errors.healthScore = "Health score can't be greater than 100";
  } else if (healthScore.startsWith("0")) {
    errors.healthScore = "Health score can't start with 0";
  }

  // STEPS
  else if (!steps) {
    errors.steps = "Instruction steps are required";
  } else if (steps.length > 1000) {
    errors.steps = "Instruction steps can't be longer than 1000 characters";
  }

  // IMAGE
  else if (!image) {
    errors.image = "An image is required";
  } else if (!RegExpression.test(image)) {
    errors.image = "Image URL does not meet the format requirements";
  }

  // DIETS
  if (!diets || diets.length === 0) {
    errors.diets = "Must choose at least one diet";
  }

  return errors;
};

export default validations;
