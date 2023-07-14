const validation = ({ name, summary, healthScore, steps, image, diets }, recipes) => {
    let error = {};
  
    const RegExpression = /^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/;
    const nameSearch = (name) => recipes.filter((recipe) => recipe.name === name);
  
    // NAME
    if (!name) {
      error.name = "A name is required";
    } else if (nameSearch(name).length > 0) {
      error.name = "A recipe with that name already exists";
    } else if (name.length > 50) {
      error.name = "The name can't be longer than 50 characters";
    }
  
    // SUMMARY
    else if (!summary) {
      error.summary = "A summary is required";
    } else if (summary.length < 50) {
      error.summary = "The summary can't be shorter than 50 characters";
    } else if (summary.length > 1500) {
      error.summary = "The summary can't be longer than 1500 characters";
    }
  
    // HEALTH SCORE
    else if (!healthScore) {
      error.healthScore = "A health score is required";
    } else if (healthScore.length > 3) {
      error.healthScore = "The health score can't be longer than 3 characters";
    } else if (healthScore <= 0) {
      error.healthScore = "Health score can't be less than or equal to 0";
    } else if (healthScore > 100) {
      error.healthScore = "Health score can't be greater than 100";
    } else if (healthScore.startsWith("0")) {
      error.healthScore = "Health score can't start with 0";
    }
  
    // STEPS
    else if (!steps) {
      error.steps = "Instruction steps are required";
    } else if (steps.length < 50) {
      error.steps = "Instruction steps can't be less than 50 characters";
    } else if (steps.length > 1500) {
      error.steps = "Instruction steps can't be longer than 1500 characters";
    }
  
    // IMAGE
    else if (!image) {
      error.image = "An image is required";
    } else if (!RegExpression.test(image)) {
      error.image = "Image URL does not meet the requirements (JPG, JPEG, GIF, PNG, BMP)";
    }
  
    // DIETS
    else if (!diets.length) {
      error.diets = "Must choose at least one diet";
    }
  
    return error;
  };
  
  export default validation;  