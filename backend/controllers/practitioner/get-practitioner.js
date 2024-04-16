const pool = require('../../database');

const getPractitioner = async (req, res) => {
    try {
        const sql = "SELECT * FROM practitioners";
        const result = await pool.query(sql);
        res.json({ data: result.rows });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching practitioners" });
      }
}



module.exports = getPractitioner;