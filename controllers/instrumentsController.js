const db = require("../db/queries");

exports.renderAllInstruments = async (req, res) => {
  const instruments = await db.getAllInstruments();
  res.render("index", { title: "Instruments", instruments });
};
