const Discord = require("discord.js")

const { getCupons } = require("../../database/read/getCupons");

module.exports = {
  name: "cupons",
  description: "[ADM] Listar cupons existentes no banco de dados",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      interaction.deferReply({ephemeral: true})
      const cupons = await getCupons();

      const embed = new Discord.EmbedBuilder()
      .setColor(0x020202)

      if (cupons.length > 0) {

        const cuponsField = {
          name: 'Cupons ativos:',
          value: cupons.map(c => `🔹 **Nome:** ${c.nome} → **Usos:** ${c.usos}`).join('\n'),
        };
        embed.addFields(cuponsField);

      }

    interaction.editReply({embeds: [embed], ephemeral: true})

    }
  }
}