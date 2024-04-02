import { REST, Routes } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";

const commands: any[] = [];

const token = Bun.env.TOKEN;
const clientId = Bun.env.APP_ID;

const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARN] The command at ${filePath} is missing required "data" or "execute" property`);
        }
	}
}

const restClient = new REST().setToken(token);

(async () => {
    try {
        console.log(`Refreshing ${commands.length} application commands.`);

        const data = await restClient.put(
            Routes.applicationCommands(clientId),
            {body: commands}
        ) as string;

        console.log(`Refreshed ${data.length} application commands.`);
    } catch(err) {
        console.error(err);
    }
})();