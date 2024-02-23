const Discord = require("discord.js")
const { deleteCupomByName } = require("../../database/delete/deleteCupomByName");

module.exports = {
  name: "deletar_cupom",
  description: "[ADM] Deletar cupom no banco de dados",
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

      try{

        await interaction.deferReply({ephemeral: true});

        const nameString = interaction.options.getString("nome");
        await deleteCupomByName(nameString);
  
        interaction.editReply({content: `Cupom **${nameString}** deletado.`, ephemeral: true});

      }catch(error){

        interaction.editReply({content: `Cupom não existe no banco de dados`, ephemeral: true})

    }

    }
  }
}