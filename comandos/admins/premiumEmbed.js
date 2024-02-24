const Discord = require("discord.js")

module.exports = {
  name: "premium",
  description: "[ADM] Embed de assinatura premium",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209760049065496606/bePremium.png?ex=65e817d7&is=65d5a2d7&hm=e0f075b19606d6cede2d4c8dcec07fdd9c957fcf15ea44eb344a0a5f5df62a08&=&format=webp&quality=lossless&width=1626&height=574")
        .setDescription("Premium Embed")
        
      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("bePremium")
          .setLabel("Seja Premium")
          .setEmoji("<:userPremium:1199982425141424128>") 
          .setStyle(Discord.ButtonStyle.Primary),
      );

      interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
      interaction.channel.send({ embeds: [embed], components: [button] });

    }
  }
}