const Discord = require("discord.js")

const { registerSaque } = require("../../database/create/registerSaque");
const { getUserById } = require("../../database/read/getUserById");
const { updateUserSaldo } = require("../../database/edit/updateUserSaldo");
 
module.exports = {
  name: "criar_saque",
  description: "[ADM] Criar registro de saque no banco de dados",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "user_id",
      description: "Digite o id do usuário",
      required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "valor",
        description: "Digite o valor do saque",
        required: true
    },
],
  run: async (client,interaction) => {


    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.editReply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true });

    } else {

        try{

            await interaction.deferReply()
            
            const user_id = interaction.options.getString("user_id");
            const valorString = interaction.options.getString("valor");
            const valor = Number(valorString.replace(',', '.'));

            const user = await getUserById(user_id)

            if(Number(user.saldo) < valor){
                interaction.editReply({content: `Usuário solicitante não possui o saldo para saque desejado.`})
            }else{

                const saque = 0.01;
                const valorPosSaque = Number(valor - (valor * saque)).toFixed(2);
                const newSaldo = Number(user.saldo - valor).toFixed(2)
                await registerSaque(user_id,valor,valorPosSaque);
                await updateUserSaldo(user_id,newSaldo)

                const embed = new Discord.EmbedBuilder()
                .setTitle(`Olá ${user.username}`)
                .setColor(0x020202)
                .setDescription(`<:CashOutIcon:1201060301269901412> **Criação de saque**
                \n<:CoinsIcon:1201060304365310003> Seu saldo: R$ ${user.saldo}
                \n<:CoinsIcon:1201060304365310003> Saque desejado: R$ ${valor}
                \n<:CoinsIcon:1201060304365310003> Valor pós taxa de saque: R$ ${valorPosSaque}
                \n<:idBadge:1199292190933917696> Seu nome: ${user.name}
                \n<:pixKey:1199292080145584191> Sua chave pix: ${user.pix}
                `)
        
                await interaction.editReply({ embeds: [embed]});

            }
        
        }catch(error){
            interaction.editReply({content: `Erro ao criar solicitação de saque.`})
        }

    }
  }
}