const express = require('express');
const { getPatient, addPatient, updatePatient, deletePatient } = require('../controllers/patientsController');
const patientRouter = express.Router();


patientRouter.get('/', getPatient);

patientRouter.post('/', addPatient);

patientRouter.put('/:id', updatePatient);

patientRouter.delete('/:id', deletePatient);


module.exports = patientRouter; 