module.exports = {
    name: 'playerSkip',
    async execute(queue, track) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
        }
    }
};