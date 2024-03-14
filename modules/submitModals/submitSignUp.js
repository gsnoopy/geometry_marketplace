const { Discord } = require('../../imports');

const { registerUser } = require('../../database/create/registerUser');
const { getCupons } = require('../../database/read/getCupons');
const { updateCupomUsages } = require('../../database/edit/updateCupomUsages');
const { createLog } = require('../../logs/createLog');

const { validEmail } = require('../../utils/validEmail');

async function submitSignUp(interaction,client) {

  await interaction.deferReply({ ephemeral: true })

  try {
      
      const name = interaction.fields.getTextInputValue('nameInput');
      const email = interaction.fields.getTextInputValue('emailInput');
      const pix = interaction.fields.getTextInputValue('pixInput');
      let cupom = interaction.fields.getTextInputValue('indicacaoInput').toLowerCase();
      const userID = interaction.user.id;
      const userRole = process.env.USER_ID;
      let saldo = 0.0;
      const userDiscordName = interaction.user.tag;

      if(validEmail(email) == false){
        interaction.editReply({ content: "Insira um email válido!", ephemeral: true });
        return
      }

      const cupons = await getCupons()
      const cupomExists = cupons.find(c => c.nome.toLowerCase() === cupom)

      if (cupomExists) {
        saldo = 1.0;
        await updateCupomUsages(cupomExists.nome);
      }else{
        cupom = '-'
      }

      await registerUser(name, userDiscordName, email, pix, userID, saldo, cupom);
      await interaction.member.roles.add(userRole);
        
      let embed = new Discord.EmbedBuilder()
        .setColor(0x004CFF)
        .setDescription(`<@${userID}> é um novo usuário.`)
        .setTimestamp()

      await createLog(client, '1204475836330287134', embed)
      interaction.editReply({ content: "Usuário cadastrado!", ephemeral: true });

  } catch (error) {

    console.error('Erro ao cadastrar usuário:', error);
    interaction.editReply({ content: "Erro ao realizar o cadastro.", ephemeral: true });

  }
}

module.exports = { submitSignUp };
