const { Discord } = require('../../imports');

async function submitTicket(interaction,client) {

  try {

    if (interaction.customId === 'ticketModal') {

      interaction.deferReply({ephemeral: true }) 

      const question = interaction.fields.getTextInputValue('questionInput');
      const channelName = `📩﹒${interaction.user.username}`;
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
            id: String(process.env.SUPPORT_ID),
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
          
      const embed = new Discord.EmbedBuilder()
        .setTitle(`Olá <@${interaction.user.id}>`)
        .setColor(0x004CFF)
        .setDescription(`Sua dúvida: ${stringMarkdow}${question}${stringMarkdow}`)
        .setTimestamp()

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("deleteTicket")
          .setLabel("X")
          .setEmoji("<:signUp:1199292028165574767>") 
          .setStyle(Discord.ButtonStyle.Primary),
      );

      await channel.send(({ embeds: [embed], components: [button]}));
      interaction.editReply({ content: `Ticket criado em <#${channel.id}>!`, ephemeral: true });

    }
  } catch (error) {

    console.error('Erro ao criar ticket:', error);
    interaction.reply({ content: "Erro ao criar ticket de suporte.", ephemeral: true });
    
  }
}

module.exports = { submitTicket };
