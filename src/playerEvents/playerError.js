module.exports = {
    name: 'playerError',
    async execute(queue, error) {
        console.log(`Player error event: ${error.message}`);
        console.log(error);
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('❌ Ocurrió un error al reproducir la canción.');
        }
    }
};