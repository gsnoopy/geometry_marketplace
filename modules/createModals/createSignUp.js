const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('../../imports');
const { getUserById } = require('../../database/read/getUserById');

async function createSignUp(interaction) {

        
        const user = await getUserById(interaction.user.id);

        if(user){

            try{

                await interaction.deferReply({ephemeral: true});
                const idRoleUser = '1202537759336570901'
                await interaction.member.roles.add(idRoleUser);
                interaction.editReply({content: "Você já é cadastrado",ephemeral:true})

            }catch(error){

                console.error('Erro ao adicionar o cargo:', error);
                await interaction.editReply({ content: 'Ocorreu um erro ao adicionar o cargo.', ephemeral: true });

            }

        }else{  

            const modal = new ModalBuilder()
            .setCustomId('signUpModal')
            .setTitle(`Cadastro Geometry Marketplace`);
  
            const nameInput = new TextInputBuilder()
                .setCustomId('nameInput')
                .setLabel("Nome completo")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(30)
                .setMinLength(7);

            const emailInput = new TextInputBuilder()
                .setCustomId('emailInput')
                .setLabel("Digite um e-mail válido")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(50)
                .setMinLength(10);

            const pixInput = new TextInputBuilder()
                .setCustomId('pixInput')
                .setLabel("Chave PIX")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(100)
                .setMinLength(11);
    
            const indicacaoInput = new TextInputBuilder()
                .setCustomId('indicacaoInput')
                .setLabel("Cupom de Indicação")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setMaxLength(15)
                .setMinLength(0);

            const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(emailInput);
            const fourthActionRow = new ActionRowBuilder().addComponents(pixInput);
            const fifthActionrRow = new ActionRowBuilder().addComponents(indicacaoInput);

            modal.addComponents(firstActionRow);
            modal.addComponents(secondActionRow);
            modal.addComponents(fourthActionRow);
            modal.addComponents(fifthActionrRow);

            interaction.showModal(modal);

        
    }
}
  
module.exports = { createSignUp };
  