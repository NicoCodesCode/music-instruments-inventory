const { validationResult } = require("express-validator");
const db = require("../db/queries");
const validations = require("../validations/instrumentValidator");

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
  validations.validateEditInstrument,
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

exports.renderAddInstrumentForm = async (req, res, next) => {
  try {
    const models = await db.getAllModels();

    if (req.errors) {
      return res.status(400).render("addInstrumentForm", {
        title: "Add Instrument",
        models,
        errors: req.errors,
      });
    }

    res.render("addInstrumentForm", { title: "Add Instrument", models });
  } catch (error) {
    next(error);
  }
};

exports.addInstrument = [
  validations.validateNewInstrument,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const instrumentData = req.body;

    try {
      await db.addInstrument(instrumentData);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

exports.renderDeleteInstrument = (req, res) => {
  const instrumentId = req.params.instrumentId;

  if (req.errors) {
    return res.status(400).render("deleteInstrument", {
      title: "Delete Instrument",
      instrumentId,
      errors: req.errors,
    });
  }

  res.render("deleteInstrument", {
    title: "Delete Instrument",
    instrumentId,
  });
};

exports.deleteInstrument = [
  validations.validateAdminPassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errors = errors.array();
      return next();
    }

    const instrumentId = Number(req.params.instrumentId);

    try {
      await db.deleteInstrument(instrumentId);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];
