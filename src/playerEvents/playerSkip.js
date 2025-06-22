module.exports = {
    name: 'playerSkip',
    async execute(queue, track) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send(`Saltando **${track.title}** debido a un problema`);
        }
    }
};