const pool = require("../../database.js");

const addPatient = async (req, res) => {
  try {
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

    // Basic validation
    if (!first_name || !last_name || !date_of_birth || !gender || !phone_number || !email || !practitioner_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `
      INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone_number, email, address, city, state, zipcode, country, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
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
    ];

    const newPatient = await pool.query(sql, values);

    res.status(201).json(newPatient.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating patient" });
  }
};

module.exports = addPatient;
