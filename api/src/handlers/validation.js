const validation = (
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
  } else if (healthScore.toString().length > 3) {
    errors.healthScore = "The health score can't be longer than 3 characters";
  } else if (healthScore <= 0) {
    errors.healthScore = "Health score can't be less than or equal to 0";
  } else if (healthScore > 100) {
    errors.healthScore = "Health score can't be greater than 100";
  } else if (healthScore.toString().startsWith("0")) {
    errors.healthScore = "Health score can't start with 0";
  }

  // STEPS
  if (!steps) {
    errors.steps = "Created recipe must contain instruction steps";
  } else if (steps.length < 50) {
    errors.steps = "Instruction steps can't be less than 50 characters";
  } else if (steps.length > 1500) {
    errors.steps = "Instruction steps can't be longer than 1500 characters";
  }

  // IMAGE
  if (!image) {
    errors.image = "Created recipe must contain an image";
  } else if (!RegExpression.test(image)) {
    errors.image =
      "Image URL does not meet the requirements (JPG, JPEG, GIF, PNG, BMP)";
  }

  // DIETS
  if (!diets || diets.length === 0) {
    errors.diets = "Must choose at least one diet";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  return null;
};

module.exports = validation;
