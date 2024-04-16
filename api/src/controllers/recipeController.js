const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const getApiRecipes = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&addRecipeInformation=true&addRecipeInstructions=true`
    );

    const apiRecipes = apiUrl.data.results.map((data) => {
      return {
        id: data.id,
        name: data.title,
        image: data.image,
        summary: data.summary,
        healthScore: data.healthScore,
        steps: data.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
        diets: data.diets?.map((e) => e),
      };
    });
    return apiRecipes;
  } catch (error) {
    console.error('Failed to fetch API recipes', error);
    throw new Error('Failed to fetch API recipes');
  }
};

const getDbRecipes = async () => {
  const dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  const formattedDbRecipes = dbRecipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      steps: recipe.steps,
      createdInDb: recipe.createdInDb,
      diets: recipe.diets.map((diet) => diet.name),
    };
  });

  return formattedDbRecipes;
};

const getAllRecipes = async () => {
  const allApiRecipes = await getApiRecipes();
  const allDbRecipes = await getDbRecipes();
  const allRecipes = allDbRecipes.concat(allApiRecipes);

  return allRecipes;
};

const getApiById = async (id) => {
  return await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?${YOUR_API_KEY}`
  );
};

const getDbById = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getApiRecipes,
  getDbRecipes,
  getAllRecipes,
  getApiById,
  getDbById,
};
