const { Router } = require('express');
const { getDietHandler, getDietIdHandler } = require('../handlers/dietHandler')

const router = Router();

router.get('/', getDietHandler);
router.get('/:id', getDietIdHandler);

module.exports = router;