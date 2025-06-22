module.exports = {
    name: 'disconnect',
    async execute(queue) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('Mi trabajo aquí ha terminado, baaaaaaaaaaaai');
        }
    }
};