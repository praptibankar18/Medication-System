const express = require("express");
const router = express.Router();
const getMedications = require("../controllers/medications/get-Medications");
const getMedicationsByPatientId = require("../controllers/medications/getMedicationsByPatientId");
const getMedicationsByMedicationId = require("../controllers/medications/getMedicationsByMedicationId");
const addMedication = require("../controllers/medications/add-Medication");
const editMedication = require("../controllers/medications/edit-Medication");
const deleteMedication = require("../controllers/medications/delete-Medication");


router.use(express.json());

router.route("/get-medications").get(getMedications);
router.route("/get-medication-by-patient-id/:id").get(getMedicationsByPatientId);
router.route("/get-medication-by-medication-id/:id").get(getMedicationsByMedicationId);
router.route("/create-medication").post(addMedication);
router.route("/update-medication/:id").put(editMedication);
router.route("/delete-medication/:id").post(deleteMedication);

module.exports = router;
