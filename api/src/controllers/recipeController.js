const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const getApiRecipes = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

    const apiRecipes = await apiUrl.data.results.map(data => {     
        return {
            id: data.id,
            name: data.title,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            steps: data.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }}),
            diets: data.diets?.map(e => e),
        }       
    });
     
    return apiRecipes;
};

const getDbRecipes = async () => {
    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }, 
        }
    });

    return dbRecipes;
};

const getAllRecipes = async () => {
    const allApiRecipes = await getApiRecipes();
    const allDbRecipes = await getDbRecipes();
    const allRecipes = allDbRecipes.concat(allApiRecipes);
    
    return allRecipes;
 };

 const getApiById = async (id) => {
    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${YOUR_API_KEY}`);
 };

 const getDbById = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
 };

 module.exports = {
    getApiRecipes,
    getDbRecipes,
    getAllRecipes,
    getApiById,
    getDbById,
 };