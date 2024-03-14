const Discord = require("discord.js")
const { registerCupom } = require("../../database/create/registerCupom");

module.exports = {
  name: "criar_cupom",
  description: "[ADM] Criar cupom no banco de dados",
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

    await interaction.deferReply({ephemeral: true});

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      const nameString = interaction.options.getString("nome");
      await registerCupom(nameString);

      await interaction.editReply({content: `Cupom **${nameString}** cadastrado`, ephemeral: true});

    }
  }
}