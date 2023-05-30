const express = require('express');
const { authenticate } = require("../controllers/authController");
const { getPatients, addPatient, updatePatient, deletePatient, getPatientById } = require('../controllers/patientsController');
const patientRouter = express.Router();


patientRouter.get('/', getPatients);
patientRouter.get('/:id', getPatientById);

patientRouter.post('/', authenticate, addPatient);

// patientRouter.put('/:id', updatePatient);

// patientRouter.delete('/:id', deletePatient);


module.exports = patientRouter; 