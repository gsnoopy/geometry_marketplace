const Discord = require("discord.js")

module.exports = {
  name: "taxas",
  description: "[PREMIUM] Calcule taxas a partir de um valor",
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

    const premiumRole = process.env.PREMIUM_ID;

    try{

      if(!interaction.member.roles.cache.has(premiumRole)) {

        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });
          
      } else {
          
        await interaction.deferReply({ephemeral: true });

        const valorString = interaction.options.getString("valor");
        const valor = Number(valorString.replace(',', '.'));

        if (isNaN(valor)) {
          await interaction.editReply({ content: 'Por favor, digite um valor numérico válido.', ephemeral: true });
          return;
        }

        const taxa = 0.09;
        const saque = 0.01;

        const valorPosVenda = (valor - (valor * taxa)).toFixed(2);
        const valorPosSaque = (valorPosVenda - (valorPosVenda * saque)).toFixed(2);
      
        const embed = new Discord.EmbedBuilder()
        .setColor(0x020202)
        .setDescription(`<:TaxesIcon:1201060309469773864> **Taxas atuais:**\n<:pointIcon:1201060305732640778> Venda ⭢ 9%\n<:pointIcon:1201060305732640778> Saque ⭢ 1%\n\n<:CoinsIcon:1201060304365310003> **Valor selecionado:** R$ ${valor}\n<:StoreIcon:1201060308056281149> **Valor após venda:** R$ ${valorPosVenda}\n<:CashOutIcon:1201060301269901412> **Valor após saque:** R$  ${valorPosSaque}`)

        await interaction.editReply({ embeds: [embed], ephemeral: true });

      }

    }catch(error){

      console.error('Erro ao processar comando "taxas":', error);
      await interaction.reply({ content: "Erro ao processar o comando calculator.", ephemeral: true });

    }
  }
}