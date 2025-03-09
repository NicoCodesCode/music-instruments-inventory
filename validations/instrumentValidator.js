const { body } = require("express-validator");

const validateAdminPassword = [
  body("adminPassword")
    .notEmpty()
    .withMessage("Please enter the admin password")
    .custom((password) =>
      password === process.env.ADMIN_PASSWORD ? true : false
    )
    .withMessage("Wrong admin password"),
];

const validateEditInstrument = [
  body("newStatus").notEmpty().withMessage("Please select a status"),
  body("newPrice")
    .notEmpty()
    .withMessage("Please enter a price")
    .isFloat({ min: 1 })
    .withMessage("The price must include cents and be greater than 1"),
  body("newSpecifications")
    .notEmpty()
    .withMessage("Specifications field can't be empty")
    .isLength({ max: 200 })
    .withMessage("Specifications must be less than 200 characters"),
  validateAdminPassword,
];

const validateNewInstrument = [
  body("model").notEmpty().withMessage("Please select a model"),
  body("status").notEmpty().withMessage("Please select a status"),
  body("price")
    .notEmpty()
    .withMessage("Please enter a price")
    .isFloat({ min: 1 })
    .withMessage("The price must include cents and be greater than 1"),
  validateAdminPassword,
];

module.exports = {
  validateAdminPassword,
  validateEditInstrument,
  validateNewInstrument,
};
