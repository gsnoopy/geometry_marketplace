const Discord = require("discord.js")

module.exports = {
  name: "painel",
  description: "[ADM] Embed de interface do usuário",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

      let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209911425628119140/userInterface.png?ex=65e8a4d2&is=65d62fd2&hm=8911cec0080b4759cabf165763336096ba4733637e8b58e278a51219a470caff&=&format=webp&quality=lossless&width=1626&height=574")
        .setDescription("Interface Embed")
        
      const row1 = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("comprarSaldo")
            .setLabel("Adicionar Saldo")
            .setEmoji("<:AdSaldo:1199292256742539385>") 
            .setStyle(Discord.ButtonStyle.Primary),

          new Discord.ButtonBuilder()
            .setCustomId("sacarSaldo")
            .setLabel("Sacar Saldo")
            .setEmoji("<:RetirarSaldo:1199292054820368504>") 
            .setStyle(Discord.ButtonStyle.Primary),
        );

      const row2 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("seeProfile")
          .setLabel("Ver Perfil")
          .setEmoji("<:seeProfile:1199292041130156104>") 
          .setStyle(Discord.ButtonStyle.Primary),

        new Discord.ButtonBuilder()
          .setCustomId("bePremium")
          .setLabel("Seja Premium")
          .setEmoji("<:userPremium:1199982425141424128>") 
          .setStyle(Discord.ButtonStyle.Primary),
      );

      interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
      interaction.channel.send({ embeds: [embed], components: [row1,row2] });

    }
  }
}