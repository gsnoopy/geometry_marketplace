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
const { submitSignUpModal } = require('./modules/submitSignUpModal');

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
  }

  if (interaction.isModalSubmit()){
    submitSignUpModal(interaction);
  }
  
});

client.login(process.env.TOKEN);

module.exports = client;