const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router.get("/add", instrumentsController.renderAddInstrumentForm);

router.get("/:instrumentId", instrumentsController.getInstrumentById);

router
  .route("/:instrumentId/edit")
  .get(instrumentsController.renderEditInstrumentForm)
  .put(
    instrumentsController.editInstrument,
    instrumentsController.renderEditInstrumentForm
  );

module.exports = router;
