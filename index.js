const { Discord, Client, GatewayIntentBits } = require('./imports');

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
const { submitSignUpModal } = require('./modules/submitSignUpModal');
const { submitEditProfileModal } = require('./modules/submitEditProfileModal');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
  }

  if (interaction.isModalSubmit()){
    submitSignUpModal(interaction);
    submitEditProfileModal(interaction);
  }

  if (interaction.isStringSelectMenu()) {
    createAdModal(interaction);
  }

});

client.login(process.env.BOT_TOKEN);

module.exports = client;