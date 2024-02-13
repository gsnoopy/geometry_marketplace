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

const { createSignUp } = require('./modules/createModals/createSignUp');
const { createEditProfile } = require('./modules/createModals/createEditProfile');
const { createAd } = require('./modules/createModals/createAd');
const { createAddSaldo } = require('./modules/createModals/createAddSaldo');
const { createDeleteAd } = require('./modules/createModals/createDeleteAd');
const { createTicket } = require('./modules/createModals/createTicket');

const { submitSignUp } = require('./modules/submitModals/submitSignUp');
const { submitEditProfile } = require('./modules/submitModals/submitEditProfile');
const { submitAddSaldo } = require('./modules/submitModals/submitAddSaldo');
const { submitAd } = require('./modules/submitModals/submitAd');
const { submitAdPremium } = require('./modules/submitModals/submitAdPremium');
const { submitDeleteAd } = require('./modules/submitModals/submitDeleteAd');
const { submitTicket } = require('./modules/submitModals/submitTicket');

const { seeProfile } = require('./modules/pressButtons/seeProfile');
const { buyAd } = require('./modules/pressButtons/buyAd'); 
const { bePremium } = require('./modules/pressButtons/bePremium');
const { confirmPremium } = require('./modules/pressButtons/confirmPremium');
const { confirmBoost } = require('./modules/pressButtons/confirmBoost');
const { successSell } = require('./modules/pressButtons/successSell');

const { verifyPayment } = require('./scripts/verifyPayment');
const { verifyPremiums } = require('./scripts/verifyPremiums');
const { verifyAds } = require('./scripts/verifyAds');



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    //verifyPayment(db, client);
  }, 7000);

  setInterval(() => {
    //verifyPremiums(db, client);
  }, 3600000);

  setInterval(() => {
    //verifyAds(db, client);
  }, 5000);

});

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      command.run(client, interaction);
    }

  }

  if(interaction.isButton()){
    createSignUp(interaction);
    createEditProfile(interaction);
    createAddSaldo(interaction);
    createDeleteAd(interaction);
    createTicket(interaction);
    seeProfile(interaction);
    buyAd(interaction);
    bePremium(interaction);
    confirmPremium(interaction,client);
    confirmBoost(interaction);
    successSell(interaction);
  }

  if (interaction.isModalSubmit()){
    submitSignUp(interaction,client);
    submitEditProfile(interaction);
    submitAddSaldo(interaction);
    submitAd(interaction);
    submitAdPremium(interaction);
    submitDeleteAd(interaction);
    submitTicket(interaction);
  }

    if (interaction.isStringSelectMenu()) {

      const selectedOptions = interaction.values;
      interaction.client.tempData = { adModalOptions: selectedOptions }
      createAd(interaction);
    }

});

client.login(process.env.BOT_TOKEN);

module.exports = client;