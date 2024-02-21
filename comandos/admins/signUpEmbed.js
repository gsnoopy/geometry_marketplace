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
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209760048272908318/signUp.png?ex=65e817d7&is=65d5a2d7&hm=5bc2df6811912b0b342c7efcf176a2cfc5c6e3537700e78c581e06cbbe3e9f4f&=&format=webp&quality=lossless&width=1626&height=584")
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