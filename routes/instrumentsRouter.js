const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router.get("/:instrumentId", instrumentsController.getInstrumentById);

module.exports = router;
