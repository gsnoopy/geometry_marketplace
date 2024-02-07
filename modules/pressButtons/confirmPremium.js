const Discord = require("discord.js");
const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getUserById } = require('../../database/read/getUserById');
const { registerPremium } = require('../../database/create/registerPremium');
const { updateUserSaldo } = require('../../database/edit/updateUserSaldo');
const { registerSale } = require("../../database/create/registerSale");
const { createLog } = require('../../logs/createLog')

async function confirmPremium(interaction,client) {
  let test;
  try {
    if (interaction.customId === 'confirmPremium') {
      await interaction.deferReply({ ephemeral: true });

      const user = interaction.user;
      const guild = interaction.guild;

      const premiumRoleId = '1200973836024287293'; 
      await interaction.member.roles.add(premiumRoleId);

      const categoryID = '1198197452805783572'; 
      const category = guild.channels.cache.get(categoryID);

      const channelName = `🏭﹒${user.tag.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
      
      const channel = await interaction.guild.channels.create({
        name: channelName,
        type: Discord.ChannelType.GuildText,
        parent: category,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            allow: [
              Discord.PermissionFlagsBits.ViewChannel
            ],
            deny: [
                Discord.PermissionFlagsBits.SendMessages,
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
          }
        ]
      });

      const userDB = await getUserById(user.id);
      const premiumPrice = parseFloat(process.env.PREMIUM_PRICE);
      const updatedSaldo = userDB.saldo - premiumPrice;
      const revenue = (premiumPrice - (premiumPrice * 0.01)).toFixed(2);
      await updateUserSaldo(user.id, updatedSaldo);
      await registerPremium(user.id)
      await registerSale(user.id,'Geometry Marketplace',13,premiumPrice,revenue)

      let embed = new Discord.EmbedBuilder()
      .setColor(0xF900FF)
      .setDescription(`<@${user.id}> agora é premium.`)
      .setTimestamp()

      await createLog(client, '1204475943771574292', embed)

      await interaction.followUp({ content: 'Usuário agora é premium!', ephemeral: true });
    }
  } catch (error) {
    console.error('Erro na função confirmPremium:', error);
    
    if (test) {
      await db.query('ROLLBACK');
    }

    await interaction.followUp({ content: 'Ocorreu um erro ao processar sua solicitação.', ephemeral: true });
  }
}

module.exports = { confirmPremium };
