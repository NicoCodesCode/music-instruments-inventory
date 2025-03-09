const { validationResult } = require("express-validator");
const db = require("../db/queries");
const {
  validateInstrumentData,
} = require("../validations/instrumentValidator");

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

  try {
    const instrument = await db.getInstrumentDetailsById(instrumentId);

    if (req.errors) {
      return res.status(400).render("editInstrumentForm", {
        title: `Edit ${instrument.model_name}`,
        instrument,
        errors: req.errors,
      });
    }

    res.render("editInstrumentForm", {
      title: `Edit ${instrument.model_name}`,
      instrument,
    });
  } catch (error) {
    next(error);
  }
};

exports.editInstrument = [
  validateInstrumentData,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const instrumentId = Number(req.params.instrumentId);
    const newInstrumentData = req.body;

    try {
      await db.editInstrument(instrumentId, newInstrumentData);
      res.redirect(`/instruments/${instrumentId}`);
    } catch (error) {
      next(error);
    }
  },
];

exports.renderAddInstrumentForm = async (req, res) => {
  const models = await db.getAllModels();
  res.render("addInstrumentForm", { title: "Add Instrument", models });
};

exports.addInstrument = async (req, res) => {
  const instrumentData = req.body;
  console.log(instrumentData);
  await db.addInstrument(instrumentData);
  res.redirect("/");
};
