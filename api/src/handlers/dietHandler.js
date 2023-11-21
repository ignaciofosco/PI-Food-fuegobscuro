const { getDietsDb } = require("../controllers/dietController");

const getDietsHandler = async (req, res) => {
  try {
    const diets = await getDietsDb();

    res.status(200).json(diets);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching diets",
      details: error.message,
    });
  }
};

const getDietByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const allDiets = await getDietsDb();

    const diet = allDiets.find((diet) => diet.id.toString() === id);

    if (!diet) {
      res
        .status(404)
        .json({ error: `The diet with the ID ${id} does not exist` });
    } else {
      res.status(200).json(diet);
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the diet",
      details: error.message,
    });
  }
};

module.exports = {
  getDietsHandler,
  getDietByIdHandler,
};
