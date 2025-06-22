module.exports = {
    name: 'emptyQueue',
    async execute(queue) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('Cola terminada, no hay más canciones que reproducir.');
        }
    }
};