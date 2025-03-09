const db = require("../db/queries");

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await db.getAllBrands();
    req.brands = brands;
    next();
  } catch (error) {
    next(error);
  }
};
