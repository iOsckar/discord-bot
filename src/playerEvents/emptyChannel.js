module.exports = {
    name: 'emptyChannel',
    async execute(queue) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('Leaving because no vc activity for the past 5 minutes');
        }
    }
};