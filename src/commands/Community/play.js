const { useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
	.setDescription('Play a song in a voice channel!')
	.addStringOption(option =>
		option.setName('url') 
            .setDescription('Song URL or keywords')
			.setRequired(true)),
    
    async execute(interaction, client) {

        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel)
            return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel
        const query = interaction.options.getString('url', true); // we need input/query to play
        
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            // Aquí es donde debes pasar interaction.channel como metadata
            const { track } = await player.play(channel, query, {
            nodeOptions: {
                metadata: interaction.channel, // <--- Esto es lo importante
            },
            });
        
            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Something went wrong: ${e}`);
        }

    }
}

