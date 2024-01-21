const Discord = require("discord.js")

module.exports = {
  name: "painel",
  description: "Embed de interface do usuário",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Interface Embed")
        
        const buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("comprarSaldo")
            .setLabel("Adicionar Saldo")
            .setEmoji("💵") 
            .setStyle(Discord.ButtonStyle.Secondary),

            new Discord.ButtonBuilder()
            .setCustomId("sacarSaldo")
            .setLabel("Sacar Saldo")
            .setEmoji("📤") 
            .setStyle(Discord.ButtonStyle.Secondary),

            new Discord.ButtonBuilder()
            .setCustomId("seeProfile")
            .setLabel("Ver Perfil")
            .setEmoji("🪪") 
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [buttons] })
    }


  },
}