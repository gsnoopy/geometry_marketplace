const Discord = require("discord.js");
const { getUserById } = require('../../database/read/getUserById');

async function bePremium(interaction) {

  await interaction.deferReply({ ephemeral: true });

  try {

      const member = interaction.member;
      const premiumRole = process.env.PREMIUM_ID;
      const user_id = interaction.user.id;
      const user = await getUserById(user_id);

      if (!user || user.saldo === undefined) {

        await interaction.editReply({ content: 'Usuário não encontrado ou dados inválidos.', ephemeral: true });
        return;

      }

      const saldo_user = Number(user.saldo);
      const stringMarkdow = "`";

      if (member.roles.cache.has(premiumRole)) {

        await interaction.editReply({ content: 'Você já é um membro premium!', ephemeral: true });

      } else {

        if (saldo_user < process.env.PREMIUM_PRICE) {

          await interaction.editReply({ content: `Você não possui saldo suficiente, seu saldo é ${stringMarkdow}${saldo_user}${stringMarkdow} o valor para se tornar Premium é de ${stringMarkdow}${process.env.PREMIUM_PRICE}${stringMarkdow}!`, ephemeral: true });

        } else {

          const buttons = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("confirmPremium")
              .setLabel("Sim")
              .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
              .setCustomId("declinePremium")
              .setLabel("Não")
              .setStyle(Discord.ButtonStyle.Primary),
          );

          await interaction.editReply({ content: `Você possui ${stringMarkdow}R$ ${saldo_user}${stringMarkdow} e terá ${stringMarkdow}R$ ${saldo_user - process.env.PREMIUM_PRICE}${stringMarkdow} após a compra, deseja confirmar essa transação?`, components: [buttons], ephemeral: true });

        }
      }
    
  } catch (error) {

    console.error('Erro na função bePremium:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar a solicitação bePremium.', ephemeral: true });

  }
}

module.exports = { bePremium };
