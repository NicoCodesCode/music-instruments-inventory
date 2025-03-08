const pool = require("./pool");

exports.getAllInstruments = async () => {
  const sqlQuery =
    "SELECT brands.brand_name, models.model_name FROM brands INNER JOIN models ON brands.brand_id = models.brand_id ORDER BY models.year_introduced DESC";
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

exports.getInstrumentsByCategory = async (category) => {
  const sqlQuery =
    "SELECT brands.brand_name, models.model_name FROM brands INNER JOIN models ON brands.brand_id = models.brand_id INNER JOIN categories ON models.category_id = categories.category_id WHERE categories.category_name = $1 ORDER BY models.year_introduced DESC";
  const { rows } = await pool.query(sqlQuery, [category]);
  return rows;
};
