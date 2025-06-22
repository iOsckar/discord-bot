module.exports = {
    name: 'emptyChannel',
    async execute(queue) {
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('Me salí del canal de voz porque no tuve actividad durante 5 minutos.');
        }
    }
};