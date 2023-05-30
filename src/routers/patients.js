const express = require('express');
const { authenticate } = require("../controllers/authController");
const { getPatients, addPatient, updatePatient, deletePatient, getPatientById } = require('../controllers/patientsController');
const { getDocsOfPatient } = require("../controllers/docController");
const patientRouter = express.Router();


patientRouter.get('/', getPatients);
patientRouter.get('/:id', authenticate, getPatientById);
patientRouter.get('/:id/documents', authenticate, getDocsOfPatient);

patientRouter.post('/', authenticate, addPatient);

// patientRouter.put('/:id', updatePatient);

// patientRouter.delete('/:id', deletePatient);


module.exports = patientRouter; 