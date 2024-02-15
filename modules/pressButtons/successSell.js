const Discord = require("discord.js");  

const { transcriptMessages } = require('../../logs/transcriptMessages')

async function successSell(interaction) {

    if (interaction.customId === 'successSell') {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para usar esse botão!`, ephemeral: true })
        } else {
            try {
                
                await interaction.deferReply({ ephemeral: true });
                const channel = interaction.channel;
                interaction.editReply({content: "Negociação concluída, o canal será fechado em 10 segundos!"})
                
                await transcriptMessages(interaction,channel,'1205498915252731984');
                
    
            } catch (error) {
        
                console.error('Erro ao processar botão "successSell":', error);
                await interaction.reply({ content: "Erro ao processar o botão.", ephemeral: true });
        
            }
        }
      }

}

module.exports = { successSell };
