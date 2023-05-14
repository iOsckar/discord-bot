const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('to-do')
	.setDescription('Create a list of tasks to get things done!')
	.addStringOption(option =>
		option.setName('tasks')
			.setDescription(`Comma separated list of tasks (max 15). Ex: 'Duolingo, Exercise, Water the plants' `)
			.setRequired(true)),
    
    async execute(interaction, client) {

		let userCommandData = interaction.options.get('tasks'); //The input is called 'tasks' which it is recieved once the user send the command with the tex
		let maxOfTasks = 15;

		if(userCommandData.value.split(',').filter(elm => elm).length > maxOfTasks) { //If the user has more than 15 tasks... don't continue
			interaction.reply({ content: `**Don't overexert yourself!**\n You entered so many tasks. \n\n *Try again. (Max ${maxOfTasks} tasks)*.`, ephemeral: true });
			return;
		}

		let username = interaction.user.username;
		let profilePic = interaction.user.displayAvatarURL();

		
		tasks = concatenateOptions(userCommandData.value); //Receive the tasks from the command and turns it into an array. 

		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setURL('https://discord.js.org/')
		.setAuthor({ name: `${username}'s to-do list`, iconURL: profilePic })
		.setDescription(tasks)
		.setTimestamp()
		.setFooter({ text: 'Generating reactions...' });

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('1')
			.setStyle("Danger");

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('2')
			.setStyle("Secondary");

			const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

		console.log(interaction.user.username);
		interaction.channel.send({ embeds: [exampleEmbed], components: [row]});

    }
}

function concatenateOptions(dataString) {
	let tasksEmbed = '';
	arrayTasks = dataString.split(','); //Turns the string into an array
	arrayTasks  = arrayTasks.filter(elm => elm); //Delete all the void indexes [1,2,3,,,,6,7 ] => [1,2,3,6,7]

	for (let i = 0; i < arrayTasks.length; i++) 
		tasksEmbed += `**${i + 1} -** ${arrayTasks[i]}\n`;
	
	return tasksEmbed;
}