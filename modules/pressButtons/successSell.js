const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');

async function successSell(interaction) {

    if (interaction.customId === 'successSell') {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para usar esse botão!`, ephemeral: true })
        } else {
            try {
                
                await interaction.deferReply({ ephemeral: true });
                const channel = interaction.channel;
                interaction.editReply({content: "Negociação concluída, o canal será fechado em 10 segundos!"})

                const formatDateTime = (dateTime) => {
                    dateTime.setHours(dateTime.getHours() - 3);
                    return dateTime.toLocaleString('pt-BR', { timeZone: 'UTC' });
                };

                const tempFolderPath = path.join(__dirname, '../../temp');

                if (!fs.existsSync(tempFolderPath)) {
                    fs.mkdirSync(tempFolderPath, { recursive: true });
                }

                const transcriptFileName = `transcript_${channel.id}.txt`;
                const transcriptFilePath = path.join(tempFolderPath, transcriptFileName);

                fs.writeFileSync(transcriptFilePath, '');

                await channel.messages.fetch({limit: 100}).then(messages => {
                    messages.forEach(message => {
                        const formattedDateTime = formatDateTime(message.createdAt);
                        const line = `${formattedDateTime} - ${message.author.username}: ${message.content}\n`;
                        fs.appendFileSync(transcriptFilePath, line);
                    });
                });

                const transcriptChannel = interaction.guild.channels.cache.get('1205498915252731984');
                if (transcriptChannel) {
                    await transcriptChannel.send({ files: [transcriptFilePath] });
                }

                fs.unlinkSync(transcriptFilePath);

                setTimeout(async () => {
                    await channel.delete();
                }, 10000);
                
        
            } catch (error) {
        
                console.error('Erro ao processar botão "successSell":', error);
                await interaction.reply({ content: "Erro ao processar o botão.", ephemeral: true });
        
            }
        }
      }

}

module.exports = { successSell };
