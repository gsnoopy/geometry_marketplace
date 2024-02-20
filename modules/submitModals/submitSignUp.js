const { registerUser } = require('../../database/create/registerUser');
const { createLog } = require('../../logs/createLog');
const { Discord } = require('../../imports');

async function submitSignUp(interaction,client) {

  try {

    if (interaction.customId === 'signUpModal') {

      interaction.deferReply({ ephemeral: true }) 
      
      const name = interaction.fields.getTextInputValue('nameInput');
      const email = interaction.fields.getTextInputValue('emailInput');
      const pix = interaction.fields.getTextInputValue('pixInput');
      const cupom = interaction.fields.getTextInputValue('indicacaoInput');
      const userID = interaction.user.id;
      const saldo = 0.0;

      const userRole = process.env.USER_ID;

      await registerUser(name, email, pix, userID, saldo, cupom);
      await interaction.member.roles.add(userRole);
        
      let embed = new Discord.EmbedBuilder()
        .setColor(0x004CFF)
        .setDescription(`<@${userID}> é um novo usuário.`)
        .setTimestamp()

      await createLog(client, '1204475836330287134', embed)
      interaction.editReply({ content: "Usuário cadastrado!", ephemeral: true });

    }
  } catch (error) {

    console.error('Erro ao cadastrar usuário:', error);
    interaction.reply({ content: "Erro ao realizar o cadastro.", ephemeral: true });

  }
}

module.exports = { submitSignUp };
