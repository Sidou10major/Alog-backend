const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const authRouter = require("./src/routers/auth");
// const docRouter = require("./src/routers/documents");
const patientRouter = require("./src/routers/patients");
// const rdvRouter = require("./src/routers/rdv");

const connection = require("./connection")



connection.connect((err) => {
  if(err) throw err;
  console.log("connected to database");
});


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('common', { stream: accessLogStream }))





app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
// app.use("/documents", docRouter);
app.use("/patients", patientRouter);
// app.use("/rendezvous", rdvRouter);

app.get("/", (req, res) => {
  res.send("hello world");
})

const PORT = 3000;

https.createServer({
  key: fs.readFileSync("private_key.key"),
  cert: fs.readFileSync("certificate.crt")
}, app).listen(PORT, () => {
  console.log(`server is runing at https://localhost:${PORT}`);
});
