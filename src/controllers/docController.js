const prisma = require("./prismaClient");
const logActivity = require("./logController");

const updateDoc = async (req, res) => {
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

const getDoc = async (req, res) => {
    try {
        const documents = await prisma.document.findMany();
        res.json({ documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve documents' });
    }
}

const addDoc = async (req, res) => {
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
}

module.exports = {
    updateDoc: updateDoc,
    deleteDoc: deleteDoc,
    getDoc: getDoc,
    addDoc: addDoc
}