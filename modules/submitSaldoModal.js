const axios = require('axios');
const qrcode = require('qrcode');
const fs = require('fs');
const { AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Discord } = require('../imports');
const { getUserDatabase } = require('../database/getUserDatabase');
const { registerTransactionsDatabase } = require('../database/registerTransactionsDatabase');

async function submitSaldoModal(interaction) {
  try {
    if (interaction.customId === 'saldoModal') {

      const channelName = `🧌﹒saldo﹒${interaction.user.username}`;
      const category = interaction.guild.channels.cache.get(process.env.TICKET_SALDO) ?? null;
      const existingChannel = interaction.guild.channels.cache.find(c => c.name === channelName);

      if (existingChannel) {
        return interaction.reply({ 
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
      
      interaction.reply({ 
        content: `Aguarde estamos criando seu pagamento!`, 
        ephemeral: true 
      });

      const valor = interaction.fields.getTextInputValue('valorInput');
      const userId = interaction.user.id;
      const usuarioEncontrado = await getUserDatabase(userId);
      const channelId = channel.id;

      const transactionAmount = Number(valor);
      const description = `Saldo Geometry Marketplace - ${transactionAmount}`;
      const buyerName = `${usuarioEncontrado.name}`;
      const buyerEmail = `${usuarioEncontrado.email}`;
      const buyerCPF = `${usuarioEncontrado.cpf}`;
      const accessToken = process.env.MP_TOKEN;
      const apiUrl = 'https://api.mercadopago.com/v1/payments';

      const paymentData = {
        transaction_amount: transactionAmount,
        description: description,
        payment_method_id: 'pix',
        payer: {
          email: buyerEmail,
          identification: {
            type: 'CPF',
            number: buyerCPF
          },
          first_name: buyerName
        }
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      };

      const response = await axios.post(apiUrl, paymentData, { headers });

      const paymentID = response.data.id;
      const pixKey = response.data.point_of_interaction.transaction_data.qr_code;
      const ticketUrl = response.data.point_of_interaction.transaction_data.ticket_url;

      async function generateQRCode(pixKey) {
        try {
          const qrCodeDataUrl = await qrcode.toDataURL(pixKey);
          const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
          const qrCodeBuffer = Buffer.from(base64Data, 'base64');
          fs.writeFileSync('./temp/qrcode.png', qrCodeBuffer);
        } catch (err) {
          console.error('Erro ao gerar o QR code:', err);
        }
      }

      await generateQRCode(pixKey);

      const file = new AttachmentBuilder('./temp/qrcode.png');

      await registerTransactionsDatabase(userId, paymentID, channelId, transactionAmount);

      const embed = new EmbedBuilder()
        .setColor(0x030303)
        .setTitle(`ID: ${paymentID}`)
        .setDescription(`Você desejou adicionar o saldo: ** ${transactionAmount} **\nRealize o pagamento através do QR Code para continuar, caso esteja no celular, clique no botão abaixo para ser direcionado ao Mercado Pago`)
        .setThumbnail('attachment://qrcode.png');

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('PIX Ticket')
          .setURL(`${ticketUrl}`)
          .setStyle(ButtonStyle.Link)
      );

      channel.send({ embeds: [embed], components: [button], files: [file] })

      interaction.editReply({ 
        content: `Seu ticket para adicionar saldo foi aberto no canal: ${channel}!`, 
        ephemeral: true 
      });

    }
  } catch (error) {
    console.error('Erro ao processar transação:', error);
  }
}

module.exports = {
  submitSaldoModal,
};
