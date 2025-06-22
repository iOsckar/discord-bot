const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('@discordjs/builders');
const emojisJSON = require('../../JSON/emojis.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('to-do')
	.setDescription('Create a list of tasks to get things done!')
	.addStringOption(option =>
		option.setName('tasks')
			.setDescription(`Comma separated list of tasks (max 15). Ex: 'Duolingo, Exercise, Water the plants' `)
			.setRequired(true)),
    
    async execute(interaction, client) {

		/* -------------------------------------------- TOP SECRET (ESTO ME PERMITE EJECUTAR EL COMANDO SOLO A MI)-------------------------------------------- */
		const allowedUserId = '330183814863257602';

        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: 'Solo @osckar puede ejecutar este comando.',
                ephemeral: true
            });
        }
		/* -------------------------------------------- TOP SECRET -------------------------------------------- */
	
		let userCommandData = interaction.options.get('tasks'); //The input is called 'tasks' which it is recieved once the user send the command with the tex
		let maxOfTasks = 15;

		if(containsSpecialChars(userCommandData.value)) {
			await interaction.reply({
				content: '**Special characteres or emojis are not allowed.**\n Try again. ',
				ephemeral: true
			 });
			 return;
		}

		let arrayTasks = userCommandData.value.split(',').filter(elm => elm); //Turns the string into an array... then... Delete all the void indexes [1,2,3,,,,6,7 ] => [1,2,3,6,7]

		if(arrayTasks.length > maxOfTasks) { //If the user has more than 15 tasks... don't continue
			interaction.reply({ content: `**Don't overexert yourself!**\n You entered so many tasks. \n\n *Try again. (Max ${maxOfTasks} tasks)*.`, ephemeral: true });
			return;
		}

		let username = interaction.user.username;
		let idUser = interaction.user.id;
		let profilePic = interaction.user.displayAvatarURL();
		
		const arrayEmojis = getEmojis(emojisJSON);
		const formatedTasks = concatenateOptions(arrayTasks, arrayEmojis); //Receive the tasks from the command and turns it into an array. 
		const embedMessage = generateEmbed(username, profilePic, idUser, formatedTasks, arrayEmojis);
		const selectMenu = createSelectMenu(arrayTasks,arrayEmojis);

		const row = new ActionRowBuilder().addComponents(selectMenu);

		await interaction.reply({
			embeds: [embedMessage], components: [row]
        });

    }
}

function containsSpecialChars(str) {
	const specialChars = /[^\x20-\x7E]|~/g;
	return specialChars.test(str);
  }

function getEmojis(emojis) { 
	/* -- GETTING EMOJIS FROM THE JSON FILE AND CONVERTING INTO AN ARRAY -- */
	const arrayEmojis = [];

	for (var i in emojis)
		arrayEmojis.push([i, emojis[i]]);

	arrayEmojis.sort(function(a, b){return 0.5 - Math.random()}); //Shuffles the array randomly
	return arrayEmojis;
}

function concatenateOptions(arrayTasks, arrayEmojis) {
	let tasksEmbed = '';

	for (let i = 0; i < arrayTasks.length; i++) 
		tasksEmbed += `**○** ${arrayTasks[i]}  ${arrayEmojis[i][1]}\n`;
	
	return tasksEmbed;
}

function generateEmbed(username, profilePic, idUser, formatedTasks) {
	const embedMessage = new EmbedBuilder()
	.setColor(16761034)
	.setAuthor({ name: `${username}'s goals`, iconURL: profilePic })
	.setThumbnail('https://i.imgur.com/zXZ0u35.png')
	.setDescription(formatedTasks)
	.setTimestamp()
	.setFooter({ text: `${idUser}` })

	return embedMessage;
}

function createSelectMenu(arrayTasks, arrayEmojis) {
	const options = [];

	const selectMenu = new StringSelectMenuBuilder()
	.setCustomId('checkTask')
	.setPlaceholder('Check a task!')
	.setMinValues(1)
	.setMaxValues(arrayTasks.length);

	for (let i = 0; i < arrayTasks.length; i++) {
		options.push(
			new StringSelectMenuOptionBuilder()
				.setLabel(`${arrayTasks[i]}`)
				//.setEmoji({ name: arrayEmojis[i][0], id: `:${arrayEmojis[i][0]}:` })
				.setValue(`${i}`)
				
		);
	}

	selectMenu.addOptions(options);
	return selectMenu;
};