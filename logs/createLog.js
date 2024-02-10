const { Client, TextChannel } = require('discord.js');

async function createLog(client, channelId, embed) {
  try {
    const channel = await client.channels.fetch(channelId);

    if (!(channel instanceof TextChannel)) {
      throw new Error('O canal fornecido não é um canal de texto.');
    }

    // Envie o embed para o canal
    await channel.send({ embeds: [embed] });

    console.log('Log enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar o log:', error);
  }
}

module.exports = { createLog };
