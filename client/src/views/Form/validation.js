const validation = ({ name, summary, healthScore, steps, image, diets }, recipe) => {
    let error = {};
    let RegExpression = /^https?:\/\/.*\.(jpeg|jpg|gif|png|bmp)$/
   
    const nameSearch = (name) => recipe.filter(r => r.name === name);

    //NAME
    if (!name) {
        error.name = "A name is required"
    }
    
    if (nameSearch(name).length > 0) {
        error.name = "A recipe with that name already exists"
    }

    if (name.length > 50) {
        error.name = "The name can't be longer than 50 characters"
    }

    //SUMMARY
    if (!summary) {
        error.summary = "A summary is required"
    }

    if (summary.length < 50) {
        error.summary = "The summary can't be shorter than 50 characters"
    }

    if (summary.length > 1500) {
        error.summary = "The summary can't be longer than 1500 characters"
    }

    //HEALTH SCORE
    if (!healthScore) {
        error.healthScore = "A health score is required"
    }

    if (healthScore.length > 3) {
        error.healthScore = "The health score can't be longer than 3 characters"
    }

    if (healthScore <= 0) {
        error.healthScore = "Health score can't be less than or equal to 0"
    }
    
    if (healthScore > 100) {
        error.healthScore = "Health score can't be greater than 100"
    }

    if (healthScore.startsWith("0")) {
        error.healthScore = "Health score can't start with 0";
    }

    //STEPS
    if (!steps) {
        error.steps = "Instruction steps are required"
    }

    if (steps.length < 50) {
        error.steps = "Instruction steps can't be less than 50 characters"
    }

    if (steps.length > 1500) {
        error.steps = "Instruction steps can't be longer than 1500 characters"
    }

    //IMAGE
    if (!image) {
        error.image = "An image is required"
    }

    if (!RegExpression.test(image)) {
        error.image = "Image URL does not meet the requirements (JPG, JPEG, GIF, PNG, BMP)"
    }

    //DIETS
    if (!diets.length) {
        error.diets = "Must choose at least one diet"
    }
    
    return error
};

export default validation;