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

      // Aguarda a resposta do usuário
      const filter = (i) => i.customId === 'confirmBuy' || i.customId === 'deleteMessage';
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on('collect', async (i) => {
        // Resolve ou rejeita com base na escolha do usuário
        if (i.customId === 'confirmBuy') {
          resolve(true);
        } else {
          resolve(false);
        }
      });

      collector.on('end', () => {
        // Rejeita se não houver resposta do usuário após o tempo limite
        reject('Tempo limite excedido');
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  confirmBuy,
};
