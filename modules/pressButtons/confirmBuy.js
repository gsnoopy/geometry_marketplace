const Discord = require("discord.js");

async function confirmBuy(interaction, existingAd, user, saldo, saldoFinal) {

  return new Promise(async (resolve, reject) => {

    try {

      const buttons = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("confirmBuy")
          .setLabel("Sim")
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId("deleteMessage")
          .setLabel("Não")
          .setStyle(Discord.ButtonStyle.Primary),
      );

      const stringMarkdow = "`";
      await interaction.editReply({ content: `Você possui ${stringMarkdow}R$ ${saldo}${stringMarkdow} e terá ${stringMarkdow}R$ ${saldoFinal}${stringMarkdow} após a compra, deseja confirmar essa transação?`, components: [buttons], ephemeral: true });

      const filter = (i) => i.customId === 'confirmBuy' || i.customId === 'deleteMessage';
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (i) => {

        if (i.customId === 'confirmBuy') {
          
          await interaction.editReply({ content: `Aguarde o processamento`, components: [], ephemeral: true });
          resolve(true);

        } else {

          await interaction.editReply({ content: `Compra recusada`, components: [],  ephemeral: true });
          resolve(false);

        }

      });

      collector.on('end', () => {
        interaction.editReply({ content: `Você demorou para responder e encerramos a solicitação`, components: [],  ephemeral: true });
        reject('Tempo limite excedido');
      });

    } catch (error) {

      reject(error);
    }
    
  });
}

module.exports = { confirmBuy };
