const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');

function createEditProfile(interaction) {

    if (interaction.customId === 'editProfile') {

        const modal = new ModalBuilder()
            .setCustomId('editProfileModal')
            .setTitle(`Insira conteúdo no campo que deseja editar.`);
  
        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            .setLabel("Nome completo")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const emailInput = new TextInputBuilder()
            .setCustomId('emailInput')
            .setLabel("Email")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const pixInput = new TextInputBuilder()
            .setCustomId('pixInput')
            .setLabel("Chave PIX")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);
  
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(emailInput);
        const fourthActionrOW = new ActionRowBuilder().addComponents(pixInput);

        modal.addComponents(firstActionRow);
        modal.addComponents(secondActionRow);
        modal.addComponents(fourthActionrOW);

        interaction.showModal(modal);
        
    }
}
  
module.exports = { createEditProfile };
  