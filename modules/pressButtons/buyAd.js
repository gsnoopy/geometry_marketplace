const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Discord } = require('../../imports');

const { getAdById } = require('../../database/read/getAdById');
const { getUserById } = require('../../database/read/getUserById');
const { registerTransactionAd } = require('../../database/create/registerTransactionAd');
const { confirmBuy } = require('./confirmBuy');
const { updateUserSaldo } = require('../../database/edit/updateUserSaldo');
const { deleteAdById } = require('../../database/delete/deleteAdById');
const { createLog } = require('../../logs/createLog');

async function buyAd(interaction, client) {

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

          const seller_id = existingAd.user_id;
          const saldoAd = existingAd.value;
          const saldo_retido =  (existingAd.value - (existingAd.value * 0.09)).toFixed(2)
          const taxa = (existingAd.value * 0.09).toFixed(2);
          const category = existingAd.categoria_id;
          const title = existingAd.title;
          const buyer_saldo = (user.saldo - saldoAd).toFixed(2);

          if (confirmation) {

            await registerTransactionAd(seller_id,user_id,saldoAd,saldo_retido,taxa,category,title);
            await updateUserSaldo(user.user_id, buyer_saldo);
            await deleteAdById(ad_id);
            await ad_message.delete();

            const channelName = `🪙﹒${title.substring(0, 12)}`;
            const categoryChannel = interaction.guild.channels.cache.get(process.env.TICKET_AD) ?? null;
            const existingChannel = interaction.guild.channels.cache.find(c => c.name === channelName);

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
            
            const buyerUser = await interaction.client.users.fetch(interaction.user.id);
            const sellerUser = await interaction.client.users.fetch(seller_id);
            const stringMarkdow = "`";

            const embed = new Discord.EmbedBuilder()
              .setColor(0x020202)
              .setTitle(`Venda e compra do produto [${existingAd.title}]`)
              .setThumbnail("https://media.discordapp.net/attachments/1204152785831206964/1204152957290029136/Frame.png?ex=65d3b1d5&is=65c13cd5&hm=e7ccf81359ce86076bcbada80551d08a420061d46232eded4793ff53472fd3f3&=&format=webp&quality=lossless&width=200&height=200")
              .setDescription(`Dados pré cadastrados pelo vendedor:\n\n${stringMarkdow}${existingAd.information}${stringMarkdow}\n\nEste é um bate-papo entre:\n`)
              .addFields(
                { name: '<:idBadge:1199292190933917696> Comprador:', value:  String(buyerUser) },
                { name: '<:StoreIcon:1201060308056281149> Vendedor:', value: String(sellerUser) },
            )
              .setTimestamp()
            
            const buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("callStaff")
                .setLabel("Suporte")
                .setEmoji("<:SupIcon:1204157952349442099>") 
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setCustomId("successSell")
                .setLabel("Negociação concluída")
                .setEmoji("<:SupIcon:1204157952349442099>") 
                .setStyle(Discord.ButtonStyle.Primary),
    
            );

            await channel.send(({ embeds: [embed], components: [buttons] }));

            let embedLog = new Discord.EmbedBuilder()
            .setTitle(`${title}`)
            .setColor(0xA331FF)
            .setDescription(`<@${interaction.user.id}> comprou um produto de <@${seller_id}>\n\n**Valor**: R$ ${saldoAd} \n **Saldo Retido:** R$ ${saldo_retido}\n**Taxa**: R$ ${taxa}`)
            .setTimestamp()
  
            await createLog(client, '1204476132406075452', embedLog)
            await interaction.editReply({ content: 'Compra confirmada!', ephemeral: true });

          } else {

            await interaction.editReply({ content: 'Compra cancelada.', ephemeral: true });

          }
        } else {

          await interaction.editReply({ content: 'Você não possui saldo suficiente', ephemeral: true });

        }
      }
    }
  } catch (error) {

    console.error('Erro na função buyAd:', error);
    await interaction.followUp({ content: 'Ocorreu um erro ao processar a solicitação buyAd.', ephemeral: true });

  }
}

module.exports = { buyAd };
