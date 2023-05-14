const { Interaction } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);

        if (!command) return
        
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            })
        }

        } else if(interaction.isButton()) {

            console.log(interaction.customId);

            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            console.log(buttons);

            if(!button) return new Error('There is no code for this button');
        
            try {
                console.log('THIS PART IS EXECUTING');
                await button.execute(interaction, client);
            } catch (err){
                console.error(err);
            }
        }

    },
};


