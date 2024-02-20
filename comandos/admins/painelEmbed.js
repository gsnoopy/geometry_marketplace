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