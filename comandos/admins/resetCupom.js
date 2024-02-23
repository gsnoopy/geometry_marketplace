const Discord = require("discord.js")

const { updateCupomToZero } = require("../../database/edit/updateCupomToZero");

module.exports = {
  name: "reset_cupom",
  description: "[ADM] Resetar usos de um cupom no banco de dados",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "nome",
      description: "Digite o nome do cupom",
      required: true
    }
],
  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

        await interaction.deferReply({ephemeral: true});

        const nameString = interaction.options.getString("nome"); 
        await updateCupomToZero(nameString);
      
        interaction.editReply({content: `Cupom **${nameString}** resetado.`, ephemeral: true});

    }
  }
}