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

const { createSignUpModal } = require('./modules/createSignUpModal');
const { createEditProfileModal } = require('./modules/createEditProfileModal');
const { createAdModal } = require('./modules/createAdModal');
const { createSaldoModal } = require('./modules/createSaldoModal');

const { submitSignUpModal } = require('./modules/submitSignUpModal');
const { submitEditProfileModal } = require('./modules/submitEditProfileModal');
const { submitSaldoModal } = require('./modules/submitSaldoModal');

const { verifyPayment } = require('./scripts/verifyPayment');



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    verifyPayment(db, client);
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
    createSaldoModal(interaction)
  }

  if (interaction.isModalSubmit()){
    submitSignUpModal(interaction);
    submitEditProfileModal(interaction);
    submitSaldoModal(interaction)
  }

  if (interaction.isStringSelectMenu()) {
    createAdModal(interaction);
  }

});

client.login(process.env.BOT_TOKEN);

module.exports = client;