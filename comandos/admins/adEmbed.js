const Discord = require("discord.js")

module.exports = {
  name: "ad",
  description: "Embed para criação de anúncios",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Criar anúncio");
        
        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId("ad_options")
            .setPlaceholder("Selecione a categoria do anúncio")
            .addOptions(
                {
                    label: "League of Legends",
                    value: "lol_option",
                    emoji: "<:lol:1198216501698773123>"
                },
                {
                    label: "Valorant",
                    value: "valorant_option",
                    emoji: "<:valorant:1198216504194379816>"
                },
                {
                    label: "Fortnite",
                    value: "fortnite_option",
                    emoji: "<:fortnite:1198216505813381120>"
                },
                {
                    label: "Steam",
                    value: "steam_option",
                    emoji: "<:steam:1198216497483485245>"
                },
                {
                    label: "Keys",
                    value: "keys_option",
                    emoji: "<:digitalkey:1198216499702276196>"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  },
}