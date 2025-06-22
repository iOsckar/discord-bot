const { useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduce una pista')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL de la pista o nombre de la canción')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const player = useMainPlayer();
        const query = interaction.options.getString('url', true);
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('Necesitas estar en un canal de voz para reproducir música');
        }

        if (
            interaction.guild.members.me.voice.channel &&
            interaction.guild.members.me.voice.channel !== voiceChannel
        ) {
            return interaction.reply('Ya estoy reproduciendo música en otro canal de voz >:(');
        }

        if (
            !voiceChannel
                .permissionsFor(interaction.guild.members.me)
                .has(PermissionsBitField.Flags.Connect)
        ) {
            return interaction.reply('No tengo permiso para unirme a tu canal de voz!');
        }

        if (
            !voiceChannel
                .permissionsFor(interaction.guild.members.me)
                .has(PermissionsBitField.Flags.Speak)
        ) {
            return interaction.reply('No tengo permiso para hablar en tu canal de voz!');
        }

        await interaction.deferReply();

        try {
            const { track } = await player.play(voiceChannel, query, {
                nodeOptions: {
                    metadata: interaction.channel,
                },
            });

            return interaction.editReply(`**${track.title}** ha sido añadida a TU COLA`);
        } catch (error) {
            console.error(error);
            return interaction.editReply('Un error ocurrió al intentar reproducir la pista.');
        }
    }
};

