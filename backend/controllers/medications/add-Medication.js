const pool = require("../../database.js");

const addMedication = async (req, res) => {
  try {
    const {
      patient_id,
      medication_name,
      dosage,
      frequency,
      instructions,
      start_date,
      end_date,
    } = req.body;

    // Basic validation
    if (
      !patient_id ||
      !medication_name ||
      !dosage ||
      !frequency ||
      !start_date
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `
      INSERT INTO medications (patient_id, medication_name, dosage, frequency, instructions, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      patient_id,
      medication_name,
      dosage,
      frequency,
      instructions,
      start_date,
      end_date,
    ];

    const newMedication = await pool.query(sql, values);

    res.status(201).json(newMedication.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating medication" });
  }
};

module.exports = addMedication;
