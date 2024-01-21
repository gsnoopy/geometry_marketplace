const { registerUserDatabase } = require('../database/registerUserDatabase');

async function submitSignUpModal(interaction) {

  try {
    if (interaction.customId === 'signUpModal') {

        const name = interaction.fields.getTextInputValue('nameInput');
        const email = interaction.fields.getTextInputValue('emailInput');
        const cpf = interaction.fields.getTextInputValue('cpfInput');
        const pix = interaction.fields.getTextInputValue('pixInput');
        const cupom = interaction.fields.getTextInputValue('indicacaoInput');
        const userID = interaction.user.id;
        const saldo = 0.0;
        const saldoRestrito = 0.0;

        interaction.deferReply({ content: "Aguarde estamos realizando o seu cadastro", ephemeral: true }) 
        await registerUserDatabase(name, email, cpf, pix, userID, saldo, saldoRestrito, cupom);
        interaction.editReply({ content: "Usuário cadastrado!", ephemeral: true });

    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    interaction.reply({ content: "Erro ao realizar o cadastro.", ephemeral: true });
  }
}

module.exports = {
  submitSignUpModal,
};
