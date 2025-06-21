const { ActivityType } = require("discord.js");

module.exports = {
    name: 'playerStart',
    once: true,
    
    async execute(player) {
     // this event is emitted whenever discord-player starts to play a track
        player.events.on('playerStart', (queue, track) => {
          // we will later define queue.metadata object while creating the queue
          queue.metadata.channel.send(`Started playing **${track.title}**!`);
        });

    },
};