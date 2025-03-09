const { body } = require("express-validator");

exports.validateEditInstrument = [
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
  body("adminPassword")
    .notEmpty()
    .withMessage("Please enter the admin password")
    .custom((password) =>
      password === process.env.ADMIN_PASSWORD ? true : false
    )
    .withMessage("Wrong admin password"),
];
