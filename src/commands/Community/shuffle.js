const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Mezcla las canciones en la cola'),

    async execute(interaction, client) {
        const queue = useQueue();

        if (!queue) {
            return interaction.reply('No hay música reproduciéndose.');
        }

        if (queue.tracks.size < 2) {
            return interaction.reply('No hay suficientes canciones en la cola para mezclar.');
        }

        queue.tracks.shuffle();

        return interaction.reply(`Se han mezclado ${queue.tracks.size} canciones en la cola.`);
    }
};