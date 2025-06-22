const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue, useTimeline }  = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa / Despausa la canción'),

    async execute(interaction, client) {
        const timeline = useTimeline();

        if(!timeline)
            return interaction.reply('No hay ninguna canción reproduciéndose en este momento.');
    
        const wasPaused = timeline.paused;

        wasPaused ? timeline.resume() : timeline.pause();

        return interaction.reply(
            `El reproductor está ${wasPaused ? 'reproduciendo' : 'pausado'}.`,
        );
    }
}