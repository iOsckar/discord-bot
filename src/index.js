const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] }); 
const player = new Player(client);

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

require('dotenv').config();




const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const componentsFolders = fs.readdirSync("./src/components");


(async () => {
    for (file of functions) {
        console.log(file);
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.handleComponents(componentsFolders, "./src/components");

    await player.extractors.loadMulti(DefaultExtractors);
    client.login(process.env.token);

})();

