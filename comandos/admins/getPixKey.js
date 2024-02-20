const Discord = require("discord.js")
const { getUserById } = require("../../database/read/getUserById");

module.exports = {
  name: "chave",
  description: "[ADM] Buscar a chave pix de um usuário",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "user",
      description: "Digite o id do user",
      required: true
    }
],
  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      await interaction.deferReply();

      const userID = interaction.options.getString("user");
      const user = await getUserById(userID);
      const userName = user.name;
      const userKey = user.pix;

      const embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setTitle('Busca de dados PIX')
        .setDescription(`<:idBadge:1199292190933917696> User: <@${userID}>\n<:Name:1199292094368448572> Nome: **${userName}**\n<:pixKey:1199292080145584191> Chave: **${userKey}**`);

      interaction.editReply({content: `${userKey}`, embeds: [embed] });
    
    }
  }
}