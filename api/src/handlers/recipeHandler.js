const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("../controllers/recipeController");
const validations = require("./validations");

const getRecipesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    let allRecipes = await getAllRecipes();

    if (name) {
      const recipeSearch = allRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toString().toLowerCase()),
      );

      if (recipeSearch.length) {
        res.status(200).json(recipeSearch);
      } else {
        res
          .status(404)
          .json({ error: `No recipe with the name "${name}" exists` });
      }
    } else {
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching recipes",
      details: error.message,
    });
  }
};

const getRecipeByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let allRecipes = await getAllRecipes();

    const recipeById = allRecipes.find((recipe) => recipe.id.toString() === id);

    if (!recipeById) {
      res
        .status(404)
        .json({ error: `The recipe with the ID ${id} does not exist` });
    } else {
      res.status(200).json(recipeById);
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the recipe",
      details: error.message,
    });
  }
};

const postRecipeHandler = async (req, res) => {
  let { name, image, summary, healthScore, steps, diets } = req.body;

  const errors = validations(req.body, await Recipe.findAll());

  if (errors) {
    return res.status(400).json(errors);
  }

  try {
    const createRecipe = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
    });

    const findDietDb = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    await createRecipe.addDiet(findDietDb);

    const recipeWithDiets = await Recipe.findOne({
      where: { id: createRecipe.id },
      include: Diet,
    });

    if (!recipeWithDiets) {
      res.status(404).json({ error: "Recipe not found after creation" });
    } else {
      const dietNames = recipeWithDiets.diets.map((diet) => diet.name);
      res.status(200).json({
        ...recipeWithDiets.toJSON(),
        diets: dietNames,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "An error occurred while creating the recipe",
      details: error.message,
    });
  }
};

module.exports = {
  getRecipesHandler,
  getRecipeByIdHandler,
  postRecipeHandler,
};
