// const prisma = require("./prismaClient");
// const logActivity = require("./logController");


// const getRdv = async (req, res) => {
//     try {
//         const rendezvous = await prisma.rendezvous.findMany();
//         res.json({ rendezvous });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to retrieve rendezvous' });
//     }
// }

// const addRdv = async (req, res) => {
//     try {
//         const { patientId, datetime } = req.body;
//         const rendezvous = await prisma.rendezvous.create({
//             data: { patientId: parseInt(patientId), datetime },
//         });
//         res.status(201).json({ rendezvous });
//         logActivity(`Rendezvous with ID '${rendezvous.id}' created`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create rendezvous' });
//     }
// }

// const updateRdv = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { patientId, datetime } = req.body;
//         const updatedRendezvous = await prisma.rendezvous.update({
//             where: { id: parseInt(id) },
//             data: { patientId: parseInt(patientId), datetime },
//         });
//         res.json({ rendezvous: updatedRendezvous });
//         logActivity(`Rendezvous with ID '${id}' updated`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to update rendezvous' });
//     }
// }

// const deleteRdv = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await prisma.rendezvous.delete({
//             where: { id: parseInt(id) },
//         });
//         res.json({ message: 'Rendezvous deleted successfully' });
//         logActivity(`Rendezvous with ID '${id}' deleted`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to delete rendezvous' });
//     }
// }

// module.exports = {
//     addRdv: addRdv,
//     updateRdv: updateRdv,
//     getRdv: getRdv,
//     deleteRdv: deleteRdv
// }