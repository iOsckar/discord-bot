const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Salta la canción que se está reproduciendo'),

    async execute(interaction, client) {
        const queue = useQueue();

        if (!queue) {
            return interaction.reply('No hay música reproduciendose.');
        }

        if (!queue.isPlaying()) {
            return interaction.reply('No hay música reproduciéndose.');
        }

        queue.node.skip();

        return interaction.reply('La canción ha sido skipeada.');
    }
};