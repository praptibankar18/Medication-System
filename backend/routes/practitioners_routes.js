const express = require("express");
const router = express.Router();
const getPractitioner = require("../controllers/practitioner/get-practitioner");
const registerPractitioner = require("../controllers/practitioner/register-practitioner");
const updatePractitioner = require("../controllers/practitioner/updateDoctor");



router.use(express.json());


router.route("/get-practitioner").get(getPractitioner);
router.route("/create-practitioner").post(registerPractitioner);
router.route("/edit-practitioner/:id").put(updatePractitioner);

module.exports = router;
