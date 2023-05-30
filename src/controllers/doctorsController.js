const con = require("../../connection");

exports.getDoctors = (req, res) => {
    const sql = "select * from doctor";
    con.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.json(result);
        }
    })
}


exports.getDoctorById = (req, res) => {
    const id = req.params.id;

    const sql = "select * from doctor where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            if(result.length === 0) {
                res.status(404).json({ message: "doctor not found"});
            } else {
                res.json(result[0]);
            }
        }
    })
}


exports.addDoctor = (req, res) => {
    const { firstname, lastname, phone, field } = req.body;
    const userId = req.user.id;
    const sql = "insert into doctor (id, firstname, lastname, phone, field) values (?, ?, ?, ?, ?)";
    con.query(sql, [userId, firstname, lastname, phone, field], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.status(201).json({ message: "doctor created successfully"});
        }
    })
}