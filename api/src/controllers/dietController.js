const axios = require("axios");
const { Diet } = require("../db.js");
const { API_KEY } = process.env;

const getAllDietsApi = async () => {
  const getApiDiets = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`,
  );

  const apiDiets = getApiDiets.data.results.map((name) => name.diets);

  const uniqueDiets = [];
  let id = 1;

  apiDiets.forEach((diets) => {
    diets.forEach((diet) => {
      const exists = uniqueDiets.find((item) => item.name === diet);

      if (!exists) {
        uniqueDiets.push({ id: id++, name: diet });
      }
    });
  });

  uniqueDiets.push({ id: id++, name: "vegetarian" });

  return uniqueDiets;
};

const addDietsDb = async () => {
  const apiDiets = await getAllDietsApi();

  apiDiets.map((diet) => {
    Diet.create({
      id: diet.id,
      name: diet.name,
    });
  });
};

addDietsDb();

const getDietsDb = async () => {
  const dietsOnDb = await Diet.findAll();

  return dietsOnDb;
};

module.exports = { getDietsDb };
