module.exports = {
    name: 'playerStart',
    async execute(queue, track) {
        console.log('Event playerStart triggered');
        queue.metadata.send(`Started playing: **${track.title}**`);
    }
};