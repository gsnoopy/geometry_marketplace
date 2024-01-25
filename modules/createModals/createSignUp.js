const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createSignUp(interaction) {
    if (interaction.customId === 'signup') {
        const modal = new ModalBuilder()
            .setCustomId('signUpModal')
            .setTitle(`Cadastro Geometry Marketplace`);
  
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel("Nome completo")
            .setStyle(TextInputStyle.Short);

        const emailInput = new TextInputBuilder()
            .setCustomId('emailInput')
            .setLabel("Digite um e-mail válido")
            .setStyle(TextInputStyle.Short);

        const cpfInput = new TextInputBuilder()
            .setCustomId('cpfInput')
            .setLabel("CPF")
            .setStyle(TextInputStyle.Short);

        const pixInput = new TextInputBuilder()
            .setCustomId('pixInput')
            .setLabel("Chave PIX")
            .setStyle(TextInputStyle.Short)
  
        const indicacaoInput = new TextInputBuilder()
            .setCustomId('indicacaoInput')
            .setLabel("Cupom de Indicação")
            .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(emailInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(cpfInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(pixInput);
        const fifthActionrRow = new ActionRowBuilder().addComponents(indicacaoInput);

        modal.addComponents(firstActionRow);
        modal.addComponents(secondActionRow);
        modal.addComponents(thirdActionRow);
        modal.addComponents(fourthActionRow);
        modal.addComponents(fifthActionrRow);

        interaction.showModal(modal);
    }
}
  
module.exports = { createSignUp };
  