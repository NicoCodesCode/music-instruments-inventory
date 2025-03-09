const db = require("../db/queries");
const modelValidator = require("../validations/modelValidator");
const { validateAdminPassword } = require("../validations/passwordValidator");
const { validationResult } = require("express-validator");

exports.getAllModels = async (req, res, next) => {
  try {
    const models = await db.getAllModels();
    req.models = models;
    next();
  } catch (error) {
    next(error);
  }
};

exports.renderNewModelForm = (req, res) => {
  const brands = req.brands;
  const categories = req.categories;

  if (req.errors) {
    return res.status(400).render("newModelForm", {
      title: "Add Model",
      brands,
      categories,
      errors: req.errors,
    });
  }

  res.render("newModelForm", { title: "Add Model", brands, categories });
};

exports.addModel = [
  modelValidator.validateNewModel,
  validateAdminPassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const modelData = req.body;

    try {
      await db.addModel(modelData);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];
