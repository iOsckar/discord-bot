module.exports = {
    name: 'error',
    async execute(queue, error) {
        console.log(`General player error event: ${error.message}`);
        console.log(error);
        if (queue.metadata && typeof queue.metadata.send === 'function') {
            queue.metadata.send('❌ Ocurrió un error general en la cola de reproducción.');
        }
    }
};