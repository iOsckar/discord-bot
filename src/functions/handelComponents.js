const { readdirSync }  = require('fs');

module.export = (client) => {
    client.handleComponents = async () => {
        const componentFolder = readdirSync("./src/components");
        for(const folder of componentFolder) {
            const componetsFiles = readdirSync(`./src/components/${folder}`).filter(
                (file) => file.endsWith(".js")
            );

            const { buttons } = client;

            switch (folder) {
                case "buttons":
                    for(const file of componetFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        buttons.set(button.date.name, button);
                    }
                    break;

                default:
                    break;
            }
        }

    };
};