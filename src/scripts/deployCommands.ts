import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config()

const commands: any[] = [];

const token: string | undefined = process.env.TOKEN;
const clientId: string | undefined = process.env.APP_ID;

const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
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

const restClient = new REST().setToken(token as string);

(async () => {
    try {
        console.log(`Refreshing ${commands.length} application commands.`);

        const data = await restClient.put(
            Routes.applicationCommands(clientId as string),
            {body: commands}
        ) as string;

        console.log(`Refreshed ${data.length} application commands.`);
    } catch(err) {
        console.error(err);
    }
})();