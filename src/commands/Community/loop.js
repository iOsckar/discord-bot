const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode, useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Cambia el modo de repetición de la cola')
        .addNumberOption(option =>
            option
                .setName('mode')
                .setDescription('El modo de repetición')
                .setRequired(true)
                .addChoices(
                    { name: 'Apagado', value: QueueRepeatMode.OFF },
                    { name: 'Canción', value: QueueRepeatMode.TRACK },
                    { name: 'Cola', value: QueueRepeatMode.QUEUE },
                    { name: 'Autoplay', value: QueueRepeatMode.AUTOPLAY },
                )
        ),

    async execute(interaction, client) {
        const queue = useQueue();

        if (!queue) {
            return interaction.reply('No hay música reproduciéndose.');
        }

        const loopMode = interaction.options.getNumber('mode');
        queue.setRepeatMode(loopMode);

        // Traducción de los modos para el mensaje
        const modeNames = {
            [QueueRepeatMode.OFF]: 'Apagado',
            [QueueRepeatMode.TRACK]: 'Canción',
            [QueueRepeatMode.QUEUE]: 'Cola',
            [QueueRepeatMode.AUTOPLAY]: 'Autoplay'
        };

        return interaction.reply(`Modo de repetición establecido a: **${modeNames[loopMode]}**`);
    }
};