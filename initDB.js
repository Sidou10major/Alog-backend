const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});


con.connect((err) => {
    if(err) throw err;
    console.log("connected to database!");
});


let sql = "create table if not exists user (id integer auto_increment primary key, username varchar(255), password varchar(255) )";
con.query(sql, (err, res, fields) => {
    console.log("table users created");
});


sql = "";

con.end((err) => {
    if(err) throw err;
    console.log("connection to database ended!");
})