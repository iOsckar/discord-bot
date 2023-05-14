module.exports = {
    data: {
        name: `cancel`
    },
    async execute(interaction, client) {
        console.log('THIS IS EXECUTING');
        await interaction.reply({
            content: `hola`
        })
    }
}