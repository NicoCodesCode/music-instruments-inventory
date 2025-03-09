const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router
  .route("/add")
  .get(instrumentsController.renderAddInstrumentForm)
  .post(
    instrumentsController.addInstrument,
    instrumentsController.renderAddInstrumentForm
  );

router.get("/:instrumentId", instrumentsController.getInstrumentById);

router
  .route("/:instrumentId/edit")
  .get(instrumentsController.renderEditInstrumentForm)
  .put(
    instrumentsController.editInstrument,
    instrumentsController.renderEditInstrumentForm
  );

router
  .route("/:instrumentId/delete")
  .get(instrumentsController.renderDeleteInstrument)
  .delete(
    instrumentsController.deleteInstrument,
    instrumentsController.renderDeleteInstrument
  );

module.exports = router;
