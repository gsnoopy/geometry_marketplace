const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Discord } = require('../../imports');

const { getAdById } = require('../../database/read/getAdById');
const { getUserById } = require('../../database/read/getUserById');
const { registerTransactionAd } = require('../../database/create/registerTransactionAd');
const { confirmBuy } = require('./confirmBuy');
const { updateUserSaldo } = require('../../database/edit/updateUserSaldo');
const { deleteAdById } = require('../../database/delete/deleteAdById');

async function buyAd(interaction) {
  try {
    if (interaction.customId === 'buyAd') {
      await interaction.deferReply({ ephemeral: true });

      const ad_id = interaction.message.id;
      const ad_message = interaction.message;
      const existingAd = await getAdById(ad_id);
      const user_id = interaction.user.id

      if (existingAd) {
        const user = await getUserById(user_id);
        const saldo = user.saldo;

        if (saldo >= existingAd.value) {

          const saldoFinal = Number(saldo - existingAd.value);
          const confirmation = await confirmBuy(interaction, existingAd, user, saldo, saldoFinal);

          const seller_id = existingAd.user_id
          const saldoAd = existingAd.value
          const saldo_retido =  (existingAd.value - (existingAd.value * 0.09)).toFixed(2)
          const taxa = (existingAd.value * 0.09).toFixed(2)
          const category = existingAd.categoria_id
          const title = existingAd.title

          const buyer_saldo = (user.saldo - saldoAd).toFixed(2);

          if (confirmation) {

            await registerTransactionAd(seller_id,user_id,saldoAd,saldo_retido,taxa,category,title)
            await updateUserSaldo(user.user_id, buyer_saldo)
            await deleteAdById(ad_id)
            await ad_message.delete();

            const channelName = `🪙﹒${title.substring(0, 12)}`;
            const categoryChannel = interaction.guild.channels.cache.get(process.env.TICKET_AD) ?? null;
            const existingChannel = interaction.guild.channels.cache.find(c => c.name === channelName);

            console.log(seller_id);
            console.log(interaction.user.id)

            console.log(typeof (seller_id))
            console.log(typeof (interaction.user.id))

            const channel = await interaction.guild.channels.create({
              name: channelName,
              type: Discord.ChannelType.GuildText,
              parent: categoryChannel,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                  ]
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                },
                {
                  id: seller_id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                },
              ]
            });

            await interaction.followUp({ content: 'Compra confirmada!', ephemeral: true });

          } else {
            await interaction.followUp({ content: 'Compra cancelada.', ephemeral: true });
          }
        } else {
          await interaction.editReply({ content: 'Você não possui saldo suficiente', ephemeral: true });
        }
      }
    }
  } catch (error) {
    console.error('Erro na função buyAd:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar sua solicitação.', ephemeral: true });
  }
}

module.exports = { buyAd };
