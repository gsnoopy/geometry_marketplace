const Discord = require("discord.js")
const { updateUserSaldo } = require("../../database/edit/updateUserSaldo");
const { getUserById } = require("../../database/read/getUserById");

module.exports = {
  name: "remove_saldo",
  description: "[ADM] Remover saldo de um usuário",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "user",
      description: "Digite o id do user",
      required: true
    },
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "valor",
      description: "Digite o saldo a ser adicionado",
      required: true
  }
],
  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      await interaction.deferReply({ephemeral: true});

      const valorString = interaction.options.getString("valor");
      const valor = Number(valorString.replace(',', '.'));
        
      const userID = interaction.options.getString("user");
      const user = await getUserById(userID);

      const userSaldo = Number(user.saldo);
      const newSaldo = (userSaldo - valor).toFixed(2);
      await updateUserSaldo(userID,newSaldo);

      interaction.editReply({content: `<:CoinsIcon:1201060304365310003> Saldo anterior: R$ **${userSaldo}**\n<:CoinsIcon:1201060304365310003> Saldo novo: R$ **${newSaldo}**`, ephemeral: true});
    
    }
  }
}