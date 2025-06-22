const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue, useTimeline }  = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra la lista de comandos'),

    async execute(interaction, client) {
        return interaction.reply({
            content: 'Lista de comandos:\n' +
                        '`/play` - Reproduce una canción\n' +
                        '`/skip` - Salta la canción actual\n' +
                        '`/pause` - Pausa o reanuda la canción actual\n' +
                        '`/loop` - Repite una pista o playlist\n' +
                        '`/queue` - Muestra la cola de reproducción actual\n' +
                        '`/nowplaying` - Muestra la canción que se está reproduciendo actualmente\n' +
                        '`/help` - Muestra esta lista de comandos',  
                    });

    }
}