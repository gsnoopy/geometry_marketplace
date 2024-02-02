const { registerUser } = require('../../database/create/registerUser');

async function submitSignUp(interaction) {

  try {
    if (interaction.customId === 'signUpModal') {

        const name = interaction.fields.getTextInputValue('nameInput');
        const email = interaction.fields.getTextInputValue('emailInput');
        const pix = interaction.fields.getTextInputValue('pixInput');
        const cupom = interaction.fields.getTextInputValue('indicacaoInput');
        const userID = interaction.user.id;
        const saldo = 0.0;

        interaction.deferReply({ content: "Aguarde estamos realizando o seu cadastro", ephemeral: true }) 
        await registerUser(name, email, pix, userID, saldo, cupom);
        const idRoleUser = '1202537759336570901'
        await interaction.member.roles.add(idRoleUser);
        interaction.editReply({ content: "Usuário cadastrado!", ephemeral: true });

    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    interaction.reply({ content: "Erro ao realizar o cadastro.", ephemeral: true });
  }
}

module.exports = { submitSignUp };
