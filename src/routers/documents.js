const express = require('express');
const { updateDoc, addDoc } = require('../controllers/docController');
const docRouter = express.Router();

docRouter.put('/:id', updateDoc);


docRouter.post('/', addDoc);

module.exports = docRouter ;