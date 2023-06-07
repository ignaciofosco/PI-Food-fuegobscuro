const { Router } = require('express');
const { getRecipeHandler, getRecipeIdHandler, postRecipeHandler } = require('../handlers/recipeHandler');

const router = Router();

router.get('/', getRecipeHandler);
router.get('/:id', getRecipeIdHandler);
router.post('/', postRecipeHandler);

module.exports = router;