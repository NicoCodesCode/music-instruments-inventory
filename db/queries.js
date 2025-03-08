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
    "SELECT instruments.instrument_id, brands.brand_name, brands.country, models.model_name, status.status_name, models.specifications, models.year_introduced FROM instruments INNER JOIN models ON instruments.model_id = models.model_id INNER JOIN brands ON models.brand_id = brands.brand_id INNER JOIN status ON instruments.status_id = status.status_id WHERE instrument_id = $1";
  const { rows } = await pool.query(sqlQuery, [instrumentId]);
  return rows[0];
};
