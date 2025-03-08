const { Router } = require("express");
const instrumentsController = require("../controllers/instrumentsController");

const router = Router();

router.get("/", instrumentsController.getAllInstruments);

module.exports = router;
