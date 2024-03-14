const Discord = require("discord.js");  

const { transcriptMessages } = require('../../logs/transcriptMessages')

async function deleteTicket(interaction) {

    await interaction.deferReply({ ephemeral: true });

        try {

            const channel = interaction.channel;

            interaction.editReply({content: "O canal será fechado em 10 segundos!"});
            await transcriptMessages(interaction,channel,'1206460500783931423');
                
    
        } catch (error) {
        
            console.error('Erro ao processar botão "deleteTicket":', error);
            await interaction.reply({ content: "Erro ao processar o botão deleteTicket.", ephemeral: true });
        
        }
    
}

module.exports = { deleteTicket };
