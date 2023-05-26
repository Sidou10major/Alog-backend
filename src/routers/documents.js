const express = require('express');
const { updateDoc, deleteDoc, getDoc, addDoc } = require('../controllers/docController');
const docRouter = express.Router();

docRouter.put('/:id', updateDoc);

docRouter.delete('/:id', deleteDoc);

docRouter.get('/', getDoc);

docRouter.post('/', addDoc);

module.exports = docRouter ;