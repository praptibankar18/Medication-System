const pool = require("../../database.js");

const deleteMedication = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM medications WHERE medication_id = $1";
    const values = [id];

    const deletedMedication = await pool.query(sql, values);

    if (deletedMedication.rowCount === 0) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting medication" });
  }
};

module.exports = deleteMedication;
