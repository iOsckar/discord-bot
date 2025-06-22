module.exports = {
    name: 'playerStart',
    async execute(queue, track) {
        queue.metadata.send(`Reproduciendo: **${track.title}**`);
    }
};