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
const { createSacarSaldo } = require('./modules/createModals/createSacarSaldo');

const { submitSignUp } = require('./modules/submitModals/submitSignUp');
const { submitEditProfile } = require('./modules/submitModals/submitEditProfile');
const { submitAddSaldo } = require('./modules/submitModals/submitAddSaldo');
const { submitAd } = require('./modules/submitModals/submitAd');
const { submitAdPremium } = require('./modules/submitModals/submitAdPremium');
const { submitDeleteAd } = require('./modules/submitModals/submitDeleteAd');
const { submitTicket } = require('./modules/submitModals/submitTicket');
const { submitSacarSaldo } = require('./modules/submitModals/submitSacarSaldo')

const { seeProfile } = require('./modules/pressButtons/seeProfile');
const { buyAd } = require('./modules/pressButtons/buyAd'); 
const { bePremium } = require('./modules/pressButtons/bePremium');
const { confirmPremium } = require('./modules/pressButtons/confirmPremium');
const { confirmBoost } = require('./modules/pressButtons/confirmBoost');
const { successSell } = require('./modules/pressButtons/successSell');
const { deleteTicket } = require('./modules/pressButtons/deleteTicket');
const { deleteTicketSaldo } = require('./modules/pressButtons/deleteTicketSaldo');
const { deleteTicketSaque } = require('./modules/pressButtons/deleteTicketSaque');

const { upAd } = require('./modules/pressButtons/upAd');

const { verifyPayment } = require('./scripts/verifyPayment');
const { verifyPremiums } = require('./scripts/verifyPremiums');
const { verifyAds } = require('./scripts/verifyAds');
const { verifyMembers } = require('./scripts/verifyMembers');


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    verifyPayment(db, client);
  }, 7000);

  setInterval(() => {
    verifyPremiums(db, client);
  }, 7000);

  setInterval(() => {
    verifyAds(db, client);
  }, 7000);

  setInterval(() => {
    verifyMembers(client);
  }, 1000);

});

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      command.run(client, interaction);
    }

  }

  if (interaction.isButton()) {
    switch (interaction.customId) {
      case 'ad_options':
        createAd(interaction);
        break;
      case 'signup':
        createSignUp(interaction);
        break;
      case 'editProfile':
        createEditProfile(interaction);
        break;
      case 'comprarSaldo':
        createAddSaldo(interaction);
        break;
      case 'deleteAd':
        createDeleteAd(interaction);
        break;
      case 'ticket':
        createTicket(interaction);
        break;
      case 'sacarSaldo':
        createSacarSaldo(interaction);
        break;
      case 'seeProfile':
        seeProfile(interaction);
        break;
      case 'buyAd':
        buyAd(interaction, client);
        break;
      case 'bePremium':
        bePremium(interaction);
        break;
      case 'confirmPremium':
        confirmPremium(interaction, client);
        break;
      case 'confirmEveryone':
      case 'confirmHere':
        confirmBoost(interaction, client);
        break;
      case 'successSell':
        successSell(interaction);
        break;
      case 'deleteTicket':
        deleteTicket(interaction);
        break;
      case 'deleteTicketSaldo':
        deleteTicketSaldo(interaction);
        break;
      case 'deleteTicketSaque':
        deleteTicketSaque(interaction);
        break;
      case 'upAd':
        upAd(interaction);
        break;
      default:
    }
  }

  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case 'signUpModal':
        submitSignUp(interaction, client);
        break;
      case 'editProfileModal':
        submitEditProfile(interaction);
        break;
      case 'saldoModal':
        submitAddSaldo(interaction);
        break;
      case 'adModal':
        submitAd(interaction);
        break;
      case 'adModalPremium':
        submitAdPremium(interaction);
        break;
      case 'deleteAdModal':
        submitDeleteAd(interaction);
        break;
      case 'ticketModal':
        submitTicket(interaction);
        break;
      case 'saqueModal':
        submitSacarSaldo(interaction);
        break;
      default:
    }
  }

    if (interaction.isStringSelectMenu()) {

      const selectedOptions = interaction.values;
      interaction.client.tempData = { adModalOptions: selectedOptions }
      createAd(interaction);

    }

});

client.login(process.env.BOT_TOKEN);
module.exports = client;