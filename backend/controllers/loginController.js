const pool = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM practitioners WHERE email = $1', [email]);
      console.log();
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user.practitioner_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const practitioner_id = user.practitioner_id
      res.json({ token, practitioner_id});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}  

module.exports = loginController;