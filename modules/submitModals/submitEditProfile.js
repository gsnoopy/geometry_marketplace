const { editUser } = require('../../database/edit/editUser');

async function submitEditProfile(interaction) {

  try {
    if (interaction.customId === 'editProfileModal') {

        const userId = interaction.user.id;
        const name = interaction.fields.getTextInputValue('nameInput');
        const email = interaction.fields.getTextInputValue('emailInput');
        const pix = interaction.fields.getTextInputValue('pixInput');

        interaction.deferReply({ content: "Aguarde estamos atualizando os seus dados", ephemeral: true }) 
        await editUser(userId, name, email, pix);
        interaction.editReply({ content: "Dados atualizados, utilize /perfil para verifica-los!", ephemeral: true });

    }
  } catch (error) {
    console.error('Erro na atualização de dados:', error);
    interaction.reply({ content: "Erro ao atualizar seus dados", ephemeral: true });
  }
}

module.exports = { submitEditProfile };
