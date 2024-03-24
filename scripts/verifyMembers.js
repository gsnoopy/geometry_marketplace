const { Discord } = require('../imports');
const { getAllUserIds } = require('../database/read/getAllUserIds');

async function verifyMembers(client) {

    const idsDatabase = await getAllUserIds()
    const idsServer = [];


    const guild = client.guilds.cache.get('1198133159850680451');
    await guild.members.fetch().then((members) => {
        members.forEach((member) => {
            memberIds.push(member.user.id);
        });
    });

    console.log(idsDatabase)
    console.log(idsServer);

}

module.exports = {
    verifyMembers,
  };