const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Muestra la cola actual de reproducción'),

    async execute(interaction, client) {
        const queue = useQueue();

        if (!queue) {
            return interaction.reply('No hay música reproduciéndose.');
        }

        const currentTrack = queue.currentTrack;
        const upcomingTracks = queue.tracks.toArray().slice(0, 5);

        let message = [
            `**Reproduciendo ahora:** ${currentTrack ? `${currentTrack.title} - ${currentTrack.author}` : 'Nada'}`,
            '',
            '**Próximas canciones:**',
            ...upcomingTracks.length
                ? upcomingTracks.map((track, index) => `${index + 1}. ${track.title} - ${track.author}`)
                : ['No hay más canciones en la cola.'],
        ].join('\n');

        return interaction.reply(message);
    }
};