const pool = require("../../database.js");

const editMedication = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      patient_id,
      medication_name,
      dosage,
      frequency,
      instructions,
      start_date,
      end_date,
    } = req.body;

    let setClause = [];
    let values = [];
    let counter = 1;

    if (patient_id !== undefined && patient_id !== "") {
      setClause.push(`patient_id = $${counter}`);
      values.push(patient_id);
      counter++;
    }

    if (medication_name !== undefined && medication_name !== "") {
      setClause.push(`medication_name = $${counter}`);
      values.push(medication_name);
      counter++;
    }

    if (dosage !== undefined && dosage !== "") {
      setClause.push(`dosage = $${counter}`);
      values.push(dosage);
      counter++;
    }

    if (frequency !== undefined && frequency !== "") {
      setClause.push(`frequency = $${counter}`);
      values.push(frequency);
      counter++;
    }

    if (instructions !== undefined && instructions !== "") {
      setClause.push(`instructions = $${counter}`);
      values.push(instructions);
      counter++;
    }

    if (start_date !== undefined && start_date !== "") {
      setClause.push(`start_date = $${counter}`);
      values.push(start_date);
      counter++;
    }

    if (end_date !== undefined && end_date !== "") {
      setClause.push(`end_date = $${counter}`);
      values.push(end_date);
      counter++;
    }

    if (setClause.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const setClauseString = setClause.join(", ");
    const sql = `UPDATE medications SET ${setClauseString} WHERE medication_id = $${counter}`;
    values.push(id);

    const updatedMedication = await pool.query(sql, values);

    if (updatedMedication.rowCount === 0) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating medication" });
  }
};

module.exports = editMedication;
