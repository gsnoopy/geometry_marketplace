const { Discord } = require('../imports');
const { getAllUserIds } = require('../database/read/getAllUserIds');
const { deleteUserById } = require('../database/delete/deleteUserById');

async function verifyMembers(client) {

    const idsDatabase = await getAllUserIds()
    const idsServer = [];


    const guild = client.guilds.cache.get('1198133159850680451');
    await guild.members.fetch().then((members) => {
        members.forEach((member) => {
            idsServer.push(member.user.id);
        });
    });


    const missingIds = idsDatabase.filter(id => !idsServer.includes(id));

    for (const missingId of missingIds) {
        console.log(`Deletando usuário com ID ${missingId} do banco de dados...`);
        await deleteUserById(missingId);
        console.log(`Usuário com ID ${missingId} deletado do banco de dados.`);
    }

}

module.exports = {
    verifyMembers,
  };