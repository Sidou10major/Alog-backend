const { register, login, authenticate } = require("../controllers/authController");
const express = require('express');
const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

module.exports  = authRouter 