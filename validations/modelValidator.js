const { body } = require("express-validator");

exports.validateNewModel = [
  body("modelName")
    .notEmpty()
    .withMessage("Please enter a model name")
    .isLength({ min: 1, max: 50 })
    .withMessage("Model name must be between 1 and 50 characters"),
  body("brand").notEmpty().withMessage("Please select a brand"),
  body("category").notEmpty().withMessage("Please select a category"),
  body("specifications")
    .notEmpty()
    .withMessage("Specifications field can't be empty")
    .isLength({ max: 200 })
    .withMessage("Specifications must be less than 200 characters"),
  body("yearIntroduced")
    .notEmpty()
    .withMessage("Please enter the year when the model was introduced")
    .isInt({ min: 1900, max: 2108 })
    .withMessage("Year must be an integer between 1900 and 2108"),
];
