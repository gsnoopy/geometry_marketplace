const Discord = require("discord.js")
const { getUserById } = require('../../database/read/getUserById');

module.exports = {
  name: "impulsionar_on",
  description: "[PREMIUM] Impulsione suas vendas marcando Here",
  type: Discord.ApplicationCommandType.ChatInput,


  run: async (client, interaction) => {

    const premiumRole = process.env.PREMIUM_ID;

    try{

      if (!interaction.member.roles.cache.has(premiumRole)) {

        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

      } else {
          
        await interaction.deferReply({ephemeral: true });
        
        const user = await getUserById(interaction.user.id);

        if (!user || user.saldo === undefined) {

          await interaction.editReply({ content: 'Usuário não encontrado ou dados inválidos.', ephemeral: true });
          return;

        }
    
        const saldo = Number(user.saldo);
        const stringMarkdow = "`";

        if (saldo < process.env.HERE_PRICE) {

          await interaction.editReply({ content: `Você não possui saldo suficiente, seu saldo é ${stringMarkdow}${saldo}${stringMarkdow} o valor para marcar Everyone é de ${stringMarkdow}${process.env.HERE_PRICE}${stringMarkdow}!`, ephemeral: true });        

        }else{

          const buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("confirmHere")
              .setLabel("Sim")
              .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
              .setCustomId("declineHere")
              .setLabel("Não")
              .setStyle(Discord.ButtonStyle.Primary),
          );
    
          await interaction.editReply({ content: `Você possui ${stringMarkdow}R$ ${saldo}${stringMarkdow} e terá ${stringMarkdow}R$ ${saldo - process.env.HERE_PRICE}${stringMarkdow} após a compra, deseja confirmar essa transação?`, components: [buttons], ephemeral: true });

        }
      }

    }catch(error){

      console.error('Erro ao processar comando "impulsionar_on":', error);
      await interaction.reply({ content: "Erro ao processar o comando here.", ephemeral: true });

    }
  }
}