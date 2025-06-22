module.exports = {
    name: 'audioTrackAdd',
    async execute(queue, track) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send(`Track **${track.title}** queued`);
        }
    }
};