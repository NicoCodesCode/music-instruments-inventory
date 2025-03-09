const pool = require("./pool");

exports.getAllInstruments = async () => {
  const sqlQuery =
    "SELECT instruments.instrument_id, brands.brand_name, models.model_name FROM brands INNER JOIN models ON brands.brand_id = models.brand_id INNER JOIN instruments ON instruments.model_id = models.model_id ORDER BY models.year_introduced DESC";
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

exports.getInstrumentsByCategory = async (category) => {
  const sqlQuery =
    "SELECT instruments.instrument_id, brands.brand_name, models.model_name FROM brands INNER JOIN models ON brands.brand_id = models.brand_id INNER JOIN categories ON models.category_id = categories.category_id INNER JOIN instruments ON instruments.model_id = models.model_id WHERE categories.category_name = $1 ORDER BY models.year_introduced DESC";
  const { rows } = await pool.query(sqlQuery, [category]);
  return rows;
};

exports.getInstrumentDetailsById = async (instrumentId) => {
  const sqlQuery =
    "SELECT instruments.instrument_id, instruments.price, brands.brand_name, brands.country, models.model_name, models.specifications, models.year_introduced, status.status_name FROM instruments INNER JOIN models ON instruments.model_id = models.model_id INNER JOIN brands ON models.brand_id = brands.brand_id INNER JOIN status ON instruments.status_id = status.status_id WHERE instrument_id = $1";
  const { rows } = await pool.query(sqlQuery, [instrumentId]);
  return rows[0];
};

exports.editInstrument = async (instrumentId, newInstrumentData) => {
  console.log(newInstrumentData);
  const updateStatusAndPrice =
    "UPDATE instruments SET status_id = (SELECT status_id FROM status WHERE status_name = $1), price = $2 WHERE instrument_id = $3";

  const updateSpecs =
    "UPDATE models SET specifications = $1 WHERE model_id = (SELECT model_id FROM instruments WHERE instrument_id = $2)";

  await pool.query(updateStatusAndPrice, [
    newInstrumentData.newStatus,
    Number(newInstrumentData.newPrice),
    instrumentId,
  ]);

  await pool.query(updateSpecs, [
    newInstrumentData.newSpecifications,
    instrumentId,
  ]);
};

exports.addInstrument = async (instrumentData) => {
  const sqlQuery = "";
};
