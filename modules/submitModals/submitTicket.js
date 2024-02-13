const { Discord } = require('../../imports');

async function submitTicket(interaction,client) {

  try {
    if (interaction.customId === 'ticketModal') {
      
        const question = interaction.fields.getTextInputValue('questionInput');

        interaction.deferReply({ content: "Aguarde estamos criando o seu ticket", ephemeral: true }) 

          const channelName = `e﹒${interaction.user.username}`;
          const categoryChannel = interaction.guild.channels.cache.get(process.env.TICKET_AD) ?? null;

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
                id: '1207044860033507359',
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
          
          const stringMarkdow = "`";
          
          let embed = new Discord.EmbedBuilder()
          .setTitle(`Olá <@${interaction.user.id}>`)
          .setColor(0x004CFF)
          .setDescription(`Sua dúvida: ${stringMarkdow}${question}${stringMarkdow}`)
          .setTimestamp()

          await channel.send(({ embeds: [embed]}));

        interaction.editReply({ content: `Ticket criado em <#${channel}>!`, ephemeral: true });

    }
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    interaction.reply({ content: "Erro ao criar ticket de suporte.", ephemeral: true });
  }
}

module.exports = { submitTicket };
