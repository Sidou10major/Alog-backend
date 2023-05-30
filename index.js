const express = require("express");
const https = require("https");
const fs = require("fs");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
// const authRouter = require("./src/routers/auth");
// const docRouter = require("./src/routers/documents");
// const patientRouter = require("./src/routers/patients");
// const rdvRouter = require("./src/routers/rdv");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});



connection.connect((err) => {
  if(err) throw err;
  console.log("connected to database");
});


connection.query("create table if not exists test (id integer, name varchar(255))", (err, results, fields) => {
  if(err) console.log(err);
  console.log("table creation done");
});

connection.query(`insert into test (id, name) values (1, "islam"), (2, "soufiane")`, (err, results, fields) => {
  if(err) console.log(err);
  console.log("insert done");
});





app.use(express.json());
app.use(cors());

// app.use("/auth", authRouter);
// app.use("/documents", docRouter);
// app.use("/patients", patientRouter);
// app.use("/rendezvous", rdvRouter);
// app.use("/", (req, res) => res.send("hello world"));

app.get("/", (req, res) => {
  connection.query(`select * from test`, (err, results, fields) => {
    if(err) console.log(err);
    console.log("send rows");
    res.json(results);
  });

})

const PORT = 3000;

https.createServer({
  key: fs.readFileSync("private_key.key"),
  cert: fs.readFileSync("certificate.crt")
}, app).listen(PORT, () => {
  console.log(`server is runing at https://localhost:${PORT}`);
});
