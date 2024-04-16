const pool  = require("../../database.js");
const bcrypt = require("bcrypt");

const updatepractitioner = async (req, res) => {
  try {
    const id = req.params.id;

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

    let setClause = "";
    let values = [];
    let counter = 1;

    if (name !== undefined) {
      setClause += `name = $${counter},`;
      values.push(name);
      counter++;
    }

    if (email !== undefined) {
      setClause += `email = $${counter},`;
      values.push(email);
      counter++;
    }

    if (password !== undefined) {
      setClause += `password = $${counter},`;
      const hashedPassword = await bcrypt.hash(password, 10);
      values.push(hashedPassword);
      counter++;
    }

    if (specialization !== undefined) {
      setClause += `specialization = $${counter},`;
      values.push(specialization);
      counter++;
    }

    if (license_number !== undefined) {
      setClause += `license_number = $${counter},`;
      values.push(license_number);
      counter++;
    }

    if (phone !== undefined) {
      setClause += `phone = $${counter},`;
      values.push(phone);
      counter++;
    }

    if (address !== undefined) {
      setClause += `address = $${counter},`;
      values.push(address);
      counter++;
    }

    if (city !== undefined) {
      setClause += `city = $${counter},`;
      values.push(city);
      counter++;
    }

    if (state !== undefined) {
      setClause += `state = $${counter},`;
      values.push(state);
      counter++;
    }

    if (country !== undefined) {
      setClause += `country = $${counter},`;
      values.push(country);
      counter++;
    }

    if (postal_code !== undefined) {
      setClause += `postal_code = $${counter},`;
      values.push(postal_code);
      counter++;
    }

    if (bio !== undefined) {
      setClause += `bio = $${counter},`;
      values.push(bio);
      counter++;
    }

    if (setClause !== "") {
      setClause = setClause.slice(0, -1);
    } else {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const sql = `UPDATE practitioners SET ${setClause} WHERE practitioner_id = $${counter}`;
    values.push(id);

    const updatedpractitioner = await pool.query(sql, values);

    if (updatedpractitioner.rowCount === 0) {
      return res.status(404).json({ message: "practitioner not found" });
    }

    res.json({ message: "practitioner updated successfully" });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Error updating practitioner" });
  }
};

module.exports = updatepractitioner;
