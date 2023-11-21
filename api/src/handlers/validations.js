const validations = (
  { name, summary, healthScore, steps, image, diets },
  recipe,
) => {
  const errors = {};
  const RegExpression = /^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/;
  const nameSearch = (name) => recipe.filter((r) => r.name === name);

  // NAME
  if (!name) {
    errors.name = "Created recipe must contain a name";
  } else if (nameSearch(name).length > 0) {
    errors.name = "A recipe with that name already exists";
  } else if (name.length > 50) {
    errors.name = "The name can't be longer than 50 characters";
  }

  // SUMMARY
  if (!summary) {
    errors.summary = "Created recipe must contain a summary";
  } else if (summary.length > 1000) {
    errors.summary = "The summary can't be longer than 1000 characters";
  }

  // HEALTH SCORE
  if (!healthScore) {
    errors.healthScore = "Created recipe must contain a Health Score";
  } else if (healthScore <= 0) {
    errors.healthScore = "Health Score can't be less than or equal to 0";
  } else if (healthScore > 100) {
    errors.healthScore = "Health score can't be greater than 100";
  } else if (healthScore.toString().startsWith("0")) {
    errors.healthScore = "Health Score can't start with 0";
  }

  // STEPS
  if (!steps) {
    errors.steps = "Created recipe must contain instruction steps";
  } else if (steps.length > 1000) {
    errors.steps = "Instruction steps can't be longer than 1000 characters";
  }

  // IMAGE
  if (!image) {
    errors.image = "Created recipe must contain an image";
  } else if (!RegExpression.test(image)) {
    errors.image = "Image URL does not meet the format requirements";
  }

  // DIETS
  if (!diets || diets.length === 0) {
    errors.diets = "Must choose at least one diet";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

module.exports = validations;
