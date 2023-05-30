const { getDoctors, getDoctorById, addDoctor, addPatientForDoctor } = require("../controllers/doctorsController");
const { authenticate } = require("../controllers/authController");
const router = require("express").Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", authenticate, addDoctor);
router.post("/:id", authenticate, addPatientForDoctor);

module.exports = router;