const bcrypt = require("bcrypt");
const pool = require("../../database");

const registerPractitioner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      license_number,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      bio,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO practitioners (name, email, password, specialization, license_number, phone, address, city, state, country, postal_code, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    await pool.query(sql, [
      name,
      email,
      hashedPassword,
      specialization,
      license_number,
      phone,
      address,
      city,
      state,
      country,
      postal_code,
      bio,
    ]);

    res.status(201).json({ message: "practitioner created successfully" });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      // Handle potential duplicate email error
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Error creating practitioner" });
  }
}

module.exports = registerPractitioner;
