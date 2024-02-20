const Discord = require("discord.js")

module.exports = {
  name: "signup",
  description: "[ADM] Embed para cadastro de clientes",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setDescription("Sign Up Embed")
        
      const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("signup")
            .setLabel("Cadastrar-se")
            .setEmoji("<:signUp:1199292028165574767>") 
            .setStyle(Discord.ButtonStyle.Primary),
      );

      interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
      interaction.channel.send({ embeds: [embed], components: [button] });

    }
  }
}