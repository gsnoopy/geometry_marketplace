const { editUser } = require('../../database/edit/editUser');

async function submitEditProfile(interaction) {

  await interaction.deferReply({ephemeral: true });

  try {

      const userId = interaction.user.id;
      const name = interaction.fields.getTextInputValue('nameInput');
      const email = interaction.fields.getTextInputValue('emailInput');
      const pix = interaction.fields.getTextInputValue('pixInput');

      await editUser(userId, name, email, pix);
      await interaction.editReply({ content: "Dados atualizados, utilize /perfil para verifica-los!", ephemeral: true });

  } catch (error) {

    console.error('Erro na atualização de dados de usuário', error);
    await interaction.editReply({ content: "Erro ao atualizar seus dados", ephemeral: true });

  }
}

module.exports = { submitEditProfile };
