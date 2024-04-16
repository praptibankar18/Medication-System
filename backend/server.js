const express = require("express");
const cors = require("cors");
const pool = require("./database");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isUserAuth = require("./auth");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
const PORT = process.env.PORT;

// ! POST /login - Login practitioners (Login)
app.use("/api/practitioners", require("./routes/login"));

// ! GET /get-practitioners - Get all practitioners (Read)
// ! POST /create-practitioner - Create a practitioners (Create or Register)
// ! POST /edit-practitioner - Create a practitioners (Create or Register)
app.use("/api/practitioners", require("./routes/practitioners_routes"));


// ! GET /get-patients - Get all practitionerss (Read)
// ! GET /get-patient-by-practitioners-id/:practitioners_id (Read)
// ! GET /get-patient-by-patient-id/:patient_id (Read)
// ! POST /create-patient - Create a practitioners (Create or Register)
// ! PUT /update-patient/:id - Update a practitioners (Update)
// ! POST /delete-patient/:id - Simulate DELETE using POST (Delete)

app.use("/api/patients", require("./routes/patient_routes"));


// ! GET /get-medications - Get all medications (Read)
// ! GET /get-medication-by-patient-id/:id - (Read)
// ! GET /get-medication-by-medication-id/:id - (Read)
// ! POST /create-medication - Create a medications (Create or Register)
// ! PUT /update-medication/:id - Update a medications(Update)
// ! POST /delete-medication/:id - Simulate DELETE using POST (Delete)
app.use("/api/medications", require("./routes/medication_routes"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
