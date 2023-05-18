const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, SelectMenuOptionBuilder, SelectMenuBuilder, StringSelectMenuOptionBuilder} = require('@discordjs/builders');
const { Sticker } = require('discord.js');
const { data } = require('../../commands/Community/to-do');

module.exports = {
    data: {
        name: `checkTask`
    },
    async execute(interaction, client) {
        
        const dataEmbedTasks = interaction.message.embeds[0].description; //Gets the description from the embed message which are the tasks.
        const dataTasks = convertDataTasks(dataEmbedTasks);
        
        const formatedTasks = generateNewTasksEmbedString(dataTasks, interaction.values);
        const username = interaction.user.username;
		const profilePic = interaction.user.displayAvatarURL();

        const embedMessage = generateEmbed(username, profilePic, formatedTasks);
		const selectMenu = createSelectMenu(dataTasks);

        const row = new ActionRowBuilder().addComponents(selectMenu);

		await interaction.update({
			embeds: [embedMessage], components: [row]
        });

        console.log(dataTasks);

        //await interaction.update({ embeds: [exampleEmbed] });

        /*await interaction.reply({
            content: `You select: ${interaction.values[0]}`;

        });*/
        
    }
}

function convertDataTasks(dataEmbedTasks) {
    const arrayDataEmbedTasks = dataEmbedTasks.split('\n'); //Converts the description (string) into an array.
    const dataTasks = [];

    for (let i = 0; i < arrayDataEmbedTasks.length; i++) {

        let isChecked = false;
        if(arrayDataEmbedTasks[i].includes('○')) isChecked = false;    
        else if(arrayDataEmbedTasks[i].includes('✔')) isChecked = true;
        else isChecked = false;

        let taskName = arrayDataEmbedTasks[i].substring(6); //This delete the first 6 characters (**✔**)
        taskName = taskName.replace(/[^\x20-\x7E]/g, '').trim(); //Removes all the emojis from the string

        let emoji = arrayDataEmbedTasks[i];
        emoji = arrayDataEmbedTasks[i].slice(-2).replace(' ️','').trim(); //Get the last character (Which is the emoji, and delete blank spaces just in case there are)

        dataTasks.push({
            isChecked: isChecked, taskName: taskName, emoji: emoji
        });  
    }

    return dataTasks;
}

function generateNewTasksEmbedString(dataTasks, arraySelectedOptionsIndexes) {
    let tasksString = '';

    for (let i = 0; i < arraySelectedOptionsIndexes.length; i++) {
        
        if(dataTasks[arraySelectedOptionsIndexes[i]].isChecked === false) 
            dataTasks[arraySelectedOptionsIndexes[i]].isChecked = true;
        else 
            dataTasks[arraySelectedOptionsIndexes[i]].isChecked = false;
    }


    for (let i = 0; i < dataTasks.length; i++) {

        if(dataTasks[i].isChecked) 
            tasksString += `**✔** ${dataTasks[i].taskName} ${dataTasks[i].emoji}\n`;
        else 
            tasksString += `**○** ${dataTasks[i].taskName} ${dataTasks[i].emoji}\n`;

    }
        
    return tasksString;
}

function generateEmbed(username, profilePic, formatedTasks) {
	const embedMessage = new EmbedBuilder()
	.setColor(0x0099FF)
	.setAuthor({ name: `${username}'s goals`, iconURL: profilePic })
	.setDescription(formatedTasks)
	.setTimestamp()

	return embedMessage;
}

function createSelectMenu(dataTasks, arrayEmojis) {
	const options = [];

	const selectMenu = new StringSelectMenuBuilder()
	.setCustomId('checkTask')
	.setPlaceholder('Check a task!')
	.setMinValues(1)
	.setMaxValues(dataTasks.length);

	for (let i = 0; i < dataTasks.length; i++) {
		options.push(
			new StringSelectMenuOptionBuilder()
				.setLabel(`${dataTasks[i].taskName}`)
				//.setEmoji({ name: arrayEmojis[i][0], id: `:${arrayEmojis[i][0]}:` })
				.setValue(`${i}`)
				
		);
	}

	selectMenu.addOptions(options);
	return selectMenu;
};