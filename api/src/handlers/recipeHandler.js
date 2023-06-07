const { Recipe, Diet } = require('../db');
const { getAllRecipes } = require('../controllers/recipeController');

const getRecipeHandler = async (req, res) => {

    try {
        const { name } = req.query;
        let allRecipes = await getAllRecipes();

        if (name) {
            let recipeSearch = allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
            
            if (recipeSearch.length) {
                res.status(200).json(recipeSearch)
            } else {
                res.status(404).json(`No recipe with the name "${name}" exists`)
            };

        } else {
            res.status(200).json(allRecipes);
        };
    } 
    
    catch (error) {
        res.status(404).json(error);
    };
};

const getRecipeIdHandler = async (req, res) => {

    try {
        const { id } = req.params;
        let allRecipes = await getAllRecipes();

        const recipeById = allRecipes.find(recipe => recipe.id.toString() === id);
        
        if (!recipeById) {
            res.status(404).json(`The recipe with the id ${id} does not exist`)
        } else {
            res.status(200).json(recipeById)
        };
    } 
    
    catch (error) {
        res.status(404).json(error);
    }
};

const postRecipeHandler = async (req, res) => {
    
    let {
        name,
        image,
        summary,
        healthScore,
        steps,
    } = req.body;

    try {
        const createRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
        });
            
        if (!name) return res.status(400).json({error: 'Created recipe must contain a name'});
        if (!summary) return res.status(400).json({error: 'Created recipe must contain a summary'});
        // if (healthScore < 0 || healthScore > 100) return res.status(400).json({error:'Health Score must be a value between 0-100'});
        // if (!healthScore) return res.status(400).json({error: 'Created recipe must contain a Health Score'});
        // if (!steps) return res.status(400).json({error: 'Created recipe must contain steps'});

        const findDietDb = await Diet.findAll({
            where: {
                name: req.body.diets
            }
        });
        // sacar el name: de acá?
        createRecipe.addDiet(findDietDb);
        
        res.status(200).json(createRecipe);
    } 
    
    catch (error) {
        res.status(400).json(error);
    };
};

module.exports = { 
    getRecipeHandler, 
    getRecipeIdHandler, 
    postRecipeHandler,
};