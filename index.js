const { Discord, Client, GatewayIntentBits } = require('./imports');
const db = require('./database');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.slashCommands = new Discord.Collection();
require('./handler')(client);

const { createSignUpModal } = require('./modules/createModals/createSignUpModal');
const { createEditProfileModal } = require('./modules/createModals/createEditProfileModal');
const { createAdModal } = require('./modules/createModals/createAdModal');
const { createSaldoModal } = require('./modules/createModals/createSaldoModal');
const { createDeleteAdModal } = require('./modules/createModals/createDeleteAdModal');

const { submitSignUpModal } = require('./modules/submitModals/submitSignUpModal');
const { submitEditProfileModal } = require('./modules/submitModals/submitEditProfileModal');
const { submitSaldoModal } = require('./modules/submitModals/submitSaldoModal');
const { submitAdModal } = require('./modules/submitModals/submitAdModal');
const { submitDeleteAdModal } = require('./modules/submitModals/submitDeleteAdModal');

const { seeProfile } = require('./modules/pressButtons/seeProfile');
const { buyAd } = require('./modules/pressButtons/buyAd'); 


const { verifyPayment } = require('./scripts/verifyPayment');



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    //verifyPayment(db, client);
  }, 7000);

});

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      command.run(client, interaction);
    }

  }

  if(interaction.isButton()){
    createSignUpModal(interaction);
    createEditProfileModal(interaction);
    createSaldoModal(interaction);
    createDeleteAdModal(interaction);
    seeProfile(interaction);
    buyAd(interaction);
  }

  if (interaction.isModalSubmit()){
    submitSignUpModal(interaction);
    submitEditProfileModal(interaction);
    submitSaldoModal(interaction);
    submitAdModal(interaction);
    submitDeleteAdModal(interaction);
  }

    if (interaction.isStringSelectMenu()) {

      const selectedOptions = interaction.values;
      interaction.client.tempData = { adModalOptions: selectedOptions }
      createAdModal(interaction);
    }

});

client.login(process.env.BOT_TOKEN);

module.exports = client;