const Discord = require("discord.js");  

const { transcriptMessages } = require('../../logs/transcriptMessages')

async function deleteTicketSaque(interaction) {

    if (interaction.customId === 'deleteTicketSaque') {

        try {
                
            await interaction.deferReply({ ephemeral: true });

            const channel = interaction.channel;

            interaction.editReply({content: "O canal será fechado em 10 segundos!"});
            await transcriptMessages(interaction,channel,'1212782965281656872');
                
    
        } catch (error) {
        
            console.error('Erro ao processar botão "deleteTicketSaque":', error);
            await interaction.reply({ content: "Erro ao processar o botão deleteTicketSaque.", ephemeral: true });
        
        }
    }
}

module.exports = { deleteTicketSaque };
