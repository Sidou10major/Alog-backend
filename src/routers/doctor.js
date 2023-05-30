const { getDoctors, getDoctorById, addDoctor } = require("../controllers/doctorsController");
const { authenticate } = require("../controllers/authController");
const router = require("express").Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", authenticate, addDoctor);

module.exports = router;