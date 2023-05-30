const prisma = require("./prismaClient");
const logActivity = require("./logController");
const con = require("../../connection");


const getPatients = async (req, res) => {
    // try {
    //     const patients = await prisma.patient.findMany();
    //     res.json({ patients });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to retrieve patients' });
    // }
    const sql = "select * from patient";
    con.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.json(result);
        }
    })
}

const addPatient = async (req, res) => {
    // try {
    //     const { name, age, email } = req.body;
    //     const patient = await prisma.patient.create({
    //         data: { name, age, email },
    //     });
    //     res.status(201).json({ patient });
    //     logActivity(`Patient '${name}' created`);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to create patient' });
    // }
    const { firstname, lastname, birthday, phone } = req.body;
    const userId = req.user.id;

    const sql = "insert into patient (id, firstname, lastname, birthday, phone) values (?, ?, ?, ?, ?)";
    con.query(sql, [userId, firstname, lastname, birthday, phone], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.status(201).json({ message: "patient created successfully"});
        }
    })
}

const deletePatient = async (req, res) => {
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
}

const updatePatient = async (req, res) => {
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
}


const getPatientById = (req, res) => {
    const id = req.params.id;

    const sql = "select * from patient where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            if(result.length === 0) {
                res.status(404).json({ message: "user not found"});
            } else {
                res.json(result[0]);
            }
        }
    })
}


module.exports = {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
}