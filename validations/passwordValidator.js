const { body } = require("express-validator");

exports.validateAdminPassword = [
  body("adminPassword")
    .notEmpty()
    .withMessage("Please enter the admin password")
    .custom((password) =>
      password === process.env.ADMIN_PASSWORD ? true : false
    )
    .withMessage("Wrong admin password"),
];
