const { Client, GatewayIntentBits } = require('discord.js');
const { Discord } = require('../imports');

const { createLog } = require('../logs/createLog');

async function verifyPremiums(db, client) {

  try {

    const result = await db.query('SELECT * FROM premiums');

    for (const premiumUser of result.rows) {

      const { user_id, data_registro } = premiumUser;

      const registrationDate = new Date(data_registro);
      const currentDate = new Date();
      const daysSinceRegistration = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24)) + 1;

      if (daysSinceRegistration >= 30) {

        const guildId = process.env.GUILD_ID;  
        const guild = await client.guilds.fetch(guildId);

        if (guild) {
          const memberId = user_id;
          const member = await guild.members.fetch(memberId);

          if (member) {
            const roleIdToRemove = process.env.PREMIUM_ID;
            await member.roles.remove(roleIdToRemove);

            let embed = new Discord.EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription(`<@${user_id}> deixou de ser premium.`)
            .setTimestamp()
  
            await createLog(client, '1204476955060080691', embed);

          }
        }

        await db.query('DELETE FROM premiums WHERE user_id = $1', [user_id]);

      }
    }
  } catch (error) {

    console.error('Erro ao verificar premiums:', error);
  }

}

module.exports = {
  verifyPremiums,
};
