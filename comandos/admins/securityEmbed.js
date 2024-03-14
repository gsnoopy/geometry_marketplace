const Discord = require("discord.js")

module.exports = {
  name: "security",
  description: "[ADM] Embed de medidas de segurança",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209913846295437322/security.png?ex=65e8a714&is=65d63214&hm=5c01099a760aa2b296517ccd89310ae46ad3b56ca3e4808ef64359bc8be2dca9&=&format=webp&quality=lossless&width=1626&height=574")
        .setDescription("Security Embed")

        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setLabel('Segurança e uso')
            .setURL(`https://drive.google.com/file/d/1enklfIVOfHpSA65V_mHF66dK3MX3Njy_/view?usp=sharing`)
            .setStyle(Discord.ButtonStyle.Link),
          new Discord.ButtonBuilder()
            .setLabel('Termos de uso')
            .setURL(`https://drive.google.com/file/d/1D0jZ5yAKUXAjigyMPn8KpHZbzWzIkidi/view?usp=sharing`)
            .setStyle(Discord.ButtonStyle.Link),
      );
        
      interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
      interaction.channel.send({ embeds: [embed], components: [button]});

    }
  }
}