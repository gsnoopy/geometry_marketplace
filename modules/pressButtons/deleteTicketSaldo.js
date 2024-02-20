const Discord = require("discord.js");  

const { deleteTransactionsSaldoById } = require('../../database/delete/deleteTransactionsSaldoById')

async function deleteTicketSaldo(interaction) {

    if (interaction.customId === 'deleteTicketSaldo') {

        try {
                
            await interaction.deferReply({ ephemeral: true });

            const channel = interaction.channel;

            interaction.editReply({content: "O canal será fechado em 10 segundos!"});
            await deleteTransactionsSaldoById(interaction.user.id);
                
            setTimeout(async () => {
                await channel.delete();
            }, 10000);
    
        } catch (error) {
        
            console.error('Erro ao processar botão "deleteTicketSaldo":', error);
            await interaction.reply({ content: "Erro ao processar o botão deleteTicketSaldo.", ephemeral: true });
        
        }
    }
}

module.exports = { deleteTicketSaldo };
