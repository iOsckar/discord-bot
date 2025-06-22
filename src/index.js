const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const { Player } = require('discord-player');
const { DefaultExtractors, SoundCloudExtractor, SpotifyExtractor } = require('@discord-player/extractor');
const { YoutubeiExtractor } = require("discord-player-youtubei");


const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] }); 
const player = new Player(client);


client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const playerEventFiles = fs.readdirSync('./src/playerEvents').filter(file => file.endsWith(".js"));
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

    try {
        await player.extractors.loadMulti([SoundCloudExtractor, SpotifyExtractor, YoutubeiExtractor]);

    } catch (error) {
        console.error('Error al registrar extractores:', error);
    }

    for (const file of playerEventFiles) {
        const event = require(`./playerEvents/${file}`);
        player.events.on(event.name, (...args) => event.execute(...args));
    }

    client.login(process.env.token);
})();

/* ------------ CAPTURA LOS ERRORES Y EVITA QUE EL BOT SE APAGE ---------------------- */

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Aquí puedes notificar en un canal de Discord si quieres
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Aquí puedes notificar en un canal de Discord si quieres
});