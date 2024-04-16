const express = require("express");
const router = express.Router();
const getPatients = require("../controllers/patient/getPatients");
const getPatientByPatientId = require("../controllers/patient/getPatientByPatientId");
const createPatient = require("../controllers/patient/add-Patient");
const deletePatient = require("../controllers/patient/delete-Patient");
const getPatientByPractitionerId = require("../controllers/patient/getPatientByPractitionerId");
const editPatient = require("../controllers/patient/editPatient");

router.use(express.json());

router.route("/get-patients").get(getPatients);
router.route("/get-patient-by-practitioners-id/:id").get(getPatientByPractitionerId);
router.route("/get-patient-by-patient-id/:id").get(getPatientByPatientId);
router.route("/create-patient").post(createPatient);
router.route("/update-patient/:id").put(editPatient);
router.route("/delete-patient/:id").post(deletePatient);

module.exports = router;
