const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./src/routers/auth');
const docRouter = require('./src/routers/documents');
const patientRouter = require('./src/routers/patients');
const rdvRouter = require('./src/routers/rdv');


app.use(express.json());
app.use(cors());

app.use('/', () => "<p>hello</p>" );
app.use('/auth', authRouter);
app.use('/documents',docRouter);
app.use('/patients',patientRouter);
app.use('/rendezvous',rdvRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
