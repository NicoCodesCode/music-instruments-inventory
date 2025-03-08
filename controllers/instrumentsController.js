const db = require("../db/queries");

exports.getAllInstruments = async (req, res, next) => {
  const categoryQuery = req.query.category;

  let instruments = {};

  try {
    if (!categoryQuery) instruments = await db.getAllInstruments();
    else instruments = await db.getInstrumentsByCategory(categoryQuery);
    res.render("index", { title: "Instruments Inventory", instruments });
  } catch (error) {
    next(error);
  }
};

exports.getInstrumentById = async (req, res, next) => {
  const { instrumentId } = req.params;

  try {
    const instrument = await db.getInstrumentDetailsById(Number(instrumentId));
    res.render("instrument", {
      title: instrument.model_name,
      instrument,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
