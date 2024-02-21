const Discord = require("discord.js")

module.exports = {
  name: "support",
  description: "[ADM] Embed de ticket de suporte",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209760048750796850/support.png?ex=65e817d7&is=65d5a2d7&hm=716745205417e06b5a5ae5761befe53ac031c810599f7226a757a1921c4f90bc&=&format=webp&quality=lossless&width=1626&height=574")
        .setDescription("Support Embed")
        
      const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("ticket")
            .setLabel("Abrir suporte")
            .setEmoji("<:signUp:1199292028165574767>") 
            .setStyle(Discord.ButtonStyle.Primary),
      );

      interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
      interaction.channel.send({ embeds: [embed], components: [button] });

    }
  }
}