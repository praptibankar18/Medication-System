const pool = require("../../database.js");

const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM patients WHERE patient_id = $1";
    const values = [id];

    const deletedPatient = await pool.query(sql, values);

    if (deletedPatient.rowCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting patient" });
  }
};

module.exports = deletePatient;
