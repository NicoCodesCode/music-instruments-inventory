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
  const instrumentId = Number(req.params.instrumentId);

  try {
    const instrument = await db.getInstrumentDetailsById(instrumentId);
    res.render("instrument", {
      title: instrument.model_name,
      instrument,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.renderEditInstrumentForm = async (req, res, next) => {
  const instrumentId = Number(req.params.instrumentId);
  const instrument = await db.getInstrumentDetailsById(instrumentId);
  res.render("editInstrumentForm", {
    title: `Edit ${instrument.model_name}`,
    instrument,
  });
};

exports.editInstrument = async (req, res, next) => {
  const instrumentId = Number(req.params.instrumentId);
  const newInstrumentData = req.body;
  await db.editInstrument(instrumentId, newInstrumentData);
  res.redirect(`/instruments/${instrumentId}`);
};
