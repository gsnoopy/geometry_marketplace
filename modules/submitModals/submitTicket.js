const { Discord } = require('../../imports');

async function submitSignUp(interaction,client) {

  try {
    if (interaction.customId === 'ticketModal') {
      
        const question = interaction.fields.getTextInputValue('questionInput');

        interaction.deferReply({ content: "Aguarde estamos criando o seu ticket", ephemeral: true }) 

        let embed = new Discord.EmbedBuilder()
          .setColor(0x004CFF)
          .setDescription(`${question}`)
          .setTimestamp()

         //criar ticket 

        interaction.editReply({ content: "Ticket criado em <#>!", ephemeral: true });

    }
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    interaction.reply({ content: "Erro ao criar ticket de suporte.", ephemeral: true });
  }
}

module.exports = { submitSignUp };
