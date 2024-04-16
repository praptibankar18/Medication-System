const pool = require("../../database.js");

const getMedicationsByMedicationId = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM medications WHERE medication_id = $1";
    const values = [id];
    const medication = await pool.query(sql, values);

    if (medication.rowCount === 0) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(medication.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching medication" });
  }
};

module.exports = getMedicationsByMedicationId;