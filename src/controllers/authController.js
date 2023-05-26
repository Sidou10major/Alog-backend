const prisma = require("./prismaClient");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)
        const hashedPassword = await bcrypt.hash(password, 5);
        await prisma.user.create({
            data: { username, password: hashedPassword },
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'secretKey'); // Replace 'secretKey' with your own secret key
        res.json({ token });
        logActivity(`User '${username}' logged in`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

  
const authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with your own secret key
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };


  module.exports = {
    register : register , 
    login : login ,
    authenticate : authenticate
  }