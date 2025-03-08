const db = require("../db/queries");

exports.renderAllInstruments = async (req, res) => {
  const categoryQuery = req.query.category;

  let instruments = {};

  if (!categoryQuery) instruments = await db.getAllInstruments();
  else instruments = await db.getInstrumentsByCategory(categoryQuery);

  res.render("index", { title: "Instruments Inventory", instruments });
};
