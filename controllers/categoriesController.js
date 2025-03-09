const db = require("../db/queries");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    req.categories = categories;
    next();
  } catch (error) {
    next(error);
  }
};
