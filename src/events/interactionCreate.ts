import { Events } from "discord.js";
import type { Interaction } from "discord.js";

export const name = Events.InteractionCreate;

export const execute = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command named ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "Failed to execute the given command", ephemeral: true });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
}