const pool = require("../../database.js");

const getPatientByPractitionerId = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM patients WHERE practitioner_id = $1";
    const values = [id];
    const patient = await pool.query(sql, values);

    // console.log(patient);

    if (patient.rowCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patient" });
  }
};

module.exports = getPatientByPractitionerId;


