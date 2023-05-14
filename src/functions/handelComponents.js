const { readdirSync }  = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolder = readdirSync("./src/components");

        console.log('THIS LINE WORKS');

        for(const folder of componentFolder) {
            const componentsFiles = readdirSync(`./src/components/${folder}`).filter(
                (file) => file.endsWith(".js")
            );

            const { buttons } = client;

            switch (folder) {
                case "buttons":
                    for(const file of componentsFiles) {
                        const button = require(`../components/${folder}/${file}`);
                        buttons.set(button.data.name, button);
                    }
                break;

                default:
                break;
            }
        }

    };
};