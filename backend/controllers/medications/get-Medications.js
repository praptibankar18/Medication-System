const pool = require("../../database.js");

const getMedications = async (req, res) => {
  try {
    const sql = "SELECT * FROM medications";
    const medications = await pool.query(sql);
    res.json(medications.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching medications" });
  }
};

module.exports = getMedications;