module.exports = {
    name: 'disconnect',
    async execute(queue) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('Looks like my job here is done, leaving now!');
        }
    }
};