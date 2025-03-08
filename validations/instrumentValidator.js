const { body } = require("express-validator");

exports.validateInstrumentData = [
  body("newStatus").notEmpty().withMessage("Please select a status"),
  body("newPrice")
    .notEmpty()
    .withMessage("Please enter a price")
    .isFloat({ min: 1 })
    .withMessage("The price must include cents"),
  body("newSpecifications")
    .notEmpty()
    .withMessage("Specifications field can't be empty")
    .isLength({ max: 200 })
    .withMessage("Specifications must be less than 200 characters"),
];
