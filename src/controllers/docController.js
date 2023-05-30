const prisma = require("./prismaClient");
const logActivity = require("./logController");
const con = require("../../connection");

const updateDoc = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const { title, content } = req.body;
    //     const updatedDocument = await prisma.document.update({
    //         where: { id: Number(id) },
    //         data: { title, content },
    //     });
    //     res.json({ document: updatedDocument });
    //     logActivity(`Document '${title}' updated`);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to update document' });
    // }
    const documentId = req.params.id;
    const { content } = req.body;

    const sql = "update document set content = ? where id = ?";
    con.query(sql, [content, documentId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.json({ messgae: "document updated successfully" });
        }
    });
}

const deleteDoc = async (req, res) => {
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
}

const getDocsOfPatient = async (req, res) => {
    // try {
    //     const documents = await prisma.document.findMany();
    //     res.json({ documents });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to retrieve documents' });
    // }
    const patientId = req.params.id;
    const sql = "select * from document where patient_id = ?";
    con.query(sql, [patientId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.json(result);
        }
    });
}

const addDoc = async (req, res) => {
    // try {
    //     const { title, content } = req.body;
    //     const document = await prisma.document.create({
    //         data: { title, content },
    //     });
    //     res.status(201).json({ document });
    //     logActivity(`Document '${title}' created`);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to create document' });
    // }

    const { content, patientId } = req.body;
    const sql = "insert into document (content, patient_id) values (?, ?)";
    con.query(sql, [content, patientId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ message: "internal error" });
        } else {
            res.status(201).json({ message: "document created succussfully"});
        }
    });
}

module.exports = {
    addDoc,
    getDocsOfPatient,
    updateDoc,
    deleteDoc
}