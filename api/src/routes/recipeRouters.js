const { Router } = require("express");
const {
  getRecipesHandler,
  getRecipeByIdHandler,
  postRecipeHandler,
} = require("../handlers/recipeHandler");

const router = Router();

router.get("/", getRecipesHandler);
router.get("/:id", getRecipeByIdHandler);
router.post("/create", postRecipeHandler);

module.exports = router;
