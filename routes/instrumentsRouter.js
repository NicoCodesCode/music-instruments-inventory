const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router.get("/:instrumentId", instrumentsController.getInstrumentById);

router.get(
  "/:instrumentId/edit",
  instrumentsController.renderEditInstrumentForm
);
router.put("/:instrumentId/edit", instrumentsController.editInstrument);

module.exports = router;
