module.exports = {
    name: 'audioTracksAdd',
    async execute(queue, tracks) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send(`Multiple Track's queued`);
        }
    }
};