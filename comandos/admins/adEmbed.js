const Discord = require("discord.js")

module.exports = {
  name: "ad",
  description: "[ADM] Embed para criação de anúncios",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client,interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

        let embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setImage("https://media.discordapp.net/attachments/1204152785831206964/1209760048511975434/announcement.png?ex=65e817d7&is=65d5a2d7&hm=21a0aa5f47b82b49297258a800b4b8ae5617fb5ce13899d8aed540d3a9e4083a&=&format=webp&quality=lossless&width=1626&height=574")
        .setDescription("Criar anúncio");
        
        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId("ad_options")
            .setPlaceholder("Selecione a categoria do anúncio")
            .addOptions(
                {
                    label: "League of Legends",
                    value: "lol_option",
                    emoji: "<:LolIcon:1199983426783154176>"
                },
                {
                    label: "Valorant",
                    value: "valorant_option",
                    emoji: "<:ValorantIcon:1199291996012040262>"
                },
                {
                    label: "Fortnite",
                    value: "fortnite_option",
                    emoji: "<:FortniteIcon:1199292201054781510>"
                },
                {
                    label: "Steam",
                    value: "steam_option",
                    emoji: "<:SteamIcon:1199292015473598575>"
                },
                {
                    label: "Keys",
                    value: "keys_option",
                    emoji: "<:KeyIcon:1199980188159705188>"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true });
        interaction.channel.send({ embeds: [embed], components: [painel] });

    }
  }
}