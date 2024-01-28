const Discord = require("discord.js")

module.exports = {
  name: "taxas",
  description: "Calcule taxas a partir de um valor",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "valor",
        description: "Digite um valor para fazer os cálculos",
        required: true
    }
],

  run: async (client, interaction) => {

    const targetRoleId = '1200973836024287293'

    try{
        if (!interaction.member.roles.cache.has(targetRoleId)) {
          interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
      } else {
          
        await interaction.deferReply({ephemeral: true });

        const valorString = interaction.options.getString("valor");
        const valor = Number(valorString.replace(',', '.'));
        console.log(valor)

        if (isNaN(valor)) {
          await interaction.editReply({ content: 'Por favor, digite um valor numérico válido (Separador de casas decimais é o ponto e não virgula).', ephemeral: true });
          return;
        }

        const taxa = 0.09;
        const saque = 0.01;
        const valorPosVenda = (valor - (valor * taxa)).toFixed(2);
        const valorPosSaque = (valorPosVenda - (valorPosVenda * saque)).toFixed(2);
        

        const embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setDescription(`Taxas atuais:\nVenda --> 9%\nSaque --> 1%\n\nValor selecionado: ${valor}\nValor após venda: ${valorPosVenda}\n Valor após saque: ${valorPosSaque}`)

        await interaction.editReply({ embeds: [embed], ephemeral: true });

      }
    }catch(error){

      console.error('Erro ao processar comando "taxas":', error);
      await interaction.reply({ content: "Erro ao processar o comando.", ephemeral: true });

    }

  },
}