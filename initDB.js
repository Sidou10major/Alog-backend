const con = require("./connection");


con.connect((err) => {
    if(err) throw err;
    console.log("connected to database!");
});


let sql = "create table if not exists user (id integer auto_increment primary key, username varchar(255), password varchar(255) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table users created");
});


sql = "create table if not exists patient (id integer primary key, firstname varchar(255), lastname varchar(255), birthday varchar(255), phone varchar(10), foreign key (id) references user(id) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table patient created");
});


sql = "create table if not exists doctor (id integer primary key, firstname varchar(255), lastname varchar(255), phone varchar(10), field varchar(255), foreign key (id) references user(id) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table doctor created");
});


sql = "create table if not exists document (id integer auto_increment primary key, content text, patient_id integer, foreign key (patient_id) references patient(id) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table document created");
});

sql = "create table if not exists doctor_patient ( patient_id integer, doctor_id integer, foreign key (patient_id) references patient(id), foreign key (doctor_id) references doctor(id) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table doctor_patient created");
});


sql = "create table if not exists rendezvous (id integer auto_increment primary key, patient_id integer, doctor_id integer, date varchar(255), foreign key (patient_id) references patient(id), foreign key (doctor_id) references doctor(id) )";
con.query(sql, (err, res, fields) => {
    if(err) console.log(err);
    console.log("table rendezvous created");
});

con.end((err) => {
    if(err) throw err;
    console.log("connection to database ended!");
})