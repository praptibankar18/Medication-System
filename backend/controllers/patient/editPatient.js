const pool = require("../../database.js");

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      phone_number,
      email,
      address,
      city,
      state,
      zipcode,
      country,
      practitioner_id,
    } = req.body;

    let setClause = [];
    let values = [];
    let counter = 1;

    if (first_name !== undefined && first_name !== "") {
      setClause.push(`first_name = $${counter}`);
      values.push(first_name);
      counter++;
    }

    if (last_name !== undefined && last_name !== "") {
      setClause.push(`last_name = $${counter}`);
      values.push(last_name);
      counter++;
    }

    if (date_of_birth !== undefined && date_of_birth !== "") {
      setClause.push(`date_of_birth = $${counter}`);
      values.push(date_of_birth);
      counter++;
    }

    if (gender !== undefined && gender !== "") {
      setClause.push(`gender = $${counter}`);
      values.push(gender);
      counter++;
    }

    if (phone_number !== undefined && phone_number !== "") {
      setClause.push(`phone_number = $${counter}`);
      values.push(phone_number);
      counter++;
    }

    if (email !== undefined && email !== "") {
      setClause.push(`email = $${counter}`);
      values.push(email);
      counter++;
    }

    if (address !== undefined && address !== "") {
      setClause.push(`address = $${counter}`);
      values.push(address);
      counter++;
    }

    if (city !== undefined && city !== "") {
      setClause.push(`city = $${counter}`);
      values.push(city);
      counter++;
    }

    if (state !== undefined && state !== "") {
      setClause.push(`state = $${counter}`);
      values.push(state);
      counter++;
    }

    if (zipcode !== undefined && zipcode !== "") {
      setClause.push(`zipcode = $${counter}`);
      values.push(zipcode);
      counter++;
    }

    if (country !== undefined && country !== "") {
      setClause.push(`country = $${counter}`);
      values.push(country);
      counter++;
    }

    if (practitioner_id !== undefined && practitioner_id !== "") {
      setClause.push(`practitioner_id = $${counter}`);
      values.push(practitioner_id);
      counter++;
    }

    if (setClause.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const setClauseString = setClause.join(", ");
    const sql = `UPDATE patients SET ${setClauseString} WHERE patient_id = $${counter}`;
    values.push(id);

    const updatedPatient = await pool.query(sql, values);

    if (updatedPatient.rowCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error updating patient" });
  }
};

module.exports = edit;
