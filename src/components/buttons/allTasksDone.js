const { EmbedBuilder } = require('discord.js');
const { data } = require('../selectMenus/checkTask');

module.exports = {
    data: {
        name: `allTasksDone`
    },
    async execute(interaction, client) {

        const dataEmbedTasks = interaction.message.embeds[0].description; //Gets the description from the embed message which are the tasks.
        const dataTasks = convertDataTasks(dataEmbedTasks);

        let username = interaction.user.username;
		let idUser = interaction.user.id;
		let profilePic = interaction.user.displayAvatarURL();

        const embedMessage = generateEmbed(username, profilePic, idUser, dataTasks);

        const channelA = await client.channels.fetch('909804035937275944');
        channelA.send({ embeds: [embedMessage] });


        await interaction.update({
            components: []
        })

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
        taskName = taskName.replace(/~/g,'');
        taskName = taskName.replace(/[^\x20-\x7E]/g, '').trim(); //Removes all the emojis from the string... then the blank spaces

        console.log(taskName);

        let emoji = arrayDataEmbedTasks[i];
        emoji = arrayDataEmbedTasks[i].slice(-2).replace(' ️','').trim(); //Get the last character (Which is the emoji, and delete blank spaces just in case there are)

        dataTasks.push({
            isChecked: isChecked, taskName: taskName, emoji: emoji
        });  
    }

    return dataTasks;
}


function generateEmbed(username, profilePic, idUser, dataTasks) {

    let tasksString = '';
    let emojis = '';

    for (let i = 0; i < dataTasks.length; i++) {
       tasksString += '`' + dataTasks[i].taskName + '`' + ' ';
    }


    for (let i = 0; i < dataTasks.length; i++) {
        emojis += dataTasks[i].emoji
    }

    const description = '<@' + idUser + '>' + ' **has gotten things done!**\n\n' +
        '**Completed tasks**\n' + tasksString + '\n\n' + '**Your day pattern**\n' + '`' + emojis + '`';
       


    
    

	const embedMessage = new EmbedBuilder()
	.setColor(16761034)
	.setAuthor({ name: `Congratulations ${username}!!!`, iconURL: profilePic })
    .setThumbnail('https://i.imgur.com/zXZ0u35.png')
	.setDescription(description)

	return embedMessage;
}