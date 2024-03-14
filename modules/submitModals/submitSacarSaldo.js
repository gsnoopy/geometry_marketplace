const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Discord } = require('../../imports');

const { getUserById } = require('../../database/read/getUserById');

async function submitSacarSaldo(interaction) {

   await interaction.deferReply({ephemeral: true})

  try {

      const valorString = interaction.fields.getTextInputValue('valorInput');

      const valorRegex = /^[0-9]+([,.][0-9]+)?$/;
      if (!valorRegex.test(valorString)) {
        return await interaction.editReply({ content: "Insira um valor válido", ephemeral: true });
      }
        
      const valor = Number(valorString.replace(',', '.')).toFixed(2);
      if (isNaN(valor)) {
        return await interaction.editReply({ content: "Insira um valor válido", ephemeral: true });
      }

      const userId = interaction.user.id;
      const user = await getUserById(userId);
      const userSaldo = user.saldo

      if(Number(valor) > Number(userSaldo)){
        return await interaction.editReply({ content: "Saldo insuficiente", ephemeral: true });
      }

      const channelName = `🧌﹒saque﹒${interaction.user.username}`;
      const category = interaction.guild.channels.cache.get(process.env.TICKET_SALDO) ?? null;
      const existingChannel = interaction.guild.channels.cache.find(c => c.name === channelName);

      if (existingChannel) {

        return await interaction.editReply({ 
          content: `Você já possui um ticket aberto em ${existingChannel}!`, 
          ephemeral: true 
        });

      }
    
      const channel = await interaction.guild.channels.create({

        name: channelName,
        type: Discord.ChannelType.GuildText,
        parent: category,
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
          }
        ]

      });
      
      const embed = new EmbedBuilder()
        .setColor(0x030303)
        .setTitle(`Saque`)
        .setDescription(`${valor}`);

      const buttons = new ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("deleteTicketSaque")
          .setLabel("X")
          .setEmoji("<:signUp:1199292028165574767>") 
          .setStyle(Discord.ButtonStyle.Primary),
      );

      channel.send({ embeds: [embed], components: [buttons]});

      await interaction.editReply({ 
        content: `Seu ticket para sacar saldo foi aberto no canal: ${channel}!`, 
        ephemeral: true 
      });

  } catch (error) {

    console.error('Erro ao processar transação: submitSacarSaldo', error);
  }
}

module.exports = { submitSacarSaldo };
