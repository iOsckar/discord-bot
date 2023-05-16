const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, SelectMenuOptionBuilder, SelectMenuBuilder, embedLength} = require('@discordjs/builders');

module.exports = {
    data: {
        name: `starter`
    },
    async execute(interaction, client) {
        
        console.log(interaction.message.embeds[0].description)

        //await interaction.update({ embeds: [exampleEmbed] });

        /*await interaction.reply({
            content: `You select: ${interaction.values[0]}`;

        });*/
        
    }
}