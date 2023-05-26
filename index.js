const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const crypto = require('crypto');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Encrypt function using AES
const encrypt = (text, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Decrypt function using AES
const decrypt = (encryptedText, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Log activity function
const logActivity = (activity) => {
  const logEntry = `${new Date().toISOString()} - ${activity}\n`;
  fs.appendFile('activity.log', logEntry, (err) => {
    if (err) {
      console.error('Failed to log activity:', err);
    }
  });
};

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password)
   const hashedPassword = await bcrypt.hash(password, 5);
    await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
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
});

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

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

app.post('/documents', async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = await prisma.document.create({
      data: { title, content },
    });
    res.status(201).json({ document });
    logActivity(`Document '${title}' created`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create document' });
  }
});

app.put('/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedDocument = await prisma.document.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json({ document: updatedDocument });
    logActivity(`Document '${title}' updated`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update document' });
  }
});

app.delete('/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Document deleted successfully' });
    logActivity(`Document with ID '${id}' deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

app.get('/documents', async (req, res) => {
  try {
    const documents = await prisma.document.findMany();
    res.json({ documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
});

app.post('/patients', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const patient = await prisma.patient.create({
      data: { name, age, email },
    });
    res.status(201).json({ patient });
    logActivity(`Patient '${name}' created`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

app.put('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: { name, age, email },
    });
    res.json({ patient: updatedPatient });
    logActivity(`Patient with ID '${id}' updated`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

app.delete('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.patient.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Patient deleted successfully' });
    logActivity(`Patient with ID '${id}' deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

app.get('/rendezvous', async (req, res) => {
  try {
    const rendezvous = await prisma.rendezvous.findMany();
    res.json({ rendezvous });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve rendezvous' });
  }
});

app.post('/rendezvous', async (req, res) => {
  try {
    const { patientId, datetime } = req.body;
    const rendezvous = await prisma.rendezvous.create({
      data: { patientId: parseInt(patientId), datetime },
    });
    res.status(201).json({ rendezvous });
    logActivity(`Rendezvous with ID '${rendezvous.id}' created`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create rendezvous' });
  }
});

app.put('/rendezvous/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, datetime } = req.body;
    const updatedRendezvous = await prisma.rendezvous.update({
      where: { id: parseInt(id) },
      data: { patientId: parseInt(patientId), datetime },
    });
    res.json({ rendezvous: updatedRendezvous });
    logActivity(`Rendezvous with ID '${id}' updated`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update rendezvous' });
  }
});

app.delete('/rendezvous/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rendezvous.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Rendezvous deleted successfully' });
    logActivity(`Rendezvous with ID '${id}' deleted`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete rendezvous' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
