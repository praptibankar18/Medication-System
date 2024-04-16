const pool = require("../../database.js");

const getPatients = async (req, res) => {
  try {
    const sql = "SELECT * FROM patients";
    const patients = await pool.query(sql);
    res.json(patients.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patients" });
  }
};

module.exports = getPatients;
