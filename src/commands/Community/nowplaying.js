const { SlashCommandBuilder } = require('@discordjs/builders');
const { useQueue }  = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Cancion actualmente reproduciéndose'),

    async execute(interaction, client) {
            const queue = useQueue();

            if(!queue) 
                return interaction.reply('El bot no está reproduciendo músicaaaa');
        
            const currentSong = queue.currentTrack;
            if(!currentSong) 
                return interaction.reply('No hay ninguna canción reproduciéndose en este momento.');
        
        return interaction.reply({
            content: `Reproduciendo ahora:** ${currentSong.title} **`
        })
    }
}