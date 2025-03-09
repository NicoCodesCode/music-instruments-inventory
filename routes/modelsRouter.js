const { Router } = require("express");
const modelsController = require("../controllers/modelsController");
const brandsController = require("../controllers/brandsController");
const categoriesController = require("../controllers/categoriesController");

const router = Router();

router
  .route("/add")
  .get(
    brandsController.getAllBrands,
    categoriesController.getAllCategories,
    modelsController.renderNewModelForm
  )
  .post(
    modelsController.addModel,
    brandsController.getAllBrands,
    categoriesController.getAllCategories,
    modelsController.renderNewModelForm
  );

module.exports = router;
