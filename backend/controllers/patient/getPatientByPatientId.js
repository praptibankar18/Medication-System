const pool = require("../../database.js");

const getPatientByPatientId = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM patients WHERE patient_id = $1";
    const values = [id];
    const patient = await pool.query(sql, values);

    if (patient.rowCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patient" });
  }
};

module.exports = getPatientByPatientId;
