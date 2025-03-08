const pool = require("./pool");

exports.getAllInstruments = async () => {
  const { rows } = await pool.query(
    "SELECT brands.brand_name, models.model_name FROM brands INNER JOIN models ON brands.brand_id = models.brand_id ORDER BY models.year_introduced DESC"
  );
  return rows;
};
