const { Router } = require("express");
const {
  getDietsHandler,
  getDietByIdHandler,
} = require("../handlers/dietHandler");

const router = Router();

router.get("/", getDietsHandler);
router.get("/:id", getDietByIdHandler);

module.exports = router;
