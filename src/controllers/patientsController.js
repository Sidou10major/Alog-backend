const prisma = require("./prismaClient");
const logActivity = require("./logController");


const getPatient = async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        res.json({ patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
}

const addPatient = async (req, res) => {
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


module.exports = {
    addPatient : addPatient ,
    updatePatient : updatePatient , 
    deletePatient : deletePatient , 
    getPatient : getPatient 
}